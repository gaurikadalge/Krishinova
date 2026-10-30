"use client"

import { useEffect, useState } from "react"
import {
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Landmark,
  ShieldCheck,
  Sprout,
  Tractor,
  LineChart,
  AlertTriangle,
  TrendingUp,
  Bug,
  ExternalLink,
  RefreshCw,
  Bell,
  Search,
} from "lucide-react"
import type { Language } from "../language-context"

interface SchemesPageProps {
  language: Language
}

interface AdvisoryItem {
  id: string
  title: string
  source: string
  date: string
  category: string
  crop: string
  relevance: string
  summary: string
  url: string
}

const pageI18n = {
  en: {
    title: "News, Advisories & Schemes",
    subtitle: "Real-time IMD Agromet warnings, Baramati APMC Mandi prices, and Government agricultural schemes.",
    liveBadge: "LIVE AGROMET & APMC FEED",
    refresh: "Refresh Feed",
    filterAll: "All Updates",
    filterClimate: "Climate & Advisories",
    filterMarket: "Mandi Market Rates",
    filterPest: "Pest & Crop Protection",
    filterSchemes: "Government Schemes",
    officialSource: "Source",
    applicableCrops: "Target Crops",
    viewAdvisory: "Open Official Portal",
    eligibility: "Eligibility Criteria",
    documents: "Required Documents",
    viewDetails: "View Scheme Details",
    searchPlaceholder: "Search advisories, mandi rates, schemes...",
  },
  mr: {
    title: "बातम्या, कृषी सल्ले आणि योजना",
    subtitle: "थेट आयएमडी हवामान चेतावणी, बारामती बाजार समितीचे ताजे बाजारभाव आणि सरकारी योजना.",
    liveBadge: "थेट कृषी व बाजार समिती अपडेट",
    refresh: "ताजेतवाने करा",
    filterAll: "सर्व अपडेट्स",
    filterClimate: "हवामान व सल्ले",
    filterMarket: "बाजारभाव (मंडी)",
    filterPest: "कीड व पीक संरक्षण",
    filterSchemes: "सरकारी योजना",
    officialSource: "स्रोत",
    applicableCrops: "संबंधित पिके",
    viewAdvisory: "अधिकृत पोर्टल उघडा",
    eligibility: "पात्रता अटी",
    documents: "आवश्यक कागदपत्रे",
    viewDetails: "योजनेचे तपशील पहा",
    searchPlaceholder: "सल्ले, बाजारभाव, योजना शोधा...",
  },
  hi: {
    title: "समाचार, कृषि परामर्श एवं सरकारी योजनाएं",
    subtitle: "मौसम विभाग की सटीक चेतावनियां, बारामती मंडी के ताजा भाव और सरकारी सहायता योजनाएं।",
    liveBadge: "लाइव कृषि परामर्श व मंडी अपडेट",
    refresh: "रिफ्रेश करें",
    filterAll: "सभी अपडेट",
    filterClimate: "मौसम व परामर्श",
    filterMarket: "मंडी भाव",
    filterPest: "कीट व फसल सुरक्षा",
    filterSchemes: "सरकारी योजनाएं",
    officialSource: "स्रोत",
    applicableCrops: "संबंधित फसलें",
    viewAdvisory: "आधिकारिक पोर्टल देखें",
    eligibility: "पात्रता मानदंड",
    documents: "आवश्यक दस्तावेज़",
    viewDetails: "योजना का विवरण देखें",
    searchPlaceholder: "परामर्श, मंडी भाव, योजना खोजें...",
  },
  ur: {
    title: "خبریں، زرعی مشورے اور سرکاری اسکیمیں",
    subtitle: "محکمہ موسمیات کے زرعی مشورے، بارامتی منڈی کے تازہ نرخ اور حکومتی مالیاتی اسکیمیں۔",
    liveBadge: "لائیو زرعی و منڈی فیڈ",
    refresh: "ریفریش کریں",
    filterAll: "تمام اطلاعات",
    filterClimate: "موسمی مشورے",
    filterMarket: "منڈی کے نرخ",
    filterPest: "حشرات اور فصلوں کا تحفظ",
    filterSchemes: "حکومتی اسکیمیں",
    officialSource: "ذریعہ",
    applicableCrops: "مطلوبہ فصلیں",
    viewAdvisory: "سرکاری پورٹل کھولیں",
    eligibility: "اہلیت کا معیار",
    documents: "مطلوبہ دستاویزات",
    viewDetails: "اسکیم کی تفصیل دیکھیں",
    searchPlaceholder: "مشورے، منڈی کے ریٹس یا اسکیم تلاش کریں...",
  },
}

const defaultAdvisories: AdvisoryItem[] = [
  {
    id: "alert-1",
    title: "IMD Agromet Advisory: Dry Spell Warning for Pune & Solapur",
    source: "India Meteorological Department (IMD)",
    date: "30 Oct 2026",
    category: "Climate Alert",
    crop: "Soybean, Cotton, Pulses",
    relevance: "High (Directly impacts Baramati pilot farm)",
    summary:
      "Dry weather likely to prevail over western Maharashtra for the next 7-10 days. Farmers are advised to provide light irrigation in the morning or evening hours and apply straw mulching to conserve root-zone soil moisture.",
    url: "https://mausam.imd.gov.in",
  },
  {
    id: "alert-2",
    title: "Baramati APMC: Soybean & Onion Mandi Price Surge",
    source: "Maharashtra State Agricultural Marketing Board (MSAMB)",
    date: "30 Oct 2026",
    category: "Market Intelligence",
    crop: "Soybean, Onion",
    relevance: "High",
    summary:
      "Modal price of Soybean touched ₹4,750/quintal at Baramati market yard, up 4.2% week-on-week due to steady crushing demand. Red onion modal prices stable at ₹2,100/quintal.",
    url: "https://www.msamb.com",
  },
  {
    id: "alert-3",
    title: "KVK Advisory: Fall Armyworm Surveillance on Late Kharif Crops",
    source: "Krishi Vigyan Kendra (KVK) Baramati",
    date: "30 Oct 2026",
    category: "Pest & Disease Advisory",
    crop: "Maize, Soybean",
    relevance: "Medium",
    summary:
      "Pheromone trap monitoring recommended (5 traps/acre). If egg masses are observed, spray Azadirachtin 1500 ppm @ 5ml/liter of water as biological control.",
    url: "https://kvkbaramati.com",
  },
  {
    id: "alert-4",
    title: "PM-Kisan 19th Installment Credited to Eligible Farmers",
    source: "Ministry of Agriculture & Farmers Welfare",
    date: "30 Oct 2026",
    category: "Government Schemes",
    crop: "All Crops",
    relevance: "High (Liquidity Support)",
    summary:
      "Direct benefit transfer of ₹2,000 released to registered Aadhaar-linked farmer bank accounts. Check PM-Kisan portal for e-KYC status.",
    url: "https://pmkisan.gov.in",
  },
]

const schemesList = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Government Schemes",
    benefit: "₹6,000 / year in 3 installments",
    icon: Landmark,
    description: "Income support of ₹6,000 per year provided to all eligible landholder farmer families across India directly into bank accounts.",
    eligibility: ["All landholding farmer families", "Cultivable land registered under applicant's name", "Active Aadhaar e-KYC"],
    documents: ["Aadhaar Card", "Bank Passbook", "7/12 Land Extract", "Mobile number linked with Aadhaar"],
    url: "https://pmkisan.gov.in",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card (KCC) Subsidized Loan",
    category: "Government Schemes",
    benefit: "Low-interest credit @ 4% per annum",
    icon: Tractor,
    description: "Provides timely institutional credit at concessional interest rates for seeds, fertilizers, pesticides, drip maintenance and harvesting needs.",
    eligibility: ["Individual owner cultivators", "Tenant farmers and sharecroppers", "SHG farmer groups"],
    documents: ["Aadhaar / PAN Card", "Land title 7/12 & 8A extract", "No-dues certificate from local banks"],
    url: "https://www.myscheme.gov.in/schemes/kcc",
  },
  {
    id: "pmfby",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "Government Schemes",
    benefit: "Comprehensive yield & weather insurance",
    icon: ShieldCheck,
    description: "Protection against non-preventable natural risks (dry spells, pest attacks, post-harvest losses) with premium capped at 2% for Kharif crops.",
    eligibility: ["All farmers growing notified crops in notified area", "Both loanee and non-loanee farmers"],
    documents: ["Aadhaar Card", "Bank Passbook", "Sowing Certificate / Crop Declaration", "Land records"],
    url: "https://pmfby.gov.in",
  },
  {
    id: "pkvy",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    category: "Government Schemes",
    benefit: "₹50,000 / hectare for organic inputs",
    icon: Sprout,
    description: "Financial and technical assistance for organic farming certification, bio-fertilizers, neem cake, and market linkage.",
    eligibility: ["Farmers forming organic clusters of 20+ hectares", "Willingness for PGS-India organic certification"],
    documents: ["Aadhaar Card", "Cluster membership form", "Land holding papers"],
    url: "https://daconline.gov.in",
  },
]

export default function SchemesPage({ language }: SchemesPageProps) {
  const t = pageI18n[language] || pageI18n.en
  const [advisories, setAdvisories] = useState<AdvisoryItem[]>(defaultAdvisories)
  const [loading, setLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState("")

  const fetchLiveAdvisories = async () => {
    setLoading(true)
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
    try {
      const res = await fetch(`${apiBase}/api/news/advisories`)
      if (!res.ok) throw new Error("Backend offline")
      const json = await res.json()
      if (Array.isArray(json) && json.length > 0) {
        setAdvisories(json)
      }
      setLastRefreshed(new Date().toLocaleTimeString())
    } catch (err) {
      console.warn("Using default advisories cache", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLiveAdvisories()
  }, [])

  // Filter items
  const filteredAdvisories = advisories.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false
    if (selectedFilter === "climate") return item.category.toLowerCase().includes("climate")
    if (selectedFilter === "market") return item.category.toLowerCase().includes("market")
    if (selectedFilter === "pest") return item.category.toLowerCase().includes("pest")
    return true
  })

  const filteredSchemes = schemesList.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false
    if (selectedFilter === "climate" || selectedFilter === "market" || selectedFilter === "pest") return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF3E6] text-[#073B2A] border border-[#16A36A]/20">
              <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse"></span>
              {t.liveBadge}
            </span>
            <span className="text-xs text-[#68766C]">
              IMD &bull; Baramati APMC &bull; KVK {lastRefreshed ? `(Synced ${lastRefreshed})` : ""}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25352C] tracking-tight font-heading">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#68766C] mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={fetchLiveAdvisories}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5EBE5] rounded-xl text-xs font-semibold text-[#073B2A] hover:bg-[#F5F7F3] shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#087A4B]" : ""}`} />
          {t.refresh}
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68766C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5EBE5] rounded-2xl text-xs text-[#25352C] placeholder-[#89958C] focus:outline-none focus:ring-2 focus:ring-[#087A4B] transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: t.filterAll },
            { id: "climate", label: t.filterClimate },
            { id: "market", label: t.filterMarket },
            { id: "pest", label: t.filterPest },
            { id: "schemes", label: t.filterSchemes },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedFilter(btn.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === btn.id
                  ? "bg-[#087A4B] text-white shadow-sm"
                  : "bg-white text-[#68766C] border border-[#E5EBE5] hover:bg-[#F5F7F3]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: LIVE AGROMET & MARKET ALERTS */}
      {selectedFilter !== "schemes" && filteredAdvisories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#087A4B]" />
            <h2 className="text-base font-bold text-[#25352C]">
              {language === "mr" ? "थेट कृषी व बाजार सल्ले" : language === "hi" ? "लाइव कृषि एवं बाजार परामर्श" : "Live Agro-Advisories & Market Signals"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdvisories.map((item) => {
              const isClimate = item.category.toLowerCase().includes("climate")
              const isMarket = item.category.toLowerCase().includes("market")
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white border border-[#E5EBE5] p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isClimate
                            ? "bg-[#FFF1F0] text-[#D94B45]"
                            : isMarket
                            ? "bg-[#DDF3E6] text-[#087A4B]"
                            : "bg-[#F5F7F3] text-[#7251A5]"
                        }`}>
                          {isClimate ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : isMarket ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <Bug className="w-4 h-4" />
                          )}
                        </span>
                        <div>
                          <span className="text-[10px] text-[#68766C] block">{item.source} &bull; {item.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            isClimate
                              ? "bg-[#FFF1F0] text-[#D94B45] border border-[#D94B45]/20"
                              : isMarket
                              ? "bg-[#DDF3E6] text-[#087A4B] border border-[#087A4B]/20"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#25352C] leading-snug">{item.title}</h3>
                    <p className="text-xs text-[#68766C] leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5EBE5] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#68766C]">
                      🌾 <strong className="text-[#25352C]">{item.crop}</strong>
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#087A4B] hover:underline flex items-center gap-1"
                    >
                      {t.viewAdvisory} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: GOVERNMENT AGRICULTURAL SCHEMES */}
      {(selectedFilter === "all" || selectedFilter === "schemes") && filteredSchemes.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#073B2A]" />
            <h2 className="text-base font-bold text-[#25352C]">
              {language === "mr" ? "सरकारी आर्थिक योजना व सबसिडी" : language === "hi" ? "सरकारी वित्तीय योजनाएं एवं अनुदान" : "Government Financial Schemes & Subsidies"}
            </h2>
          </div>

          <div className="space-y-3">
            {filteredSchemes.map((scheme) => {
              const isExpanded = expandedScheme === scheme.id
              const Icon = scheme.icon
              return (
                <div
                  key={scheme.id}
                  className="rounded-3xl bg-white border border-[#E5EBE5] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F7F3]/60 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#DDF3E6] border border-[#16A36A]/20 flex items-center justify-center shrink-0 text-[#073B2A]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-[#25352C]">{scheme.name}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF3FC] text-[#2878D0] font-bold border border-[#2878D0]/20">
                            {scheme.benefit}
                          </span>
                        </div>
                        <p className="text-xs text-[#68766C] mt-1 line-clamp-2">{scheme.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-semibold text-[#087A4B] flex items-center gap-1">
                        {isExpanded ? "Hide Details" : t.viewDetails}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  {/* EXPANDED CONTENT */}
                  {isExpanded && (
                    <div className="p-5 bg-[#F5F7F3] border-t border-[#E5EBE5] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in">
                      <div className="p-4 bg-white rounded-2xl border border-[#E5EBE5] space-y-2">
                        <h4 className="font-bold text-[#25352C] flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                          {t.eligibility}
                        </h4>
                        <ul className="space-y-1.5 text-[#68766C]">
                          {scheme.eligibility.map((el, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#16A36A] font-bold">•</span>
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-[#E5EBE5] space-y-2">
                        <h4 className="font-bold text-[#25352C] flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#2878D0]" />
                          {t.documents}
                        </h4>
                        <ul className="space-y-1.5 text-[#68766C]">
                          {scheme.documents.map((doc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#2878D0] font-bold">•</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 text-right">
                          <a
                            href={scheme.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#087A4B] hover:underline inline-flex items-center gap-1"
                          >
                            Apply on Official Portal <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
