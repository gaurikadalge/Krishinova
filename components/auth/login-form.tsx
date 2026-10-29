"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import type { Language } from "../language-context"

interface LoginFormProps {
  language: Language
  onAuthSuccess: (userData: any) => void
  onToggleMode: () => void
}

const translations = {
  en: {
    title: "Login to Krishinova",
    mobile: "Mobile Number",
    otp: "OTP",
    login: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    otpSent: "OTP sent to your mobile number",
  },
  hi: {
    title: "Krishinova में लॉगिन करें",
    mobile: "मोबाइल नंबर",
    otp: "OTP",
    login: "लॉगिन करें",
    noAccount: "खाता नहीं है?",
    signUp: "साइन अप करें",
    otpSent: "आपके मोबाइल नंबर पर OTP भेजा गया",
  },
  ur: {
    title: "Krishinova میں لاگ ان کریں",
    mobile: "موبائل نمبر",
    otp: "OTP",
    login: "لاگ ان کریں",
    noAccount: "اکاؤنٹ نہیں ہے؟",
    signUp: "سائن اپ کریں",
    otpSent: "آپ کے موبائل نمبر پر OTP بھیجا گیا",
  },
  mr: {
    title: "Krishinova मध्ये लॉगिन करा",
    mobile: "मोबाईल नंबर",
    otp: "OTP",
    login: "लॉगिन करा",
    noAccount: "खाते नाही?",
    signUp: "साइन अप करा",
    otpSent: "आपल्या मोबाईल नंबरवर OTP पाठवला गेला",
  },
}

export default function LoginForm({ language, onAuthSuccess, onToggleMode }: LoginFormProps) {
  const t = translations[language]
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpStep, setShowOtpStep] = useState(false)

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile) {
      setShowOtpStep(true)
    }
  }

  const handleOtpVerify = () => {
    if (otp.length === 4) {
      onAuthSuccess({
        id: Date.now(),
        mobile,
        fullName: "User",
        predictions: 0,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">{t.title}</h1>

          {!showOtpStep ? (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.mobile}</label>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                {t.login}
              </Button>

              <p className="text-center text-muted-foreground">
                {t.noAccount}{" "}
                <button type="button" onClick={onToggleMode} className="text-primary font-semibold hover:underline">
                  {t.signUp}
                </button>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">{t.otpSent}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.otp}</label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  placeholder="0000"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                onClick={handleOtpVerify}
                disabled={otp.length !== 4}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              >
                {t.login}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
