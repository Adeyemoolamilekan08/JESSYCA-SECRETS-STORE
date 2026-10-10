import { Clock3, MessageCircle, Phone } from 'lucide-react'
import { openWhatsApp, WHATSAPP_NUMBER } from '../utils/whatsapp'

export default function Contact() {
  return (
    <main>
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-shell"><p className="eyebrow">Get in touch</p><h1 className="mt-4 font-display text-6xl text-plum-900 sm:text-7xl">We are here to help.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/60">Have a question about a product or want to check availability? Send us a WhatsApp message and we will be happy to help.</p></div>
      </section>
      <section className="container-shell py-16 lg:py-24">
        <div className="grid gap-px bg-black/10 md:grid-cols-3">
          <div className="bg-ivory p-8"><MessageCircle size={22} className="text-plum-700" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-plum-600">WhatsApp</p><h2 className="mt-2 font-display text-3xl">Chat with us</h2><button onClick={() => openWhatsApp('Hello Jessyca Secrets, I would like to make an enquiry.')} className="mt-5 text-sm font-semibold text-plum-900 underline underline-offset-4">Start a conversation</button></div>
          <div className="bg-ivory p-8"><Phone size={22} className="text-plum-700" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-plum-600">Phone</p><h2 className="mt-2 font-display text-3xl">+234 704 232 9891</h2><a href={`tel:+${WHATSAPP_NUMBER}`} className="mt-5 inline-block text-sm font-semibold text-plum-900 underline underline-offset-4">Call the business</a></div>
          <div className="bg-ivory p-8"><Clock3 size={22} className="text-plum-700" /><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-plum-600">Opening hours</p><h2 className="mt-2 font-display text-3xl">9:00 AM – 6:00 PM</h2><p className="mt-5 text-sm text-charcoal/55">Monday – Saturday</p></div>
        </div>
        <div className="mt-10 border border-black/10 bg-white p-7"><p className="text-sm leading-6 text-charcoal/60">Visit our store or contact us on WhatsApp for location details.</p></div>
      </section>
    </main>
  )
}