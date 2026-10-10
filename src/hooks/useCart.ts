import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/product'

type CartItem = { product: Product; quantity: number }

const CART_KEY = 'jessyca-secrets-cart'

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity = 1) => {
    setItems(current => {
      const existing = current.find(item => item.product.id === product.id)
      if (existing) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.quantity) }
            : item,
        )
      }
      return [...current, { product, quantity: Math.min(quantity, product.quantity) }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(current => current.filter(item => item.product.id !== id))
      return
    }
    setItems(current =>
      current.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.min(quantity, item.product.quantity) }
          : item,
      ),
    )
  }

  const removeFromCart = (id: string) =>
    setItems(current => current.filter(item => item.product.id !== id))

  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return { items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, count }
}