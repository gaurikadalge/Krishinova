"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Tractor, MapPin, Clock, Phone, PlusCircle, Search, ShieldCheck, X, 
  MessageCircle, Minus, Plus, CheckCircle, Calendar, ChevronLeft, ChevronRight, 
  Filter, TrendingUp, TrendingDown, ArrowUpRight, Sparkles, Sprout, Store, 
  BarChart3, RefreshCw, AlertCircle, Coins, ShieldAlert, Award
} from "lucide-react"

interface MarketPageProps {
  language: "en" | "hi" | "ur" | "mr"
  user: any
}

const translations = {
  en: {
    title: "Community Market",
    subtitle: "Rent tractors, drones, and farming tools from farmers in your area",
    search: "Search equipment...",
    rentEquipment: "Rent Equipment",
    listEquipment: "List Your Equipment",
    pricePerHour: "₹/hour",
    pricePerDay: "₹/day",
    distance: "away",
    bookNow: "Contact Owner",
    verified: "Verified Owner",
    // Form
    addNew: "Add New Equipment",
    equipName: "Equipment Name",
    category: "Category",
    rate: "Rental Rate (₹)",
    rateType: "Rate Type",
    submitList: "List for Rent",
  },
  hi: {
    title: "सामुदायिक बाजार (Community Market)",
    subtitle: "अपने क्षेत्र के किसानों से ट्रैक्टर, ड्रोन और कृषि उपकरण किराए पर लें",
    search: "उपकरण खोजें...",
    rentEquipment: "उपकरण किराए पर लें",
    listEquipment: "अपना उपकरण सूचीबद्ध करें",
    pricePerHour: "₹/घंटा",
    pricePerDay: "₹/दिन",
    distance: "दूर",
    bookNow: "मालिक से संपर्क करें",
    verified: "सत्यापित मालिक",
    addNew: "नया उपकरण जोड़ें",
    equipName: "उपकरण का नाम",
    category: "श्रेणी",
    rate: "किराया दर (₹)",
    rateType: "दर का प्रकार",
    submitList: "किराए के लिए सूचीबद्ध करें",
  },
  mr: {
    title: "सामुदायिक बाजार (Community Market)",
    subtitle: "आपल्या परिसरातील शेतकऱ्यांकडून ट्रॅक्टर, ड्रोन आणि शेतीची अवजारे भाड्याने घ्या",
    search: "अवजारे शोधा...",
    rentEquipment: "अवजारे भाड्याने घ्या",
    listEquipment: "तुमची अवजारे नोंदवा",
    pricePerHour: "₹/तास",
    pricePerDay: "₹/दिवस",
    distance: "दूर",
    bookNow: "मालकाशी संपर्क साधा",
    verified: "सत्यापित मालक",
    addNew: "नवीन अवजार जोडा",
    equipName: "अवजाराचे नाव",
    category: "श्रेणी",
    rate: "भाडे दर (₹)",
    rateType: "दर प्रकार",
    submitList: "भाड्यासाठी नोंदवा",
  },
  ur: {
    title: "کمیونٹی مارکیٹ",
    subtitle: "اپنے علاقے کے کسانوں سے ٹریکٹر اور زراعت کے اوزار کرائے پر لیں",
    search: "تلاش کریں...",
    rentEquipment: "کرائے پر لیں",
    listEquipment: "اپنا اوزار درج کریں",
    pricePerHour: "₹/گھنٹہ",
    pricePerDay: "₹/دن",
    distance: "دور",
    bookNow: "مالک سے رابطہ کریں",
    verified: "تصدیق شدہ مالک",
    addNew: "نیا اوزار شامل کریں",
    equipName: "اوزار کا نام",
    category: "قسم",
    rate: "کرایہ کی شرح (₹)",
    rateType: "شرح کی قسم",
    submitList: "کرائے کے لیے درج کریں",
  }
}


export interface MandiRateItem {
  id: string
  cropName: string
  cropNameLocal: Record<string, string>
  variety: string
  category: "ongoing" | "oilseed" | "vegetable" | "cereal" | "fruit" | "cash"
  isCultivatedOnFarm: boolean
  plotAssociation?: string
  mandi: string
  mandiDistrict: string
  distanceKm: number
  modalPrice: number
  minPrice: number
  maxPrice: number
  unit: string
  dayChange: number
  percentChange: number
  arrivalsToday: number // in Quintals
  trend: "up" | "down" | "stable"
  marketCondition: string
  insight: string
  insightMr: string
  crossMandi: { name: string; price: number; diff: number }[]
}

export const liveMandiRates: MandiRateItem[] = [
  {
    id: "mandi-soybean",
    cropName: "Soybean",
    cropNameLocal: {
      en: "Soybean (Yellow)",
      hi: "सोयाबीन (पीला)",
      mr: "सोयाबीन (पिवळा - JS 335)",
      ur: "سویا بین"
    },
    variety: "JS 335",
    category: "ongoing",
    isCultivatedOnFarm: true,
    plotAssociation: "Plot 1: North Plot (2.5 Acres)",
    mandi: "Baramati APMC",
    mandiDistrict: "Pune",
    distanceKm: 8.5,
    modalPrice: 4850,
    minPrice: 4620,
    maxPrice: 5120,
    unit: "₹/Quintal",
    dayChange: 90,
    percentChange: 1.89,
    arrivalsToday: 1420,
    trend: "up",
    marketCondition: "High Domestic Crushing Demand",
    insight: "Solvent extraction plants in Daund and Baramati actively purchasing. Premium offered for moisture < 10%.",
    insightMr: "बारामती व दौंड भागातील तेलगिरण्यांकडून मजबूत मागणी. १०% पेक्षा कमी ओलावा असल्यास जास्तीचा दर.",
    crossMandi: [
      { name: "Pune Market Yard", price: 4920, diff: 70 },
      { name: "Solapur APMC", price: 4810, diff: -40 },
      { name: "Latur APMC", price: 5040, diff: 190 }
    ]
  },
  {
    id: "mandi-onion",
    cropName: "Onion",
    cropNameLocal: {
      en: "Red Onion",
      hi: "लाल प्याज",
      mr: "लाल कांदा (भीमा सुपर)",
      ur: "لال پیاز"
    },
    variety: "Bhima Super",
    category: "ongoing",
    isCultivatedOnFarm: true,
    plotAssociation: "Plot 2: South Valley Plot (2.0 Acres)",
    mandi: "Baramati APMC",
    mandiDistrict: "Pune",
    distanceKm: 8.5,
    modalPrice: 2450,
    minPrice: 1850,
    maxPrice: 2750,
    unit: "₹/Quintal",
    dayChange: 180,
    percentChange: 7.93,
    arrivalsToday: 3850,
    trend: "up",
    marketCondition: "Export Inquiries & Festive Demand",
    insight: "Bids moving upward following Lasalgaon trend. Medium-to-large sorted bulbs commanding upper ceiling.",
    insightMr: "लासलगाव बाजारातील दरवाढीमुळे बारामतीमध्येही सुधारणा. प्रतवारी केलेल्या चांगल्या कांद्याला उच्चांकी भाव.",
    crossMandi: [
      { name: "Lasalgaon (Nashik)", price: 2600, diff: 150 },
      { name: "Pune Market Yard", price: 2520, diff: 70 },
      { name: "Solapur APMC", price: 2380, diff: -70 }
    ]
  },
  {
    id: "mandi-wheat",
    cropName: "Wheat",
    cropNameLocal: {
      en: "Wheat (Lokwan)",
      hi: "गेहूं (लोकवन)",
      mr: "गहू (लोकवन / सरबती)",
      ur: "گندم"
    },
    variety: "Lokwan / Sharbati",
    category: "cereal",
    isCultivatedOnFarm: false,
    mandi: "Pune Market Yard",
    mandiDistrict: "Pune",
    distanceKm: 62.0,
    modalPrice: 2880,
    minPrice: 2650,
    maxPrice: 3150,
    unit: "₹/Quintal",
    dayChange: 30,
    percentChange: 1.05,
    arrivalsToday: 940,
    trend: "up",
    marketCondition: "Steady Flour Mill Consumption",
    insight: "Consistent flour mill and bakery off-take. Dry grain quality maintaining solid price floor.",
    insightMr: "पीठ गिरण्यांकडून सतत उचल. कोरड्या व चांगल्या दाण्यांच्या मालाला स्थिर आधारभाव.",
    crossMandi: [
      { name: "Baramati APMC", price: 2820, diff: -60 },
      { name: "Ahmednagar APMC", price: 2860, diff: -20 }
    ]
  },
  {
    id: "mandi-cotton",
    cropName: "Cotton",
    cropNameLocal: {
      en: "Cotton (Medium Staple)",
      hi: "कपास (मध्यम रेशा)",
      mr: "कापूस (मध्यम धागा)",
      ur: "کپاس"
    },
    variety: "Medium Staple",
    category: "cash",
    isCultivatedOnFarm: false,
    mandi: "Solapur APMC",
    mandiDistrict: "Solapur",
    distanceKm: 110.0,
    modalPrice: 7150,
    minPrice: 6800,
    maxPrice: 7450,
    unit: "₹/Quintal",
    dayChange: -50,
    percentChange: -0.69,
    arrivalsToday: 620,
    trend: "down",
    marketCondition: "Textile Mill Cautious Buying",
    insight: "International fiber futures soft. Ginning units waiting for moisture stabilization.",
    insightMr: "आंतरराष्ट्रीय बाजारातील मंदीमुळे जिनिंग कारखान्यांकडून मर्यादित खरेदी.",
    crossMandi: [
      { name: "Jalna APMC", price: 7280, diff: 130 },
      { name: "Baramati APMC", price: 7100, diff: -50 }
    ]
  },
  {
    id: "mandi-sugarcane",
    cropName: "Sugarcane",
    cropNameLocal: {
      en: "Sugarcane (Co 86032)",
      hi: "गन्ना (Co 86032)",
      mr: "ऊस (को ८६०३२ - एफआरपी दर)",
      ur: "گنا"
    },
    variety: "Co 86032",
    category: "cash",
    isCultivatedOnFarm: false,
    mandi: "Malegaon SSK (Baramati)",
    mandiDistrict: "Pune",
    distanceKm: 4.2,
    modalPrice: 3150,
    minPrice: 3150,
    maxPrice: 3250,
    unit: "₹/Tonne",
    dayChange: 0,
    percentChange: 0.0,
    arrivalsToday: 12400,
    trend: "stable",
    marketCondition: "Peak Crushing Season (Cooperative Mill)",
    insight: "Statutory Fair & Remunerative Price (FRP) with early-delivery premium active at local sugar mills.",
    insightMr: "बारामती परिसरातील साखर कारखान्यांचा गळीत हंगाम सुरू. थेट तोडणी व वाहतूक करार उपलब्ध.",
    crossMandi: [
      { name: "Someshwar SSK", price: 3180, diff: 30 },
      { name: "Chhatrapati SSK", price: 3150, diff: 0 }
    ]
  },
  {
    id: "mandi-grapes",
    cropName: "Grapes",
    cropNameLocal: {
      en: "Export Grapes (Thompson)",
      hi: "अंगूर (थॉम्पसन सीडलेस)",
      mr: "द्राक्ष (थॉमसन सीडलेस)",
      ur: "انگور"
    },
    variety: "Thompson Seedless",
    category: "fruit",
    isCultivatedOnFarm: false,
    mandi: "Sangli / Tasgaon APMC",
    mandiDistrict: "Sangli",
    distanceKm: 135.0,
    modalPrice: 6800,
    minPrice: 5500,
    maxPrice: 7500,
    unit: "₹/Quintal",
    dayChange: 250,
    percentChange: 3.82,
    arrivalsToday: 880,
    trend: "up",
    marketCondition: "Strong Gulf & Domestic Metro Demand",
    insight: "High brix sweetness index fetching 15% premium. Cold-chain aggregation centers operating full capacity.",
    insightMr: "खाडी देशांतील निर्यातीसाठी उत्तम मागणी. योग्य गोडी व आकाराच्या घडांना वाढीव दर.",
    crossMandi: [
      { name: "Nashik APMC", price: 6650, diff: -150 },
      { name: "Pune APMC", price: 6900, diff: 100 }
    ]
  },
  {
    id: "mandi-pomegranate",
    cropName: "Pomegranate",
    cropNameLocal: {
      en: "Pomegranate (Bhagwa)",
      hi: "अनार (भगवा ए-ग्रेड)",
      mr: "डाळिंब (भगवा ग्रेड-ए)",
      ur: "انار"
    },
    variety: "Bhagwa Grade-A",
    category: "fruit",
    isCultivatedOnFarm: false,
    mandi: "Solapur APMC",
    mandiDistrict: "Solapur",
    distanceKm: 110.0,
    modalPrice: 11200,
    minPrice: 9500,
    maxPrice: 13500,
    unit: "₹/Quintal",
    dayChange: 400,
    percentChange: 3.7,
    arrivalsToday: 410,
    trend: "up",
    marketCondition: "Tight Supply & Premium Export Orders",
    insight: "Solapur hub witnessing low arrivals of pristine Bhagwa. Grade-A fruit touching season high.",
    insightMr: "सोलापूर बाजारात दर्जेदार भगवा डाळिंबाची मर्यादित आवक. मोठ्या आकाराच्या डाळिंबाला उच्च दर.",
    crossMandi: [
      { name: "Baramati APMC", price: 10900, diff: -300 },
      { name: "Pune Market Yard", price: 11500, diff: 300 }
    ]
  },
  {
    id: "mandi-tomato",
    cropName: "Tomato",
    cropNameLocal: {
      en: "Tomato (Hybrid)",
      hi: "टमाटर (हाइब्रिड)",
      mr: "टोमॅटो (हायब्रिड अभिनव)",
      ur: "ٹماٹر"
    },
    variety: "Abhinav Hybrid",
    category: "vegetable",
    isCultivatedOnFarm: false,
    mandi: "Narayangaon APMC",
    mandiDistrict: "Pune",
    distanceKm: 120.0,
    modalPrice: 1650,
    minPrice: 1200,
    maxPrice: 2100,
    unit: "₹/Quintal",
    dayChange: -120,
    percentChange: -6.78,
    arrivalsToday: 5200,
    trend: "down",
    marketCondition: "Heavy Flush Arrivals",
    insight: "Bumper harvest influx from Junnar and Otur. Holding or direct-to-processing unit supply recommended.",
    insightMr: "जुन्नर व ओतूर भागातून मोठी आवक सुरू असल्याने तात्पुरती घसरण. प्रक्रिया उद्योगांना पुरवठा फायदेशीर.",
    crossMandi: [
      { name: "Pune Market Yard", price: 1750, diff: 100 },
      { name: "Baramati APMC", price: 1600, diff: -50 }
    ]
  },
  {
    id: "mandi-chana",
    cropName: "Bengal Gram (Chana)",
    cropNameLocal: {
      en: "Gram / Chana (Vijay)",
      hi: "चना / दाल (विजय)",
      mr: "हरभरा / चना (विजय जात)",
      ur: "چنا"
    },
    variety: "Vijay",
    category: "oilseed",
    isCultivatedOnFarm: false,
    mandi: "Latur APMC",
    mandiDistrict: "Latur",
    distanceKm: 180.0,
    modalPrice: 5950,
    minPrice: 5600,
    maxPrice: 6200,
    unit: "₹/Quintal",
    dayChange: 75,
    percentChange: 1.28,
    arrivalsToday: 1180,
    trend: "up",
    marketCondition: "Procurement Bids Above MSP",
    insight: "Government MSP buffer procurement and festive pulse consumption driving steady market strength.",
    insightMr: "शासकीय हमीभावापेक्षा जास्त दराने खरेदी सुरू. डाळ गिरण्यांकडून जोरदार मागणी.",
    crossMandi: [
      { name: "Baramati APMC", price: 5880, diff: -70 },
      { name: "Solapur APMC", price: 5920, diff: -30 }
    ]
  }
]

const mockEquipment = [
  {
    id: 1,
    name: "Mahindra 575 DI Tractor",
    category: "Tractor",
    owner: "Ramesh Patil",
    distance: "2.5 km",
    rate: 500,
    rateType: "hour",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600",
    verified: true,
    phone: "+91 98765 43210",
    bookedDates: []
  },
  {
    id: 2,
    name: "Agriculture Spray Drone (10L)",
    category: "Drone",
    owner: "Suresh Kumar",
    distance: "5.1 km",
    rate: 1200,
    rateType: "hour",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600",
    verified: true,
    phone: "+91 91234 56789",
    bookedDates: ["2026-08-25", "2026-08-26"]
  },
  {
    id: 3,
    name: "Rotavator (7 feet)",
    category: "Implement",
    owner: "Ganesh Jadhav",
    distance: "1.2 km",
    rate: 300,
    rateType: "hour",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=600",
    verified: false,
    phone: "+91 99887 76655",
    bookedDates: ["2026-08-24", "2026-08-25", "2026-08-26"]
  },
  {
    id: 4,
    name: "Diesel Water Pump (5 HP)",
    category: "Irrigation",
    owner: "Vijay Singh",
    distance: "3.8 km",
    rate: 400,
    rateType: "day",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600",
    verified: true,
    phone: "+91 98765 11223",
    bookedDates: []
  },
  {
    id: 5,
    name: "My Heavy Duty Tractor",
    category: "Tractor",
    owner: "You",
    distance: "0 km",
    rate: 800,
    rateType: "day",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600",
    verified: true,
    phone: "+91 99999 00000",
    bookedDates: ["2026-08-26"],
    bookings: [
      {
        customerName: "Raju Farmer",
        customerPhone: "+91 88888 77777",
        date: "2026-08-26",
        duration: 2,
        paymentMethod: "Cash",
        totalAmount: 1600
      }
    ]
  }
]

function EquipmentCalendar({ bookedDates, selectedDate, onSelect }: { bookedDates: string[], selectedDate: string, onSelect: (date: string) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  
  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} type="button" className="p-1 hover:bg-muted rounded-full">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-sm">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </span>
        <button onClick={nextMonth} type="button" className="p-1 hover:bg-muted rounded-full">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-2">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {blanks.map(b => <div key={`blank-${b}`} />)}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isBooked = bookedDates.includes(dateStr)
          const isSelected = selectedDate === dateStr
          const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0))
          const disabled = isBooked || isPast
          
          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                isSelected ? 'bg-primary text-white font-bold' : 
                isBooked ? 'bg-red-100 text-red-400 line-through cursor-not-allowed' :
                isPast ? 'text-muted-foreground opacity-50 cursor-not-allowed' :
                'hover:bg-primary/20 text-foreground cursor-pointer'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function MarketPage({ language, user }: MarketPageProps) {
  const t = translations[language] || translations.en
  const [equipment, setEquipment] = useState(mockEquipment)
  const [activeTab, setActiveTab] = useState<"mandi" | "rent" | "my_listings">("mandi")
  const [mandiFilter, setMandiFilter] = useState<string>("all")
  const [mandiSearch, setMandiSearch] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null)
  const [modalType, setModalType] = useState<"contact" | "booking" | null>(null)
  const [rentDuration, setRentDuration] = useState<number>(1)
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "success">("details")
  const [bookingDate, setBookingDate] = useState("")
  const [globalSearchDate, setGlobalSearchDate] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Tractor",
    rateType: "hour",
    rate: "",
    condition: "Good",
    deposit: "",
    description: "",
  })
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const urls = files.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...urls].slice(0, 5)) // Max 5 images
    }
  }
  
  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.rate) return

    const fallbackImage = "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600"
    
    const newItem = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      owner: user?.fullName || user?.name || "You",
      distance: (user?.latitude && user?.longitude) ? `Lat: ${user.latitude}, Lng: ${user.longitude}` : "0.0 km",
      rate: Number(formData.rate),
      rateType: formData.rateType,
      image: imagePreviews.length > 0 ? imagePreviews[0] : fallbackImage,
      images: imagePreviews.length > 0 ? imagePreviews : [fallbackImage],
      verified: true,
      phone: user?.mobile || "+91 99999 00000",
      bookedDates: [],
      bookings: [],
      condition: formData.condition,
      deposit: formData.deposit,
      description: formData.description
    }

    setEquipment([newItem, ...equipment])
    setShowAddForm(false)
    setFormData({ name: "", category: "Tractor", rateType: "hour", rate: "", condition: "Good", deposit: "", description: "" })
    setImagePreviews([])
  }

  const [filterCategory, setFilterCategory] = useState("All")
  const [filterMaxPrice, setFilterMaxPrice] = useState("")
  const [filterMaxDistance, setFilterMaxDistance] = useState("All")
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false)

  const filteredEquipment = equipment.filter(eq => {
    // 1. Search Query
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          eq.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    // 2. Category
    const matchesCategory = filterCategory === "All" || eq.category.toLowerCase() === filterCategory.toLowerCase()
    
    // 3. Price
    const matchesPrice = !filterMaxPrice || eq.rate <= Number(filterMaxPrice)
    
    // 4. Distance
    let matchesDistance = true
    if (filterMaxDistance !== "All") {
      const distNum = parseFloat(eq.distance)
      if (!isNaN(distNum)) {
        matchesDistance = distNum <= Number(filterMaxDistance)
      }
    }
    
    // 5. Verified
    const matchesVerified = !filterVerifiedOnly || eq.verified

    return matchesSearch && matchesCategory && matchesPrice && matchesDistance && matchesVerified
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background pt-8 pb-20">
      
      {/* Hero Banner */}
      <div className="relative bg-primary/90 text-white overflow-hidden shadow-xl mb-10 h-80 md:h-96 flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586771107445-d3af8e35ef00?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-fade-in-up">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <Tractor className="w-4 h-4" /> Sharing Economy
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">{t.subtitle}</p>
            
            {/* Airbnb Style Search Bar */}
            <div className="bg-white rounded-full p-2 flex items-center shadow-2xl text-foreground max-w-2xl">
              <div className="flex-1 px-6 py-2 border-r border-border hover:bg-muted/50 rounded-l-full cursor-text transition-colors">
                <label className="text-xs font-bold block mb-1">Equipment</label>
                <input 
                  type="text" 
                  placeholder="Tractor, Drone..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full outline-none text-sm bg-transparent" 
                />
              </div>
              <div className="flex-1 px-6 py-2 hover:bg-muted/50 cursor-text transition-colors relative">
                <label className="text-xs font-bold block mb-1">Date</label>
                <input 
                  type="date" 
                  value={globalSearchDate} 
                  onChange={(e) => setGlobalSearchDate(e.target.value)} 
                  className="w-full outline-none text-sm bg-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <button 
                onClick={() => setActiveTab("rent")}
                className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full transition-all shadow-md ml-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Toggle Tabs (Mandi + Rent + Listings) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white shadow-md p-1.5 rounded-full border border-border flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab("mandi")}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === "mandi" 
                  ? "bg-[#087A4B] text-white shadow-lg shadow-[#087A4B]/20" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === "mr" ? "थेट APMC बाजार भाव" : language === "hi" ? "लाइव मंडी भाव" : "Live Mandi Rates (Ongoing Yields)"}</span>
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "rent" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Tractor className="w-4 h-4" />
              <span>{t.rentEquipment}</span>
            </button>
            <button
              onClick={() => setActiveTab("my_listings")}
              className={`px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "my_listings" ? "bg-accent text-white shadow-lg" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span>My Listings</span>
            </button>
          </div>
        </div>

        {/* LIVE MANDI RATES FOR ONGOING YIELDS TAB */}
        {activeTab === "mandi" && (
          <div className="animate-fade-in-up space-y-8">
            {/* ONGOING FARM YIELDS CALLOUT (SOYBEAN & ONION) */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EAF6ED] via-[#F4FAF5] to-white border border-[#087A4B]/20 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#087A4B]/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#087A4B] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Sprout className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold text-[#073B2A] font-heading">
                        {language === "mr" ? "आपल्या शेतातील चालू पिकांचे बाजार भाव" : language === "hi" ? "आपके खेत की वर्तमान फसलों के लाइव भाव" : "Live Market Rates: Your Farm's Ongoing Yields"}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#087A4B] text-white">
                        Baramati Hub
                      </span>
                    </div>
                    <p className="text-xs text-[#25352C] mt-0.5">
                      {language === "mr" 
                        ? "प्लॉट १ (सोयाबीन) आणि प्लॉट २ (कांदा) साठी बारामती व लगतच्या बाजार समित्यांमधील थेट दर." 
                        : "Real-time APMC trade realization for Plot 1 (Soybean) and Plot 2 (Onion) with adjacent mandi spreads."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-white border border-[#E5EBE5] text-[#25352C] font-semibold flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#087A4B]" />
                    <span>Updated 28 mins ago</span>
                  </span>
                </div>
              </div>

              {/* Two Highlight Cards for Ongoing Crops */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {liveMandiRates.filter(r => r.isCultivatedOnFarm).map((crop) => (
                  <div
                    key={crop.id}
                    className="p-5 rounded-2xl bg-white border-2 border-[#087A4B]/30 shadow-md hover:shadow-lg transition-all space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DDF3E6] text-[#073B2A] border border-[#087A4B]/30 uppercase tracking-wide">
                            {crop.plotAssociation}
                          </span>
                          <span className="text-[11px] font-semibold text-[#68766C]">
                            Variety: <b className="text-[#25352C]">{crop.variety}</b>
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#25352C] mt-1.5 font-heading">
                          {crop.cropNameLocal[language] || crop.cropName}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          crop.dayChange >= 0 
                            ? "bg-[#DDF3E6] text-[#087A4B] border border-[#087A4B]/20" 
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}>
                          {crop.dayChange >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {crop.dayChange >= 0 ? `+₹${crop.dayChange}` : `-₹${Math.abs(crop.dayChange)}`} ({crop.percentChange}%)
                        </span>
                        <span className="block text-[10px] text-[#68766C] mt-0.5">vs yesterday</span>
                      </div>
                    </div>

                    {/* Price and Mandi Details */}
                    <div className="p-4 rounded-xl bg-[#F5F7F3] border border-[#E5EBE5] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#68766C] uppercase tracking-wider block">
                          Modal Price ({crop.mandi})
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-3xl font-extrabold text-[#087A4B] font-mono">
                            ₹{crop.modalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs font-semibold text-[#68766C]">/ {crop.unit.replace("₹/", "")}</span>
                        </div>
                      </div>

                      <div className="text-right text-xs space-y-1">
                        <div>
                          <span className="text-[#68766C]">Min - Max: </span>
                          <span className="font-bold text-[#25352C] font-mono">₹{crop.minPrice} - ₹{crop.maxPrice}</span>
                        </div>
                        <div>
                          <span className="text-[#68766C]">Daily Arrivals: </span>
                          <span className="font-bold text-[#073B2A]">{crop.arrivalsToday.toLocaleString()} Qtl</span>
                        </div>
                        <div className="text-[11px] text-[#68766C] flex items-center justify-end gap-1">
                          <MapPin className="w-3 h-3 text-[#087A4B]" />
                          <span>{crop.distanceKm} km from farm</span>
                        </div>
                      </div>
                    </div>

                    {/* Market Opportunity Insight */}
                    <div className="p-3 rounded-xl bg-[#FFF9E6] border border-[#E6A23C]/30 text-xs text-[#8A5A00] flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#E6A23C] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">
                          {language === "mr" ? "बाजार विश्लेषण व विक्री सल्ला:" : "Botanical Trade Opportunity:"}
                        </span>
                        <span className="text-[#664200]">
                          {language === "mr" ? crop.insightMr : crop.insight}
                        </span>
                      </div>
                    </div>

                    {/* Cross-Mandi Price Comparison Strip */}
                    <div className="border-t border-[#E5EBE5] pt-3">
                      <span className="text-[11px] font-bold text-[#68766C] uppercase tracking-wider block mb-2">
                        Neighboring Mandi Comparison
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {crop.crossMandi.map((cm, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-white border border-[#E5EBE5]">
                            <span className="text-[10px] text-[#68766C] block truncate">{cm.name}</span>
                            <span className="font-bold text-[#25352C] font-mono text-xs block mt-0.5">₹{cm.price}</span>
                            <span className={`text-[10px] font-bold ${cm.diff >= 0 ? "text-[#087A4B]" : "text-red-500"}`}>
                              {cm.diff >= 0 ? `+₹${cm.diff}` : `-₹${Math.abs(cm.diff)}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ALL MAHARASHTRA APMC MANDIS DIRECTORY */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#25352C] font-heading">
                    {language === "mr" ? "सर्व कृषी उत्पन्न बाजार समित्या (APMC)" : language === "hi" ? "सभी कृषि मंडी भाव (APMC)" : "Regional APMC Mandi Rate Directory"}
                  </h3>
                  <p className="text-xs text-[#68766C] mt-0.5">
                    Live daily prices for pulses, cash crops, cereals and vegetables across western Maharashtra.
                  </p>
                </div>

                {/* Search Bar for Mandis */}
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-[#E5EBE5] shadow-xs max-w-sm w-full">
                  <Search className="w-4 h-4 text-[#68766C]" />
                  <input
                    type="text"
                    placeholder="Search crop or mandi..."
                    value={mandiSearch}
                    onChange={(e) => setMandiSearch(e.target.value)}
                    className="w-full text-xs outline-none bg-transparent text-[#25352C]"
                  />
                  {mandiSearch && (
                    <button onClick={() => setMandiSearch("")} className="text-[#68766C] hover:text-[#25352C]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: "all", label: "All Crops" },
                  { id: "ongoing", label: "My Farm Yields (Soybean & Onion)" },
                  { id: "oilseed", label: "Oilseeds & Pulses" },
                  { id: "vegetable", label: "Vegetables" },
                  { id: "fruit", label: "Fruits" },
                  { id: "cereal", label: "Cereals" },
                  { id: "cash", label: "Cash Crops" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setMandiFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      mandiFilter === f.id
                        ? "bg-[#087A4B] text-white shadow-sm"
                        : "bg-white text-[#68766C] border border-[#E5EBE5] hover:bg-[#F5F7F3]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Mandi Rates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {liveMandiRates
                  .filter((crop) => {
                    const matchesCategory =
                      mandiFilter === "all" ||
                      (mandiFilter === "ongoing" && crop.isCultivatedOnFarm) ||
                      crop.category === mandiFilter
                    const matchesSearch =
                      !mandiSearch ||
                      crop.cropName.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                      crop.mandi.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                      crop.variety.toLowerCase().includes(mandiSearch.toLowerCase())
                    return matchesCategory && matchesSearch
                  })
                  .map((crop) => (
                    <div
                      key={crop.id}
                      className={`p-5 rounded-3xl bg-white border transition-all hover:shadow-lg flex flex-col justify-between ${
                        crop.isCultivatedOnFarm
                          ? "border-[#087A4B]/40 shadow-sm"
                          : "border-[#E5EBE5] shadow-xs"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            {crop.isCultivatedOnFarm ? (
                              <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-[#DDF3E6] text-[#073B2A] uppercase mb-1">
                                Cultivated on Farm
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#F5F7F3] text-[#68766C] uppercase mb-1">
                                {crop.category}
                              </span>
                            )}
                            <h4 className="text-base font-bold text-[#25352C]">
                              {crop.cropNameLocal[language] || crop.cropName}
                            </h4>
                            <span className="text-[11px] text-[#68766C]">
                              Variety: <b className="text-[#25352C]">{crop.variety}</b>
                            </span>
                          </div>

                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                            crop.dayChange >= 0
                              ? "bg-[#DDF3E6] text-[#087A4B]"
                              : "bg-red-50 text-red-600"
                          }`}>
                            {crop.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {crop.dayChange >= 0 ? `+₹${crop.dayChange}` : `-₹${Math.abs(crop.dayChange)}`}
                          </span>
                        </div>

                        {/* Modal Price Big Display */}
                        <div className="p-3 rounded-2xl bg-[#F5F7F3] border border-[#E5EBE5] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#68766C] uppercase font-bold block">
                              Modal Rate
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-2xl font-extrabold text-[#087A4B] font-mono">
                                ₹{crop.modalPrice.toLocaleString()}
                              </span>
                              <span className="text-[11px] text-[#68766C]">/ {crop.unit.replace("₹/", "")}</span>
                            </div>
                          </div>

                          <div className="text-right text-[11px] space-y-0.5">
                            <span className="block text-[#68766C]">Range</span>
                            <span className="font-bold text-[#25352C] font-mono">₹{crop.minPrice} - ₹{crop.maxPrice}</span>
                          </div>
                        </div>

                        {/* Mandi Location & Arrivals */}
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between items-center text-[#68766C]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#087A4B]" />
                              <b>{crop.mandi}</b>
                            </span>
                            <span>{crop.distanceKm} km away</span>
                          </div>

                          <div className="flex justify-between items-center text-[#68766C] pt-1">
                            <span>Today Arrivals:</span>
                            <span className="font-bold text-[#25352C]">{crop.arrivalsToday.toLocaleString()} {crop.unit.includes("Tonne") ? "Tonnes" : "Qtl"}</span>
                          </div>
                        </div>

                        {/* Market Sentiment */}
                        <p className="text-[11px] text-[#68766C] italic bg-white p-2 rounded-xl border border-[#E5EBE5]">
                          &ldquo;{language === "mr" ? crop.insightMr : crop.insight}&rdquo;
                        </p>
                      </div>

                      {/* Card Footer Action */}
                      <div className="pt-3 mt-3 border-t border-[#E5EBE5] flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#087A4B] uppercase tracking-wide">
                          {crop.marketCondition}
                        </span>
                        <button
                          onClick={() => setActiveTab("rent")}
                          className="text-xs text-[#087A4B] hover:text-[#06633D] font-bold flex items-center gap-1"
                        >
                          <span>Rent Tools</span> &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* CROSS-LINK TO EQUIPMENT MARKETPLACE BANNER */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#073B2A] to-[#0B5C38] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <Tractor className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold font-heading">
                    {language === "mr" ? "कापणीसाठी ट्रॅक्टर किंवा ड्रोन भाड्याने हवे आहे का?" : "Preparing for Soybean or Onion Harvest?"}
                  </h4>
                  <p className="text-xs text-white/80 mt-0.5">
                    Rent verified tractors, harvesters, rotavators, and spray drones from nearby progressive farmers.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("rent")}
                className="px-6 py-3 rounded-full bg-white hover:bg-white/90 text-[#073B2A] text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
              >
                Browse Equipment for Rent &rarr;
              </button>
            </div>
          </div>
        )}

        {/* RENT EQUIPMENT TAB */}
        {activeTab === "rent" && (
          <div className="animate-fade-in-up">
            
            {/* Advanced Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-border mb-8 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                <div className="flex items-center gap-2 text-muted-foreground mr-2">
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold text-sm">Filters:</span>
                </div>
                
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-muted/30 border border-border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                  <option value="All">All Categories</option>
                  <option value="Tractor">Tractors</option>
                  <option value="Harvester">Harvesters</option>
                  <option value="Drone">Drones</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Implement">Implements</option>
                </select>

                <select value={filterMaxDistance} onChange={(e) => setFilterMaxDistance(e.target.value)} className="bg-muted/30 border border-border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                  <option value="All">Any Distance</option>
                  <option value="5">Under 5 km</option>
                  <option value="10">Under 10 km</option>
                  <option value="20">Under 20 km</option>
                  <option value="50">Under 50 km</option>
                </select>

                <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary/50">
                  <span className="text-sm text-muted-foreground font-medium">Max ₹</span>
                  <input type="number" value={filterMaxPrice} onChange={(e) => setFilterMaxPrice(e.target.value)} placeholder="Any" className="bg-transparent w-16 text-sm outline-none font-bold text-primary" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-foreground hover:text-primary transition-colors bg-muted/20 px-4 py-2 rounded-full border border-border">
                <input type="checkbox" checked={filterVerifiedOnly} onChange={(e) => setFilterVerifiedOnly(e.target.checked)} className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Verified Only
              </label>
            </div>

            {filteredEquipment.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-border mt-6">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Equipment Found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query to find more items.</p>
                <Button 
                  onClick={() => {
                    setFilterCategory("All")
                    setFilterMaxDistance("All")
                    setFilterMaxPrice("")
                    setFilterVerifiedOnly(false)
                    setSearchQuery("")
                  }}
                  className="mt-6 rounded-full"
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEquipment.map((item, idx) => {
                  const isBooked = globalSearchDate ? item.bookedDates.includes(globalSearchDate) : false;
                  
                  return (
                  <Card 
                    key={item.id} 
                    onClick={() => {
                      setSelectedEquipment(item)
                      setModalType("booking")
                      setRentDuration(1)
                      setCheckoutStep("details")
                      setBookingDate(globalSearchDate || "")
                    }}
                    className="cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-0 bg-white shadow-md rounded-2xl flex flex-col" 
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {item.category}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm ${!isBooked ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                          {!isBooked ? "Available" : "Booked"}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                        
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{item.distance} {t.distance}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4 bg-muted/50 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary text-xs">{item.owner.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{item.owner}</p>
                            {item.verified && (
                              <div className="flex items-center gap-1 text-xs text-green-600">
                                <ShieldCheck className="w-3 h-3" /> {t.verified}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-foreground">₹{item.rate}</span>
                          <span className="text-sm text-muted-foreground">/{item.rateType === 'hour' ? t.pricePerHour.split('/')[1] : t.pricePerDay.split('/')[1]}</span>
                        </div>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEquipment(item)
                            setModalType("contact")
                          }}
                          className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all px-4"
                        >
                          {t.bookNow}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )})}
              </div>
            )}
          </div>
        )}

        {/* MY LISTINGS TAB */}
        {activeTab === "my_listings" && (
          <div className="animate-fade-in-up">
            {!showAddForm ? (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold font-heading text-foreground">My Dashboard</h2>
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="rounded-full bg-accent hover:bg-accent/90 text-white font-bold px-6 shadow-md"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" /> Add New Equipment
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {equipment.filter(eq => eq.owner === (user?.fullName || user?.name || "You")).length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-border">
                      <Tractor className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-bold text-foreground mb-2">No Equipment Listed</h3>
                      <p className="text-muted-foreground">List your unused equipment to start earning money.</p>
                    </div>
                  ) : (
                    equipment.filter(eq => eq.owner === (user?.fullName || user?.name || "You")).map(item => (
                      <Card key={item.id} className="overflow-hidden bg-white shadow-md border-0 rounded-2xl flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 md:h-auto relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold font-heading text-foreground">{item.name}</h3>
                              <p className="text-primary font-bold">₹{item.rate} / {item.rateType}</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                              {item.category}
                            </div>
                          </div>

                          <div className="bg-slate-50 dark:bg-muted/30 rounded-xl p-4 border border-border">
                            <h4 className="font-semibold text-sm mb-3">Booking History</h4>
                            {(!item.bookings || item.bookings.length === 0) ? (
                              <p className="text-sm text-muted-foreground">No bookings yet.</p>
                            ) : (
                              <div className="space-y-3">
                                {item.bookings.map((booking: any, idx: number) => (
                                  <div key={idx} className="flex justify-between items-center text-sm bg-white dark:bg-background p-3 rounded-lg border border-border shadow-sm">
                                    <div>
                                      <p className="font-bold text-foreground">{booking.customerName}</p>
                                      <p className="text-xs text-muted-foreground">{booking.date} • {booking.duration} {item.rateType}(s)</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-green-600">+₹{booking.totalAmount}</p>
                                      <p className="text-xs text-muted-foreground">{booking.paymentMethod}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto animate-slide-in-right">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAddForm(false)}
                  className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
                >
                  ← Back to Dashboard
                </Button>
                <Card className="p-8 shadow-xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                      <PlusCircle className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">{t.addNew}</h2>
                  </div>

                  <form onSubmit={handleListSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t.equipName}</label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Mahindra 575 DI Tractor" className="h-12 bg-white" required />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">{t.category}</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full h-12 px-3 border border-border rounded-md bg-white focus:ring-2 focus:ring-primary/50 outline-none">
                          <option value="Tractor">Tractor</option>
                          <option value="Harvester">Harvester</option>
                          <option value="Drone">Drone</option>
                          <option value="Irrigation">Irrigation</option>
                          <option value="Implements">Implements</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Condition</label>
                        <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full h-12 px-3 border border-border rounded-md bg-white focus:ring-2 focus:ring-primary/50 outline-none">
                          <option value="New">Like New</option>
                          <option value="Good">Good</option>
                          <option value="Fair">Fair</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">{t.rateType}</label>
                        <select name="rateType" value={formData.rateType} onChange={handleInputChange} className="w-full h-12 px-3 border border-border rounded-md bg-white focus:ring-2 focus:ring-primary/50 outline-none">
                          <option value="hour">Per Hour</option>
                          <option value="day">Per Day</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">{t.rate}</label>
                        <Input name="rate" type="number" value={formData.rate} onChange={handleInputChange} placeholder="e.g. 500" className="h-12 bg-white" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Security Deposit (₹)</label>
                      <Input name="deposit" type="number" value={formData.deposit} onChange={handleInputChange} placeholder="Optional deposit amount" className="h-12 bg-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Description / Terms</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange as any} 
                        placeholder="Any important details the renter should know..." 
                        className="w-full h-24 p-3 border border-border rounded-xl bg-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Upload Photos (Max 5)</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {imagePreviews.map((src, idx) => (
                          <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-border group shadow-sm">
                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {imagePreviews.length < 5 && (
                          <label className="border-2 border-dashed border-border rounded-xl h-24 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors">
                            <PlusCircle className="w-6 h-6 text-muted-foreground mb-2" />
                            <span className="text-xs text-muted-foreground font-medium">Add Photo</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                          </label>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 transition-all mt-6">
                      {t.submitList}
                    </Button>
                  </form>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden animate-scale-in max-h-[95vh] flex flex-col">
            <div className="relative h-56 flex-shrink-0 group">
              {selectedEquipment.images && selectedEquipment.images.length > 0 ? (
                <>
                  <img src={selectedEquipment.images[currentImageIndex]} alt={selectedEquipment.name} className="w-full h-full object-cover transition-all" />
                  
                  {selectedEquipment.images.length > 1 && (
                    <>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedEquipment.images.length - 1 : prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCurrentImageIndex(prev => prev === selectedEquipment.images.length - 1 ? 0 : prev + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
                        {selectedEquipment.images.map((_: any, i: number) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <img src={selectedEquipment.image} alt={selectedEquipment.name} className="w-full h-full object-cover" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              <button 
                onClick={() => {
                  setSelectedEquipment(null)
                  setCurrentImageIndex(0)
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{selectedEquipment.name}</h3>
                <p className="text-white/90 font-medium">₹{selectedEquipment.rate} / {selectedEquipment.rateType === 'hour' ? t.pricePerHour.split('/')[1] : t.pricePerDay.split('/')[1]}</p>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {modalType === "contact" && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary text-xl">{selectedEquipment.owner.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{selectedEquipment.owner}</p>
                      {selectedEquipment.verified && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <ShieldCheck className="w-4 h-4" /> {t.verified}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-lg font-semibold text-foreground tracking-wide">{selectedEquipment.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={`tel:${selectedEquipment.phone}`}
                      className="flex-1 flex justify-center items-center gap-2 h-12 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                    >
                      <Phone className="w-5 h-5" /> Call
                    </a>
                    <a 
                      href={`https://wa.me/${selectedEquipment.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-md shadow-green-500/20"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {modalType === "booking" && checkoutStep === "details" && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary text-xl">{selectedEquipment.owner.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{selectedEquipment.owner}</p>
                      {selectedEquipment.verified && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <ShieldCheck className="w-4 h-4" /> {t.verified}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Date Picker */}
                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                      <label className="text-sm font-semibold text-foreground mb-4 block">
                        Select Booking Date
                      </label>
                      <EquipmentCalendar 
                        bookedDates={selectedEquipment.bookedDates || []}
                        selectedDate={bookingDate}
                        onSelect={setBookingDate}
                      />
                    </div>

                    {/* Duration Counter */}
                    <div className="bg-muted/30 p-4 rounded-xl border border-border">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-foreground">
                          Duration ({selectedEquipment.rateType === 'hour' ? 'Hours' : 'Days'})
                        </span>
                        <div className="flex items-center gap-4 bg-white border border-border rounded-full px-2 py-1 shadow-sm">
                          <button 
                            onClick={() => setRentDuration(Math.max(1, rentDuration - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-4 text-center">{rentDuration}</span>
                          <button 
                            onClick={() => setRentDuration(rentDuration + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-border/50">
                        <span className="text-muted-foreground font-medium">Total Price</span>
                        <span className="text-2xl font-bold text-primary">₹{selectedEquipment.rate * rentDuration}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      if (!bookingDate) {
                        alert("Please select a booking date")
                        return
                      }
                      setCheckoutStep("payment")
                    }}
                    className="w-full h-14 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-all"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              )}

              {modalType === "booking" && checkoutStep === "payment" && (
                <div className="animate-slide-in-right">
                  <h3 className="text-xl font-bold text-foreground mb-4">Payment Summary</h3>
                  
                  <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Equipment</span>
                      <span className="font-medium text-foreground text-right">{selectedEquipment.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">{new Date(bookingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">{rentDuration} {selectedEquipment.rateType}(s)</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-3 border-t border-border/50">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{selectedEquipment.rate * rentDuration}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <label className="text-sm font-semibold text-foreground block">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="border-2 border-primary bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center gap-2">
                        <span className="font-bold text-primary">UPI</span>
                      </button>
                      <button className="border border-border bg-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                        <span className="font-semibold text-foreground">Cash</span>
                      </button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      // Mark as booked for the selected date and add booking details
                      setEquipment(prev => prev.map(eq => 
                        eq.id === selectedEquipment.id 
                          ? { 
                              ...eq, 
                              bookedDates: [...(eq.bookedDates || []), bookingDate],
                              bookings: [...(eq.bookings || []), {
                                customerName: user?.fullName || user?.name || "New Customer",
                                customerPhone: user?.mobile || "+91 88888 88888",
                                date: bookingDate,
                                duration: rentDuration,
                                paymentMethod: "Cash / UPI",
                                totalAmount: eq.rate * rentDuration
                              }]
                            } 
                          : eq
                      ))
                      setCheckoutStep("success")
                    }}
                    className="w-full h-14 rounded-full text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 transition-all"
                  >
                    Pay ₹{selectedEquipment.rate * rentDuration} securely
                  </Button>
                </div>
              )}

              {modalType === "booking" && checkoutStep === "success" && (
                <div className="animate-scale-in text-center py-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground mb-8">Your rental for {selectedEquipment.name} on {new Date(bookingDate).toLocaleDateString()} is confirmed.</p>
                  
                  <div className="flex gap-3">
                    <a 
                      href={`tel:${selectedEquipment.phone}`}
                      className="flex-1 flex justify-center items-center gap-2 h-12 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                    >
                      <Phone className="w-5 h-5" /> Call
                    </a>
                    <a 
                      href={`https://wa.me/${selectedEquipment.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedEquipment.owner)},%20I%20just%20booked%20your%20${encodeURIComponent(selectedEquipment.name)}%20for%20${rentDuration}%20${selectedEquipment.rateType}(s)%20on%20${bookingDate}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center gap-2 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-md shadow-green-500/20"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
