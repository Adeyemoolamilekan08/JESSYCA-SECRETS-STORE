import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'

type Props = { cartCount: number; onOpenCart: () => void }

const links = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

export default function Header({ cartCount, onOpenCart }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-ivory/95 backdrop-blur">
      <div className="container-shell flex h-[72px] items-center justify-between gap-6">
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <span className="block font-display text-[27px] font-semibold leading-none tracking-tight text-plum-900">JESSYCA</span>
          <span className="block text-[9px] font-bold uppercase tracking-[0.38em] text-plum-600">Secrets</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? 'text-plum-900' : 'text-charcoal/65 hover:text-plum-900'}`
            }>{label}</NavLink>
          ))}
          <NavLink to="/shop/skincare" className={({ isActive }) =>
            `text-sm font-medium transition ${isActive ? 'text-plum-900' : 'text-charcoal/65 hover:text-plum-900'}`
          }>Categories</NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/shop" aria-label="Search products" className="hidden p-2.5 text-charcoal/70 hover:text-plum-900 sm:block">
            <Search size={20} strokeWidth={1.7} />
          </Link>
          <button onClick={onOpenCart} aria-label={`Shopping bag, ${cartCount} items`} className="relative p-2.5 text-charcoal/70 hover:text-plum-900">
            <ShoppingBag size={20} strokeWidth={1.7} />
            {cartCount > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-plum-900 px-1 text-[9px] font-bold text-white">{cartCount}</span>}
          </button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2.5 lg:hidden">
            <Menu size={21} strokeWidth={1.7} />
          </button>
          <button onClick={() => window.open('https://wa.me/2347042329891?text=Hello%20Jessyca%20Secrets%2C%20I%20would%20like%20to%20make%20an%20enquiry.', '_blank', 'noopener,noreferrer')} className="ml-2 hidden bg-plum-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-plum-800 sm:block">
            WhatsApp
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-charcoal/30 lg:hidden" onClick={() => setOpen(false)}>
          <div className="ml-auto h-full w-[min(86vw,360px)] bg-ivory px-6 py-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-plum-900">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="mt-12 grid gap-1" aria-label="Mobile navigation">
              {links.map(([label, href]) => (
                <NavLink key={href} to={href} onClick={() => setOpen(false)} className="border-b border-black/10 py-4 text-lg text-charcoal">
                  {label}
                </NavLink>
              ))}
              <NavLink to="/shop/skincare" onClick={() => setOpen(false)} className="border-b border-black/10 py-4 text-lg text-charcoal">
                Categories
              </NavLink>
            </nav>
            <button onClick={() => window.open('https://wa.me/2347042329891?text=Hello%20Jessyca%20Secrets%2C%20I%20need%20help.', '_blank', 'noopener,noreferrer')} className="mt-8 flex w-full items-center justify-center gap-2 bg-plum-900 px-5 py-3.5 text-sm font-semibold text-white">
              Chat with Us
            </button>
          </div>
        </div>
      )}
    </header>
  )
}