"use client"

import { useEffect, useRef } from "react"

export function useParticles<T extends HTMLElement>(count = 50) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const particles: HTMLElement[] = []
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 20}s`
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`
      currentRef.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [count])

  return ref
}
