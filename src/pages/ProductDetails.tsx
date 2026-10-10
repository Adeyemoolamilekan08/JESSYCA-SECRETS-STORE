import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { products } from '../data/products'
import Rating from '../components/common/Rating'
import { openWhatsApp, productWhatsAppMessage } from '../utils/whatsapp'
import type { Product } from '../types/product'

export default function ProductDetails({ onAdd, wishlisted, onWishlist }: { onAdd: (p: Product, q?: number) => void; wishlisted: string[]; onWishlist: (id: string) => void }) {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [image, setImage] = useState(product?.image || '')
  const [quantity, setQuantity] = useState(1)

  if (!product) return <main className="container-shell py-24 text-center"><h1 className="font-display text-4xl">Product not found</h1><Link to="/shop" className="button-primary mt-6">Back to shop</Link></main>

  const gallery = [product.image, ...(product.gallery || [])].filter((v, i, a) => a.indexOf(v) === i)
  const isWishlisted = wishlisted.includes(product.id)

  const add = () => { onAdd(product, quantity); toast.success(`${product.name} added to bag`) }

  return (
    <main className="container-shell py-8 lg:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal/55 hover:text-plum-900"><ArrowLeft size={15} /> Back to shop</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-3 sm:grid-cols-[84px_1fr]">
          <div className="order-2 flex gap-3 sm:order-1 sm:grid sm:content-start">
            {gallery.map(src => <button key={src} onClick={() => setImage(src)} className={`aspect-square overflow-hidden border ${image === src ? 'border-plum-900' : 'border-black/10'}`}><img src={src} alt={`${product.name} view`} className="h-full w-full object-cover" /></button>)}
          </div>
          <div className="order-1 aspect-[0.9] overflow-hidden bg-cream sm:order-2">
            <img src={image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">{product.category.replace('-', ' ')}</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] text-plum-900 sm:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-center gap-4"><Rating rating={product.rating} reviews={product.reviews} /><span className="text-xs text-black/40">In stock: {product.quantity}</span></div>
          <div className="mt-6 flex items-center gap-3"><span className="text-2xl font-semibold">₦{product.price.toLocaleString('en-NG')}</span>{product.oldPrice && <span className="text-sm text-black/35 line-through">₦{product.oldPrice.toLocaleString('en-NG')}</span>}</div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-charcoal/60">{product.description}</p>
          <div className="mt-7 border-y border-black/10 py-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em]">Benefits</h2>
            <ul className="mt-4 grid gap-2 text-sm text-charcoal/65">{product.benefits.map(b => <li key={b} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />{b}</li>)}</ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex h-12 items-center border border-black/10">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="grid h-full w-11 place-items-center" aria-label="Decrease quantity"><Minus size={15} /></button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))} className="grid h-full w-11 place-items-center" aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
            <button onClick={add} className="button-primary flex-1"><ShoppingBag size={17} /> Add to bag</button>
            <button onClick={() => { onWishlist(product.id); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist') }} aria-label="Toggle wishlist" className={`grid h-12 w-12 place-items-center border ${isWishlisted ? 'border-plum-900 text-plum-900' : 'border-black/10'}`}><Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} /></button>
          </div>
          <button onClick={() => openWhatsApp(productWhatsAppMessage(product, quantity))} className="mt-3 flex w-full items-center justify-center gap-2 border border-plum-900 px-5 py-3.5 text-sm font-semibold text-plum-900 hover:bg-plum-900 hover:text-white"><MessageCircle size={17} /> Buy via WhatsApp</button>
        </div>
      </div>
    </main>
  )
}