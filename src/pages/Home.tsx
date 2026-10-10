import Hero from '../components/hero/Hero'
import CategorySection from '../components/categories/CategorySection'
import FeaturedProducts from '../components/products/FeaturedProducts'
import { Check, Heart, MessageCircle, ShieldCheck } from 'lucide-react'
import { openWhatsApp } from '../utils/whatsapp'
import type { Product } from '../types/product'

export default function Home({ wishlisted, onWishlist, onAdd }: { wishlisted: string[]; onWishlist: (id: string) => void; onAdd: (p: Product) => void }) {
  return (
    <>
      <Hero />
      <section className="border-b border-black/10 bg-ivory">
        <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">Beauty, care & confidence</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-plum-900 sm:text-5xl">The little things that make your routine feel good.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-charcoal/60">
            Jessyca Secrets brings together practical beauty, cosmetic and personal-care essentials with friendly local service. Browse at your pace, then order directly on WhatsApp.
          </p>
        </div>
      </section>
      <CategorySection />
      <FeaturedProducts wishlisted={wishlisted} onWishlist={onWishlist} onAdd={onAdd} />
      <section className="container-shell py-20 lg:py-24">
        <div className="grid gap-px bg-black/10 md:grid-cols-4">
          {[
            [ShieldCheck, 'Quality Products', 'Carefully selected beauty and personal-care products.'],
            [Heart, 'Personal Service', 'Friendly support whenever you need help choosing a product.'],
            [MessageCircle, 'Easy Ordering', 'Order directly through WhatsApp without a complicated checkout.'],
            [Check, 'Simple Experience', 'A clean and convenient way to browse your beauty essentials.'],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof ShieldCheck
            return <div key={title as string} className="bg-ivory p-7 lg:p-8"><I size={22} strokeWidth={1.5} className="text-plum-700" /><h3 className="mt-5 font-display text-2xl">{title as string}</h3><p className="mt-2 text-sm leading-6 text-charcoal/55">{text as string}</p></div>
          })}
        </div>
      </section>
      <section className="bg-plum-900 py-16 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">Need a little help?</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Talk to Jessyca Secrets.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">Ask about a product, availability or what might fit your routine.</p>
          </div>
          <button onClick={() => openWhatsApp('Hello Jessyca Secrets, I would like some help choosing a product.')} className="inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 text-sm font-semibold hover:bg-white hover:text-plum-900"><MessageCircle size={17} /> Chat on WhatsApp</button>
        </div>
      </section>
    </>
  )
}