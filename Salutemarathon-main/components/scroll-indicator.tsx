"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const newProgress = (scrollTop / scrollHeight) * 100
      setProgress(newProgress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="scroll-indicator fixed top-0 left-0 w-full h-1 bg-primary-purple/20 z-[999]">
      <div
        className="scroll-progress h-full bg-primary-gradient transition-width duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
