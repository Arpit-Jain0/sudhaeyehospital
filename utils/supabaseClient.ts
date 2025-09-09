import { createClient } from '@supabase/supabase-js'

// Environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Please check your .env.local file.')
}

// Create Supabase client with fallback values for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Database types for your appointments table
export interface Appointment {
  id?: string
  appointment_type: string
  preferred_date: string
  phone_number: string
  patient_name?: string
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
  created_at?: string
  updated_at?: string
}

// Database types for contact messages
export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  location?: string
  status?: 'new' | 'read' | 'replied' | 'resolved'
  created_at?: string
  updated_at?: string
}

// Helper function to insert contact message into database
export const insertContactMessage = async (messageData: {
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  location?: string
}) => {
  try {
    // Validate required fields
    if (!messageData.name || !messageData.email || !messageData.phone || !messageData.message) {
      return { 
        success: false, 
        error: 'Missing required fields: name, email, phone, or message' 
      }
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject || 'General Inquiry',
        message: messageData.message,
        location: messageData.location || null,
        status: 'new'
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return { 
        success: false, 
        error: `Database error: ${error.message}` 
      }
    }

    console.log('Contact message inserted successfully:', data)
    
    // Send admin notification
    await sendContactNotification(data[0])
    
    return { 
      success: true, 
      data: data[0],
      message: 'Message sent successfully!' 
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }
  }
}

// Helper function to get all contact messages (ADMIN ONLY)
export const getContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact messages:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to update contact message status (ADMIN ONLY)
export const updateContactMessageStatus = async (id: string, status: 'new' | 'read' | 'replied' | 'resolved') => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating contact message:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to delete contact message (ADMIN ONLY)
export const deleteContactMessage = async (id: string) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact message:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Send admin notification when new contact message is created
const sendContactNotification = async (message: any) => {
  try {
    const adminPhoneNumber = "919876543210" // Replace with your actual admin number
    
    const notificationText = `📧 NEW CONTACT MESSAGE 📧
    
Name: ${message.name}
Email: ${message.email}
Phone: ${message.phone}
Subject: ${message.subject}
Location: ${message.location || 'Not specified'}

Message: ${message.message}

Time: ${new Date().toLocaleString()}

Please check admin dashboard: ${window.location.origin}/admin`

    // This will open WhatsApp to send message to admin
    if (typeof window !== 'undefined') {
      console.log('New contact message notification:', notificationText)
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error sending contact notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}

// Helper function to insert appointment into database
export const insertAppointment = async (appointmentData: {
  appointment_type: string
  preferred_date: string
  phone_number: string
  patient_name?: string
}) => {
  try {
    // Validate required fields
    if (!appointmentData.appointment_type || !appointmentData.preferred_date || !appointmentData.phone_number) {
      return { 
        success: false, 
        error: 'Missing required fields: appointment_type, preferred_date, or phone_number' 
      }
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        appointment_type: appointmentData.appointment_type,
        preferred_date: appointmentData.preferred_date,
        phone_number: appointmentData.phone_number,
        patient_name: appointmentData.patient_name || null,
        status: 'pending'
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return { 
        success: false, 
        error: `Database error: ${error.message}` 
      }
    }

    console.log('Appointment inserted successfully:', data)
    
    // Send admin notification
    await sendAdminNotification(data[0])
    
    return { 
      success: true, 
      data: data[0],
      message: 'Appointment booked successfully!' 
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }
  }
}

// Helper function to get all appointments (ADMIN ONLY)
export const getAppointments = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching appointments:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to update appointment status (ADMIN ONLY)
export const updateAppointmentStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show') => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating appointment:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to delete appointment (ADMIN ONLY)
export const deleteAppointment = async (id: string) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting appointment:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to get appointments by date range (ADMIN ONLY)
export const getAppointmentsByDateRange = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('preferred_date', startDate)
      .lte('preferred_date', endDate)
      .order('preferred_date', { ascending: true })

    if (error) {
      console.error('Error fetching appointments by date:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Helper function to get appointment statistics (ADMIN ONLY)
export const getAppointmentStats = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('status, created_at')

    if (error) {
      console.error('Error fetching appointment stats:', error)
      return { success: false, error: error.message }
    }

    // Calculate statistics
    const stats = {
      total: data.length,
      pending: data.filter(a => a.status === 'pending').length,
      confirmed: data.filter(a => a.status === 'confirmed').length,
      completed: data.filter(a => a.status === 'completed').length,
      cancelled: data.filter(a => a.status === 'cancelled').length,
      no_show: data.filter(a => a.status === 'no_show').length,
      today: data.filter(a => {
        const today = new Date().toDateString()
        const appointmentDate = new Date(a.created_at).toDateString()
        return today === appointmentDate
      }).length
    }

    return { success: true, data: stats }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Send admin notification when new appointment is created
const sendAdminNotification = async (appointment: any) => {
  try {
    // You can customize this admin phone number
    const adminPhoneNumber = "919876543210" // Replace with your actual admin number
    
    const message = `🚨 NEW APPOINTMENT ALERT 🚨
    
Patient: ${appointment.patient_name || 'Anonymous'}
Phone: ${appointment.phone_number}
Type: ${appointment.appointment_type}
Date: ${appointment.preferred_date}
Status: PENDING
Time: ${new Date().toLocaleString()}

Please check admin dashboard: ${window.location.origin}/admin`

    // This will open WhatsApp to send message to admin
    // Note: This only works in browser environment
    if (typeof window !== 'undefined') {
      console.log('New appointment notification:', message)
      // You can also integrate with a webhook service here
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}

// Real-time subscription for new appointments (ADMIN ONLY)
export const subscribeToAppointments = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('appointments')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'appointments' 
      }, 
      callback
    )
    .subscribe()

  return subscription
}

// Real-time subscription for new contact messages (ADMIN ONLY)
export const subscribeToContactMessages = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('contact_messages')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'contact_messages' 
      }, 
      callback
    )
    .subscribe()

  return subscription
}

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('Connection test failed:', error)
      return { success: false, error: error.message }
    }

    console.log('Supabase connection successful!')
    return { success: true, message: 'Connected to Supabase successfully' }
  } catch (error) {
    console.error('Connection test error:', error)
    return { success: false, error: 'Failed to connect to Supabase' }
  }
}

export default supabase
