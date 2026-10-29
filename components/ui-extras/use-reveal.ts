"use client"

import { useEffect, useRef, useState } from "react"

export interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = options
  const ref = useRef<T | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) {
        setIsRevealed(true)
        return
      }
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsRevealed(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once])

  return { ref, isRevealed }
}

