"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Map,
  Satellite,
  CloudSun,
  Newspaper,
  Cpu,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Search,
  Bell,
  MapPin,
  ChevronRight,
  Globe,
  Menu,
  X,
  LogOut,
  Home,

} from "lucide-react"
import type { Language } from "../language-context"
import { dictionary } from "../translations"

interface AppSidebarLayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  language: Language
  onLanguageChange: (lang: Language) => void
  user: any
  onLogout?: () => void
  onBackToHome?: () => void
  children: React.ReactNode
}

export default function AppSidebarLayout({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  user,
  onLogout,
  onBackToHome,
  children,
}: AppSidebarLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const d = dictionary[language] || dictionary.en

  const navItems = [
    { id: "dashboard", label: d.dashboard, icon: LayoutDashboard },
    { id: "my-farm", label: d.myFarm, icon: Map },
    { id: "satellite", label: d.satelliteInsights, icon: Satellite },
    { id: "weather", label: d.weatherClimate, icon: CloudSun },
    { id: "news", label: d.newsAlerts, icon: Newspaper },
    { id: "twin", label: d.digitalTwin, icon: Cpu },
    { id: "recommendations", label: d.recommendations, icon: Sparkles },
    { id: "market", label: d.marketInsights, icon: TrendingUp },
    { id: "assistant", label: d.aiAssistant, icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7F3] text-[#25352C] flex">
      {/* SIDEBAR (Botanical Forest Green: #073B2A) */}
      <aside className="hidden lg:flex w-64 bg-[#073B2A] text-white flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-40 shadow-xl">
        <div>
          {/* Brand Logo Header */}
          <div className="p-6 border-b border-[#10543C] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087A4B] flex items-center justify-center shadow-md">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-heading">
                {d.appName}
              </h1>
              <p className="text-[11px] text-[#DDF3E6] font-medium tracking-wide">
                {d.appTagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#DDF3E6] text-[#073B2A] shadow-md shadow-black/10"
                      : "text-[#DDF3E6]/85 hover:text-white hover:bg-[#10543C]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-[#073B2A]" : "text-[#16A36A]"}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Sustainable Farming Pill */}
        <div className="p-4 m-3.5 rounded-2xl bg-[#052C1F] border border-[#10543C] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🌱</span>
            <div className="text-[11px]">
              <p className="font-bold text-white">{d.sustainablePillTitle}</p>
              <p className="text-[#DDF3E6]/80">{d.sustainablePillSub}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#16A36A]" />
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-[#073B2A] text-white px-4 flex items-center justify-between z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🌿</span>
          <span className="font-bold text-lg text-white font-heading">{d.appName}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#DDF3E6] hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex">
          <div className="w-72 bg-[#073B2A] text-white h-full p-4 pt-20 space-y-1 shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    active ? "bg-[#DDF3E6] text-[#073B2A]" : "text-[#DDF3E6]/80 hover:bg-[#10543C]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* TOP TOPBAR */}
        <header className="h-20 bg-white/95 backdrop-blur-md border-b border-[#E5EBE5] px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          {/* Search Bar */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89958C]" />
            <input
              type="text"
              placeholder={d.searchPlaceholder}
              className="w-full bg-[#F5F7F3] border border-[#E5EBE5] rounded-full pl-10 pr-4 py-2 text-xs text-[#25352C] placeholder-[#89958C] focus:outline-none focus:border-[#087A4B] focus:bg-white transition-all"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3.5 ml-auto">
            {/* Location Pill */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7F3] border border-[#E5EBE5] text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#087A4B]" />
              <span className="font-bold text-[#25352C]">{d.pilotLocation}</span>
              <span className="text-[#68766C] text-[11px]">{d.pilotDistrict}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F7F3] border border-[#E5EBE5] text-xs">
              <Globe className="w-3.5 h-3.5 text-[#087A4B]" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs text-[#25352C] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ur">اردو (Urdu)</option>
              </select>
            </div>

            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-full bg-[#F5F7F3] border border-[#E5EBE5] flex items-center justify-center text-[#68766C] hover:text-[#073B2A] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D94B45] absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            {/* Public Site Button */}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                title="View Public Presentation Website"
                className="px-3 py-1.5 rounded-xl bg-[#F5F7F3] border border-[#E5EBE5] text-[#073B2A] hover:bg-[#DDF3E6] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#087A4B]" />
                <span className="hidden md:inline">Public Site</span>
              </button>
            )}

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Sign Out to Main Website"
                className="px-3 py-1.5 rounded-xl bg-[#FFF1F0] border border-[#D94B45]/20 text-[#D94B45] hover:bg-[#D94B45] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            )}

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#E5EBE5]">
              <div className="w-9 h-9 rounded-full bg-[#DDF3E6] text-[#073B2A] flex items-center justify-center font-bold text-xs shadow-sm border border-[#087A4B]/20">
                GK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#25352C]">{d.farmerName}</p>
                <p className="text-[10px] text-[#087A4B] font-semibold">{d.farmerRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main className="flex-1 p-6 sm:p-8 bg-[#F5F7F3]">
          {children}
        </main>
      </div>
    </div>
  )
}
