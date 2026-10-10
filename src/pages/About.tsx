import { Heart, Sparkles, ShieldCheck } from 'lucide-react'

export default function About() {
  return (
    <main>
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-shell grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div><p className="eyebrow">About Jessyca Secrets</p><h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.9] text-plum-900 sm:text-7xl">Beauty should feel personal.</h1></div>
          <p className="max-w-xl text-sm leading-7 text-charcoal/60">Jessyca Secrets is a beauty, cosmetic and personal-care business focused on making everyday product shopping simple, approachable and enjoyable.</p>
        </div>
      </section>
      <section className="container-shell grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="aspect-[0.9] overflow-hidden bg-cream"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=88" alt="Beauty products and cosmetics" className="h-full w-full object-cover" loading="lazy" /></div>
        <div>
          <p className="eyebrow">What we care about</p>
          <h2 className="mt-3 font-display text-5xl leading-tight text-plum-900">Good products. Helpful service. No unnecessary fuss.</h2>
          <p className="mt-6 text-sm leading-7 text-charcoal/60">Our approach is straightforward: offer useful beauty and personal-care products, keep the shopping experience clear, and make it easy to speak to a real person when you need help.</p>
          <div className="mt-9 grid gap-6 border-t border-black/10 pt-7">
            {[
              [Sparkles, 'Beauty', 'Products that fit naturally into everyday beauty routines.'],
              [ShieldCheck, 'Quality', 'Carefully selected items with a focus on practical value.'],
              [Heart, 'Confidence', 'A shopping experience that helps you choose what feels right for you.'],
            ].map(([Icon, title, text]) => { const I = Icon as typeof Heart; return <div key={title as string} className="flex gap-4"><I size={21} strokeWidth={1.5} className="mt-1 shrink-0 text-plum-700" /><div><h3 className="font-semibold">{title as string}</h3><p className="mt-1 text-sm leading-6 text-charcoal/55">{text as string}</p></div></div> })}
          </div>
        </div>
      </section>
    </main>
  )
}