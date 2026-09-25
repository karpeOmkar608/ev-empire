export type ProductFamily = 'empire-prime' | 'empire-duo' | 'empire-family' | 'empire-classic'

export type Product = {
  slug: string
  model: string
  family: ProductFamily
  familyName: string
  series: string
  seriesLabel: string
  price: number
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
  badge?: string
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
