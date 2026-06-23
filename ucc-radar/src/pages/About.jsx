import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Users,
  Star,
  Store,
  MapPin,
  Zap,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  UtensilsCrossed,
  GraduationCap,
} from 'lucide-react';

const BG_FOOD    = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80';
const BG_CAMPUS  = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80';

const values = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Accuracy First',
    desc: 'We verify vendor information — menus, prices, and locations — before listing, so you always get reliable details.',
    accent: 'text-blue-300',
  },
  {
    icon: <Users size={22} />,
    title: 'Student-Centred',
    desc: 'Every feature and design decision is made with the UCC student community in mind — accessible, fast, and free.',
    accent: 'text-amber-400',
  },
  {
    icon: <Zap size={22} />,
    title: 'Instant Connection',
    desc: 'One tap connects you directly with the vendor on WhatsApp — no middleman, no unnecessary apps, no delays.',
    accent: 'text-amber-400',
  },
  {
    icon: <Store size={22} />,
    title: 'Vendor Growth',
    desc: 'We empower food vendors and student service providers with a free digital presence, helping them reach more students and grow.',
    accent: 'text-blue-300',
  },
];

const stats = [
  { icon: <Store size={20} />,  value: '12+',    label: 'Listed Vendors' },
  { icon: <Users size={20} />,  value: '2,000+', label: 'Students Reached' },
  { icon: <Star size={20} />,   value: '4.5★',   label: 'Average Rating' },
  { icon: <MapPin size={20} />, value: '8+',     label: 'Campus Locations' },
];

const faqs = [
  {
    q: 'Is UCC Radar free to use?',
    a: 'Absolutely. UCC Radar is 100% free for students and visitors. No sign-up, no hidden charges.',
  },
  {
    q: 'How do I contact a vendor?',
    a: "UCC Radar is a discovery platform. Click the WhatsApp button on any vendor card to chat directly with them — whether you're ordering food or booking a service.",
  },
  {
    q: 'Are the prices and service details accurate?',
    a: 'We work with each vendor to display up-to-date information. Details may vary slightly, so always confirm directly with the vendor via WhatsApp.',
  },
  {
    q: 'Which food vendors offer campus delivery?',
    a: 'Vendors with a gold "Delivery" badge offer campus delivery. You can also filter by delivery on the Vendors page.',
  },
  {
    q: "I'm a vendor. How do I get listed?",
    a: 'Visit our Contact page and fill in the listing request form. Our team will review your submission and reach out within 48 hours.',
  },
];

const card = 'bg-white/10 backdrop-blur-md rounded-2xl border border-white/15';

export default function About() {
  return (
    <div className="pt-16 relative min-h-screen">
      {/* Background — left half food, right half campus students */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('${BG_FOOD}')` }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('${BG_CAMPUS}')` }}
        />
      </div>
      <div className="absolute inset-0 bg-[#172554]/85" />

      <div className="relative z-10">
        {/* ─── Hero ─── */}
        <div className="text-white py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              About UCCRadar
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
              Connecting UCC Students<br />
              <span className="text-amber-400">with Campus Vendors</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
              UCCRadar is a student-built directory that makes finding food vendors and student services on the University of Cape Coast campus effortless — all in one place.
            </p>
            {/* Both-sides badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-5 py-2.5 rounded-full text-sm font-semibold">
                <UtensilsCrossed size={16} />
                Food Vendors
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/25 text-blue-200 px-5 py-2.5 rounded-full text-sm font-semibold">
                <GraduationCap size={16} />
                Student Services
              </div>
            </div>
          </div>
        </div>

        {/* ─── Stats ─── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className={`${card} p-6`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon, value, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400 border border-white/10">
                    {icon}
                  </div>
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="text-sm text-white/55">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Mission & Vision ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${card} p-8`}>
              <div className="w-12 h-12 bg-[#1E3A8A]/60 rounded-2xl flex items-center justify-center text-blue-300 mb-5 border border-blue-400/20">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">Our Mission</h2>
              <p className="text-white/65 leading-relaxed">
                To make campus life simpler for every UCC student — whether you're looking for a meal, a haircut, a printout, or a tutor. We provide a single, reliable directory of food vendors and student services, with real details and a direct line to whoever you need. No guesswork. No wasted trips. Just what you need, found fast.
              </p>
            </div>
            <div className={`${card} p-8`}>
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-5 border border-amber-400/30">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">Our Vision</h2>
              <p className="text-white/65 leading-relaxed">
                To become the most trusted campus discovery platform in Ghana — a tool that every UCC student uses daily, and that every food vendor and service provider considers essential to their business. We envision a campus where no student struggles to find what they need, and no vendor loses a customer for lack of visibility.
              </p>
            </div>
          </div>

          {/* ─── Values ─── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">What We Stand For</h2>
              <p className="text-white/55 max-w-xl mx-auto">
                Four principles guide everything we build and every decision we make.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(({ icon, title, desc, accent }) => (
                <div key={title} className={`${card} p-6 hover:bg-white/15 transition-colors`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 border border-white/10 mb-4 ${accent}`}>
                    {icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── FAQ ─── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-white/55">Got questions? We've answered the most common ones below.</p>
            </div>
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className={`${card} p-6`}>
                  <h3 className="font-bold text-white mb-2 flex items-start gap-2">
                    <span className="text-amber-400 shrink-0 mt-0.5">Q.</span>
                    {q}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed pl-5">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-6 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${card} p-12`}>
              <h2 className="text-3xl font-black text-white mb-4">Ready to Explore Campus Vendors?</h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Food, services, and everything in between — browse all campus vendors and connect in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/vendors"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-full transition-colors shadow-lg"
                >
                  Browse Vendors <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-full transition-colors"
                >
                  <MessageCircle size={16} /> List Your Vendor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
