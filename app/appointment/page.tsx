"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function AppointmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    appointmentType: "",
    doctor: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    symptoms: "",
    previousTreatment: false,
    emergencyContact: "",
    insurance: ""
  })

  const doctors = [
    { id: "dr-rajesh", name: "Dr. Rajesh Agarwal", specialty: "Cataract & LASIK Surgery", fee: "₹800" },
    { id: "dr-priya", name: "Dr. Priya Sharma", specialty: "Retina Specialist", fee: "₹700" },
    { id: "dr-amit", name: "Dr. Amit Kumar", specialty: "Glaucoma & Corneal Diseases", fee: "₹600" },
    { id: "dr-sunita", name: "Dr. Sunita Patel", specialty: "Pediatric Ophthalmology", fee: "₹650" }
  ]

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ]

  const appointmentTypes = [
    { id: "consultation", name: "General Consultation", duration: "30 mins", price: "₹500-800" },
    { id: "followup", name: "Follow-up Visit", duration: "20 mins", price: "₹300-500" },
    { id: "surgery", name: "Surgery Consultation", duration: "45 mins", price: "₹800-1000" },
    { id: "emergency", name: "Emergency Consultation", duration: "Immediate", price: "₹1000-1500" }
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    setStep(4) // Show success message
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Appointment Booked Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been confirmed. You will receive a confirmation 
              email and SMS with all the details shortly.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p><strong>Appointment ID:</strong> APT-2024-001</p>
              <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
              <p><strong>Doctor:</strong> {doctors.find(d => d.id === formData.doctor)?.name}</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.open('https://wa.me/919876543210?text=Hi, my appointment has been booked successfully. Here are the details: Appointment ID: APT-2024-001', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Book Your Appointment
              </h1>
              <p className="text-gray-600 mt-1">
                Schedule your consultation with our expert ophthalmologists
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">Step {step} of 3</Badge>
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => window.open('https://wa.me/919876543210?text=Hi, I need help with booking an appointment. Please assist me.', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex-1 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <div className={`flex-1 h-1 mx-4 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                } ${stepNumber === 3 ? 'hidden' : ''}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2 pb-4">
            <span>Select Service</span>
            <span>Choose Doctor & Time</span>
            <span>Personal Details</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Appointment Type */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Select Appointment Type
                </CardTitle>
                <CardDescription>
                  Choose the type of consultation you need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup 
                  value={formData.appointmentType} 
                  onValueChange={(value) => setFormData({...formData, appointmentType: value})}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {appointmentTypes.map((type) => (
                      <div key={type.id} className="relative">
                        <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                        <Label 
                          htmlFor={type.id}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.appointmentType === type.id 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{type.name}</h3>
                            <Badge variant="secondary">{type.price}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Duration: {type.duration}</p>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.appointmentType}
                  >
                    Next: Choose Doctor & Time
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Choose Doctor and Time */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Select Doctor
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred specialist
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.doctor} 
                    onValueChange={(value) => setFormData({...formData, doctor: value})}
                  >
                    <div className="space-y-3">
                      {doctors.map((doctor) => (
                        <div key={doctor.id} className="relative">
                          <RadioGroupItem value={doctor.id} id={doctor.id} className="sr-only" />
                          <Label 
                            htmlFor={doctor.id}
                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.doctor === doctor.id 
                                ? 'border-blue-600 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div>
                              <h3 className="font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            </div>
                            <Badge variant="outline">{doctor.fee}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input 
                      id="date"
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={formData.time === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData({...formData, time})}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.doctor || !formData.date || !formData.time}
                >
                  Next: Personal Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your details for the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input 
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                    <Textarea 
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                      placeholder="Please describe your symptoms or reason for consultation"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input 
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                        placeholder="Name and phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insurance">Insurance Provider</Label>
                      <Input 
                        id="insurance"
                        value={formData.insurance}
                        onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                        placeholder="Insurance company name"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="previousTreatment"
                      checked={formData.previousTreatment}
                      onCheckedChange={(checked) => setFormData({...formData, previousTreatment: checked as boolean})}
                    />
                    <Label htmlFor="previousTreatment" className="text-sm">
                      I have received previous eye treatment or surgery
                    </Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p><strong>Type:</strong> {appointmentTypes.find(t => t.id === formData.appointmentType)?.name}</p>
                      <p><strong>Doctor:</strong> {doctors.find(d => d.id === formData.doctor)?.name}</p>
                      <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
                      <p><strong>Consultation Fee:</strong> {doctors.find(d => d.id === formData.doctor)?.fee}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button type="submit">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Appointment
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
