import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, UtensilsCrossed, GraduationCap } from 'lucide-react';
import { vendors, getApprovedVendors } from '../data/vendors';
import VendorCard from '../components/VendorCard';

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'A – Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const foodCategoryValues = ['local', 'restaurant', 'fast_food', 'cafe', 'chinese'];

const foodSubcategories = [
  { value: 'local', label: 'Local Dishes' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'fast_food', label: 'Fast Food' },
  { value: 'cafe', label: 'Cafés & Drinks' },
  { value: 'chinese', label: 'Chinese / International' },
];

const studentSubcategories = [
  { value: 'printing', label: 'Printing & Stationery' },
  { value: 'beauty', label: 'Hair & Beauty' },
  { value: 'tech', label: 'Tech Services' },
  { value: 'clothing', label: 'Clothing & Accessories' },
  { value: 'tutoring', label: 'Tutoring & Academic' },
];

export default function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [activeSubcategory, setActiveSubcategory] = useState(searchParams.get('sub') || '');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setActiveSubcategory('');
  }

  const filtered = useMemo(() => {
    let list = [...vendors, ...getApprovedVendors()];

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

    if (activeTab === 'food') {
      list = list.filter((v) => foodCategoryValues.includes(v.category));
      if (activeSubcategory) list = list.filter((v) => v.category === activeSubcategory);
    } else if (activeTab === 'student') {
      list = list.filter((v) => !foodCategoryValues.includes(v.category));
      if (activeSubcategory) list = list.filter((v) => v.category === activeSubcategory);
    }

    if (deliveryFilter === 'delivery') {
      list = list.filter((v) => v.delivery);
    } else if (deliveryFilter === 'no-delivery') {
      list = list.filter((v) => !v.delivery);
    }

    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      const aMin = a.menu.length > 0 ? Math.min(...a.menu.map((m) => m.priceMin)) : 0;
      const bMin = b.menu.length > 0 ? Math.min(...b.menu.map((m) => m.priceMin)) : 0;
      return sortBy === 'price-asc' ? aMin - bMin : bMin - aMin;
    });

    return list;
  }, [query, activeTab, activeSubcategory, deliveryFilter, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setActiveTab('all');
    setActiveSubcategory('');
    setDeliveryFilter('all');
    setSortBy('rating');
    setSearchParams({});
  };

  const hasFilters =
    query || activeTab !== 'all' || activeSubcategory || deliveryFilter !== 'all' || sortBy !== 'rating';

  const subcategories = activeTab === 'food' ? foodSubcategories : activeTab === 'student' ? studentSubcategories : [];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">All Vendors</h1>
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

        {/* Top-level tabs + delivery */}
        <div className={`flex flex-wrap items-center gap-2 mb-3 ${showFilters ? '' : 'hidden sm:flex'}`}>
          {/* Main tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              All Vendors
            </button>
            <button
              onClick={() => handleTabChange('food')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTab === 'food'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              <UtensilsCrossed size={13} />
              Food Vendors
            </button>
            <button
              onClick={() => handleTabChange('student')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTab === 'student'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              <GraduationCap size={13} />
              Student Vendors
            </button>
          </div>

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

        {/* Subcategory pills — appear when a tab is active */}
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 pl-1">
            {subcategories.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveSubcategory(activeSubcategory === value ? '' : value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeSubcategory === value
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

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
            {activeTab !== 'all' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                {activeTab === 'food' ? 'Food Vendors' : 'Student Vendors'}
                <button onClick={() => handleTabChange('all')}><X size={10} /></button>
              </span>
            )}
            {activeSubcategory && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                {subcategories.find((c) => c.value === activeSubcategory)?.label}
                <button onClick={() => setActiveSubcategory('')}><X size={10} /></button>
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
