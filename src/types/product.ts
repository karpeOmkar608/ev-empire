export type ProductFamily = string

export type Product = {
  id: string
  slug: string
  model: string
  family: ProductFamily
  familyName: string
  series: string
  seriesLabel: string
  price: number
  shortDescription?: string
  description?: string
  controller: string
  brake: string
  chargerType: string
  chargingTime: string
  battery: string
  range: string
  maxSpeed: string
  dimension: string
  loadingCapacity: string
  bodyType: string
  image: string
  badge?: string | null
  features?: string[]
  active: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type ProductFamily_Data = {
  id: ProductFamily
  name: string
  series: string
  seriesLabel: string
  description: string
  models: Product[]
  image: string
  accentColor: string
}

// Admin-specific types
export type AdminProduct = Product

export type ProductFormData = Omit<Product, 'createdAt' | 'updatedAt'>
