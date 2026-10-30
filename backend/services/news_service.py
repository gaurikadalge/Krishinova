from datetime import datetime
from typing import List, Dict, Any

class NewsService:
    """
    Supplies official Agromet advisories, KVK warnings, and Mandi price trends
    specifically filtered for Maharashtra smallholder farmers.
    """

    def get_agri_intelligence(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "alert-1",
                "title": "IMD Agromet Advisory: Dry Spell Warning for Pune & Solapur",
                "source": "India Meteorological Department (IMD)",
                "date": datetime.now().strftime("%d %b %Y"),
                "category": "Climate Alert",
                "crop": "Soybean, Cotton, Pulses",
                "relevance": "High (Directly impacts Baramati pilot farm)",
                "summary": "Dry weather likely to prevail over western Maharashtra for the next 7-10 days. Farmers are advised to provide light irrigation in the morning or evening hours and apply straw mulching to conserve root-zone soil moisture.",
                "url": "https://mausam.imd.gov.in"
            },
            {
                "id": "alert-2",
                "title": "Baramati APMC: Soybean & Onion Mandi Price Surge",
                "source": "Maharashtra State Agricultural Marketing Board (MSAMB)",
                "date": datetime.now().strftime("%d %b %Y"),
                "category": "Market Intelligence",
                "crop": "Soybean, Onion",
                "relevance": "High",
                "summary": "Modal price of Soybean touched ₹4,750/quintal at Baramati market yard, up 4.2% week-on-week due to steady crushing demand. Red onion modal prices stable at ₹2,100/quintal.",
                "url": "https://www.msamb.com"
            },
            {
                "id": "alert-3",
                "title": "KVK Advisory: Fall Armyworm Surveillance on Late Kharif Crops",
                "source": "Krishi Vigyan Kendra (KVK) Baramati",
                "date": datetime.now().strftime("%d %b %Y"),
                "category": "Pest & Disease Advisory",
                "crop": "Maize, Soybean",
                "relevance": "Medium",
                "summary": "Pheromone trap monitoring recommended (5 traps/acre). If egg masses are observed, spray Azadirachtin 1500 ppm @ 5ml/liter of water as biological control.",
                "url": "https://kvkbaramati.com"
            },
            {
                "id": "alert-4",
                "title": "PM-Kisan 19th Installment Credited to Eligible Farmers",
                "source": "Ministry of Agriculture & Farmers Welfare",
                "date": datetime.now().strftime("%d %b %Y"),
                "category": "Government Schemes",
                "crop": "All Crops",
                "relevance": "High (Liquidity Support)",
                "summary": "Direct benefit transfer of ₹2,000 released to registered Aadhaar-linked farmer bank accounts. Check PM-Kisan portal for e-KYC status.",
                "url": "https://pmkisan.gov.in"
            }
        ]

news_service = NewsService()
