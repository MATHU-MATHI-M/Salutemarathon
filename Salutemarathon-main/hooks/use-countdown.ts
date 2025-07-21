"use client"

import { useState, useEffect } from "react"

interface Countdown {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export function useCountdown(eventDateString: string): Countdown {
  const eventDate = new Date(eventDateString).getTime()
  const [countdown, setCountdown] = useState<Countdown>({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance < 0) {
        clearInterval(interval)
        setCountdown({ days: "000", hours: "00", minutes: "00", seconds: "00" })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({
        days: days.toString().padStart(3, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  return countdown
}
