from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
import edge_tts
import re
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os
from typing import List, Optional

from models.water_calculator import calculate_water_requirement
from models.intercrop_model import get_intercrop_recommendation
from models.domain import Farm, Plot, SoilProfile, WaterAsset, FarmBudget, ActivityEvent, ScenarioSnapshot
from services.farm_service import farm_service
from services.decision_service import decision_service
from models.satellite import FarmSatelliteSummary
from services.satellite_service import satellite_service
from services.weather_service import weather_service
from services.news_service import news_service

app = FastAPI(
    title='Krishinova Botanical Intelligence & Agricultural Digital Twin',
    description='Farm-specific decision support system Comprehensive Agricultural Telemetry & Botanical Intelligence'
)

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

# Pydantic Request Models
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

class ScenarioSimulationRequest(BaseModel):
    rainfall_anomaly_pct: float = -40.0
    temp_offset_c: float = 2.5
    water_cap_pct: float = 60.0
    budget_limit_inr: float = 28000.0

@app.get('/')
def read_root():
    return {
        'project': 'Krishinova',
        'tagline': 'Understand the farm. Anticipate climate risk. Plan with the resources available.',
        'domain': 'AgriTech and Water Resilience',
        'status': 'online',
        'version': '2.4.0'
    }

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

@app.get('/api/farms/{farm_id}/plots', response_model=List[Plot])
def get_farm_plots(farm_id: str):
    farm = farm_service.get_by_id(farm_id)
    if not farm:
        raise HTTPException(status_code=404, detail='Farm not found')
    return farm.plots

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

# --- Decision Engine Endpoints (Per Updated Indradhanu Blueprint) ---
@app.get('/api/farms/{farm_id}/crop-plan')
def get_crop_plan_and_demand(farm_id: str):
    return decision_service.get_crop_plan(farm_id)

@app.get('/api/farms/{farm_id}/resources')
def get_farm_resources(farm_id: str):
    return decision_service.get_resource_status(farm_id)

@app.get('/api/farms/{farm_id}/baseline')
def get_baseline_feasibility(farm_id: str):
    return decision_service.get_baseline_feasibility(farm_id)

@app.post('/api/farms/{farm_id}/scenarios')
def simulate_farm_scenario(farm_id: str, req: ScenarioSimulationRequest):
    result = decision_service.simulate_scenario(
        farm_id=farm_id,
        rainfall_anomaly_pct=req.rainfall_anomaly_pct,
        temp_offset_c=req.temp_offset_c,
        water_cap_pct=req.water_cap_pct,
        budget_limit_inr=req.budget_limit_inr
    )
    # Persist scenario snapshot
    snapshot = ScenarioSnapshot(
        id=f"scen-{int(os.times().system * 1000)}",
        farm_id=farm_id,
        name=f"Climate Shock (Rain {req.rainfall_anomaly_pct}%, Temp +{req.temp_offset_c}°C)",
        rainfall_anomaly_pct=req.rainfall_anomaly_pct,
        temp_offset_c=req.temp_offset_c,
        water_cap_pct=req.water_cap_pct,
        budget_limit_inr=req.budget_limit_inr,
        recommended_strategy="Strategy B: Deficit Drip Irrigation + Mulching",
        created_at=pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    farm_service.save_scenario(snapshot)
    return result

@app.post('/api/farms/{farm_id}/activities', response_model=ActivityEvent)
def record_farm_activity(farm_id: str, activity: ActivityEvent):
    activity.farm_id = farm_id
    if not activity.id:
        activity.id = f"act-{int(os.times().system * 1000)}"
    if not activity.recorded_at:
        activity.recorded_at = pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    return farm_service.record_activity(farm_id, activity)

@app.get('/api/farms/{farm_id}/activities', response_model=List[ActivityEvent])
def get_farm_activities(farm_id: str):
    return farm_service.get_activities(farm_id)

@app.get('/api/farms/{farm_id}/history')
def get_farm_history(farm_id: str):
    activities = farm_service.get_activities(farm_id)
    scenarios = farm_service.get_scenarios(farm_id)
    return {
        "farm_id": farm_id,
        "total_activities_logged": len(activities),
        "activities": activities,
        "scenarios": scenarios
    }

# --- Live Weather & News Intelligence Endpoints ---
@app.get('/api/weather/live')
def get_live_weather(lat: float = 18.1512, lon: float = 74.5824):
    return weather_service.get_live_weather(lat=lat, lon=lon)

@app.get('/api/news/advisories')
def get_agri_advisories():
    return news_service.get_agri_intelligence()

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

# --- ML & Legacy Crop Prediction Endpoints ---
@app.post('/predict/crop')
def predict_crop(data: CropPredictionRequest):
    if model is None or le is None:
        raise HTTPException(status_code=500, detail='Model not loaded on server.')
        
    if len(data.yearly_temperatures) == 0 or len(data.yearly_humidities) == 0 or len(data.yearly_rainfalls) == 0:
        raise HTTPException(status_code=400, detail='Weather data history cannot be empty.')
        
    avg_temp = sum(data.yearly_temperatures) / len(data.yearly_temperatures)
    avg_hum = sum(data.yearly_humidities) / len(data.yearly_humidities)
    avg_rain = sum(data.yearly_rainfalls) / len(data.yearly_rainfalls)
    
    features = pd.DataFrame([{
        'N': data.N,
        'P': data.P,
        'K': data.K,
        'temperature_4yr_avg': avg_temp,
        'humidity_4yr_avg': avg_hum,
        'ph': data.ph,
        'rainfall_4yr_avg': avg_rain
    }])
    
    prediction_idx = model.predict(features)[0]
    predicted_crop = le.inverse_transform([prediction_idx])[0]
    
    probabilities = model.predict_proba(features)[0]
    confidence = round(probabilities[prediction_idx] * 100, 2)
    
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


# -------------------------------------------------------------
# HYPER-REALISTIC INDIAN NEURAL TTS FOR LOCAL FARMERS
# -------------------------------------------------------------
VOICE_MAP = {
    "mr": {"male": "mr-IN-ManoharNeural", "female": "mr-IN-AarohiNeural"},
    "hi": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "bho": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "mai": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "mwr": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "doi": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "en": {"male": "en-IN-PrabhatNeural", "female": "en-IN-NeerjaNeural"},
    "bn": {"male": "bn-IN-BashkarNeural", "female": "bn-IN-TanishaaNeural"},
    "te": {"male": "te-IN-MohanNeural", "female": "te-IN-ShrutiNeural"},
    "ta": {"male": "ta-IN-ValluvarNeural", "female": "ta-IN-PallaviNeural"},
    "gu": {"male": "gu-IN-NiranjanNeural", "female": "gu-IN-DhwaniNeural"},
    "kn": {"male": "kn-IN-GaganNeural", "female": "kn-IN-SapnaNeural"},
    "ml": {"male": "ml-IN-MidhunNeural", "female": "ml-IN-SobhanaNeural"},
    "pa": {"male": "pa-IN-RaajwinderNeural", "female": "pa-IN-GurpreetNeural"},
    "ur": {"male": "ur-IN-SalmanNeural", "female": "ur-IN-GulNeural"},
    "as": {"male": "bn-IN-BashkarNeural", "female": "bn-IN-TanishaaNeural"},
    "kok": {"male": "mr-IN-ManoharNeural", "female": "mr-IN-AarohiNeural"},
    "ne": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "ks": {"male": "ur-IN-SalmanNeural", "female": "ur-IN-GulNeural"},
    "sd": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
    "sa": {"male": "hi-IN-MadhurNeural", "female": "hi-IN-SwaraNeural"},
}

class TTSRequest(BaseModel):
    text: str
    language: str = "mr"
    gender: str = "male"
    rate: str = "-4%"

@app.post("/api/tts/speak")
async def text_to_speech(req: TTSRequest):
    try:
        lang_voices = VOICE_MAP.get(req.language, VOICE_MAP["mr"])
        voice = lang_voices.get(req.gender, lang_voices["male"])
        
        # Clean markdown and formatting
        clean_text = re.sub(r'\*\*(.*?)\*\*', r'\1', req.text)
        clean_text = re.sub(r'[#*•_`]', '', clean_text)
        clean_text = clean_text.replace('₹', 'रुपये ')
        
        communicate = edge_tts.Communicate(clean_text, voice, rate=req.rate)
        audio_chunks = []
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_chunks.append(chunk["data"])
        
        audio_bytes = b"".join(audio_chunks)
        return Response(content=audio_bytes, media_type="audio/mpeg")
    except Exception as e:
        print(f"TTS Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
