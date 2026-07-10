import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Radar, ShieldCheck, Users, Zap, Store, Star, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BG_FOOD   = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80';
const BG_CAMPUS = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80';

const perks = [
  { icon: <ShieldCheck size={20} />, title: 'Verified Vendors',   desc: 'Every listing is confirmed accurate before going live.' },
  { icon: <Users size={20} />,       title: 'Student-Centred',    desc: 'Built for the UCC community — free, fast, accessible.' },
  { icon: <Zap size={20} />,         title: 'Instant WhatsApp',   desc: 'One tap connects you directly with any vendor.' },
  { icon: <Store size={20} />,       title: '12+ Campus Vendors', desc: 'Food, printing, beauty, tech and more in one place.' },
];

export default function Login() {
  const [mode, setMode]         = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex relative overflow-hidden">

      {/* ── Split background ── */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${BG_FOOD}')` }} />
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${BG_CAMPUS}')` }} />
      </div>
      <div className="absolute inset-0 bg-[#172554]/88 backdrop-blur-[2px]" />

      {/* ── Content grid ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-12 py-16">

        {/* ── Left: brand + about panel ── */}
        <div className="flex-1 max-w-lg text-white">

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-11 h-11 bg-[#1E3A8A] border border-blue-400/40 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Radar size={22} className="text-white" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black tracking-tight">UCC</span>
              <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">Radar</span>
            </div>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
            Your Campus.<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">One Platform.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            Discover food, services, and student vendors at the University of Cape Coast — all in one place. Fast, free, and built for you.
          </p>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {perks.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-4 flex gap-3">
                <div className="text-amber-400 shrink-0 mt-0.5">{icon}</div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex gap-6">
            {[
              { value: '12+',  label: 'Vendors' },
              { value: '8+',   label: 'Locations' },
              { value: '100%', label: 'Free' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-white/45 text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: auth card ── */}
        <div className="w-full max-w-sm">
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
              {/* Email */}
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5">Password</label>
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
