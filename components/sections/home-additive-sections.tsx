"use client"

import React from "react"
import HowItWorks from "./how-it-works"
import FinalCTA from "./final-cta"

interface HomeClosingSectionsProps {
  language: "en" | "hi" | "ur" | "mr"
  className?: string
}

export function HomeClosingSections({ language, className = "" }: HomeClosingSectionsProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      <HowItWorks language={language} />
      <FinalCTA language={language} />
    </div>
  )
}

export default HomeClosingSections

