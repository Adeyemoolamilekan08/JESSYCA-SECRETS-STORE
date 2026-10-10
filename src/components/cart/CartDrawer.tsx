import { Minus, Plus, Trash2, X, MessageCircle, ShoppingBag } from 'lucide-react'
import type { Product } from '../../types/product'
import { cartWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp'

type Item = { product: Product; quantity: number }
type Props = {
  open: boolean
  onClose: () => void
  items: Item[]
  subtotal: number
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export default function CartDrawer({ open, onClose, items, subtotal, updateQuantity, removeFromCart, clearCart }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/35" onClick={onClose}>
      <aside className="ml-auto flex h-full w-full max-w-[440px] flex-col bg-ivory shadow-2xl" onClick={e => e.stopPropagation()} aria-label="Shopping cart">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 className="mt-1 font-display text-3xl text-charcoal">Shopping bag</h2>
          </div>
          <button onClick={onClose} aria-label="Close shopping bag" className="grid h-10 w-10 place-items-center border border-black/10"><X size={19} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <ShoppingBag size={30} className="mx-auto text-plum-600" strokeWidth={1.5} />
                <p className="mt-4 font-display text-2xl">Your bag is empty</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-charcoal/55">Browse the collection and add products you would like to order.</p>
                <button onClick={onClose} className="button-primary mt-6">Continue shopping</button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 border-b border-black/10 pb-5">
                  <img src={product.image} alt={product.name} className="h-24 w-20 object-cover bg-cream" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-plum-600">{product.category.replace('-', ' ')}</p>
                        <p className="mt-1 text-sm font-semibold">{product.name}</p>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`} className="text-black/35 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                    <p className="mt-2 text-sm font-semibold">₦{(product.price * quantity).toLocaleString('en-NG')}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-black/10">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="grid h-8 w-8 place-items-center" aria-label="Decrease quantity"><Minus size={13} /></button>
                        <span className="w-7 text-center text-xs">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="grid h-8 w-8 place-items-center" aria-label="Increase quantity"><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-xs font-semibold text-black/45 underline underline-offset-4 hover:text-charcoal">Clear bag</button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 bg-white px-5 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/55">Estimated total</span>
              <span className="font-semibold">₦{subtotal.toLocaleString('en-NG')}</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-charcoal/45">Final availability and delivery details will be confirmed on WhatsApp.</p>
            <button
              onClick={() => openWhatsApp(cartWhatsAppMessage(items, subtotal))}
              className="mt-4 flex w-full items-center justify-center gap-2 bg-plum-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-plum-800"
            >
              <MessageCircle size={17} /> Order via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}