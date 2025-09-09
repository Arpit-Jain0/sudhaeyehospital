"use client"

import { useState } from "react"
import { Phone, MessageCircle, Calendar, X, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Calendar,
      label: "Book Appointment",
      action: () => { window.location.href = '/appointment' },
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: () => { window.open('https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20eye%20care.%20Please%20let%20me%20know%20the%20available%20slots.', '_blank') },
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-white"
    },
    {
      icon: Phone,
      label: "Call Now",
      action: () => { window.open('tel:+919876543210') },
      color: "bg-red-600 hover:bg-red-700",
      textColor: "text-white"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Action Buttons with Individual Hover Tooltips */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div key={index} className="flex items-center gap-3 group">
            {/* Tooltip that appears on button hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
              <span className="text-sm font-medium text-gray-900">{action.label}</span>
            </div>
            <Button
              size="sm"
              className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 ${action.color} ${action.textColor} hover:scale-110`}
              onClick={action.action}
              title={action.label} // Native browser tooltip as backup
            >
              {action.icon && <action.icon className="w-5 h-5" />}
            </Button>
          </div>
        ))}
      </div>

      {/* Main Toggle Button */}
      <Button
        size="sm"
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700 rotate-45' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close menu" : "Open quick actions"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  )
}
