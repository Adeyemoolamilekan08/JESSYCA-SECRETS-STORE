import { Star } from 'lucide-react'

export default function Rating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="flex items-center gap-0.5 text-champagne" aria-label={`${rating} out of 5 stars`}>
        <Star size={13} fill="currentColor" />
        <span className="font-semibold text-charcoal">{rating.toFixed(1)}</span>
      </span>
      {reviews !== undefined && <span className="text-black/45">({reviews})</span>}
    </div>
  )
}