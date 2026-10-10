import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from './ProductCard'
import type { Product } from '../../types/product'

type Props = { wishlisted: string[]; onWishlist: (id: string) => void; onAdd: (p: Product) => void }

export default function FeaturedProducts({ wishlisted, onWishlist, onAdd }: Props) {
  const featured = products.filter(p => p.featured).slice(0, 8)
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-shell">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The edit</p>
            <h2 className="section-title mt-3">Shop our favorites.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-charcoal/55">A small selection of everyday beauty essentials to get your routine started.</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-sm font-semibold text-plum-900 sm:flex">Shop all <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {featured.map(product => <ProductCard key={product.id} product={product} wishlisted={wishlisted.includes(product.id)} onWishlist={onWishlist} onAdd={onAdd} />)}
        </div>
        <Link to="/shop" className="button-secondary mt-10 w-full sm:hidden">Shop all products <ArrowRight size={16} /></Link>
      </div>
    </section>
  )
}