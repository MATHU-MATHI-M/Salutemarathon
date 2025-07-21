import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-purple": "#8B5CF6",
        "primary-pink": "#EC4899",
        "primary-blue": "#3B82F6",
        "accent-orange": "#F59E0B",
        "accent-green": "#10B981",
        "text-dark": "#102A43", // changed to dark blue
        "text-dark-blue": "#102A43", // alias for clarity
        "text-light": "#ffffff",
        "text-gray": "#6B7280",
        "background-light": "#F8FAFC",
        "background-white": "#ffffff",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
        "secondary-gradient": "linear-gradient(135deg, #F59E0B 0%, #10B981 100%)",
        "hero-gradient": "linear-gradient(135deg, #F8FAFC 0%, #EDE9FE 30%, #FCE7F3 60%, #EBF4FF 100%)",
        "urgency-gradient": "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
        "parallax-gradient":
          "linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, rgba(245, 158, 11, 0.1) 75%, rgba(16, 185, 129, 0.1) 100%)",
        "video-overlay-gradient": "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
      },
      boxShadow: {
        light: "0 4px 20px rgba(0, 0, 0, 0.08)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
        heavy: "0 20px 50px rgba(0, 0, 0, 0.15)",
        glow: "0 0 30px rgba(139, 92, 246, 0.3)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        DEFAULT: "400ms",
      },
      keyframes: {
        gradientShift: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        glow: {
          from: { "box-shadow": "var(--shadow-light)" },
          to: { "box-shadow": "var(--shadow-glow)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(50px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        titleAppear: {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        titleShimmer: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        bounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        rotateIn: {
          from: { opacity: "0", transform: "rotate(-180deg)" },
          to: { opacity: "1", transform: "rotate(0deg)" },
        },
        countUp: {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        fadeInScale: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        progressFill: {
          from: { width: "0%" },
          to: { width: "38%" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "scale(1.1) rotate(10deg)" },
          "25%": { transform: "scale(1.1) rotate(15deg)" },
          "75%": { transform: "scale(1.1) rotate(5deg)" },
        },
        modalSlideIn: {
          from: { transform: "translateY(-50px) scale(0.9)", opacity: "0" },
          to: { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(2px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "gradient-shift": "gradientShift 15s ease infinite",
        pulse: "pulse 2s infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "fade-in-up": "fadeInUp 1s ease-out",
        "title-appear": "titleAppear 1.5s ease-out",
        "title-shimmer": "titleShimmer 3s ease-in-out infinite",
        "slide-in-left": "slideInLeft 1s ease-out 0.3s both",
        bounce: "bounce 2s infinite",
        "slide-in-up": "slideInUp 1s ease-out",
        "rotate-in": "rotateIn 1s ease-out 0.9s both",
        "count-up": "countUp 2s ease-out",
        "fade-in-scale": "fadeInScale 0.5s ease-out",
        "progress-fill": "progressFill 2s ease-out",
        "fade-in-down": "fadeInDown 1s ease-out",
        wiggle: "wiggle 0.5s ease-in-out",
        "modal-slide-in": "modalSlideIn 0.3s ease-out",
        shake: "shake 0.5s ease-in-out infinite alternate",
        spin: "spin 1s linear infinite",
        "slide-in-right": "slideInRight 0.5s ease-out",
      },
    },
  },
  plugins: [],
}

export default config
