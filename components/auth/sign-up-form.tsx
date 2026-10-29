"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, MapPin, Upload, Calendar } from "lucide-react"
import type { Language } from "../language-context"

interface SignUpFormProps {
  language: Language
  onAuthSuccess: (userData: any) => void
  onToggleMode: () => void
}

const translations = {
  en: {
    title: "Create Account",
    fullName: "Full Name",
    dob: "Date of Birth",
    mobile: "Mobile Number",
    profilePic: "Profile Picture",
    latitude: "Latitude",
    longitude: "Longitude",
    landArea: "Land Area (acres)",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    ph: "pH Level",
    signUp: "Sign Up",
    haveAccount: "Already have an account?",
    login: "Login",
    otpSent: "OTP sent to your mobile number",
    accountCreated: "Account Created Successfully!",
    selectLocation: "Select Location on Map",
    soilFactors: "Soil Nutrient Factors",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    selectGender: "Select Gender",
    invalidDOB: "You must be at least 18 years old",
    futureDate: "Date of birth cannot be in the future",
    choosePhoto: "Choose Photo",
    photoOnly: "Photos only (JPG, PNG)",
  },
  hi: {
    title: "खाता बनाएं",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि",
    mobile: "मोबाइल नंबर",
    profilePic: "प्रोफाइल चित्र",
    latitude: "अक्षांश (Latitude)",
    longitude: "देशांतर (Longitude)",
    landArea: "भूमि क्षेत्र (एकड़)",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फॉस्फोरस (P)",
    potassium: "पोटेशियम (K)",
    ph: "pH स्तर",
    signUp: "साइन अप करें",
    haveAccount: "पहले से खाता है?",
    login: "लॉगिन करें",
    otpSent: "आपके मोबाइल नंबर पर OTP भेजा गया",
    accountCreated: "खाता सफलतापूर्वक बनाया गया!",
    selectLocation: "नक्शे पर स्थान चुनें",
    soilFactors: "मिट्टी पोषक तत्व",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    selectGender: "लिंग चुनें",
    invalidDOB: "आपकी आयु कम से कम 18 वर्ष होनी चाहिए",
    futureDate: "जन्म तिथि भविष्य में नहीं हो सकती",
    choosePhoto: "फोटो चुनें",
    photoOnly: "केवल फोटो (JPG, PNG)",
  },
  ur: {
    title: "اکاؤنٹ بنائیں",
    fullName: "مکمل نام",
    dob: "پیدائش کی تاریخ",
    mobile: "موبائل نمبر",
    profilePic: "پروفائل تصویر",
    latitude: "عرض بلد (Latitude)",
    longitude: "طول بلد (Longitude)",
    landArea: "زمین کا رقبہ (ایکڑ)",
    nitrogen: "نائٹروجن (N)",
    phosphorus: "فاسفورس (P)",
    potassium: "پوٹاشیم (K)",
    ph: "pH سطح",
    signUp: "سائن اپ کریں",
    haveAccount: "پہلے سے اکاؤنٹ ہے؟",
    login: "لاگ ان کریں",
    otpSent: "آپ کے موبائل نمبر پر OTP بھیجا گیا",
    accountCreated: "اکاؤنٹ کامیابی سے بنایا گیا!",
    selectLocation: "نقشے پر مقام منتخب کریں",
    soilFactors: "مٹی کے غذائی اجزاء",
    gender: "صنف",
    male: "مرد",
    female: "عورت",
    other: "دوسرا",
    selectGender: "صنف منتخب کریں",
    invalidDOB: "آپ کی عمر کم از کم 18 سال ہونی چاہیے",
    futureDate: "پیدائش کی تاریخ مستقبل میں نہیں ہو سکتی",
    choosePhoto: "فوٹو منتخب کریں",
    photoOnly: "صرف فوٹو (JPG, PNG)",
  },
  mr: {
    title: "खाते तयार करा",
    fullName: "पूर्ण नाव",
    dob: "जन्मतारीख",
    mobile: "मोबाईल नंबर",
    profilePic: "प्रोफाइल चित्र",
    latitude: "अक्षांश (Latitude)",
    longitude: "रेखांश (Longitude)",
    landArea: "जमीन क्षेत्र (एकर)",
    nitrogen: "नायट्रोजन (N)",
    phosphorus: "फॉस्फरस (P)",
    potassium: "पोटॅशियम (K)",
    ph: "pH स्तर",
    signUp: "साइन अप करा",
    haveAccount: "आधीच खाते आहे?",
    login: "लॉगिन करा",
    otpSent: "आपल्या मोबाईल नंबरवर OTP पाठवला गेला",
    accountCreated: "खाते यशस्वीरित्या तयार झाले!",
    selectLocation: "नकाशावर स्थान निवडा",
    soilFactors: "मातीचे पोषक घटक",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "इतर",
    selectGender: "लिंग निवडा",
    invalidDOB: "आपली वय किमान 18 वर्षे असली पाहिजे",
    futureDate: "जन्मतारीख भविष्यात असू शकत नाही",
    choosePhoto: "फोटो निवडा",
    photoOnly: "फक्त फोटो (JPG, PNG)",
  },
}

export default function SignUpForm({ language, onAuthSuccess, onToggleMode }: SignUpFormProps) {
  const t = translations[language]
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    profilePic: null as File | null,
    profilePicPreview: null as string | null,
    latitude: "",
    longitude: "",
    landArea: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
  })
  const [showOtpStep, setShowOtpStep] = useState(false)
  const [otp, setOtp] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // ✅ DOB validation (must be 18+)
  const validateDOB = (dob: string): string | null => {
    if (!dob) return null
    const birthDate = new Date(dob)
    const today = new Date()

    if (birthDate > today) return t.futureDate

    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      if (age - 1 < 18) return t.invalidDOB
    } else {
      if (age < 18) return t.invalidDOB
    }
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "dob") {
      const error = validateDOB(value)
      setErrors((prev) => ({ ...prev, dob: error || "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profilePic: file,
            profilePicPreview: reader.result as string,
          }))
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dobError = validateDOB(formData.dob)
    if (dobError) {
      setErrors((prev) => ({ ...prev, dob: dobError }))
      return
    }
    if (!formData.gender) {
      setErrors((prev) => ({ ...prev, gender: t.selectGender }))
      return
    }
    setShowOtpStep(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleOtpVerify = () => {
    if (otp.length === 4) {
      setShowSuccess(true)
      setTimeout(() => {
        onAuthSuccess({
          ...formData,
          id: Date.now(),
          predictions: [],
          totalPredictions: 0,
        })
      }, 2000)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center animate-fade-in-up">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">{t.accountCreated}</h2>
          <p className="text-muted-foreground">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={formRef} className="min-h-screen flex items-center justify-center p-4 py-8 scroll-smooth">
      <Card className="w-full max-w-2xl shadow-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">{t.title}</h1>

          {!showOtpStep ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-dashed border-primary overflow-hidden">
                    {formData.profilePicPreview ? (
                      <img src={formData.profilePicPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all hover:scale-110">
                    <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="hidden" />
                    <Upload className="w-4 h-4" />
                  </label>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">{t.photoOnly}</p>

              {/* Name + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.fullName}</label>
                  <Input name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.gender}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">{t.selectGender}</option>
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="other">{t.other}</option>
                  </select>
                  {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
                </div>
              </div>

              {/* ✅ DOB + Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.dob}</label>
                  <div className="relative">
                    <Input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className={errors.dob ? "border-red-500" : ""}
                      // restrict DOB to at least 18 years old
                      max={new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                        .toISOString()
                        .split("T")[0]}
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.dob && <p className="text-xs text-red-600 mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.mobile}</label>
                  <Input name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+91 98765 43210" required />
                </div>
              </div>

              {/* Location (Lat/Lng) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline-block mr-1 text-primary" />
                    {t.latitude}
                  </label>
                  <Input name="latitude" type="number" step="0.000001" value={formData.latitude} onChange={handleInputChange} placeholder="e.g. 19.0760" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline-block mr-1 text-primary" />
                    {t.longitude}
                  </label>
                  <Input name="longitude" type="number" step="0.000001" value={formData.longitude} onChange={handleInputChange} placeholder="e.g. 72.8777" required />
                </div>
              </div>

              {/* Land Area + Soil Values */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.landArea}</label>
                <Input name="landArea" type="number" value={formData.landArea} onChange={handleInputChange} required />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-4">{t.soilFactors}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["nitrogen", "phosphorus", "potassium", "ph"].map((factor) => (
                    <div key={factor}>
                      <label className="block text-xs font-medium text-foreground mb-2">
                        {t[factor as keyof typeof t]}
                      </label>
                      <Input
                        name={factor}
                        type="number"
                        step={factor === "ph" ? "0.1" : "1"}
                        value={formData[factor as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        placeholder={factor === "ph" ? "0-14" : "0-100"}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                {t.signUp}
              </Button>

              <p className="text-center text-muted-foreground">
                {t.haveAccount}{" "}
                <button type="button" onClick={onToggleMode} className="text-primary font-semibold hover:underline">
                  {t.login}
                </button>
              </p>
            </form>
          ) : (
            // OTP Step
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">{t.otpSent}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">OTP (4 digits)</label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  placeholder="0000"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button onClick={handleOtpVerify} disabled={otp.length !== 4} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                Verify OTP
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
