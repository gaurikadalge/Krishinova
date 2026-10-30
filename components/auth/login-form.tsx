"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, Leaf, ArrowLeft, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react"
import type { Language } from "../language-context"

interface LoginFormProps {
  language: Language
  onAuthSuccess: (userData: any) => void
  onToggleMode: () => void
  onBackToHome?: () => void
}

const translations = {
  en: {
    title: "Farmer Portal Login",
    subtitle: "Sign in to access your digital twin, plot telemetry and real-time agromet advisories.",
    mobile: "Registered Mobile Number",
    otp: "Verification Code (OTP)",
    sendOtp: "Request OTP Code",
    verifyLogin: "Verify & Enter Workspace",
    noAccount: "New agricultural plot?",
    signUp: "Register Farm Account",
    otpSent: "Verification code dispatched to mobile. Enter any 4 digits to continue.",
    backToHome: "Return to Main Website",
    demoLogin: "Evaluation & Demo Access",
    demoSub: "Direct one-click authentication as pilot farmer Ganesh Kadlag (Baramati)",
    demoBtn: "Access Pilot Farm Workspace",
  },
  mr: {
    title: "शेतकरी पोर्टल लॉगिन",
    subtitle: "आपल्या डिजिटल ट्विन, शेत निरीक्षण आणि हवामान सल्ल्यांसाठी लॉगिन करा.",
    mobile: "नोंदणीकृत मोबाईल नंबर",
    otp: "पडताळणी कोड (OTP)",
    sendOtp: "ओटीपी मागवा",
    verifyLogin: "पडताळणी करा आणि प्रवेश करा",
    noAccount: "नवीन शेतकरी आहात?",
    signUp: "नवीन शेत नोंदणी करा",
    otpSent: "मोबाईलवर पडताळणी कोड पाठवला गेला आहे. पुढे जाण्यासाठी कोणतेही ४ अंक टाका.",
    backToHome: "मुख्य वेबसाइटवर परत जा",
    demoLogin: "मूल्यांकन आणि थेट डेमो प्रवेश",
    demoSub: "पायलट शेतकरी गणेश कडलग (बारामती फार्म) म्हणून १-क्लिक थेट लॉगिन",
    demoBtn: "पायलट फार्म डॅशबोर्ड उघडा",
  },
  hi: {
    title: "किसान पोर्टल लॉगिन",
    subtitle: "अपने डिजिटल ट्विन, खेत की स्थिति और रीयल-टाइम मौसम परामर्श हेतु लॉगिन करें।",
    mobile: "पंजीकृत मोबाइल नंबर",
    otp: "सत्यापन कोड (OTP)",
    sendOtp: "ओटीपी कोड प्राप्त करें",
    verifyLogin: "सत्यापित कर प्रवेश करें",
    noAccount: "नया खेत है?",
    signUp: "खेत खाता पंजीकृत करें",
    otpSent: "मोबाइल पर सत्यापन कोड भेजा गया है। आगे बढ़ने के लिए कोई भी 4 अंक दर्ज करें।",
    backToHome: "मुख्य वेबसाइट पर वापस जाएं",
    demoLogin: "मूल्यांकन एवं डेमो प्रवेश",
    demoSub: "पायलट किसान गणेश कडलग (बारामती फार्म) के रूप में त्वरित सीधा प्रवेश",
    demoBtn: "पायलट फार्म वर्कस्पेस खोलें",
  },
  ur: {
    title: "کسان پورٹل لاگ ان",
    subtitle: "اپنے ڈیجیٹل ٹوئن اور زرعی مشوروں تک رسائی کے لیے لاگ ان کریں۔",
    mobile: "رجسٹرڈ موبائل نمبر",
    otp: "تصدیقی کوڈ (OTP)",
    sendOtp: "OTP کوڈ حاصل کریں",
    verifyLogin: "تصدیق کریں اور داخل ہوں",
    noAccount: "نیا فارم رجسٹر کرنا ہے؟",
    signUp: "نیا اکاؤنٹ بنائیں",
    otpSent: "موبائل پر تصدیقی کوڈ بھیج دیا گیا ہے۔ جاری رکھنے کے لیے 4 ہندسے درج کریں۔",
    backToHome: "مرکزی ویب سائٹ پر جائیں",
    demoLogin: "ڈیمو اور معائنہ رسائی",
    demoSub: "پائلٹ کسان گنیش کڈلگ (بارامتی) کے طور پر براہ راست لاگ ان",
    demoBtn: "پائلٹ فارم ورک اسپیس کھولیں",
  },
}

export default function LoginForm({
  language,
  onAuthSuccess,
  onToggleMode,
  onBackToHome,
}: LoginFormProps) {
  const t = translations[language] || translations.en
  const [mobile, setMobile] = useState("+91 98220 12345")
  const [otp, setOtp] = useState("")
  const [showOtpStep, setShowOtpStep] = useState(false)

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.trim().length >= 10) {
      setShowOtpStep(true)
    }
  }

  const handleOtpVerify = () => {
    onAuthSuccess({
      id: "pilot-mh-001",
      mobile,
      fullName: "Ganesh Kadlag",
      role: "Progressive Farmer",
      location: "Malegaon Khurd, Baramati, Pune",
      totalArea: "5.2 Acres",
      crops: ["Soybean (JS 335)", "Onion (Bhima Super)"],
    })
  }

  const handleQuickDemo = () => {
    onAuthSuccess({
      id: "pilot-mh-001",
      mobile: "+91 98220 12345",
      fullName: "Ganesh Kadlag",
      role: "Progressive Farmer",
      location: "Malegaon Khurd, Baramati, Pune",
      totalArea: "5.2 Acres",
      crops: ["Soybean (JS 335)", "Onion (Bhima Super)"],
    })
  }

  return (
    <div className="min-h-screen bg-[#F5F7F3] flex flex-col justify-center items-center p-4">
      {/* Return to website link */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="mb-4 text-xs font-semibold text-[#087A4B] hover:text-[#073B2A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.backToHome}
        </button>
      )}

      <Card className="w-full max-w-md shadow-lg bg-white border border-[#E5EBE5] rounded-3xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#073B2A] text-white p-6 text-center relative">
          <div className="w-12 h-12 bg-[#087A4B] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight font-heading">{t.title}</h1>
          <p className="text-xs text-[#DDF3E6]/80 mt-1 max-w-xs mx-auto">{t.subtitle}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* PROFESSIONAL EVALUATION DEMO ACCESS */}
          <div className="p-4 bg-[#F5F7F3] border border-[#E5EBE5] rounded-2xl space-y-2 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[#073B2A]">
              <UserCheck className="w-4 h-4 text-[#087A4B]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.demoLogin}
              </span>
            </div>
            <p className="text-[11px] text-[#68766C] leading-snug">{t.demoSub}</p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full mt-2 py-2.5 px-4 bg-[#087A4B] hover:bg-[#06633D] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#DDF3E6]" />
              <span>{t.demoBtn}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E5EBE5] w-full" />
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#89958C] shrink-0">
              Standard Mobile Verification
            </span>
            <div className="border-t border-[#E5EBE5] w-full" />
          </div>

          {!showOtpStep ? (
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#25352C] mb-1.5">{t.mobile}</label>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="h-11 rounded-xl border-[#E5EBE5] text-xs font-medium focus:ring-[#087A4B]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#073B2A] hover:bg-[#10543C] text-white h-11 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                {t.sendOtp}
              </Button>

              <p className="text-center text-xs text-[#68766C]">
                {t.noAccount}{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-[#087A4B] font-bold hover:underline cursor-pointer"
                >
                  {t.signUp}
                </button>
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#EBF3FC] border border-[#2878D0]/20 rounded-xl p-3 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#2878D0] shrink-0 mt-0.5" />
                <p className="text-xs text-[#2878D0] font-medium">{t.otpSent}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352C] mb-1.5">{t.otp}</label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  placeholder="1234"
                  maxLength={4}
                  className="text-center text-xl tracking-widest font-mono h-12 rounded-xl border-[#E5EBE5]"
                />
              </div>

              <Button
                onClick={handleOtpVerify}
                className="w-full bg-[#087A4B] hover:bg-[#06633D] text-white h-11 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                {t.verifyLogin}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
