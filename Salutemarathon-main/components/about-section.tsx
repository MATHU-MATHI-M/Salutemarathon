"use client"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { Shield, Heart, Users } from "lucide-react"

export function AboutSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const aboutTextRef = useAnimateOnScroll<HTMLDivElement>("slide-in-left")
  const featuresGridRef = useAnimateOnScroll<HTMLDivElement>("slide-in-right")

  const statCard1Ref = useTiltEffect<HTMLDivElement>()
  const statCard2Ref = useTiltEffect<HTMLDivElement>()
  const statCard3Ref = useTiltEffect<HTMLDivElement>()

  const featureCard1Ref = useTiltEffect<HTMLDivElement>()
  const featureCard2Ref = useTiltEffect<HTMLDivElement>()
  const featureCard3Ref = useTiltEffect<HTMLDivElement>()

  return (
    <section id="about" className="about section bg-background-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Our Mission
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Beyond Running - A Movement for Change
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Addressing critical social issues through community action and athletic dedication
          </p>
        </div>
        <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={aboutTextRef} className="about-text animate-slide-in-left text-center lg:text-left">
            <h3 className="font-poppins text-4xl font-bold text-text-dark mb-8 leading-tight">
              Empowering Communities Through Action
            </h3>
            <p className="text-xl leading-relaxed text-text-gray mb-8">
              The Salute Marathon transcends traditional running events by championing two vital causes that affect
              millions of lives. We believe that through collective action, awareness, and community engagement, we can
              create lasting change in{" "}
              <span className="highlight-text bg-primary-gradient text-text-light px-2 py-1 rounded-md font-bold animate-glow">
                women&apos;s safety
              </span>{" "}
              and{" "}
              <span className="highlight-text bg-primary-gradient text-text-light px-2 py-1 rounded-md font-bold animate-glow">
                drug prevention
              </span>
              .
            </p>
            <p className="text-xl leading-relaxed text-text-gray mb-8">
              Every participant becomes an advocate, every step sends a message, and every finish line crossed
              represents our commitment to building a safer, healthier society for all.
            </p>
            <div className="stats-matrix flex flex-col items-start gap-8 mt-12">
              <div className="flex gap-8">
                <div
                  className="stat-card tilt-effect bg-background-light p-8 rounded-[20px] text-center transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-8px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
                >
                  <div className="stat-number text-5xl font-extrabold bg-primary-gradient bg-clip-text text-transparent mb-2 animate-count-up">
                    500+
                  </div>
                  <div className="stat-label text-lg text-text-gray font-semibold">Participants</div>
                </div>
                <div
                  className="stat-card tilt-effect bg-background-light p-8 rounded-[20px] text-center transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-8px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
                >
                  <div className="stat-number text-5xl font-extrabold bg-primary-gradient bg-clip-text text-transparent mb-2 animate-count-up">
                    2
                  </div>
                  <div className="stat-label text-lg text-text-gray font-semibold">Noble Causes</div>
                </div>
              </div>
              <div className="flex gap-8">
                <div
                  className="stat-card tilt-effect bg-background-light p-8 rounded-[20px] text-center transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-8px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
                >
                  <div className="stat-number text-5xl font-extrabold bg-primary-gradient bg-clip-text text-transparent mb-2 animate-count-up">
                    1
                  </div>
                  <div className="stat-label text-lg text-text-gray font-semibold">United Mission</div>
                </div>
                <div
                  className="stat-card tilt-effect bg-background-light p-8 rounded-[20px] text-center transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-8px] hover:scale-105 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
                >
                  <div className="stat-number text-5xl font-extrabold bg-primary-gradient bg-clip-text text-transparent mb-2 animate-count-up">
                    150+
                  </div>
                  <div className="stat-label text-lg text-text-gray font-semibold">Volunteers</div>
                </div>
              </div>
            </div>
          </div>
          <div ref={featuresGridRef} className="features-grid grid gap-8 animate-slide-in-right">
            <div
              ref={featureCard1Ref}
              className="feature-card tilt-effect bg-background-light p-10 rounded-[25px] transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
            >
              <div className="feature-icon w-[70px] h-[70px] bg-primary-gradient rounded-full flex items-center justify-center mb-6 transition-all duration-400 ease-DEFAULT group-hover:scale-110 group-hover:rotate-10 group-hover:animate-wiggle">
                <Shield className="text-text-light text-3xl" />
              </div>
              <div className="feature-title font-poppins text-2xl font-bold text-text-dark mb-4">
                Safety Pledge Initiative
              </div>
              <p className="feature-description text-text-gray leading-relaxed text-lg">
                Every participant carries a message of safety, turning 500+ runners into advocates for women&apos;s
                safety and drug awareness.
              </p>
            </div>
            <div
              ref={featureCard2Ref}
              className="feature-card tilt-effect bg-background-light p-10 rounded-[25px] transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
            >
              <div className="feature-icon w-[70px] h-[70px] bg-primary-gradient rounded-full flex items-center justify-center mb-6 transition-all duration-400 ease-DEFAULT group-hover:scale-110 group-hover:rotate-10 group-hover:animate-wiggle">
                <Heart className="text-text-light text-3xl" />
              </div>
              <div className="feature-title font-poppins text-2xl font-bold text-text-dark mb-4">Community Impact</div>
              <p className="feature-description text-text-gray leading-relaxed text-lg">
                Creating lasting change through education, awareness campaigns, and community engagement initiatives.
              </p>
            </div>
            <div
              ref={featureCard3Ref}
              className="feature-card tilt-effect bg-background-light p-10 rounded-[25px] transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/10 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
            >
              <div className="feature-icon w-[70px] h-[70px] bg-primary-gradient rounded-full flex items-center justify-center mb-6 transition-all duration-400 ease-DEFAULT group-hover:scale-110 group-hover:rotate-10 group-hover:animate-wiggle">
                <Users className="text-text-light text-3xl" />
              </div>
              <div className="feature-title font-poppins text-2xl font-bold text-text-dark mb-4">Collective Action</div>
              <p className="feature-description text-text-gray leading-relaxed text-lg">
                Bringing together diverse communities to address social issues through sports and shared responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
