import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import type { Product } from '../types/product'

const categoryOptions = ['all', 'skincare', 'makeup', 'hair-care', 'fragrance', 'body-care', 'personal-care']

export default function Shop({ initialCategory, wishlisted, onWishlist, onAdd }: {
  initialCategory?: string
  wishlisted: string[]
  onWishlist: (id: string) => void
  onAdd: (p: Product) => void
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory || 'all')
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(20000)
  const [mobileFilters, setMobileFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchesSearch = `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      const matchesPrice = p.price <= maxPrice
      return matchesSearch && matchesCategory && matchesPrice
    })
    if (sort === 'newest') list = [...list].sort((a,b) => b.createdAt.localeCompare(a.createdAt))
    if (sort === 'low') list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'rated') list = [...list].sort((a,b) => b.rating - a.rating)
    return list
  }, [search, category, maxPrice, sort])

  const clear = () => { setSearch(''); setCategory('all'); setMaxPrice(20000); setSort('featured') }

  return (
    <main>
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-shell">
          <p className="eyebrow">The collection</p>
          <h1 className="mt-3 font-display text-6xl text-plum-900 sm:text-7xl">Shop beauty.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/60">Browse skincare, makeup, fragrance, hair and personal-care essentials.</p>
        </div>
      </section>

      <section className="container-shell py-10 lg:py-14">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" />
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <input id="product-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="h-11 w-full border border-black/10 bg-white pl-10 pr-4 text-sm outline-none focus:border-plum-600" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMobileFilters(true)} className="flex h-11 items-center gap-2 border border-black/10 bg-white px-4 text-sm font-semibold lg:hidden"><SlidersHorizontal size={16} /> Filters</button>
            <label className="flex h-11 items-center gap-2 border border-black/10 bg-white px-3 text-sm">
              <span className="hidden text-black/45 sm:inline">Sort</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent outline-none">
                <option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rated">Best Rated</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} clear={clear} />
          </aside>
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-charcoal/50"><span className="font-semibold text-charcoal">{filtered.length}</span> products</p>
              {(search || category !== 'all' || maxPrice < 20000) && <button onClick={clear} className="flex items-center gap-1 text-xs font-semibold text-plum-900">Clear filters <X size={13} /></button>}
            </div>
            {filtered.length ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-6">{filtered.map(p => <ProductCard key={p.id} product={p} wishlisted={wishlisted.includes(p.id)} onWishlist={onWishlist} onAdd={onAdd} />)}</div>
            ) : (
              <div className="border border-black/10 bg-white py-20 text-center"><p className="font-display text-3xl">Nothing matched your search.</p><button onClick={clear} className="button-secondary mt-5">Clear filters</button></div>
            )}
          </div>
        </div>
      </section>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-charcoal/30 lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="ml-auto h-full w-[min(88vw,380px)] overflow-y-auto bg-ivory p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-3xl">Filters</h2><button onClick={() => setMobileFilters(false)}><X /></button></div>
            <div className="mt-8"><FilterPanel category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} clear={clear} /></div>
          </div>
        </div>
      )}
    </main>
  )
}

function FilterPanel({ category, setCategory, maxPrice, setMaxPrice, clear }: {
  category: string; setCategory: (v: string) => void; maxPrice: number; setMaxPrice: (v: number) => void; clear: () => void
}) {
  return (
    <div>
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.18em]">Category</h2>
        <div className="mt-4 grid gap-2">
          {categoryOptions.map(option => <button key={option} onClick={() => setCategory(option)} className={`border-b border-black/5 py-2 text-left text-sm capitalize ${category === option ? 'font-semibold text-plum-900' : 'text-charcoal/55 hover:text-charcoal'}`}>{option === 'all' ? 'All products' : option.replace('-', ' ')}</button>)}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em]">Maximum price</h2>
        <p className="mt-3 text-sm font-semibold">₦{maxPrice.toLocaleString('en-NG')}</p>
        <input aria-label="Maximum price" type="range" min="4000" max="20000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="mt-4 w-full accent-plum-900" />
      </div>
      <button onClick={clear} className="mt-10 text-xs font-semibold text-plum-900 underline underline-offset-4">Clear all filters</button>
    </div>
  )
}