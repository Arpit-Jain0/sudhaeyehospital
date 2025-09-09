"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Calendar, MessageCircle, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>24/7 Emergency Care</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-1 sm:mt-0">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                onClick={() => window.open('https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20eye%20care.%20Please%20let%20me%20know%20the%20available%20slots.', '_blank')}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                WhatsApp
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white text-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105"
                asChild
              >
                <Link href="/book-appointment">
                  <Calendar className="w-3 h-3 mr-1" />
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Sudha Eye Hospital</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-blue-600 hover:scale-105 ${
                  isActive(item.href) 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              onClick={() => window.open('tel:+919876543210')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button 
              size="sm" 
              className="transition-all duration-200 hover:scale-105"
              asChild
            >
              <Link href="/book-appointment">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden hover:bg-gray-100 transition-colors">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">Sudha</div>
                    <div className="text-xs text-gray-600">Eye Hospital</div>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <Button className="w-full transition-all duration-200 hover:scale-105" asChild>
                  <Link href="/book-appointment" onClick={() => setIsOpen(false)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    window.open('tel:+919876543210')
                    setIsOpen(false)
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call: +91 98765 43210
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    window.open('https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20eye%20care.%20Please%20let%20me%20know%20the%20available%20slots.', '_blank')
                    setIsOpen(false)
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Consultation
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="text-center text-sm text-gray-600">
                  <p className="mb-2">Emergency Hotline</p>
                  <p className="font-semibold text-red-600">+91 98765 43200</p>
                  <p className="mt-2 text-xs">Available 24/7</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
