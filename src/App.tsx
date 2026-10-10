import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/navigation/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import type { Product } from './types/product'
import { openWhatsApp } from './utils/whatsapp'

function CategoryShop({ wishlisted, onWishlist, onAdd }: { wishlisted: string[]; onWishlist: (id: string) => void; onAdd: (p: Product) => void }) {
  const { category } = useParams()
  return <Shop initialCategory={category} wishlisted={wishlisted} onWishlist={onWishlist} onAdd={onAdd} />
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('jessyca-wishlist') || '[]') } catch { return [] }
  })

  const cart = useCartInternal()

  useEffect(() => {
    localStorage.setItem('jessyca-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (id: string) => setWishlist(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  const addToCart = (product: Product, quantity = 1) => cart.addToCart(product, quantity)

  return (
    <>
      <ScrollToTop />
      <Header cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home wishlisted={wishlist} onWishlist={toggleWishlist} onAdd={addToCart} />} />
        <Route path="/shop" element={<Shop wishlisted={wishlist} onWishlist={toggleWishlist} onAdd={addToCart} />} />
        <Route path="/shop/:category" element={<CategoryShop wishlisted={wishlist} onWishlist={toggleWishlist} onAdd={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails onAdd={addToCart} wishlisted={wishlist} onWishlist={toggleWishlist} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <button
        onClick={() => openWhatsApp('Hello Jessyca Secrets, I would like to make an enquiry.')}
        aria-label="Chat with Jessyca Secrets on WhatsApp"
        className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-plum-900 text-white shadow-lg transition hover:scale-105 hover:bg-plum-800"
      >
        <span className="text-xs font-bold">WA</span>
      </button>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart.items} subtotal={cart.subtotal} updateQuantity={cart.updateQuantity} removeFromCart={cart.removeFromCart} clearCart={cart.clearCart} />
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#3c153d', color: '#fff', borderRadius: 0, fontSize: '13px' } }} />
    </>
  )
}

function useCartInternal() {
  const [items, setItems] = useState<Array<{ product: Product; quantity: number }>>(() => {
    try { return JSON.parse(localStorage.getItem('jessyca-secrets-cart') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('jessyca-secrets-cart', JSON.stringify(items)) }, [items])
  const addToCart = (product: Product, quantity = 1) => setItems(current => {
    const existing = current.find(i => i.product.id === product.id)
    if (existing) return current.map(i => i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.quantity) } : i)
    return [...current, { product, quantity: Math.min(quantity, product.quantity) }]
  })
  const updateQuantity = (id: string, quantity: number) => setItems(current => quantity <= 0 ? current.filter(i => i.product.id !== id) : current.map(i => i.product.id === id ? { ...i, quantity: Math.min(quantity, i.product.quantity) } : i))
  const removeFromCart = (id: string) => setItems(current => current.filter(i => i.product.id !== id))
  const clearCart = () => setItems([])
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  return { items, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, count }
}

function NotFound() {
  return <main className="container-shell py-24 text-center"><p className="eyebrow">404</p><h1 className="mt-3 font-display text-5xl text-plum-900">Page not found.</h1><a href="/" className="button-primary mt-7">Return home</a></main>
}