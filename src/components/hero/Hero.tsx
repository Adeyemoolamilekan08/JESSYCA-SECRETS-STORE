import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { openWhatsApp } from '../../utils/whatsapp'

export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="container-shell grid min-h-[600px] items-stretch gap-8 py-6 md:grid-cols-[1fr_0.9fr] md:py-10 lg:min-h-[650px] lg:gap-14">
        <div className="flex flex-col justify-center py-12 lg:py-20">
          <p className="eyebrow animate-soft-in">Beauty • Care • Confidence</p>
          <h1 className="mt-5 max-w-2xl font-display text-6xl font-semibold leading-[0.88] tracking-tight text-plum-900 sm:text-7xl lg:text-[92px]">
            Beauty that feels like you.
          </h1>
          <p className="mt-7 max-w-lg text-[15px] leading-7 text-charcoal/65">
            Discover thoughtfully selected beauty, cosmetic and personal-care essentials for the routines you actually enjoy.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/shop" className="button-primary">
              Shop Collection <ArrowRight size={17} />
            </Link>
            <button onClick={() => openWhatsApp('Hello Jessyca Secrets, I would like to ask about your products.')} className="button-secondary">
              <MessageCircle size={17} /> Chat on WhatsApp
            </button>
          </div>
          <div className="mt-12 flex items-center gap-8 border-t border-black/10 pt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/50">
            <span>Curated beauty</span><span>Easy ordering</span><span>Local support</span>
          </div>
        </div>
        <div className="relative min-h-[440px] overflow-hidden md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=88"
            alt="Elegant beauty products arranged on a neutral surface"
            className="h-full min-h-[440px] w-full object-cover"
            loading="eager"
          />
          <div className="absolute bottom-5 left-5 bg-ivory/95 px-5 py-4 shadow-soft">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-plum-600">Jessyca Secrets</p>
            <p className="mt-1 font-display text-2xl text-charcoal">Everyday beauty, thoughtfully chosen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}