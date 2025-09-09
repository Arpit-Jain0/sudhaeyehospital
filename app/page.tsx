"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Phone, Clock, Star, CheckCircle, Calendar, MessageCircle, Award, Users, Eye, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { insertAppointment, testSupabaseConnection } from "@/utils/supabaseClient"
import { FormPopup } from "@/components/ui/form-popup"


// ADDED: Import animation components

import {
  AnimatedSection,
  AnimatedCard,
  AnimatedImage,
  StaggeredContainer,
  StaggeredItem,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
} from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export default function HomePage() {
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    appointmentType: "",
    date: "",
    phone: "",
    patientName: "",
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
    message: "",
  })

  // Test Supabase connection on component mount
  useEffect(() => {
    testSupabaseConnection().then((result) => {
      if (result.success) {
        console.log("✅ Supabase connected successfully")
      } else {
        console.error("❌ Supabase connection failed:", result.error)
      }
    })
  }, [])

  // Auto hide popup after 5 seconds
  useEffect(() => {
    if (popup.isVisible) {
      const timer = setTimeout(() => {
        setPopup((prev) => ({ ...prev, isVisible: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [popup.isVisible])

  const showPopup = (type: "success" | "error", title: string, message: string) => {
    setPopup({
      isVisible: true,
      type,
      title,
      message,
    })
  }

  const hidePopup = () => {
    setPopup((prev) => ({ ...prev, isVisible: false }))
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
        showPopup("error", "Please fill all required fields", validationErrors.join(". "))
        setIsSubmitting(false)
        return
      }

      // Insert appointment into Supabase
      const result = await insertAppointment({
        appointment_type: bookingForm.appointmentType,
        preferred_date: bookingForm.date,
        phone_number: bookingForm.phone,
        patient_name: bookingForm.patientName.trim() || undefined,
      })

      if (result.success) {
        // Success - show popup and reset form
        showPopup(
          "success",
          "Appointment Booked Successfully!",
          "Your appointment has been booked. We will contact you soon to confirm the details.",
        )

        // Reset form
        setBookingForm({
          appointmentType: "",
          date: "",
          phone: "",
          patientName: "",
        })
      } else {
        // Error from database
        showPopup(
          "error",
          "Booking Failed",
          result.error || "Something went wrong. Please try again or call us directly.",
        )
      }
    } catch (error) {
      console.error("Form submission error:", error)
      showPopup("error", "Unexpected Error", "An unexpected error occurred. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      title: "Cataract Surgery",
      description: "Advanced phacoemulsification with premium IOL options",
      icon: Eye,
      image: "/cataract-surgery.png",
    },
    {
      title: "LASIK Surgery",
      description: "Bladeless LASIK for vision correction",
      icon: Eye,
      image: "/lasik-eye-surgery.png",
    },
    {
      title: "Retina Treatment",
      description: "Comprehensive retinal care and surgery",
      icon: Eye,
      image: "/retina-treatment-medical.png",
    },
    {
      title: "Glaucoma Care",
      description: "Early detection and advanced treatment",
      icon: Eye,
      image: "/glaucoma-eye-examination.png",
    },
    {
      title: "Pediatric Eye Care",
      description: "Specialized care for children's vision",
      icon: Eye,
      image: "/pediatric-eye-care-children.png",
    },
    {
      title: "Corneal Transplant",
      description: "Advanced corneal replacement surgery",
      icon: Eye,
      image: "/corneal-transplant-surgery.png",
    },
  ]

  const testimonials = [
    {
      name: "Mrs. Priya Sharma",
      age: 65,
      treatment: "Cataract Surgery",
      rating: 5,
      text: "Excellent care and professional service. My vision is crystal clear now after the cataract surgery. Dr. Agarwal and the team were very supportive throughout the process.",
      image: "/elderly-indian-woman-patient.png",
    },
    {
      name: "Mr. Rajesh Kumar",
      age: 42,
      treatment: "LASIK Surgery",
      rating: 5,
      text: "Life-changing experience! No more glasses after 20 years. The LASIK procedure was painless and the results are amazing. Highly recommend this hospital.",
      image: "/middle-aged-indian-professional.png",
    },
    {
      name: "Ms. Anita Patel",
      age: 38,
      treatment: "Retina Treatment",
      rating: 5,
      text: "The retina specialists here saved my vision. Their expertise and advanced technology made all the difference. Forever grateful to the entire team.",
      image: "/indian-woman-professional-patient.png",
    },
  ]


  return (
    <div className="min-h-screen">
      {/* UPDATED: Full-Screen Hero Section with Enhanced Animations */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/main_image.png"
            alt="SUDHA Eye Hospital - Advanced Eye Care"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60"></div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                {/* UPDATED: Left Side - Hospital Name & Branding with Animations */}
                <SlideInLeft className="text-white space-y-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <motion.h1
                      className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-center lg:text-left"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    >
                      <motion.span
                        className="text-white block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        SUDHA
                      </motion.span>
                      <motion.span
                        className="text-blue-400 block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        EYE HOSPITAL
                      </motion.span>
                    </motion.h1>
                    <FadeInUp delay={0.9}>
                      <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed text-center lg:text-left font-light">
                        Advanced Eye Care with
                        <br />
                        <span className="text-blue-300 font-medium">Compassionate Treatment</span>
                      </p>
                    </FadeInUp>
                  </div>
                </SlideInLeft>

                {/* UPDATED: Right Side - Booking Form with Animations */}
                <SlideInRight delay={0.5} className="flex justify-center lg:justify-end">
                  <ScaleIn delay={0.8}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl w-full max-w-md">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                          >
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </motion.div>
                          Book Your Eye Appointment
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Schedule your consultation with our expert ophthalmologists
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <FadeInUp delay={1.2}>
                            <Label htmlFor="patientName" className="text-gray-700 font-medium">
                              Patient Name (Optional)
                            </Label>
                            <Input
                              id="patientName"
                              type="text"
                              placeholder="Enter patient name"
                              value={bookingForm.patientName}
                              onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                              className="h-12 text-base transition-all duration-300 focus:scale-105"
                            />
                          </FadeInUp>

                          <FadeInUp delay={1.4}>
                            <Label htmlFor="appointmentType" className="text-gray-700 font-medium">
                              Appointment Type <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={bookingForm.appointmentType}
                              onValueChange={(value) => setBookingForm({ ...bookingForm, appointmentType: value })}
                            >
                              <SelectTrigger className="h-12 text-base transition-all duration-300 focus:scale-105">
                                <SelectValue placeholder="Select appointment type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General Consultation">General Consultation</SelectItem>
                                <SelectItem value="Cataract Surgery">Cataract Surgery</SelectItem>
                                <SelectItem value="LASIK Surgery">LASIK Surgery</SelectItem>
                                <SelectItem value="Retina Treatment">Retina Treatment</SelectItem>
                                <SelectItem value="Glaucoma Care">Glaucoma Care</SelectItem>
                                <SelectItem value="Emergency">Emergency</SelectItem>
                              </SelectContent>
                            </Select>
                          </FadeInUp>

                          <FadeInUp delay={1.6}>
                            <Label htmlFor="date" className="text-gray-700 font-medium">
                              Preferred Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="date"
                              type="date"
                              value={bookingForm.date}
                              onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                              className="h-12 text-base transition-all duration-300 focus:scale-105"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </FadeInUp>

                          <FadeInUp delay={1.8}>
                            <Label htmlFor="phone" className="text-gray-700 font-medium">
                              Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                              className="h-12 text-base transition-all duration-300 focus:scale-105"
                            />
                          </FadeInUp>

                          <FadeInUp delay={2.0}>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              <Calendar className="w-5 h-5 mr-2" />
                              {isSubmitting ? "Booking..." : "Book Appointment"}
                            </Button>
                          </FadeInUp>
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
                  </ScaleIn>
                </SlideInRight>
              </div>
            </div>
          </div>

          {/* UPDATED: Bottom Contact Info with Animations */}
          <FadeInUp delay={2.2} className="pb-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-wrap justify-center gap-8 text-white">
                  <motion.div
                    className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-medium">+91 98765 43210</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-medium">24/7 Emergency Care</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* UPDATED: Floating WhatsApp Button with Animation */}
        <motion.div
          className="absolute bottom-8 right-8 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 2.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl transition-all duration-300"
            onClick={() => window.open("https://wa.me/919876543210?text=Hi, I want to book an appointment.", "_blank")}
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </motion.div>
      </section>

      {/* UPDATED: Services Section with Enhanced Animations */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Eye Care Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From preventive care to advanced surgical procedures, we offer complete eye care solutions using the
                latest technology and techniques.
              </p>
            </FadeInUp>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <StaggeredItem key={index}>
                  <AnimatedCard delay={index * 0.1} className="h-full">
                    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <AnimatedImage
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          delay={index * 0.1}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <service.icon className="w-5 h-5 text-blue-600" />
                          </motion.div>
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className="w-full transition-all duration-300 hover:scale-105 bg-transparent"
                          asChild
                        >
                          <Link href="/book-appointment">Book Now</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </StaggeredItem>
              ))}
            </StaggeredContainer>

            <FadeInUp delay={0.5} className="text-center mt-12">
              <Button size="lg" className="transition-all duration-300 hover:scale-105" asChild>
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
            </FadeInUp>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Why Choose Us Section with Animations */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideInLeft>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Eye Hospital?</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Award,
                      title: "Expert Specialists",
                      desc: "Our team includes highly qualified ophthalmologists with years of experience in specialized eye care and surgery.",
                    },
                    {
                      icon: Stethoscope,
                      title: "Advanced Technology",
                      desc: "State-of-the-art equipment and cutting-edge surgical techniques ensure the best possible outcomes for our patients.",
                    },
                    {
                      icon: CheckCircle,
                      title: "Proven Results",
                      desc: "With over 25,000 successful surgeries and a 98% success rate, we have a track record of excellence.",
                    },
                    {
                      icon: Users,
                      title: "Personalized Care",
                      desc: "Every patient receives individualized treatment plans tailored to their specific needs and conditions.",
                    },
                  ].map((item, index) => (
                    <FadeInUp key={index} delay={index * 0.1}>
                      <motion.div className="flex gap-4" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                        <motion.div
                          className="bg-blue-100 p-2 rounded-lg flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="w-6 h-6 text-blue-600" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </motion.div>
                    </FadeInUp>
                  ))}
                </div>
              </SlideInLeft>

              <SlideInRight delay={0.3}>
                <AnimatedImage
                  src="/main_image.png"
                  alt="Advanced Eye Surgery Equipment"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl"
                />
              </SlideInRight>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Testimonials Section with Animations */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
              <p className="text-lg text-gray-600">Real stories from patients who trusted us with their vision</p>
            </FadeInUp>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <StaggeredItem key={index}>
                  <AnimatedCard delay={index * 0.1} className="h-full">
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <motion.div
                          className="flex items-center gap-1 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </motion.div>
                        <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                        <div className="flex items-center gap-3">
                          <AnimatedImage
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                            delay={index * 0.1}
                          />
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">
                              Age {testimonial.age} • {testimonial.treatment}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: CTA Section with Animations */}
      <AnimatedSection>
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <FadeInUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Improve Your Vision?</h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Don't wait to address your eye health concerns. Book an appointment today and take the first step
                towards clearer vision.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/book-appointment">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  onClick={() => window.open("tel:+919876543210")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 98765 43210
                </Button>
              </div>
            </FadeInUp>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
