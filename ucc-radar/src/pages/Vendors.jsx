import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, UtensilsCrossed, GraduationCap } from 'lucide-react';
import { vendors, getApprovedVendors } from '../data/vendors';
import { isOpenNow } from '../utils/openHours';
import VendorCard from '../components/VendorCard';

const BG_FOOD    = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80';
const BG_MALL    = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80';
const BG_PRINT   = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80';
const BG_CLOTHES = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80';

const sortOptions = [
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name',       label: 'A – Z' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const foodCategoryValues = ['local', 'restaurant', 'fast_food', 'cafe', 'chinese'];

const foodSubcategories = [
  { value: 'local',      label: 'Local Dishes' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'fast_food',  label: 'Fast Food' },
  { value: 'cafe',       label: 'Cafés & Drinks' },
  { value: 'chinese',    label: 'Chinese / International' },
];

const studentSubcategories = [
  { value: 'printing', label: 'Printing & Stationery' },
  { value: 'beauty',   label: 'Hair & Beauty' },
  { value: 'tech',     label: 'Tech Services' },
  { value: 'clothing', label: 'Clothing & Accessories' },
  { value: 'tutoring', label: 'Tutoring & Academic' },
];

const inputGlass = 'bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 transition-all';

export default function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery]                     = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab]             = useState(searchParams.get('tab') || 'all');
  const [activeSubcategory, setActiveSubcategory] = useState(searchParams.get('sub') || '');
  const [deliveryFilter, setDeliveryFilter]   = useState('all');
  const [openNowOnly, setOpenNowOnly]         = useState(false);
  const [sortBy, setSortBy]                   = useState('rating');
  const [showFilters, setShowFilters]         = useState(false);
  const [approvedVendors, setApprovedVendors] = useState([]);

  useEffect(() => {
    getApprovedVendors().then(setApprovedVendors).catch(() => {});
  }, []);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setActiveSubcategory('');
  }

  const filtered = useMemo(() => {
    let list = [...vendors, ...approvedVendors];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.shortDescription.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.category.toLowerCase().includes(q),
      );
    }

    if (activeTab === 'food') {
      list = list.filter((v) => foodCategoryValues.includes(v.category));
      if (activeSubcategory) list = list.filter((v) => v.category === activeSubcategory);
    } else if (activeTab === 'student') {
      list = list.filter((v) => !foodCategoryValues.includes(v.category));
      if (activeSubcategory) list = list.filter((v) => v.category === activeSubcategory);
    }

    if (deliveryFilter === 'delivery')    list = list.filter((v) => v.delivery);
    if (deliveryFilter === 'no-delivery') list = list.filter((v) => !v.delivery);
    if (openNowOnly) list = list.filter((v) => isOpenNow(v.openHours));

    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      if (sortBy === 'name')   return a.name.localeCompare(b.name);
      const aMin = a.menu.length > 0 ? Math.min(...a.menu.map((m) => m.priceMin)) : 0;
      const bMin = b.menu.length > 0 ? Math.min(...b.menu.map((m) => m.priceMin)) : 0;
      return sortBy === 'price-asc' ? aMin - bMin : bMin - aMin;
    });

    return list;
  }, [query, activeTab, activeSubcategory, deliveryFilter, openNowOnly, sortBy, approvedVendors]);

  const clearFilters = () => {
    setQuery('');
    setActiveTab('all');
    setActiveSubcategory('');
    setDeliveryFilter('all');
    setOpenNowOnly(false);
    setSortBy('rating');
    setSearchParams({});
  };

  const hasFilters =
    query || activeTab !== 'all' || activeSubcategory || deliveryFilter !== 'all' || openNowOnly || sortBy !== 'rating';

  const subcategories =
    activeTab === 'food' ? foodSubcategories : activeTab === 'student' ? studentSubcategories : [];

  const tabClass = (active) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
      active
        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-sm'
        : 'bg-white/10 text-white/75 border-white/20 hover:bg-white/20 hover:text-white'
    }`;

  return (
    <div className="pt-16 min-h-screen relative">

      {/* ── Fixed 4-quadrant background ── */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_FOOD}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_MALL}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_PRINT}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_CLOTHES}')` }} />
        </div>
        <div className="absolute inset-0 bg-[#172554]/87" />
      </div>

      {/* ── All page content ── */}
      <div className="relative z-10">

        {/* Page Header */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">All Vendors</h1>
            <p className="text-white/50 text-sm">Food, services &amp; everything on UCC campus — all in one place.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Search + Sort Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendors or food types..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm ${inputGlass}`}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
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
                className={`appearance-none w-full sm:w-48 pl-4 pr-9 py-3 rounded-xl text-sm font-medium cursor-pointer ${inputGlass}`}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#172554] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`sm:hidden flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${inputGlass}`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Top-level tabs + delivery */}
          <div className={`flex flex-wrap items-center gap-2 mb-3 ${showFilters ? '' : 'hidden sm:flex'}`}>
            {/* Main tabs */}
            <div className="flex gap-2">
              <button onClick={() => handleTabChange('all')}     className={tabClass(activeTab === 'all')}>All Vendors</button>
              <button onClick={() => handleTabChange('food')}    className={`flex items-center gap-1.5 ${tabClass(activeTab === 'food')}`}>
                <UtensilsCrossed size={13} /> Food Vendors
              </button>
              <button onClick={() => handleTabChange('student')} className={`flex items-center gap-1.5 ${tabClass(activeTab === 'student')}`}>
                <GraduationCap size={13} /> Student Vendors
              </button>
            </div>

            {/* Delivery + Open Now toggles */}
            <div className="flex gap-2 ml-auto">
              {[
                { value: 'all',         label: 'All' },
                { value: 'delivery',    label: '🛵 Delivery' },
                { value: 'no-delivery', label: 'Dine-in Only' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setDeliveryFilter(value)}
                  className={tabClass(deliveryFilter === value)}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => setOpenNowOnly(!openNowOnly)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  openNowOnly
                    ? 'bg-green-500 text-white border-green-500 shadow-sm'
                    : 'bg-white/10 text-white/75 border-white/20 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${openNowOnly ? 'bg-white' : 'bg-green-400'}`} />
                Open Now
              </button>
            </div>
          </div>

          {/* Subcategory pills */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 pl-1">
              {subcategories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveSubcategory(activeSubcategory === value ? '' : value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    activeSubcategory === value
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-white/10 text-white/60 border-white/20 hover:bg-white/20 hover:text-white'
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
              <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Active filters:</span>
              {query && (
                <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                  "{query}" <button onClick={() => setQuery('')}><X size={10} /></button>
                </span>
              )}
              {activeTab !== 'all' && (
                <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                  {activeTab === 'food' ? 'Food Vendors' : 'Student Vendors'}
                  <button onClick={() => handleTabChange('all')}><X size={10} /></button>
                </span>
              )}
              {activeSubcategory && (
                <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-medium rounded-full border border-amber-400/30">
                  {subcategories.find((c) => c.value === activeSubcategory)?.label}
                  <button onClick={() => setActiveSubcategory('')}><X size={10} /></button>
                </span>
              )}
              {deliveryFilter !== 'all' && (
                <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20">
                  {deliveryFilter === 'delivery' ? 'Delivery' : 'Dine-in Only'}
                  <button onClick={() => setDeliveryFilter('all')}><X size={10} /></button>
                </span>
              )}
              {openNowOnly && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Open Now
                  <button onClick={() => setOpenNowOnly(false)}><X size={10} /></button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-white/35 hover:text-red-400 underline ml-2 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16">
              {filtered.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} glass />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-white mb-2">No vendors found</h3>
              <p className="text-white/55 mb-6 max-w-sm">
                We couldn't find any vendors matching your search. Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#172554] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
