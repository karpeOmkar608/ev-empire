import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().min(1, 'ID is required').regex(/^[a-z0-9-]+$/, 'ID must be lowercase letters, numbers, and hyphens only'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  model: z.string().min(1, 'Model name is required').max(100),
  family: z.string().min(1, 'Product family is required'),
  familyName: z.string().min(1, 'Family name is required').max(100),
  series: z.string().min(1, 'Series is required').max(100),
  seriesLabel: z.string().min(1, 'Series label is required').max(100),
  price: z.number().positive('Price must be a positive number').max(10_000_000, 'Price seems too high'),
  shortDescription: z.string().max(300).optional().default(''),
  description: z.string().max(2000).optional().default(''),
  controller: z.string().min(1, 'Controller is required').max(50),
  brake: z.string().min(1, 'Brake type is required').max(100),
  chargerType: z.string().min(1, 'Charger type is required').max(100),
  chargingTime: z.string().min(1, 'Charging time is required').max(100),
  battery: z.string().min(1, 'Battery type is required').max(100),
  range: z.string().min(1, 'Range is required').max(50),
  maxSpeed: z.string().min(1, 'Max speed is required').max(50),
  dimension: z.string().min(1, 'Dimensions are required').max(200),
  loadingCapacity: z.string().min(1, 'Loading capacity is required').max(50),
  bodyType: z.string().min(1, 'Body type is required').max(100),
  image: z.string().min(1, 'Image path is required'),
  badge: z.string().max(50).nullable().optional(),
  features: z.array(z.string().min(1).max(100)).max(20).optional().default([]),
  active: z.boolean(),
  featured: z.boolean(),
})

export type ProductSchema = z.infer<typeof productSchema>

export const createProductSchema = productSchema

export const updateProductSchema = productSchema.partial().extend({
  id: z.string().min(1),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginSchema = z.infer<typeof loginSchema>
