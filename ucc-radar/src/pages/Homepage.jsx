import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Utensils,
  Globe,
  Zap,
  Coffee,
  MapPin,
  Star,
  ShieldCheck,
  Users,
  Store,
} from 'lucide-react';
import { featuredVendors } from '../data/vendors';
import VendorCard from '../components/VendorCard';

const categories = [
  {
    icon: <Utensils size={22} />,
    label: 'Local Dishes',
    value: 'local',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    desc: 'Jollof, fufu, banku & more',
  },
  {
    icon: <Globe size={22} />,
    label: 'Continental',
    value: 'continental',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    desc: 'Burgers, pizza, pasta & grills',
  },
  {
    icon: <Zap size={22} />,
    label: 'Fast Food',
    value: 'fast-food',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    desc: 'Meat pies, kelewele & snacks',
  },
  {
    icon: <Coffee size={22} />,
    label: 'Drinks & Juices',
    value: 'drinks',
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    desc: 'Smoothies, sobolo & fresh juice',
  },
];

const steps = [
  {
    step: '01',
    title: 'Browse Vendors',
    desc: 'Explore all food vendors on campus. Filter by cuisine type, price range, or delivery availability.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    step: '02',
    title: 'Check the Menu',
    desc: 'View full menus with prices, food photos, and descriptions before making your choice.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    step: '03',
    title: 'Contact via WhatsApp',
    desc: 'Tap the WhatsApp button to chat directly with the vendor on your phone — fast and easy.',
    color: 'bg-blue-50 text-blue-600',
  },
];

const stats = [
  { icon: <Store size={20} />, value: '12+', label: 'Campus Vendors' },
  { icon: <Users size={20} />, value: '2,000+', label: 'Students Served Daily' },
  { icon: <Star size={20} />, value: '4.5', label: 'Average Rating' },
  { icon: <MapPin size={20} />, value: '8+', label: 'Campus Locations' },
];

export default function Homepage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/vendors?q=${encodeURIComponent(query.trim())}`);
    else navigate('/vendors');
  };

  return (
    <div className="pt-16">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <ShieldCheck size={14} />
              Trusted by UCC Students
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Discover the Best
              <span className="block text-amber-400">Food on Campus</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              From smoky jollof rice to hand-stretched pizza — find every food vendor at the University of Cape Coast in one place. Explore menus, check prices, and connect instantly via WhatsApp.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-10 max-w-lg">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vendors, food types..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Quick category links */}
            <div className="flex flex-wrap gap-2">
              {['Jollof Rice', 'Shawarma', 'Waakye', 'Pizza', 'Smoothies'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/vendors?q=${tag}`)}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-emerald-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white">
                  {icon}
                </div>
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-sm text-emerald-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Whether you're craving traditional Ghanaian flavours or something from afar, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ icon, label, value, color, desc }) => (
              <Link
                key={value}
                to={`/vendors?category=${value}`}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 ${color} hover:scale-105 transition-transform duration-200`}
              >
                <div className="mb-3">{icon}</div>
                <h3 className="font-bold text-base mb-1">{label}</h3>
                <p className="text-xs opacity-70 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Vendors ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                Featured Vendors
              </h2>
              <p className="text-gray-500">Top-rated spots handpicked for quality and value.</p>
            </div>
            <Link
              to="/vendors"
              className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors shrink-0"
            >
              View all vendors <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Getting your next campus meal has never been this easy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc, color }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} mb-5`}>
                  <span className="text-xl font-black">{step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
                {step !== '03' && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px border-t-2 border-dashed border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Explore All Vendors?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg max-w-xl mx-auto">
            Browse the complete directory of campus food vendors, filter by your preferences, and find your next favourite meal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vendors"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-full transition-colors shadow-lg text-base"
            >
              Browse All Vendors →
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-full transition-colors text-base"
            >
              List Your Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
