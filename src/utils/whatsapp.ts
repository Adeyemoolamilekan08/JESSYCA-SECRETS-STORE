import type { Product } from '../types/product'

export const WHATSAPP_NUMBER = '2347042329891'

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function productWhatsAppMessage(product: Product, quantity = 1) {
  return `Hello Jessyca Secrets, I am interested in purchasing ${product.name}. Quantity: ${quantity}.`
}

export function cartWhatsAppMessage(
  items: Array<{ product: Product; quantity: number }>,
  total: number,
) {
  const lines = items.map(
    ({ product, quantity }) =>
      `• ${product.name} — ${quantity} × ₦${product.price.toLocaleString('en-NG')}`,
  )
  return [
    'Hello Jessyca Secrets, I would like to place an order:',
    '',
    ...lines,
    '',
    `Estimated total: ₦${total.toLocaleString('en-NG')}`,
    '',
    'Please confirm availability and next steps.',
  ].join('\n')
}