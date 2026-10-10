export type Product = {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  gallery?: string[]
  description: string
  benefits: string[]
  quantity: number
  featured?: boolean
  createdAt: string
}