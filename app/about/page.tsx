"use client"

import Image from "next/image"
import { Award, Eye, Heart, Target, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// ADDED: Import animation components
import {
  AnimatedSection,
  AnimatedCard,
  StaggeredContainer,
  StaggeredItem,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
} from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export default function AboutPage() {
  const values = [
    {
      icon: Eye,
      title: "Excellence in Vision Care",
      description:
        "We are committed to providing the highest quality eye care services using advanced technology and proven techniques.",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "Every patient is treated with empathy, respect, and personalized attention throughout their journey with us.",
    },
    {
      icon: Target,
      title: "Precision & Accuracy",
      description:
        "Our focus on precision ensures accurate diagnoses and successful treatment outcomes for all our patients.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Patient safety is our top priority, with strict protocols and the highest standards of medical care.",
    },
  ]

  const milestones = [
    { year: "2008", event: "Hospital Founded", description: "Started with a vision to provide world-class eye care" },
    { year: "2012", event: "10,000 Surgeries", description: "Reached milestone of 10,000 successful surgeries" },
    {
      year: "2015",
      event: "Advanced Technology",
      description: "Introduced latest LASIK and cataract surgery equipment",
    },
    { year: "2018", event: "Multiple Locations", description: "Expanded to serve patients across the region" },
    { year: "2020", event: "Telemedicine Launch", description: "Launched online consultations during pandemic" },
    { year: "2023", event: "25,000+ Surgeries", description: "Celebrated 25,000+ successful surgeries milestone" },
  ]

  const team = [
    {
      name: "Dr. Rajesh Agarwal",
      designation: "Chief Ophthalmologist & Founder",
      specialization: "Cataract & Refractive Surgery",
      experience: "20+ Years",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      name: "Dr. Priya Sharma",
      designation: "Senior Consultant",
      specialization: "Retina & Vitreous Surgery",
      experience: "15+ Years",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      name: "Dr. Amit Kumar",
      designation: "Consultant Ophthalmologist",
      specialization: "Glaucoma & Corneal Diseases",
      experience: "12+ Years",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* UPDATED: Hero Section with Animations */}
      <AnimatedSection direction="fade">
        <section className="relative py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideInLeft>
                <Badge variant="secondary" className="mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  15+ Years of Excellence
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Eye Hospital</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  For over 15 years, we have been at the forefront of eye care, combining cutting-edge technology with
                  compassionate treatment to help thousands of patients achieve better vision and improved quality of
                  life.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to excellence, continuous innovation, and patient-centered care has made us a trusted
                  name in ophthalmology, with a track record of over 25,000 successful surgeries.
                </p>
              </SlideInLeft>
              <SlideInRight delay={0.3}>
                <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Eye Hospital Building"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </motion.div>
              </SlideInRight>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Mission & Vision with Animations */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeInUp>
                <Card className="border-l-4 border-l-blue-600 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-600">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To provide comprehensive, compassionate, and cutting-edge eye care services that enhance the
                      vision and quality of life for our patients. We are committed to excellence in clinical care,
                      education, and research while maintaining the highest ethical standards.
                    </p>
                  </CardContent>
                </Card>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <Card className="border-l-4 border-l-green-600 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-600">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To be the leading eye care institution recognized for innovation, excellence, and patient
                      satisfaction. We envision a world where everyone has access to the best possible eye care,
                      enabling them to see clearly and live fully.
                    </p>
                  </CardContent>
                </Card>
              </FadeInUp>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Values Section with Enhanced Animations */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These fundamental principles guide everything we do and shape our commitment to exceptional eye care.
              </p>
            </FadeInUp>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <StaggeredItem key={index}>
                  <ScaleIn delay={index * 0.1}>
                    <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <motion.div
                          className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <value.icon className="w-8 h-8 text-blue-600" />
                        </motion.div>
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  </ScaleIn>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Timeline Section with Animations */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600">Key milestones in our commitment to advancing eye care</p>
            </FadeInUp>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>

                {milestones.map((milestone, index) => (
                  <FadeInUp key={index} delay={index * 0.1}>
                    <div
                      className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                        <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }}>
                          <Card className="ml-12 md:ml-0 hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="text-blue-600">
                                  {milestone.year}
                                </Badge>
                                <CardTitle className="text-lg">{milestone.event}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600">{milestone.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>

                      <motion.div
                        className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Team Section with Animations */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our highly qualified ophthalmologists bring years of experience and expertise to provide you with the
                best possible eye care.
              </p>
            </FadeInUp>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((doctor, index) => (
                <StaggeredItem key={index}>
                  <AnimatedCard delay={index * 0.1}>
                    <Card className="text-center overflow-hidden hover:shadow-lg transition-all duration-300">
                      <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          width={250}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                      <CardHeader>
                        <CardTitle className="text-xl">{doctor.name}</CardTitle>
                        <p className="text-blue-600 font-medium">{doctor.designation}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Specialization:</span> {doctor.specialization}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Experience:</span> {doctor.experience}
                          </p>
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

      {/* UPDATED: Stats Section with Animations */}
      
    </div>
  )
}
