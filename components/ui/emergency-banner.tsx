"use client"

import { useState } from "react"
import { Phone, MessageCircle, X, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white py-3 px-4 relative">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm md:text-base">
              24/7 Emergency Eye Care Available
            </p>
            <p className="text-xs md:text-sm opacity-90">
              Call immediately for urgent eye problems
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-red-600 hover:bg-gray-100 text-xs md:text-sm"
            onClick={() => window.open('tel:+919876543200')}
          >
            <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            Call Now
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-600 text-xs md:text-sm hidden sm:flex"
            onClick={() => window.open('https://wa.me/919876543200?text=EMERGENCY%3A%20I%20need%20immediate%20eye%20care%20assistance.%20Please%20help.', '_blank')}
          >
            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            WhatsApp
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-red-700 p-1"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
