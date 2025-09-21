import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MobileBottomNav from "@/components/ui/mobile-bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sudha Eye Hospital - Expert Eye Care Services",
  description:
    "Leading eye hospital providing comprehensive eye care services including cataract surgery, LASIK, retina treatment, and more. Book your appointment today.",
  keywords: "eye hospital, cataract surgery, LASIK, eye doctor, ophthalmologist, eye care, vision correction",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}
