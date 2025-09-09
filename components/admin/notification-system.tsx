"use client"

import { useEffect, useState } from 'react'
import { Bell, MessageCircle, Phone, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { subscribeToAppointments } from '@/utils/supabaseClient'

interface NotificationProps {
  adminPhoneNumber?: string
}

export default function NotificationSystem({ adminPhoneNumber = "919876543210" }: NotificationProps) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Subscribe to real-time changes
    const subscription = subscribeToAppointments((payload) => {
      console.log('Real-time update:', payload)
      
      if (payload.eventType === 'INSERT') {
        const newAppointment = payload.new
        
        // Add to notifications
        const notification = {
          id: Date.now(),
          type: 'new_appointment',
          data: newAppointment,
          timestamp: new Date(),
          read: false
        }
        
        setNotifications(prev => [notification, ...prev.slice(0, 9)]) // Keep only 10 notifications
        setIsVisible(true)
        
        // Send WhatsApp notification to admin
        sendAdminWhatsAppNotification(newAppointment, adminPhoneNumber)
        
        // Show browser notification if permission granted
        showBrowserNotification(newAppointment)
        
        // Play notification sound
        playNotificationSound()
      }
    })

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    return () => {
      subscription.unsubscribe()
    }
  }, [adminPhoneNumber])

  const sendAdminWhatsAppNotification = (appointment: any, adminPhone: string) => {
    const message = `🚨 NEW APPOINTMENT ALERT 🚨

Patient: ${appointment.patient_name || 'Anonymous Patient'}
Phone: ${appointment.phone_number}
Type: ${appointment.appointment_type}
Preferred Date: ${appointment.preferred_date}
Status: PENDING ⏳

Booked: ${new Date().toLocaleString()}

👆 Click to manage this appointment in admin dashboard.

Quick Actions:
• Call patient: ${appointment.phone_number}
• Confirm appointment
• Send confirmation message

Admin Dashboard: ${window.location.origin}/admin`

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const showBrowserNotification = (appointment: any) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Appointment Booking!', {
        body: `${appointment.patient_name || 'Anonymous'} booked ${appointment.appointment_type} for ${appointment.preferred_date}`,
        icon: '/favicon.ico',
        tag: 'appointment-' + appointment.id
      })
    }
  }

  const playNotificationSound = () => {
    // Create audio element and play notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
    audio.play().catch(() => {
      // Fallback if audio doesn't play
      console.log('Notification sound failed to play')
    })
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!isVisible && notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {/* Notification Bell */}
      <div className="relative mb-4">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black min-w-[20px] h-5 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      {isVisible && (
        <Card className="w-80 max-h-96 overflow-y-auto shadow-xl border-2 border-red-200">
          <CardContent className="p-0">
            <div className="bg-red-600 text-white p-3 flex items-center justify-between">
              <h3 className="font-semibold">New Appointments</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-white hover:bg-red-700 h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No new notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Bell className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-sm">New Appointment</span>
                          {!notification.read && (
                            <Badge className="bg-red-100 text-red-800 text-xs">NEW</Badge>
                          )}
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <p><strong>Patient:</strong> {notification.data.patient_name || 'Anonymous'}</p>
                          <p><strong>Phone:</strong> {notification.data.phone_number}</p>
                          <p><strong>Type:</strong> {notification.data.appointment_type}</p>
                          <p><strong>Date:</strong> {notification.data.preferred_date}</p>
                          <p className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => window.open(`https://wa.me/${notification.data.phone_number.replace(/[^0-9]/g, '')}?text=Hi ${notification.data.patient_name || 'there'}, thank you for booking an appointment with us. We will confirm your appointment shortly.`, '_blank')}
                            className="bg-green-600 hover:bg-green-700 text-xs"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:${notification.data.phone_number}`)}
                            className="text-xs"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearNotification(notification.id)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-3 bg-gray-50 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/admin', '_blank')}
                  className="w-full"
                >
                  Open Admin Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
