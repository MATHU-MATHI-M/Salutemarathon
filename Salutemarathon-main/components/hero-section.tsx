"use client"
import Link from "next/link"
import { Shield, UserRound, Ban, Info, MonitorIcon as Running, Clock } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"

export function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const countdown = useCountdown("August 9, 2025 05:00:00")

  const heroContentRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const heroBadgeRef = useAnimateOnScroll<HTMLDivElement>("bounce")
  const heroTitleRef = useAnimateOnScroll<HTMLHeadingElement>("title-appear")
  const heroSubtitleRef = useAnimateOnScroll<HTMLParagraphElement>("slide-in-left")
  const causeCard1Ref = useAnimateOnScroll<HTMLDivElement>("slide-in-up", { delay: 600 })
  const causeCard2Ref = useAnimateOnScroll<HTMLDivElement>("slide-in-up", { delay: 600 })
  const btnPrimaryRef = useAnimateOnScroll<HTMLAnchorElement>("slide-in-up", { delay: 1200 })
  const btnSecondaryRef = useAnimateOnScroll<HTMLAnchorElement>("slide-in-up", { delay: 1400 })

  const tiltRef1 = useTiltEffect<HTMLDivElement>()
  const tiltRef2 = useTiltEffect<HTMLDivElement>()

  return (
    <section
      id="home"
      className="hero min-h-screen bg-hero-gradient flex items-center justify-center relative overflow-hidden pt-[120px] pb-20"
    >
      <div className="hero-decoration absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.1)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] animate-[heroFloat_10s_ease-in-out_infinite]"></div>
      <div ref={heroContentRef} className="hero-content text-center z-20 max-w-[1200px] px-8 animate-fade-in-up">
        <h1
          ref={heroTitleRef}
          className="hero-title font-poppins text-6xl font-extrabold mb-6 leading-tight text-text-dark animate-title-appear"
        >
          <span className="title-gradient bg-primary-gradient bg-[length:200%_200%] bg-clip-text text-transparent animate-title-shimmer">
            SALUTE
          </span>
          {" MARATHON"}
        </h1>
        <p
          ref={heroSubtitleRef}
          className="hero-subtitle text-2xl text-text-gray mb-8 font-medium animate-slide-in-left"
        >
          Every Step Towards Safety - Building a Safer Tomorrow
        </p>
        <div
          ref={heroBadgeRef}
          className="hero-badge bg-background-white border-2 border-primary-purple rounded-[50px] px-8 py-3 mb-8 inline-block font-semibold text-primary-purple shadow-light transition-all duration-400 ease-DEFAULT animate-bounce hover:translate-y-[-3px] hover:shadow-glow hover:animate-none"
        >
          <Shield className="inline-block mr-2" />
          Women Safety & Drug Awareness Campaign
        </div><br></br>
        <div className="urgency-counter bg-urgency-gradient text-white px-8 py-4 rounded-[15px] mb-8 inline-block font-bold animate-shake">
          <Clock className="inline-block mr-2" />
          Limited Spots Available - Register Before They&apos;re Gone!
        </div>

        <div className="countdown-timer flex justify-center gap-4 mb-8 flex-wrap">
          <div className="countdown-item bg-background-white p-4 rounded-xl text-center min-w-[80px] shadow-light">
            <span id="days" className="countdown-number text-4xl font-extrabold text-primary-purple block">
              {countdown.days}
            </span>
            <div className="countdown-label text-xs text-text-gray uppercase tracking-wider">Days</div>
          </div>
          <div className="countdown-item bg-background-white p-4 rounded-xl text-center min-w-[80px] shadow-light">
            <span id="hours" className="countdown-number text-4xl font-extrabold text-primary-purple block">
              {countdown.hours}
            </span>
            <div className="countdown-label text-xs text-text-gray uppercase tracking-wider">Hours</div>
          </div>
          <div className="countdown-item bg-background-white p-4 rounded-xl text-center min-w-[80px] shadow-light">
            <span id="minutes" className="countdown-number text-4xl font-extrabold text-primary-purple block">
              {countdown.minutes}
            </span>
            <div className="countdown-label text-xs text-text-gray uppercase tracking-wider">Minutes</div>
          </div>
          <div className="countdown-item bg-background-white p-4 rounded-xl text-center min-w-[80px] shadow-light">
            <span id="seconds" className="countdown-number text-4xl font-extrabold text-primary-purple block">
              {countdown.seconds}
            </span>
            <div className="countdown-label text-xs text-text-gray uppercase tracking-wider">Seconds</div>
          </div>
        </div>

        <div className="hero-causes flex justify-center gap-8 mb-8 flex-wrap md:flex-nowrap">
          <div
            ref={tiltRef1}
            className="cause-card tilt-effect bg-background-white border-2 border-transparent rounded-[20px] p-6 text-center transition-all duration-400 ease-DEFAULT shadow-light cursor-pointer flex-1 min-w-[250px] max-w-[300px] animate-slide-in-up hover:translate-y-[-5px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple"
          >
            <div className="cause-icon text-4xl mb-4 text-primary-pink transition-all duration-400 ease-DEFAULT animate-rotate-in group-hover:scale-110 group-hover:rotate-10 group-hover:text-primary-purple">
              <UserRound className="mx-auto" />
            </div>
            <div className="cause-title font-poppins text-xl font-bold text-text-dark mb-2">Women Safety</div>
            <p className="cause-description text-sm text-text-gray leading-snug">
              Empowering women with awareness and safety initiatives
            </p>
          </div>
          <div
            ref={tiltRef2}
            className="cause-card tilt-effect bg-background-white border-2 border-transparent rounded-[20px] p-6 text-center transition-all duration-400 ease-DEFAULT shadow-light cursor-pointer flex-1 min-w-[250px] max-w-[300px] animate-slide-in-up hover:translate-y-[-5px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple"
          >
            <div className="cause-icon text-4xl mb-4 text-primary-pink transition-all duration-400 ease-DEFAULT animate-rotate-in group-hover:scale-110 group-hover:rotate-10 group-hover:text-primary-purple">
              <Ban className="mx-auto" />
            </div>
            <div className="cause-title font-poppins text-xl font-bold text-text-dark mb-2">Drug Awareness</div>
            <p className="cause-description text-sm text-text-gray leading-snug">
              Building a drug-free society through education and prevention
            </p>
          </div>
        </div>

        <div className="hero-buttons flex justify-center gap-6 flex-wrap mt-8">
          <button
            ref={btnPrimaryRef}
            onClick={onOpenModal}
            className="btn btn-primary relative overflow-hidden px-8 py-4 rounded-[50px] text-decoration-none font-bold transition-all duration-400 ease-DEFAULT border-none cursor-pointer inline-flex items-center gap-3 text-lg bg-primary-gradient text-text-light shadow-light animate-[slideInUp_1s_ease-out_1.2s_both,_pulse_2s_infinite_3s] hover:translate-y-[-3px] hover:scale-105 hover:shadow-heavy hover:animate-none before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
          >
            <Running />
            Join the Movement
          </button>
          <Link
            ref={btnSecondaryRef}
            href="#about"
            className="btn btn-secondary relative overflow-hidden px-8 py-4 rounded-[50px] text-decoration-none font-bold transition-all duration-400 ease-DEFAULT border-none cursor-pointer inline-flex items-center gap-3 text-lg bg-background-white text-primary-purple border-2 border-primary-purple animate-[slideInUp_1s_ease-out_1.4s_both] hover:bg-primary-purple hover:text-text-light hover:translate-y-[-3px] hover:scale-105 hover:shadow-heavy before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
          >
            <Info />
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
