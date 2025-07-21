import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Salute Marathon 2025 - Women Safety & Drug Awareness",
  description:
    "Join 500+ runners on August 9, 2025 at Island Grounds Chennai for women safety and drug awareness campaign. Every step towards safety.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter leading-relaxed text-text-dark overflow-x-hidden scroll-smooth bg-background-light">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
