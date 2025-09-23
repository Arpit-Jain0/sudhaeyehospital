"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Eye, Calendar, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";


export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Book Appointment", href: "/appointment" },
    { name: "Contact Us", href: "/contact" }
  ]

  const services = [
    { name: "Cataract Surgery", href: "/services#cataract" },
    { name: "LASIK Surgery", href: "/services#lasik" },
    { name: "Retina Treatment", href: "/services#retina" },
    { name: "Glaucoma Care", href: "/services#glaucoma" },
    { name: "Pediatric Eye Care", href: "/services#pediatric" },
    { name: "Corneal Transplant", href: "/services#corneal" }
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg">
              <Image
          src="/logo.png" // replace with actual image path
          alt="Sudha Eye Hospital Logo"
          width={64}
          height={64}
          className="w-21 h-21 object-contain"
        />
      </div>
              <div>
                <div className="font-bold text-xl">Sudha</div>
                <div className="text-sm text-gray-400">Eye Hospital</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing world-class eye care services with cutting-edge technology 
              and compassionate treatment for over 15 years. Your vision is our mission.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>Surya Tower, Opposite, Hanuman Temple Rd, MBD Complex</p>
                  <p>HMT Nagar, Nacharam, Hyderabad, Secunderabad, Telangana</p>
                  <p>500076</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">+91 99858 07860</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">sudhaeyehospital.nacharam@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 mt-1" />
                <div className="text-sm text-gray-400">
                  <p>Mon-Sat: 11:00 AM - 10:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


 
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 Sudha Eye Hospital. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
