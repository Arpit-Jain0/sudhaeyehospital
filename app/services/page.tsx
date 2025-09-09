"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Clock, CheckCircle, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// ADDED: Import animation components
import {
  AnimatedSection,
  AnimatedCard,
  StaggeredContainer,
  StaggeredItem,
  FadeInUp,
  ScaleIn,
} from "@/components/ui/animated-section"
import { motion } from "framer-motion"

export default function ServicesPage() {
  const services = [
    {
      id: "cataract",
      title: "Cataract Surgery",
      shortDesc: "Advanced phacoemulsification with premium IOL options",
      fullDesc:
        "Our cataract surgery uses the latest phacoemulsification technique with premium intraocular lenses (IOLs) to restore clear vision. We offer various IOL options including monofocal, multifocal, and toric lenses to address different vision needs.",
      features: [
        "Micro-incision surgery",
        "Premium IOL options",
        "Same-day procedure",
        "Quick recovery time",
        "99% success rate",
      ],
      image: "/cataract-surgery.png",
    },
    {
      id: "lasik",
      title: "LASIK Surgery",
      shortDesc: "Bladeless LASIK for vision correction",
      fullDesc:
        "Our bladeless LASIK surgery uses advanced femtosecond laser technology to correct refractive errors including myopia, hyperopia, and astigmatism. Experience freedom from glasses and contact lenses.",
      features: [
        "Bladeless technology",
        "Custom wavefront mapping",
        "Quick procedure",
        "Immediate results",
        "Lifetime warranty",
      ],
      image: "/lasik-eye-surgery.png",
    },
    {
      id: "retina",
      title: "Retina Treatment",
      shortDesc: "Comprehensive retinal care and surgery",
      fullDesc:
        "Complete retinal care including treatment for diabetic retinopathy, macular degeneration, retinal detachment, and other retinal disorders using advanced surgical techniques and medications.",
      features: [
        "Vitrectomy surgery",
        "Anti-VEGF injections",
        "Laser photocoagulation",
        "Retinal detachment repair",
        "Macular hole surgery",
      ],
      image: "/retina-treatment-medical.png",
    },
    {
      id: "glaucoma",
      title: "Glaucoma Care",
      shortDesc: "Early detection and advanced treatment",
      fullDesc:
        "Comprehensive glaucoma management including early detection, medical management, laser treatments, and surgical interventions to preserve vision and prevent progression.",
      features: [
        "Advanced diagnostic testing",
        "Medical management",
        "Laser trabeculoplasty",
        "Glaucoma surgery",
        "Regular monitoring",
      ],
      image: "/glaucoma-eye-examination.png",
    },
    {
      id: "pediatric",
      title: "Pediatric Eye Care",
      shortDesc: "Specialized care for children's vision",
      fullDesc:
        "Comprehensive eye care for children including vision screening, treatment of amblyopia, strabismus correction, and management of pediatric eye conditions with child-friendly approaches.",
      features: [
        "Child-friendly environment",
        "Specialized equipment",
        "Amblyopia treatment",
        "Strabismus surgery",
        "Vision therapy",
      ],
      image: "/pediatric-eye-care-children.png",
    },
    {
      id: "corneal",
      title: "Corneal Transplant",
      shortDesc: "Advanced corneal replacement surgery",
      fullDesc:
        "State-of-the-art corneal transplantation including full-thickness and partial-thickness transplants for various corneal diseases and injuries to restore vision and corneal health.",
      features: [
        "Full thickness transplant",
        "Partial thickness transplant",
        "Advanced surgical techniques",
        "High success rates",
        "Long-term follow-up",
      ],
      image: "/corneal-transplant-surgery.png",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* UPDATED: Hero Section with Animations */}
      <AnimatedSection direction="fade">
        <section className="relative py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <FadeInUp>
                <Badge variant="secondary" className="mb-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Comprehensive Eye Care
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Eye Care Services</h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  From routine eye exams to complex surgical procedures, we offer comprehensive eye care services using
                  the latest technology and techniques to ensure the best possible outcomes for our patients.
                </p>
              </FadeInUp>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Services Grid with Enhanced Animations */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <StaggeredItem key={service.id}>
                  <AnimatedCard delay={index * 0.1} className="h-full">
                    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                      </div>

                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                            <Eye className="w-5 h-5 text-blue-600" />
                          </motion.div>
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.shortDesc}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4 flex-1 flex flex-col">
                        <p className="text-gray-600 text-sm flex-1">{service.fullDesc}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Features:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-auto transition-all duration-300 hover:scale-105 bg-transparent"
                          asChild
                        >
                          <Link href="/appointment">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Consultation
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* UPDATED: Service Features with Animations */}
      <AnimatedSection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeInUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine advanced technology, experienced specialists, and personalized care to deliver exceptional
                results for every patient.
              </p>
            </FadeInUp>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Advanced Technology",
                  desc: "State-of-the-art equipment and cutting-edge surgical techniques",
                  color: "blue",
                },
                {
                  icon: Star,
                  title: "Expert Surgeons",
                  desc: "Highly qualified ophthalmologists with years of experience",
                  color: "green",
                },
                {
                  icon: Clock,
                  title: "Quick Recovery",
                  desc: "Minimally invasive procedures with faster healing times",
                  color: "purple",
                },
                {
                  icon: Eye,
                  title: "Personalized Care",
                  desc: "Customized treatment plans tailored to individual needs",
                  color: "orange",
                },
              ].map((feature, index) => (
                <StaggeredItem key={index}>
                  <ScaleIn delay={index * 0.1}>
                    <Card className="text-center hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader>
                        <motion.div
                          className={`mx-auto p-3 rounded-full w-fit mb-4 ${
                            feature.color === "blue"
                              ? "bg-blue-100"
                              : feature.color === "green"
                                ? "bg-green-100"
                                : feature.color === "purple"
                                  ? "bg-purple-100"
                                  : "bg-orange-100"
                          }`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <feature.icon
                            className={`w-8 h-8 ${
                              feature.color === "blue"
                                ? "text-blue-600"
                                : feature.color === "green"
                                  ? "text-green-600"
                                  : feature.color === "purple"
                                    ? "text-purple-600"
                                    : "text-orange-600"
                            }`}
                          />
                        </motion.div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </ScaleIn>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Schedule Your Consultation?</h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Take the first step towards better vision. Our expert team is ready to help you choose the right
                treatment for your needs.
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
                  <Link href="/appointment">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  onClick={() => window.open("tel:+919876543210")}
                >
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
