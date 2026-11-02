export interface AgroRegion {
  id: string
  name: string
  district: string
  state: string
  latitude: number
  longitude: number
  plotName: string
  crop: string
  ndviScore: number
  ndmiScore: number
  area: string
}

export const AGRICULTURAL_REGIONS: AgroRegion[] = [
  {
    id: "baramati",
    name: "Baramati (Malegaon Khurd)",
    district: "Pune, Maharashtra",
    state: "Maharashtra",
    latitude: 18.1512,
    longitude: 74.5824,
    plotName: "North Plot - Kharif Cash Crop",
    crop: "Soybean (JS 335)",
    ndviScore: 0.68,
    ndmiScore: 0.54,
    area: "2.5 Acres",
  },
  {
    id: "nashik",
    name: "Nashik Valley (Niphad)",
    district: "Nashik, Maharashtra",
    state: "Maharashtra",
    latitude: 20.0767,
    longitude: 74.1081,
    plotName: "Vineyard & Export Onion Block",
    crop: "Table Grapes (Thomson) / Red Onion",
    ndviScore: 0.74,
    ndmiScore: 0.61,
    area: "3.2 Acres",
  },
  {
    id: "kolhapur",
    name: "Kolhapur (Shirol Basin)",
    district: "Kolhapur, Maharashtra",
    state: "Maharashtra",
    latitude: 16.7456,
    longitude: 74.5982,
    plotName: "Krishna River Basin Plot",
    crop: "Sugarcane (Co 86032)",
    ndviScore: 0.81,
    ndmiScore: 0.69,
    area: "4.0 Acres",
  },
  {
    id: "akola",
    name: "Akola (Murtizapur)",
    district: "Akola, Vidarbha",
    state: "Maharashtra",
    latitude: 20.7324,
    longitude: 77.3622,
    plotName: "Vidarbha Cotton & Tur Block",
    crop: "Bt Cotton / Pigeon Pea",
    ndviScore: 0.58,
    ndmiScore: 0.42,
    area: "3.5 Acres",
  },
  {
    id: "sambhajinagar",
    name: "Chhatrapati Sambhajinagar (Paithan)",
    district: "Marathwada",
    state: "Maharashtra",
    latitude: 19.4822,
    longitude: 75.3856,
    plotName: "Godavari Command Basin",
    crop: "Maize & Pearl Millet (Bajra)",
    ndviScore: 0.62,
    ndmiScore: 0.48,
    area: "2.8 Acres",
  },
  {
    id: "solapur",
    name: "Solapur (Pandharpur)",
    district: "Solapur, Maharashtra",
    state: "Maharashtra",
    latitude: 17.6782,
    longitude: 75.3245,
    plotName: "Bhagwa Pomegranate Orchard",
    crop: "Pomegranate (Bhagwa)",
    ndviScore: 0.65,
    ndmiScore: 0.51,
    area: "2.0 Acres",
  },
  {
    id: "nagpur",
    name: "Nagpur (Katol Citrus Belt)",
    district: "Nagpur, Maharashtra",
    state: "Maharashtra",
    latitude: 21.2711,
    longitude: 78.5833,
    plotName: "Nagpur Mandarin Citrus Grove",
    crop: "Orange / Citrus",
    ndviScore: 0.72,
    ndmiScore: 0.58,
    area: "3.0 Acres",
  },
  {
    id: "sangli",
    name: "Sangli (Miraj Krishna Basin)",
    district: "Sangli, Maharashtra",
    state: "Maharashtra",
    latitude: 16.8524,
    longitude: 74.5815,
    plotName: "Turmeric & Cane Valley",
    crop: "Salem Turmeric / Sugarcane",
    ndviScore: 0.76,
    ndmiScore: 0.63,
    area: "3.8 Acres",
  },
]
