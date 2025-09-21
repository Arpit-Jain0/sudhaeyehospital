"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    location: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const locations = [
    {
      name: "Main Hospital - City Center",
      address: "123 Medical Plaza, City Center, Mumbai - 400001",
      phone: "+91 98765 43210",
      email: "info@eyehospital.com",
      hours: "Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 5:00 PM",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Branch Clinic - Suburb",
      address: "456 Health Street, Suburb Area, Mumbai - 400002",
      phone: "+91 98765 43211",
      email: "suburb@eyehospital.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Specialty Center - Downtown",
      address: "789 Vision Avenue, Downtown, Mumbai - 400003",
      phone: "+91 98765 43212",
      email: "downtown@eyehospital.com",
      hours: "Mon-Sat: 10:00 AM - 7:00 PM",
      image: "/placeholder.svg?height=200&width=300"
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      contact: "+91 98765 43210",
      action: "Call Now",
      color: "blue",
      link: "tel:+919876543210"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick consultation via WhatsApp",
      contact: "+91 98765 43210",
      action: "Chat Now",
      color: "green",
      link: "https://wa.me/919876543210"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your queries",
      contact: "info@eyehospital.com",
    action: "Send Email",
    color: "purple",
    link: "mailto:info@eyehospital.com"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Have questions about our services or need to schedule an appointment? 
              We're here to help. Reach out to us through any of the convenient methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`mx-auto p-4 rounded-full w-fit mb-4 ${
                    method.color === 'blue' ? 'bg-blue-100' :
                    method.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <method.icon className={`w-8 h-8 ${
                      method.color === 'blue' ? 'text-blue-600' :
                      method.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
  <p className="font-semibold text-gray-900 mb-4">{method.contact}</p>
  <a
    href={method.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full inline-block text-center rounded-md px-4 py-2 text-white font-medium transition-colors duration-300 ${
      method.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
      method.color === 'green' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
    }`}
  >
    {method.action}
  </a>
</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    For urgent eye care needs, contact us immediately
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <Phone className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-900">24/7 Emergency Hotline</p>
                        <p className="text-red-700">+91 98765 43200</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">WhatsApp Emergency</p>
                        <p className="text-green-700">+91 98765 43200</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              

              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@eyehospital.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Main Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Mon-Sat: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-600">Sunday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us on Map
            </h2>
            <p className="text-gray-600">
              Our main hospital location in the heart of the city
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-96">
  <iframe
    title="Hospital Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7289760344165!2d78.54556957591878!3d17.42478948346887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb995b50000001%3A0xfbec2ab16b9765d3!2sSudha%20Eye%20Hospital!5e0!3m2!1sen!2sin!4v1754592713056!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
        </div>
      </section>
    </div>
  )
}
