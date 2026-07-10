import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Radar, ShieldCheck, Users, Zap, Store,
  Eye, EyeOff, ArrowRight, Target, Star,
  MapPin, UtensilsCrossed, GraduationCap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSiteRating } from '../hooks/useSiteRating';
import { useSiteVisits } from '../hooks/useSiteVisits';

const BG_FOOD   = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80';
const BG_CAMPUS = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80';

const values = [
  {
    icon: <ShieldCheck size={17} />,
    title: 'Accuracy First',
    desc: 'Every vendor listing is verified before going live — menus, prices, and locations you can trust.',
    accent: 'text-blue-300',
    bg: 'bg-blue-500/15 border-blue-400/20',
  },
  {
    icon: <Users size={17} />,
    title: 'Student-Centred',
    desc: 'Every feature is built free for the UCC community — fast, accessible, and always improving.',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-400/20',
  },
  {
    icon: <Zap size={17} />,
    title: 'Instant WhatsApp',
    desc: 'One tap connects you directly with any vendor — no middlemen, no extra apps.',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-400/20',
  },
  {
    icon: <Store size={17} />,
    title: 'Vendor Growth',
    desc: 'We give food vendors and service providers a free digital presence to reach more students.',
    accent: 'text-blue-300',
    bg: 'bg-blue-500/15 border-blue-400/20',
  },
];

export default function Login() {
  const [mode, setMode]         = useState('signin');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);

  const { user, signIn, signUp } = useAuth();
  const { average, count }       = useSiteRating();
  const visitorCount             = useSiteVisits();
  const navigate                 = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const stats = [
    { icon: <Store size={15} />,  value: '12+',  label: 'Vendors' },
    { icon: <Users size={15} />,  value: visitorCount > 0 ? visitorCount.toLocaleString() : '0', label: 'Visitors' },
    { icon: <Star size={15} />,   value: average > 0 ? average.toFixed(1) : '0.0', label: '/ 5 Stars' },
    { icon: <MapPin size={15} />, value: '8+',   label: 'Locations' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password);
        setSuccess('Account created! Check your email to confirm, then sign in.');
        setMode('signin');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-x-hidden">

      {/* ── Split background ── */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${BG_FOOD}')` }} />
          <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${BG_CAMPUS}')` }} />
        </div>
        <div className="absolute inset-0 bg-[#0d1f47]/90 backdrop-blur-[3px]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10 lg:gap-16 py-10 lg:py-14">

        {/* ══════════════════════════════════════
            LEFT PANEL — About UCC Radar
        ══════════════════════════════════════ */}
        <div className="flex-1 max-w-xl text-white">

          {/* Logo */}
          <div className="inline-flex items-center gap-2.5 mb-7">
            <div className="w-11 h-11 bg-[#1E3A8A] border border-blue-400/40 rounded-2xl flex items-center justify-center shadow-lg">
              <Radar size={22} className="text-white" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black tracking-tight">UCC</span>
              <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">Radar</span>
            </div>
          </div>

          {/* Pill */}
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/75 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            About UCC Radar
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
            Connecting UCC Students<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              with Campus Vendors
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/55 text-sm leading-relaxed mb-6">
            A student-built directory that makes finding food vendors and campus services at the University of Cape Coast effortless — all in one place, completely free.
          </p>

          {/* ── Mission ── */}
          <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-[#1E3A8A]/60 border border-blue-400/25 flex items-center justify-center shrink-0">
                <Target size={13} className="text-blue-300" />
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Our Mission</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Make campus life simpler for every UCC student — one reliable directory of food vendors and student services, with real details and a direct WhatsApp line. No guesswork. No wasted trips. Just what you need, found fast.
            </p>
          </div>

          {/* ── Live Stats ── */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {stats.map(({ icon, value, label }) => (
              <div
                key={label}
                className="bg-white/8 border border-white/10 rounded-xl p-2.5 text-center"
              >
                <div className="text-amber-400 flex justify-center mb-1">{icon}</div>
                <p className="text-base font-black text-white leading-none">{value}</p>
                <p className="text-white/40 text-[10px] mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          {/* ── What We Stand For ── */}
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2.5">
            What We Stand For
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {values.map(({ icon, title, desc, accent, bg }) => (
              <div
                key={title}
                className={`rounded-xl p-3 border flex gap-2.5 ${bg}`}
              >
                <div className={`shrink-0 mt-0.5 ${accent}`}>{icon}</div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold mb-0.5">{title}</p>
                  <p className="text-white/45 text-[10px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Category badges ── */}
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <UtensilsCrossed size={12} />
              Food Vendors
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <GraduationCap size={12} />
              Student Services
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — Auth form
        ══════════════════════════════════════ */}
        <div className="w-full max-w-sm lg:self-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            {/* Tab toggle */}
            <div className="flex bg-white/10 rounded-xl p-1 mb-7">
              {['signin', 'signup'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    mode === m
                      ? 'bg-white text-[#1e3a8a] shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-black text-white mb-1">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-white/50 text-sm mb-6">
              {mode === 'signin'
                ? 'Sign in to your UCC Radar account.'
                : 'Join the UCC Radar community for free.'}
            </p>

            {success && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3 text-green-300 text-sm mb-4">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-1"
              >
                {loading
                  ? 'Please wait…'
                  : mode === 'signin' ? 'Sign In' : 'Create Account'}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>

            <p className="mt-6 text-center text-white/40 text-xs">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); }}
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                {mode === 'signin' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>

            <p className="mt-4 text-center text-white/25 text-[11px]">
              By continuing you agree to UCC Radar's terms of use.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
