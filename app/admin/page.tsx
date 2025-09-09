"use client"

import { useState, useEffect } from "react"
import { Calendar, Phone, MessageCircle, CheckCircle, X, Clock, User, Filter, Search, Download, Bell, Eye, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointments, updateAppointmentStatus, deleteAppointment } from "@/utils/supabaseClient"
import { formatDistanceToNow } from 'date-fns'

interface Appointment {
  id: string
  appointment_type: string
  preferred_date: string
  phone_number: string
  patient_name?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
  created_at: string
  updated_at?: string
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true)
    const result = await getAppointments()
    if (result.success && result.data) {
      setAppointments(result.data)
      setFilteredAppointments(result.data)
    }
    setLoading(false)
  }

  // Update appointment status
  const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show') => {
    const result = await updateAppointmentStatus(id, newStatus)
    if (result.success) {
      fetchAppointments() // Refresh data
      
      // Send WhatsApp notification based on status
      const appointment = appointments.find(a => a.id === id)
      if (appointment) {
        sendWhatsAppNotification(appointment, newStatus)
      }
    }
  }

  // Delete appointment
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      const result = await deleteAppointment(id)
      if (result.success) {
        fetchAppointments()
      }
    }
  }

  // Send WhatsApp notification
  const sendWhatsAppNotification = (appointment: Appointment, status: string) => {
    let message = ""
    const patientName = appointment.patient_name || "Patient"
    
    switch (status) {
      case 'confirmed':
        message = `Hi ${patientName}, your appointment for ${appointment.appointment_type} on ${appointment.preferred_date} has been CONFIRMED. Please arrive 15 minutes early. Contact: +91 98765 43210`
        break
      case 'cancelled':
        message = `Hi ${patientName}, your appointment for ${appointment.appointment_type} on ${appointment.preferred_date} has been CANCELLED. Please call us to reschedule. Contact: +91 98765 43210`
        break
      case 'completed':
        message = `Hi ${patientName}, thank you for visiting us today. Please follow the prescribed treatment and contact us if you have any concerns. Contact: +91 98765 43210`
        break
    }
    
    if (message) {
      window.open(`https://wa.me/${appointment.phone_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
    }
  }

  // Filter appointments
  useEffect(() => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment => 
        appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone_number.includes(searchTerm) ||
        appointment.appointment_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(appointment => appointment.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const today = new Date()
      const appointmentDate = new Date(filtered[0]?.preferred_date || today)
      
      switch (dateFilter) {
        case "today":
          filtered = filtered.filter(appointment => {
            const date = new Date(appointment.preferred_date)
            return date.toDateString() === today.toDateString()
          })
          break
        case "week":
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(appointment => {
            const date = new Date(appointment.preferred_date)
            return date >= today && date <= weekFromNow
          })
          break
        case "month":
          const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(appointment => {
            const date = new Date(appointment.preferred_date)
            return date >= today && date <= monthFromNow
          })
          break
      }
    }

    setFilteredAppointments(filtered)
  }, [appointments, searchTerm, statusFilter, dateFilter])

  // Load data on component mount
  useEffect(() => {
    fetchAppointments()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [])

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Date Created', 'Patient Name', 'Phone', 'Appointment Type', 'Preferred Date', 'Status'],
      ...filteredAppointments.map(appointment => [
        new Date(appointment.created_at).toLocaleDateString(),
        appointment.patient_name || 'N/A',
        appointment.phone_number,
        appointment.appointment_type,
        appointment.preferred_date,
        appointment.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'no_show': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <X className="w-4 h-4" />
      case 'no_show': return <Eye className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage appointments and track patient interactions</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={fetchAppointments} variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search by name, phone, or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setDateFilter("all")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
            <CardDescription>
              Manage and track all patient appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold">
                              {appointment.patient_name || 'Anonymous Patient'}
                            </span>
                          </div>
                          <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{appointment.phone_number}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.preferred_date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.appointment_type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            <span>{formatDistanceToNow(new Date(appointment.created_at))} ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {/* WhatsApp Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`https://wa.me/${appointment.phone_number.replace(/[^0-9]/g, '')}?text=Hi ${appointment.patient_name || 'there'}, this is regarding your appointment for ${appointment.appointment_type} on ${appointment.preferred_date}. Please let us know if you need any assistance.`, '_blank')}
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          WhatsApp
                        </Button>
                        
                        {/* Call Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`tel:${appointment.phone_number}`)}
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        
                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(appointment.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
