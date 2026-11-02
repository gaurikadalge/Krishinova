"use client"

import { useState } from "react"
import { Menu, X, Leaf, LogIn, Globe } from "lucide-react"
import type { Language } from "../language-context"

interface HeaderProps {
  language: Language
  onLanguageChange?: (lang: Language) => void
  currentPage: string
  onNavigate: (page: string) => void
  onLogin: () => void
  user: any
}

const translations = {
  en: {
    home: "Home",
    prediction: "Crop Prediction",
    weather: "Weather",
    satellite: "Satellite View",
    schemes: "Schemes & News",
    market: "Mandi Market",
    about: "About",
    contact: "Contact Us",
    farmerLogin: "Farmer Login",
    enterDashboard: "Enter Dashboard →",
  },
  hi: {
    home: "होम",
    prediction: "फसल भविष्यवाणी",
    weather: "मौसम",
    satellite: "उपग्रह निगरानी",
    schemes: "योजनाएं एवं समाचार",
    market: "मंडी बाजार",
    about: "परिचय",
    contact: "संपर्क करें",
    farmerLogin: "किसान लॉगिन",
    enterDashboard: "डैशबोर्ड खोलें →",
  },
  ur: {
    home: "ہوم",
    prediction: "فصل کی پیش گوئی",
    weather: "موسم",
    satellite: "سیٹلائٹ ویو",
    schemes: "اسکیمیں و خبریں",
    market: "منڈی مارکیٹ",
    about: "تعارف",
    contact: "رابطہ کریں",
    farmerLogin: "کسان لاگ ان",
    enterDashboard: "ڈیش بورڈ میں داخل ہوں →",
  },
  mr: {
    home: "होम",
    prediction: "पीक भविष्यवाणी",
    weather: "हवामान",
    satellite: "उपग्रह निरीक्षण",
    schemes: "योजना आणि बातम्या",
    market: "बाजारभाव (मंडी)",
    about: "माहिती",
    contact: "संपर्क",
    farmerLogin: "शेतकरी लॉगिन",
    enterDashboard: "डॅशबोर्ड उघडा →",
  },
}

export default function Header({
  language,
  onLanguageChange,
  currentPage,
  onNavigate,
  onLogin,
  user,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[language] || translations.en

  const navItems = [
    { id: "home", label: t.home },
    { id: "prediction", label: t.prediction },
    { id: "weather", label: t.weather },
    { id: "satellite", label: t.satellite },
    { id: "schemes", label: t.schemes },
    { id: "market", label: t.market },
    { id: "about", label: t.about },
    { id: "contact", label: t.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#073B2A] text-white border-b border-[#10543C] shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 bg-[#087A4B] rounded-xl flex items-center justify-center shadow-md group-hover:bg-[#16A36A] transition-all duration-300">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading text-2xl font-black text-white tracking-tight block">
                KrishiNova
              </span>
              <span className="text-[10px] text-[#DDF3E6] tracking-wider uppercase font-medium block -mt-1">
                Botanical Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  currentPage === item.id
                    ? "bg-[#DDF3E6] text-[#073B2A] font-bold shadow-sm"
                    : "text-[#DDF3E6]/90 hover:text-white hover:bg-[#10543C]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Language Selector & Login CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {onLanguageChange && (
              <div className="flex items-center gap-1.5 bg-[#052C1F] border border-[#10543C] px-2.5 py-1.5 rounded-xl text-xs">
                <Globe className="w-3.5 h-3.5 text-[#16A36A]" />
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="en" className="bg-[#073B2A] text-white">English</option>
                  <option value="mr" className="bg-[#073B2A] text-white">मराठी (Marathi)</option>
                  <option value="hi" className="bg-[#073B2A] text-white">हिंदी (Hindi)</option>
                  <option value="ur" className="bg-[#073B2A] text-white">اردو (Urdu)</option>
                </select>
              </div>
            )}

            <button
              onClick={onLogin}
              className="px-5 py-2.5 bg-[#087A4B] hover:bg-[#16A36A] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{user ? t.enterDashboard : t.farmerLogin}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onLogin}
              className="px-3 py-1.5 bg-[#087A4B] text-white text-xs font-bold rounded-lg shadow"
            >
              {user ? "Dashboard" : "Login"}
            </button>
            <button
              className="p-2 rounded-lg text-white hover:bg-[#10543C] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-6 pt-2 space-y-1.5 border-t border-[#10543C] animate-fade-in-up">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === item.id
                    ? "bg-[#DDF3E6] text-[#073B2A] font-bold"
                    : "text-[#DDF3E6]/90 hover:bg-[#10543C]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {onLanguageChange && (
              <div className="pt-2 flex items-center justify-between px-4 text-xs text-[#DDF3E6]">
                <span>Language / भाषा:</span>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="bg-[#052C1F] text-white p-1 rounded-lg border border-[#10543C]"
                >
                  <option value="en">English</option>
                  <option value="mr">मराठी</option>
                  <option value="hi">हिंदी</option>
                  <option value="ur">اردو</option>
                </select>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
