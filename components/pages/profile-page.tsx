"use client"

import { useState, useEffect } from "react"
import { useLanguage, type Language } from "../language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  LogOut,
  Leaf,
  Shield,
  Bell,
  Globe,
  MapPin,
  Camera,
  History,
  Calendar,
  Clock,
  Droplets,
  Coins,
  Layers,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  RefreshCw,
} from "lucide-react"
import InteractiveMap from "../interactive-map"

interface ProfilePageProps {
  language: Language
  user: any
  onLogout: () => void
}

const translations = {
  en: {
    profile: "Farm & Plots Management",
    personalInfo: "Farmer Identity",
    landInfo: "Plot Ledger & Soil",
    waterAndBudget: "Water & Budget Assets",
    settings: "Settings",
    predictionHistory: "Activity History",
    name: "Full Name",
    dob: "Date of Birth",
    mobile: "Mobile Number",
    location: "Location",
    landArea: "Total Farm Area (acres)",
    nitrogen: "Available Nitrogen (N kg/ha)",
    phosphorus: "Phosphorus (P kg/ha)",
    potassium: "Potassium (K kg/ha)",
    ph: "pH Level",
    totalPredictions: "Logged Activities",
    language: "Language Preference",
    english: "English",
    hindi: "हिन्दी (Hindi)",
    urdu: "اردو (Urdu)",
    marathi: "मराठी (Marathi)",
    logout: "Logout",
    edit: "Edit Details",
    save: "Save to Digital Twin",
    cancel: "Cancel",
    notifications: "Notifications",
    privacy: "Privacy & Security",
    appearance: "Appearance",
    enableNotifications: "Enable Advisory Notifications",
    twoFactor: "Two-Factor Authentication",
    dataPrivacy: "Data Privacy & Governance",
    accountSecurity: "Account Security",
    darkMode: "Dark Mode",
    theme: "Theme",
    profileUpdated: "Farm Profile updated successfully in Digital Twin",
    settingsUpdated: "Settings updated successfully",
    selectLanguage: "Select your preferred language for the application",
    signOut: "Sign Out",
    endSession: "End your current session",
    selectLocation: "Select Location",
    latitude: "Latitude",
    longitude: "Longitude",
    city: "District / Taluka",
    changePhoto: "Change Photo",
    noPredictions: "No prior field activities recorded yet.",
    crop: "Crop",
    date: "Date",
    time: "Time",
    details: "Details",
    viewDetails: "View Details",
    twinSynchronized: "Synchronized with Twin State",
    pilotBadge: "Maharashtra Pilot Context (Baramati, Pune)",
    totalWater: "Total Available Water",
    totalBudget: "Total Seasonal Budget",
    remainingBudget: "Remaining Liquidity",
  },
  hi: {
    profile: "खेत और प्लॉट प्रबंधन",
    personalInfo: "किसान पहचान",
    landInfo: "प्लॉट बहीखाता और मिट्टी",
    waterAndBudget: "जल और बजट संसाधन",
    settings: "सेटिंग्स",
    predictionHistory: "गतिविधि इतिहास",
    name: "पूरा नाम",
    dob: "जन्म तिथि",
    mobile: "मोबाइल नंबर",
    location: "स्थान",
    landArea: "कुल खेत क्षेत्र (एकड़)",
    nitrogen: "नाइट्रोजन (N kg/ha)",
    phosphorus: "फॉस्फोरस (P kg/ha)",
    potassium: "पोटेशियम (K kg/ha)",
    ph: "pH स्तर",
    totalPredictions: "दर्ज गतिविधियाँ",
    language: "भाषा की पसंद",
    english: "English",
    hindi: "हिन्दी (Hindi)",
    urdu: "اردو (Urdu)",
    marathi: "मराठी (Marathi)",
    logout: "लॉग आउट",
    edit: "संपादित करें",
    save: "डिजिटल ट्विन में सहेजें",
    cancel: "रद्द करें",
    notifications: "सूचनाएं",
    privacy: "गोपनीयता और सुरक्षा",
    appearance: "दिखावट",
    enableNotifications: "सलाहकार सूचनाएं सक्षम करें",
    twoFactor: "दो-चरणीय प्रमाणीकरण",
    dataPrivacy: "डेटा गोपनीयता",
    accountSecurity: "खाता सुरक्षा",
    darkMode: "डार्क मोड",
    theme: "थीम",
    profileUpdated: "खेत प्रोफ़ाइल डिजिटल ट्विन में सफलतापूर्वक सहेजी गई",
    settingsUpdated: "सेटिंग्स सफलतापूर्वक अपडेट की गईं",
    selectLanguage: "अनुप्रयोग के लिए अपनी पसंदीदा भाषा चुनें",
    signOut: "साइन आउट",
    endSession: "सत्र समाप्त करें",
    selectLocation: "स्थान चुनें",
    latitude: "अक्षांश",
    longitude: "रेखांश",
    city: "ज़िला / तालुका",
    changePhoto: "फोटो बदलें",
    noPredictions: "अभी तक कोई गतिविधि दर्ज नहीं है।",
    crop: "फसल",
    date: "तारीख",
    time: "समय",
    details: "विवरण",
    viewDetails: "विवरण देखें",
    twinSynchronized: "ट्विन स्थिति के साथ समन्वयित",
    pilotBadge: "महाराष्ट्र पायलट संदर्भ (बारामती, पुणे)",
    totalWater: "कुल उपलब्ध जल",
    totalBudget: "कुल मौसमी बजट",
    remainingBudget: "शेष नकदी",
  },
  ur: {
    profile: "فارم اور پلاٹ کا انتظام",
    personalInfo: "کسان کی شناخت",
    landInfo: "پلاٹ لیجر اور مٹی",
    waterAndBudget: "پانی اور بجٹ کے وسائل",
    settings: "سیٹنگز",
    predictionHistory: "سرگرمی کی تاریخ",
    name: "پورا نام",
    dob: "تاریخ پیدائش",
    mobile: "موبائل نمبر",
    location: "مقام",
    landArea: "کل فارم رقبہ (ایکڑ)",
    nitrogen: "نائٹروجن (N kg/ha)",
    phosphorus: "فاسفورس (P kg/ha)",
    potassium: "پوٹاشیم (K kg/ha)",
    ph: "pH سطح",
    totalPredictions: "درج شدہ سرگرمیاں",
    language: "زبان کی ترجیح",
    english: "English",
    hindi: "हिन्दी (Hindi)",
    urdu: "اردو (Urdu)",
    marathi: "मराठी (Marathi)",
    logout: "لاگ آؤٹ",
    edit: "ترمیم کریں",
    save: "محفوظ کریں",
    cancel: "منسوخ کریں",
    notifications: "اطلاعات",
    privacy: "رازداری اور سیکیورٹی",
    appearance: "ظاہری شکل",
    enableNotifications: "ای میل اطلاعات فعال کریں",
    twoFactor: "دو عنصر کی تصدیق",
    dataPrivacy: "ڈیٹا پرائیویسی",
    accountSecurity: "اکاؤنٹ سیکیورٹی",
    darkMode: "ڈارک موڈ",
    theme: "تھیم",
    profileUpdated: "پروفائل کو کامیابی سے اپ ڈیٹ کیا گیا",
    settingsUpdated: "سیٹنگز کو کامیابی سے اپ ڈیٹ کیا گیا",
    selectLanguage: "درخواست کے لیے اپنی پسندیدہ زبان منتخب کریں",
    signOut: "سائن آؤٹ",
    endSession: "اپنے موجودہ سیشن کو ختم کریں",
    selectLocation: "مقام منتخب کریں",
    latitude: "عرض البلد",
    longitude: "طول البلد",
    city: "شہر",
    changePhoto: "فوٹو بدلیں",
    noPredictions: "ابھی تک کوئی سرگرمی نہیں۔",
    crop: "فصل",
    date: "تاریخ",
    time: "وقت",
    details: "تفصیلات",
    viewDetails: "تفصیلات دیکھیں",
    twinSynchronized: "ڈیجیٹل ٹوئن سے مطابقت پذیر",
    pilotBadge: "مہاراشٹر پائلٹ سیاق و سباق (بارامتی، پونے)",
    totalWater: "کل دستیاب پانی",
    totalBudget: "کل بجٹ",
    remainingBudget: "باقی ماندہ رقم",
  },
  mr: {
    profile: "शेत आणि प्लॉट व्यवस्थापन",
    personalInfo: "शेतकरी ओळख",
    landInfo: "प्लॉट नोंदवही आणि माती",
    waterAndBudget: "पाणी आणि अंदाजपत्रक साधने",
    settings: "सेटिंग्ज",
    predictionHistory: "कृती इतिहास",
    name: "पूर्ण नाव",
    dob: "जन्म तारीख",
    mobile: "मोबाइल नंबर",
    location: "स्थान",
    landArea: "एकूण शेत क्षेत्र (एकर)",
    nitrogen: "उपलब्ध नायट्रोजन (N kg/ha)",
    phosphorus: "फॉस्फरस (P kg/ha)",
    potassium: "पोटॅशियम (K kg/ha)",
    ph: "pH स्तर",
    totalPredictions: "नोंदवलेली कृत्ये",
    language: "भाषा प्राधान्य",
    english: "English",
    hindi: "हिन्दी (Hindi)",
    urdu: "اردو (Urdu)",
    marathi: "मराठी (Marathi)",
    logout: "लॉग आउट",
    edit: "संपादित करा",
    save: "डिजिटल ट्विनमध्ये जतन करा",
    cancel: "रद्द करा",
    notifications: "सूचना",
    privacy: "गोपनीयता आणि सुरक्षा",
    appearance: "दिसावट",
    enableNotifications: "सल्लागार सूचना सक्षम करा",
    twoFactor: "दोन-घटक प्रमाणीकरण",
    dataPrivacy: "डेटा गोपनीयता",
    accountSecurity: "खाते सुरक्षा",
    darkMode: "गडद मोड",
    theme: "थीम",
    profileUpdated: "शेत प्रोफाइल डिजिटल ट्विनमध्ये यशस्वीरित्या अद्यतनित झाली",
    settingsUpdated: "सेटिंग्ज यशस्वीरित्या अपडेट झाली",
    selectLanguage: "अनुप्रयोगासाठी आपली पसंतीची भाषा निवडा",
    signOut: "साइन आउट",
    endSession: "आपला वर्तमान सत्र समाप्त करा",
    selectLocation: "स्थान निवडा",
    latitude: "अक्षांश",
    longitude: "रेखांश",
    city: "जिल्हा / तालुका",
    changePhoto: "फोटो बदला",
    noPredictions: "अद्याप कोणतीही नोंदवलेली कृती नाही.",
    crop: "पीक",
    date: "तारीख",
    time: "वेळ",
    details: "तपशील",
    viewDetails: "तपशील पहा",
    twinSynchronized: "डिजिटल ट्विनशी समन्वयित",
    pilotBadge: "महाराष्ट्र पायलट संदर्भ (बारामती, पुणे)",
    totalWater: "एकूण उपलब्ध पाणी",
    totalBudget: "एकूण मोसमी अंदाजपत्रक",
    remainingBudget: "शिल्लक तरलता",
  },
}

export default function ProfilePage({ language, user, onLogout }: ProfilePageProps) {
  const t = translations[language] || translations.en
  const { setLanguage } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [farmData, setFarmData] = useState<any>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [userLocation, setUserLocation] = useState(user?.location || { name: "Baramati, Pune", lat: 18.1512, lng: 74.5824 })

  // Fetch farm profile from FastAPI backend
  const fetchFarm = async () => {
    setLoading(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
      const res = await fetch(`${apiBase}/api/farms/default`)
      if (res.ok) {
        const data = await res.json()
        setFarmData(data)
        setUserLocation({
          name: `${data.taluka}, ${data.district}`,
          lat: data.latitude,
          lng: data.longitude,
        })
      }
    } catch (err) {
      console.warn("Backend not reachable, loading pilot fallback state")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarm()
  }, [])

  // Fallback defaults if backend is offline during frontend dev
  const activeFarm = farmData || {
    id: "farm-mh-001",
    name: "Sahyadri Krishi Farm",
    farmer_name: user?.name || "Ganesh Kadlag",
    phone: user?.mobile || "+91 98765 43210",
    state: "Maharashtra",
    district: "Pune",
    taluka: "Baramati",
    village: "Malegaon Khurd",
    latitude: 18.1512,
    longitude: 74.5824,
    total_area_acres: 4.5,
    budget: {
      total_budget_inr: 60000.0,
      spent_inr: 22000.0,
      remaining_inr: 38000.0,
    },
    water_assets: [
      { id: "wa-1", source_type: "farm_pond", current_storage_liters: 65000, max_capacity_liters: 100000 },
      { id: "wa-2", source_type: "borewell", current_storage_liters: 15000, max_capacity_liters: 20000 },
    ],
    plots: [
      {
        id: "plot-1",
        name: "North Plot - Kharif Cash Crop",
        area_acres: 2.5,
        current_crop: "Soybean",
        variety: "JS 335",
        sowing_date: "2026-06-25",
        growth_stage: "mid_season",
        irrigation_method: "drip",
        soil: { soil_type: "Medium Deep Black (Vertisol)", ph: 7.4, nitrogen: 195, phosphorus: 24, potassium: 280, is_measured: true },
      },
      {
        id: "plot-2",
        name: "South Valley Plot",
        area_acres: 2.0,
        current_crop: "Onion",
        variety: "Bhima Super",
        sowing_date: "2026-08-10",
        growth_stage: "development",
        irrigation_method: "sprinkler",
        soil: { soil_type: "Clay Loam", ph: 7.1, nitrogen: 170, phosphorus: 19.5, potassium: 210, is_measured: true },
      },
    ],
    last_updated: "2026-10-30 11:30:00",
  }

  const totalWaterStorage = activeFarm.water_assets.reduce(
    (acc: number, curr: any) => acc + (curr.current_storage_liters || 0),
    0
  )

  const handleSaveFarm = async () => {
    setIsEditing(false)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
      await fetch(`${apiBase}/api/farms/${activeFarm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeFarm),
      })
    } catch (e) {
      console.warn("Could not sync with backend directly")
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <Card className="p-8 mb-8 bg-card/80 backdrop-blur-sm border border-border shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {activeFarm.farmer_name ? activeFarm.farmer_name.charAt(0) : "G"}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl font-bold text-foreground">{activeFarm.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.twinSynchronized}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                {activeFarm.farmer_name} &bull; {activeFarm.village}, {activeFarm.taluka}, {activeFarm.district} ({activeFarm.state})
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                  {t.pilotBadge}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                  Last Twin Synced: {activeFarm.last_updated}
                </span>
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-center">
                <span className="text-xs text-muted-foreground block">{t.totalWater}</span>
                <span className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  {(totalWaterStorage / 1000).toFixed(0)}k L
                </span>
              </div>
              <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center">
                <span className="text-xs text-muted-foreground block">{t.remainingBudget}</span>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                  <Coins className="w-4 h-4" />
                  ₹{activeFarm.budget.remaining_inr.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabbed Profile Navigation */}
        <Tabs defaultValue="plots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/60 p-1.5 rounded-xl border border-border">
            <TabsTrigger value="plots" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {t.landInfo}
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              {t.waterAndBudget}
            </TabsTrigger>
            <TabsTrigger value="identity" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t.personalInfo}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t.settings}
            </TabsTrigger>
          </TabsList>

          {/* PLOT LEDGER TAB */}
          <TabsContent value="plots" className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Registered Field Plots ({activeFarm.plots.length})</h3>
                <p className="text-xs text-muted-foreground">Each plot maintains its own soil profile and crop-water balance in the digital twin.</p>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5">
                <PlusCircle className="w-4 h-4" />
                Add Plot
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeFarm.plots.map((plot: any, idx: number) => (
                <Card key={plot.id || idx} className="p-6 bg-card/90 border border-border/80 shadow-md hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Plot #{idx + 1} &bull; {plot.area_acres} Acres
                      </span>
                      <h4 className="text-base font-bold text-foreground mt-1">{plot.name}</h4>
                    </div>
                    <span className="text-xs uppercase font-bold tracking-wider px-2 py-1 rounded bg-muted text-muted-foreground">
                      {plot.irrigation_method}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/60 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground block">Crop & Variety</span>
                      <span className="font-semibold text-foreground">{plot.current_crop} ({plot.variety || "Std"})</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Growth Stage</span>
                      <span className="font-semibold text-primary capitalize">{plot.growth_stage.replace("_", " ")}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Sowing Date</span>
                      <span className="font-medium text-foreground">{plot.sowing_date}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Soil Classification</span>
                      <span className="font-medium text-foreground">{plot.soil?.soil_type || "Vertisol"}</span>
                    </div>
                  </div>

                  {/* Soil Health Values */}
                  <div className="mt-4 pt-2">
                    <span className="text-xs font-semibold text-muted-foreground block mb-2">Soil Test Profile (NPK & pH)</span>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground block">N</span>
                        <span className="font-bold text-foreground">{plot.soil?.nitrogen}</span>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground block">P</span>
                        <span className="font-bold text-foreground">{plot.soil?.phosphorus}</span>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground block">K</span>
                        <span className="font-bold text-foreground">{plot.soil?.potassium}</span>
                      </div>
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground block">pH</span>
                        <span className="font-bold text-primary">{plot.soil?.ph}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* WATER & BUDGET ASSETS TAB */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Water Storage Card */}
              <Card className="p-6 bg-card border border-border shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Water Asset Inventory</h4>
                    <p className="text-xs text-muted-foreground">Limits simulation scenario feasibility</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeFarm.water_assets.map((asset: any) => {
                    const pct = Math.min(100, Math.round((asset.current_storage_liters / asset.max_capacity_liters) * 100))
                    return (
                      <div key={asset.id} className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="font-semibold text-foreground capitalize">{asset.source_type.replace("_", " ")}</span>
                          <span className="text-xs font-bold text-primary">{asset.current_storage_liters.toLocaleString()} / {asset.max_capacity_liters.toLocaleString()} L</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-sky-500 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Financial Budget Card */}
              <Card className="p-6 bg-card border border-border shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Farm Working Budget</h4>
                    <p className="text-xs text-muted-foreground">Governs inputs, drip maintenance and labour</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t.totalBudget}</span>
                    <span className="text-base font-bold text-foreground">₹{activeFarm.budget.total_budget_inr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Utilized Expenditure</span>
                    <span className="text-base font-semibold text-rose-500">₹{activeFarm.budget.spent_inr.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-bold text-foreground">{t.remainingBudget}</span>
                    <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">₹{activeFarm.budget.remaining_inr.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* IDENTITY TAB */}
          <TabsContent value="identity">
            <Card className="p-8 bg-card border border-border shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.name}</label>
                  <Input value={activeFarm.farmer_name} disabled={!isEditing} className="bg-background/50 border-border" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.mobile}</label>
                  <Input value={activeFarm.phone} disabled={!isEditing} className="bg-background/50 border-border" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Taluka & District</label>
                  <Input value={`${activeFarm.taluka}, ${activeFarm.district}`} disabled className="bg-background/50 border-border" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.landArea}</label>
                  <Input value={`${activeFarm.total_area_acres} Acres`} disabled className="bg-background/50 border-border" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    {t.edit}
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveFarm} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      {t.save}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      {t.cancel}
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings">
            <Card className="p-8 bg-card border border-border shadow-md">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.language}</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { code: "en", label: t.english },
                      { code: "mr", label: t.marathi },
                      { code: "hi", label: t.hindi },
                      { code: "ur", label: t.urdu },
                    ].map((lang) => (
                      <Button
                        key={lang.code}
                        variant={language === lang.code ? "default" : "outline"}
                        onClick={() => setLanguage(lang.code as Language)}
                        className="w-full justify-start font-semibold"
                      >
                        {lang.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-foreground">{t.signOut}</h4>
                    <p className="text-xs text-muted-foreground">{t.endSession}</p>
                  </div>
                  <Button variant="destructive" onClick={onLogout} className="gap-2 font-semibold">
                    <LogOut className="w-4 h-4" />
                    {t.logout}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
