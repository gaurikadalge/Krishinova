"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import SignUpForm from "./auth/sign-up-form"
import LoginForm from "./auth/login-form"

interface AuthPagesProps {
  onAuthSuccess: (userData: any) => void
  onBackToHome?: () => void
}

export default function AuthPages({ onAuthSuccess, onBackToHome }: AuthPagesProps) {
  const [isSignUp, setIsSignUp] = useState(false) // Default to Login for faster demo entry
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5F7F3]">
      {isSignUp ? (
        <SignUpForm
          language={language}
          onAuthSuccess={onAuthSuccess}
          onToggleMode={() => setIsSignUp(false)}
        />
      ) : (
        <LoginForm
          language={language}
          onAuthSuccess={onAuthSuccess}
          onToggleMode={() => setIsSignUp(true)}
          onBackToHome={onBackToHome}
        />
      )}
    </div>
  )
}
