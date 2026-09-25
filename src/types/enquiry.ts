export type EnquiryFormData = {
  fullName: string
  mobileNumber: string
  email?: string
  city?: string
  selectedScooter: string
  preferredContact: 'phone' | 'whatsapp' | 'email'
  message?: string
  honeypot?: string // spam protection
}

export type EnquiryResponse = {
  success: boolean
  message: string
}
