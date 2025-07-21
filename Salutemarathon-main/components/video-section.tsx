"use client"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"

export function VideoSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const videoWrapperRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")

  return (
    <section id="video" className="video-section bg-background-light py-24 relative overflow-hidden">
      <div className="video-container max-w-[1200px] mx-auto px-8 text-center">
        <div className="section-header text-center mb-16">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block">WATCH OUR STORY</div>
          <h2 className="section-title font-poppins text-6xl font-extrabold text-text-dark mb-6 leading-tight">Experience the Mission</h2>
          <p className="section-subtitle text-2xl text-text-gray max-w-[700px] mx-auto leading-relaxed">See how we're making a difference through community action</p>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <iframe
            width="900"
            height="500"
            src="https://www.youtube.com/embed/Fh3Iz6Ruwo8"
            title="Salute Marathon 2025 - Promotional Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-3xl shadow-2xl bg-black"
            style={{ display: 'block' }}
          ></iframe>
        </div>
      </div>
    </section>
  )
}
