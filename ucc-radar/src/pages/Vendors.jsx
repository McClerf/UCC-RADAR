import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { vendors, categories } from '../data/vendors';
import VendorCard from '../components/VendorCard';

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'A – Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  /* Sync URL params on mount */
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q) setQuery(q);
    if (cat) setActiveCategory(cat);
  }, []);

  const filtered = useMemo(() => {
    let list = [...vendors];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.shortDescription.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'all') {
      list = list.filter((v) => v.category === activeCategory);
    }

    if (deliveryFilter === 'delivery') {
      list = list.filter((v) => v.delivery);
    } else if (deliveryFilter === 'no-delivery') {
      list = list.filter((v) => !v.delivery);
    }

    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const aMin = Math.min(...a.menu.map((m) => m.priceMin));
      const bMin = Math.min(...b.menu.map((m) => m.priceMin));
      return sortBy === 'price-asc' ? aMin - bMin : bMin - aMin;
    });

    return list;
  }, [query, activeCategory, deliveryFilter, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('all');
    setDeliveryFilter('all');
    setSortBy('rating');
    setSearchParams({});
  };

  const hasFilters =
    query || activeCategory !== 'all' || deliveryFilter !== 'all' || sortBy !== 'rating';

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">All Food Vendors</h1>
          <p className="text-gray-500">
            {filtered.length} vendor{filtered.length !== 1 ? 's' : ''} found on UCC campus
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendors or food types..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full sm:w-48 pl-4 pr-9 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Category Pills */}
        <div className={`flex flex-wrap gap-2 mb-4 ${showFilters ? '' : 'hidden sm:flex'}`}>
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === value
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {label}
            </button>
          ))}

          {/* Delivery toggle */}
          <div className="flex gap-2 ml-auto">
            {[
              { value: 'all', label: 'All' },
              { value: 'delivery', label: '🛵 Delivery' },
              { value: 'no-delivery', label: 'Dine-in Only' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDeliveryFilter(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  deliveryFilter === value
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Active filters:
            </span>
            {query && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                "{query}" <button onClick={() => setQuery('')}><X size={10} /></button>
              </span>
            )}
            {activeCategory !== 'all' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                {categories.find((c) => c.value === activeCategory)?.label}
                <button onClick={() => setActiveCategory('all')}><X size={10} /></button>
              </span>
            )}
            {deliveryFilter !== 'all' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                {deliveryFilter === 'delivery' ? 'Delivery' : 'Dine-in Only'}
                <button onClick={() => setDeliveryFilter('all')}><X size={10} /></button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-400 hover:text-red-500 underline ml-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              We couldn't find any vendors matching your search. Try adjusting your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
