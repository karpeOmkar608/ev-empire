import { z } from 'zod'

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  city: z.string().max(100, 'City name is too long').optional().or(z.literal('')),
  selectedScooter: z
    .string()
    .min(1, 'Please select a scooter model'),
  preferredContact: z.enum(['phone', 'whatsapp', 'email'], {
    message: 'Please select a preferred contact method',
  }),
  message: z.string().max(1000, 'Message is too long').optional().or(z.literal('')),
  honeypot: z.string().max(0, '').optional(), // must be empty
})

export type EnquirySchemaType = z.infer<typeof enquirySchema>
