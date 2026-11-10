import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Instrument_Serif } from "next/font/google"
import "./globals.css"
import "leaflet/dist/leaflet.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading" 
})
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "KrishiNova — Autonomous Agro-Climatic Digital Twin & Botanical Intelligence",
  description: "Climate-resilient agricultural decision support platform integrating Sentinel-2 satellite telemetry, FAO-56 dual crop-water balance physics, and 22-language neural voice intelligence for smallholder farmers.",
  icons: {
    icon: "/placeholder-logo.svg",
  },
  openGraph: {
    title: "KrishiNova — Botanical Intelligence & Farm Digital Twin",
    description: "Understand the farm. Anticipate climate risk. Plan with the resources available.",
    url: "https://krishinova-sand.vercel.app",
    siteName: "KrishiNova",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${instrumentSerif.variable} font-sans antialiased text-foreground bg-background`}>{children}</body>
    </html>
  )
}
