"use client"

import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FormPopupProps {
  isVisible: boolean
  type: "success" | "error"
  title: string
  message: string
  onClose: () => void
}

export function FormPopup({ isVisible, type, title, message, onClose }: FormPopupProps) {
  if (!isVisible) return null

  return (
    <div className={`
      mt-4 rounded-lg border p-4 transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}
      ${type === 'success' 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
      }
    `}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold text-sm ${
            type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {title}
          </h4>
          <p className={`text-sm mt-1 ${
            type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="flex-shrink-0 h-6 w-6 p-0 hover:bg-transparent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
