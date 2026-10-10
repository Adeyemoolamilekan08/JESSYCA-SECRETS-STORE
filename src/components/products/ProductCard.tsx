import { Heart, Plus, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { Product } from '../../types/product'
import Rating from '../common/Rating'

type Props = {
  product: Product
  wishlisted: boolean
  onWishlist: (id: string) => void
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, wishlisted, onWishlist, onAdd }: Props) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-cream">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`} className="block aspect-[0.88] overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
        </Link>
        {product.oldPrice && (
          <span className="absolute left-3 top-3 bg-plum-900 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Sale</span>
        )}
        <button
          onClick={() => { onWishlist(product.id); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist') }}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center border bg-ivory/95 transition ${wishlisted ? 'border-plum-900 text-plum-900' : 'border-black/10 text-charcoal/65 hover:text-plum-900'}`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link to={`/product/${product.id}`} className="flex flex-1 items-center justify-center gap-2 bg-ivory px-3 py-2.5 text-xs font-semibold text-charcoal">
            <Eye size={15} /> Quick view
          </Link>
          <button onClick={() => { onAdd(product); toast.success(`${product.name} added to bag`) }} className="grid h-10 w-10 place-items-center bg-plum-900 text-white" aria-label={`Add ${product.name} to cart`}>
            <Plus size={17} />
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-plum-600">{product.category.replace('-', ' ')}</p>
        <Link to={`/product/${product.id}`} className="mt-1 block font-medium text-charcoal hover:text-plum-700">{product.name}</Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">₦{product.price.toLocaleString('en-NG')}</span>
            {product.oldPrice && <span className="text-xs text-black/35 line-through">₦{product.oldPrice.toLocaleString('en-NG')}</span>}
          </div>
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>
        <button onClick={() => { onAdd(product); toast.success(`${product.name} added to bag`) }} className="mt-3 flex w-full items-center justify-center gap-2 border border-black/10 py-2.5 text-xs font-semibold text-charcoal transition hover:border-plum-900 hover:text-plum-900 md:opacity-0 md:group-hover:opacity-100">
          <Plus size={15} /> Add to bag
        </button>
      </div>
    </article>
  )
}