"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Calendar, Phone, MessageCircle, User } from 'lucide-react'

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      action: null
    },
    {
      icon: Calendar,
      label: "Book",
      href: "/book-appointment",
      action: null
    },
    {
      icon: Phone,
      label: "Call",
      href: null,
      action: () => { window.open('tel:+919876543210') }
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: null,
      action: () => { window.open('https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20eye%20care.%20Please%20let%20me%20know%20the%20available%20slots.', '_blank') }
    },
    {
      icon: User,
      label: "Doctors",
      href: "/doctors",
      action: null
    }
  ]

  const isActive = (href: string | null) => {
    if (!href) return false
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 md:hidden">
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item, index) => {
          const isItemActive = isActive(item.href)
          
          if (item.href) {
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center py-3 px-2 transition-all duration-200 active:scale-95 ${
                  isItemActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-1 transition-colors ${isItemActive ? 'text-blue-600' : ''}`} />
                <span className={`text-xs font-medium transition-colors ${isItemActive ? 'text-blue-600' : ''}`}>
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <button
              key={index}
              onClick={item.action || undefined}
              className={`flex flex-col items-center py-3 px-2 transition-all duration-200 active:scale-95 ${
                item.label === 'WhatsApp' 
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                  : item.label === 'Call'
                  ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1 transition-colors" />
              <span className="text-xs font-medium transition-colors">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
