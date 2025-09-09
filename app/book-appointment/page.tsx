"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Clock, Calendar, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { insertAppointment, testSupabaseConnection } from "@/utils/supabaseClient"
import { FormPopup } from "@/components/ui/form-popup"

export default function BookAppointmentPage() {
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    appointmentType: "",
    date: "",
    phone: "",
    patientName: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Popup state
  const [popup, setPopup] = useState<{
    isVisible: boolean
    type: "success" | "error"
    title: string
    message: string
  }>({
    isVisible: false,
    type: "success",
    title: "",
    message: ""
  })

  // Test Supabase connection on component mount
  useEffect(() => {
    testSupabaseConnection().then(result => {
      if (result.success) {
        console.log('✅ Supabase connected successfully')
      } else {
        console.error('❌ Supabase connection failed:', result.error)
      }
    })
  }, [])

  // Auto hide popup after 5 seconds
  useEffect(() => {
    if (popup.isVisible) {
      const timer = setTimeout(() => {
        setPopup(prev => ({ ...prev, isVisible: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [popup.isVisible])

  const showPopup = (type: "success" | "error", title: string, message: string) => {
    setPopup({
      isVisible: true,
      type,
      title,
      message
    })
  }

  const hidePopup = () => {
    setPopup(prev => ({ ...prev, isVisible: false }))
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!bookingForm.appointmentType.trim()) {
      errors.push("Please select an appointment type")
    }

    if (!bookingForm.date.trim()) {
      errors.push("Please select a preferred date")
    }

    if (!bookingForm.phone.trim()) {
      errors.push("Please enter your phone number")
    } else if (bookingForm.phone.length < 10) {
      errors.push("Please enter a valid phone number (minimum 10 digits)")
    }

    // Check if date is in the past
    if (bookingForm.date) {
      const selectedDate = new Date(bookingForm.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        errors.push("Please select a future date")
      }
    }

    return errors
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      const validationErrors = validateForm()
      
      if (validationErrors.length > 0) {
        showPopup(
          "error",
          "Please fill all required fields",
          validationErrors.join(". ")
        )
        setIsSubmitting(false)
        return
      }

      // Insert appointment into Supabase
      const result = await insertAppointment({
        appointment_type: bookingForm.appointmentType,
        preferred_date: bookingForm.date,
        phone_number: bookingForm.phone,
        patient_name: bookingForm.patientName.trim() || undefined
      })

      if (result.success) {
        // Success - show popup and reset form
        showPopup(
          "success",
          "Appointment Booked Successfully!",
          "Your appointment has been booked. We will contact you soon to confirm the details."
        )

        // Reset form
        setBookingForm({
          appointmentType: "",
          date: "",
          phone: "",
          patientName: ""
        })

      } else {
        // Error from database
        showPopup(
          "error",
          "Booking Failed",
          result.error || "Something went wrong. Please try again or call us directly."
        )
      }

    } catch (error) {
      console.error('Form submission error:', error)
      showPopup(
        "error",
        "Unexpected Error",
        "An unexpected error occurred. Please try again or contact us directly."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Book Your Appointment
                </h1>
                <p className="text-gray-600 mt-2">
                  Schedule your consultation with our expert ophthalmologists
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Quick & Easy Booking
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Hospital Info */}
            <div className="space-y-8">
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">SUDHA EYE HOSPITAL</CardTitle>
                  <CardDescription className="text-lg">
                    Advanced Eye Care with Compassionate Treatment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">Multiple locations across the city</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-gray-600">Mon-Sat: 8AM-8PM, Sun: 9AM-5PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">25,000+ Successful Surgeries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Expert Ophthalmologists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Advanced Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Same Day Appointments Available</span>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Support Card */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800">Need Help?</h3>
                      <p className="text-sm text-green-700">
                        Chat with us on WhatsApp for instant support
                      </p>
                    </div>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => window.open('https://wa.me/919876543210?text=Hi, I need help with booking an appointment. Please assist me.', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Booking Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Book Your Eye Appointment
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Fill in your details and we'll contact you to confirm your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="patientName" className="text-gray-700 font-medium text-base">
                        Patient Name (Optional)
                      </Label>
                      <Input
                        id="patientName"
                        type="text"
                        placeholder="Enter patient name"
                        value={bookingForm.patientName}
                        onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                        className="h-12 text-base mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="appointmentType" className="text-gray-700 font-medium text-base">
                        Appointment Type <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={bookingForm.appointmentType} 
                        onValueChange={(value) => setBookingForm({...bookingForm, appointmentType: value})}
                      >
                        <SelectTrigger className="h-12 text-base mt-2">
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Consultation">General Consultation</SelectItem>
                          <SelectItem value="Cataract Surgery">Cataract Surgery</SelectItem>
                          <SelectItem value="LASIK Surgery">LASIK Surgery</SelectItem>
                          <SelectItem value="Retina Treatment">Retina Treatment</SelectItem>
                          <SelectItem value="Glaucoma Care">Glaucoma Care</SelectItem>
                          <SelectItem value="Pediatric Eye Care">Pediatric Eye Care</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date" className="text-gray-700 font-medium text-base">
                        Preferred Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        className="h-12 text-base mt-2"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium text-base">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="h-12 text-base mt-2"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Booking...' : 'Book Appointment'}
                    </Button>
                  </form>

                  {/* Form Popup - Shows below the form */}
                  <FormPopup
                    isVisible={popup.isVisible}
                    type={popup.type}
                    title={popup.title}
                    message={popup.message}
                    onClose={hidePopup}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-12 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Emergency Eye Care Available 24/7
          </h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            For urgent eye problems, don't wait. Contact us immediately for emergency care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => window.open('tel:+919876543200')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: +91 98765 43200
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-red-600 hover:bg-white hover:text-red-600"
              onClick={() => window.open('https://wa.me/919876543200?text=EMERGENCY: I need immediate eye care assistance. Please help.', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Emergency WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
