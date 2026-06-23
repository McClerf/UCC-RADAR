import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Utensils,
  UtensilsCrossed,
  Globe,
  Zap,
  Coffee,
  MapPin,
  Star,
  ShieldCheck,
  Users,
  Store,
  GraduationCap,
  Printer,
  Scissors,
  Laptop,
  Shirt,
  BookOpen,
} from 'lucide-react';
import { featuredVendors } from '../data/vendors';
import VendorCard from '../components/VendorCard';

const foodCategories = [
  {
    icon: <Utensils size={22} />,
    label: 'Local Dishes',
    tab: 'food', sub: 'local',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    desc: 'Jollof, fufu, banku & more',
  },
  {
    icon: <UtensilsCrossed size={22} />,
    label: 'Restaurant',
    tab: 'food', sub: 'restaurant',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    desc: 'Full dining, grills & mains',
  },
  {
    icon: <Zap size={22} />,
    label: 'Fast Food',
    tab: 'food', sub: 'fast_food',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    desc: 'Burgers, kelewele & snacks',
  },
  {
    icon: <Coffee size={22} />,
    label: 'Cafés & Drinks',
    tab: 'food', sub: 'cafe',
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    desc: 'Smoothies, sobolo & fresh juice',
  },
  {
    icon: <Globe size={22} />,
    label: 'Chinese / Intl',
    tab: 'food', sub: 'chinese',
    color: 'bg-red-50 text-red-600 border-red-200',
    desc: 'Chinese cuisine & international',
  },
];

const studentCategories = [
  {
    icon: <Printer size={22} />,
    label: 'Printing & Stationery',
    tab: 'student', sub: 'printing',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    desc: 'Prints, binding & past questions',
  },
  {
    icon: <Scissors size={22} />,
    label: 'Hair & Beauty',
    tab: 'student', sub: 'beauty',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    desc: 'Haircuts, braids & beauty care',
  },
  {
    icon: <Laptop size={22} />,
    label: 'Tech Services',
    tab: 'student', sub: 'tech',
    color: 'bg-sky-50 text-sky-600 border-sky-200',
    desc: 'Repairs, accessories & support',
  },
  {
    icon: <Shirt size={22} />,
    label: 'Clothing',
    tab: 'student', sub: 'clothing',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    desc: 'Custom prints, merch & fashion',
  },
  {
    icon: <BookOpen size={22} />,
    label: 'Tutoring & Academic',
    tab: 'student', sub: 'tutoring',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
    desc: 'Peer tutors & exam prep',
  },
];

const steps = [
  {
    step: '01',
    title: 'Browse Vendors',
    desc: 'Explore food vendors and student services on campus. Filter by category, delivery, or price to find exactly what you need.',
    color: 'bg-blue-50 text-[#1E3A8A]',
  },
  {
    step: '02',
    title: 'View Details',
    desc: 'Check menus, prices, service offerings, opening hours, and vendor locations — all in one place before you decide.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    step: '03',
    title: 'Connect Instantly',
    desc: 'Tap the WhatsApp button to chat directly with any vendor on your phone — fast, easy, no middleman.',
    color: 'bg-blue-50 text-[#1E3A8A]',
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
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#172554]/95 via-slate-900/85 to-[#1E3A8A]/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── Left: text content ── */}
          <div>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <ShieldCheck size={14} />
              Trusted by UCC Students
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Discover the Best
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Vendors on Campus</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              From smoky jollof rice to printing services and hair salons — find every food and student vendor at the University of Cape Coast in one place.
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Quick category links */}
            <div className="flex flex-wrap gap-2">
              {['Jollof Rice', 'Waakye', 'Smoothies', 'Printing', 'Hair & Beauty'].map((tag) => (
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

          {/* ── Right: floating 3D vendor cards ── */}
          <div className="hidden lg:block relative h-[480px]">
            {/* Ambient glow orbs */}
            <div className="absolute w-56 h-56 bg-amber-500/20 rounded-full blur-3xl top-10 right-10" style={{ animation: 'pulseGlow 4s ease-in-out infinite' }} />
            <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-3xl bottom-16 left-8" style={{ animation: 'pulseGlow 3.5s ease-in-out infinite 1.2s' }} />
            <div className="absolute w-24 h-24 bg-purple-500/15 rounded-full blur-2xl top-24 left-16" style={{ animation: 'pulseGlow 5s ease-in-out infinite 0.5s' }} />

            {/* ── Food card (main, centre) ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-52"
              style={{ animation: 'floatCard 4s ease-in-out infinite' }}
            >
              <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/20 backdrop-blur-md rounded-2xl p-5 border border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="text-5xl mb-3">🍛</div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Food Vendor</span>
                <h3 className="text-white font-black text-base leading-tight mt-1 mb-2">Jollof Rice Spot</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-amber-400 text-xs">★★★★★</span>
                  <span className="text-white/60 text-xs ml-1">4.9 · 120 reviews</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                  <MapPin size={10} />
                  Main Campus, UCC
                </div>
                <div className="mt-3 flex gap-1.5">
                  <span className="px-2 py-0.5 bg-amber-500/30 border border-amber-400/30 text-amber-300 text-[10px] font-semibold rounded-full">Local Dishes</span>
                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-400/20 text-green-300 text-[10px] font-semibold rounded-full">🛵 Delivery</span>
                </div>
              </div>
            </div>

            {/* ── Hair & Beauty card (top-right) ── */}
            <div
              className="absolute top-6 right-0 z-10 w-44"
              style={{ animation: 'floatCardReverse 3.8s ease-in-out infinite 0.6s' }}
            >
              <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 backdrop-blur-md rounded-2xl p-4 border border-purple-400/35 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="text-4xl mb-2">✂️</div>
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Hair & Beauty</span>
                <h3 className="text-white font-black text-sm leading-tight mt-1 mb-2">Glam Studio</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-amber-400 text-xs">★★★★</span>
                  <span className="text-white/55 text-xs ml-1">4.7</span>
                </div>
                <div className="flex items-center gap-1 text-white/45 text-xs">
                  <MapPin size={9} />
                  Female Hostel Area
                </div>
              </div>
            </div>

            {/* ── Printing card (bottom-left) ── */}
            <div
              className="absolute bottom-8 left-0 z-10 w-44"
              style={{ animation: 'floatCardSlow 5s ease-in-out infinite 1.2s' }}
            >
              <div className="bg-gradient-to-br from-[#1E3A8A]/60 to-blue-700/30 backdrop-blur-md rounded-2xl p-4 border border-blue-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="text-4xl mb-2">🖨️</div>
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Printing</span>
                <h3 className="text-white font-black text-sm leading-tight mt-1 mb-2">Quick Print Hub</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-amber-400 text-xs">★★★★</span>
                  <span className="text-white/55 text-xs ml-1">4.5</span>
                </div>
                <div className="flex items-center gap-1 text-white/45 text-xs">
                  <MapPin size={9} />
                  Science Complex
                </div>
              </div>
            </div>

            {/* Small decorative floating badge */}
            <div
              className="absolute top-2 left-12 z-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-1.5"
              style={{ animation: 'floatCard 6s ease-in-out infinite 2s' }}
            >
              <span className="text-xs">🔥</span>
              <span className="text-white text-xs font-semibold">Live on Campus</span>
            </div>
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
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#172554] to-[#1E3A8A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white">
                  {icon}
                </div>
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-sm text-blue-200">{label}</p>
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
              Browse by <span className="bg-gradient-to-r from-[#1E3A8A] to-amber-500 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From local Ghanaian dishes to student services — find everything you need on UCC campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Food Vendors card */}
            <Link
              to="/vendors?tab=food"
              className="group relative overflow-hidden rounded-3xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-8 hover:shadow-lg hover:border-amber-300 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <UtensilsCrossed size={20} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Food Vendors</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Local dishes, restaurants, fast food, cafés, and international cuisine — every meal craving on campus, covered.
              </p>
              <span className="inline-flex items-center gap-1.5 text-amber-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Explore food <ArrowRight size={14} />
              </span>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-100/60 rounded-full" />
              <div className="absolute -bottom-8 -right-0 w-16 h-16 bg-orange-100/60 rounded-full" />
            </Link>

            {/* Student Vendors card */}
            <Link
              to="/vendors?tab=student"
              className="group relative overflow-hidden rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-violet-50 p-8 hover:shadow-lg hover:border-purple-300 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <GraduationCap size={20} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Student Vendors</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Printing, hair & beauty, tech repairs, clothing, and tutoring — everything a UCC student needs, right on campus.
              </p>
              <span className="inline-flex items-center gap-1.5 text-purple-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Explore services <ArrowRight size={14} />
              </span>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100/60 rounded-full" />
              <div className="absolute -bottom-8 -right-0 w-16 h-16 bg-violet-100/60 rounded-full" />
            </Link>
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
              className="flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#172554] transition-colors shrink-0"
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
              Whether you're grabbing a meal or getting a service done — it starts here.
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
      <section className="py-20 bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-400/10 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-amber-400/5 rounded-full -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Explore All Vendors?
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
            Food, services, and everything in between — the complete campus vendor directory, all in one place.
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
