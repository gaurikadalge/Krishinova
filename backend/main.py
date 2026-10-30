from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os

from models.water_calculator import calculate_water_requirement
from models.intercrop_model import get_intercrop_recommendation
from models.domain import Farm, Plot, SoilProfile, WaterAsset, FarmBudget
from services.farm_service import farm_service
from models.satellite import FarmSatelliteSummary
from services.satellite_service import satellite_service

app = FastAPI(title='Krishinova ML Backend')

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Load XGBoost Model
model_path = 'saved_models/xgboost_crop_model.joblib'
encoder_path = 'saved_models/label_encoder.joblib'

model = None
le = None

if os.path.exists(model_path) and os.path.exists(encoder_path):
    model = joblib.load(model_path)
    le = joblib.load(encoder_path)
else:
    print('WARNING: Model files not found. Run train_crop_model.py first.')

# Pydantic Models
class CropPredictionRequest(BaseModel):
    N: float
    P: float
    K: float
    ph: float
    yearly_temperatures: list[float]
    yearly_humidities: list[float]
    yearly_rainfalls: list[float]

class WaterPredictionRequest(BaseModel):
    forecast_temperature: float
    forecast_humidity: float
    forecast_rainfall_mm: float
    crop_stage: str # 'initial', 'development', 'mid_season', 'late_season'
    area_acres: float
    current_tank_volume_liters: float

@app.get('/')
def read_root():
    return {'message': 'Welcome to Krishinova ML API'}

# --- Farm Profile & Digital Twin Domain Endpoints ---
@app.get('/api/farms/default', response_model=Farm)
def get_default_farm():
    return farm_service.get_default_farm()

@app.get('/api/farms/{farm_id}', response_model=Farm)
def get_farm(farm_id: str):
    farm = farm_service.get_by_id(farm_id)
    if not farm:
        raise HTTPException(status_code=404, detail='Farm not found')
    return farm

@app.put('/api/farms/{farm_id}', response_model=Farm)
def update_farm(farm_id: str, farm: Farm):
    farm.id = farm_id
    return farm_service.update_farm(farm)

@app.post('/api/farms/{farm_id}/plots', response_model=Farm)
def add_or_update_plot(farm_id: str, plot: Plot):
    updated = farm_service.add_plot(farm_id, plot)
    if not updated:
        raise HTTPException(status_code=404, detail='Farm not found')
    return updated

@app.put('/api/farms/{farm_id}/budget', response_model=Farm)
def update_farm_budget(farm_id: str, budget: FarmBudget):
    updated = farm_service.update_budget(farm_id, budget)
    if not updated:
        raise HTTPException(status_code=404, detail='Farm not found')
    return updated

@app.put('/api/farms/{farm_id}/water-assets', response_model=Farm)
def update_water_assets(farm_id: str, assets: list[WaterAsset]):
    updated = farm_service.update_water_assets(farm_id, assets)
    if not updated:
        raise HTTPException(status_code=404, detail='Farm not found')
    return updated

# --- Satellite Farm Monitoring Endpoints ---
@app.get('/api/satellite/analysis/{farm_id}', response_model=FarmSatelliteSummary)
def get_satellite_analysis(farm_id: str):
    analysis = satellite_service.get_latest_farm_analysis(farm_id)
    if not analysis:
        raise HTTPException(status_code=404, detail='Satellite data not found for farm')
    return analysis

@app.get('/api/satellite/latest/default', response_model=FarmSatelliteSummary)
def get_default_satellite_analysis():
    farm = farm_service.get_default_farm()
    analysis = satellite_service.get_latest_farm_analysis(farm.id)
    if not analysis:
        raise HTTPException(status_code=404, detail='Satellite analysis unavailable')
    return analysis

# --- ML & Prediction Endpoints ---
@app.post('/predict/crop')
def predict_crop(data: CropPredictionRequest):
    if model is None or le is None:
        raise HTTPException(status_code=500, detail='Model not loaded on server.')
        
    if len(data.yearly_temperatures) == 0 or len(data.yearly_humidities) == 0 or len(data.yearly_rainfalls) == 0:
        raise HTTPException(status_code=400, detail='Weather data history cannot be empty.')
        
    # Calculate 4-year averages
    avg_temp = sum(data.yearly_temperatures) / len(data.yearly_temperatures)
    avg_hum = sum(data.yearly_humidities) / len(data.yearly_humidities)
    avg_rain = sum(data.yearly_rainfalls) / len(data.yearly_rainfalls)
    
    # Create feature dataframe
    features = pd.DataFrame([{
        'N': data.N,
        'P': data.P,
        'K': data.K,
        'temperature_4yr_avg': avg_temp,
        'humidity_4yr_avg': avg_hum,
        'ph': data.ph,
        'rainfall_4yr_avg': avg_rain
    }])
    
    # Predict
    prediction_idx = model.predict(features)[0]
    predicted_crop = le.inverse_transform([prediction_idx])[0]
    
    # Get probability
    probabilities = model.predict_proba(features)[0]
    confidence = round(probabilities[prediction_idx] * 100, 2)
    
    # Get Intercrop recommendation automatically
    intercrops = get_intercrop_recommendation(predicted_crop)
    from models.intercrop_model import get_crop_metadata
    metadata = get_crop_metadata(predicted_crop)
    
    return {
        'predicted_crop': predicted_crop.capitalize(),
        'confidence': f'{confidence}%',
        'weather_averages_used': {
            'temperature': round(avg_temp, 2),
            'humidity': round(avg_hum, 2),
            'rainfall': round(avg_rain, 2)
        },
        'recommended_intercrops': intercrops,
        'fertilizer': metadata['fertilizer'],
        'days_to_harvest': metadata['days_to_harvest']
    }

@app.post('/predict/water')
def predict_water(data: WaterPredictionRequest):
    result = calculate_water_requirement(
        temperature=data.forecast_temperature,
        humidity=data.forecast_humidity,
        forecast_rainfall_mm=data.forecast_rainfall_mm,
        crop_stage=data.crop_stage,
        area_acres=data.area_acres,
        tank_volume_liters=data.current_tank_volume_liters
    )
    return result

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 8001))
    uvicorn.run(app, host='0.0.0.0', port=port)
