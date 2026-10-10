import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'

export default function CategorySection() {
  return (
    <section className="container-shell py-20 lg:py-24">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Browse by category</p>
          <h2 className="section-title mt-3">Find your routine.</h2>
        </div>
        <Link to="/shop" className="text-sm font-semibold text-plum-900 underline decoration-champagne underline-offset-8">View all products</Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
        {categories.map(category => (
          <Link key={category.slug} to={`/shop/${category.slug}`} className="group relative overflow-hidden bg-cream">
            <div className="aspect-[0.88] overflow-hidden">
              <img src={category.image} alt={category.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">{category.name}</h3>
                  <p className="mt-1 max-w-[240px] text-xs leading-5 text-white/75">{category.description}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/40"><ArrowUpRight size={17} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}