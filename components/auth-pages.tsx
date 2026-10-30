"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import SignUpForm from "./auth/sign-up-form"
import LoginForm from "./auth/login-form"

interface AuthPagesProps {
  onAuthSuccess: (userData: any) => void
}

export default function AuthPages({ onAuthSuccess }: AuthPagesProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {isSignUp ? (
        <SignUpForm language={language} onAuthSuccess={onAuthSuccess} onToggleMode={() => setIsSignUp(false)} />
      ) : (
        <LoginForm language={language} onAuthSuccess={onAuthSuccess} onToggleMode={() => setIsSignUp(true)} />
      )}
    </div>
  )
}
