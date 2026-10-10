import { Link } from 'react-router-dom'
import { Clock3, MessageCircle } from 'lucide-react'
import { openWhatsApp, WHATSAPP_NUMBER } from '../../utils/whatsapp'

export default function Footer() {
  return (
    <footer className="mt-20 bg-plum-900 text-white">
      <div className="container-shell py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-3xl">Jessyca Secrets</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/65">
              Beauty, cosmetic and personal-care essentials selected for everyday confidence.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Quick Links</h2>
            <div className="mt-4 grid gap-2.5 text-sm text-white/65">
              <Link className="hover:text-white" to="/">Home</Link>
              <Link className="hover:text-white" to="/shop">Shop</Link>
              <Link className="hover:text-white" to="/about">About</Link>
              <Link className="hover:text-white" to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Customer Support</h2>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <button onClick={() => openWhatsApp('Hello Jessyca Secrets, I need help choosing a product.')} className="flex items-center gap-2 text-left hover:text-white">
                <MessageCircle size={16} /> WhatsApp
              </button>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white">+234 704 232 9891</a>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Opening Hours</h2>
            <div className="mt-4 flex gap-2 text-sm text-white/65">
              <Clock3 size={17} className="mt-0.5 shrink-0" />
              <span>Monday – Saturday<br />9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/45">
          © 2026 Jessyca Secrets. All rights reserved.
        </div>
      </div>
    </footer>
  )
}