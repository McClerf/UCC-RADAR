import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Clock } from 'lucide-react';
import { supabase } from '../config/supabase';

const SAMPLE_DEALS = [
  {
    id: 's1',
    vendor_name: 'Mama Akua Kitchen',
    emoji: '🍛',
    deal_text: 'Jollof rice + grilled chicken + fried plantain',
    price: 15,
    original_price: 20,
  },
  {
    id: 's2',
    vendor_name: 'Bright Printing Services',
    emoji: '🖨️',
    deal_text: 'Print 10 pages, pay for 8 — valid all day',
    price: 4,
    original_price: null,
  },
  {
    id: 's3',
    vendor_name: 'Fresh Sip Café',
    emoji: '🥤',
    deal_text: 'Any smoothie + free chin chin snack pack',
    price: 8,
    original_price: 12,
  },
  {
    id: 's4',
    vendor_name: 'Glam Hair Studio',
    emoji: '✂️',
    deal_text: 'Student braiding special — all styles, walk-ins welcome',
    price: 30,
    original_price: 50,
  },
];

export default function TodaysSpecials() {
  const [specials, setSpecials] = useState(SAMPLE_DEALS);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    supabase
      .from('daily_specials')
      .select('*')
      .eq('active', true)
      .eq('special_date', today)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setSpecials(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (specials.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % specials.length), 3800);
    return () => clearInterval(t);
  }, [specials.length]);

  const prev = () => setIdx((i) => (i - 1 + specials.length) % specials.length);
  const next = () => setIdx((i) => (i + 1) % specials.length);

  // Three visible slots: left preview, center (active), right preview
  const get = (offset) => specials[(idx + offset + specials.length) % specials.length];
  const showSides = specials.length >= 3;

  return (
    <section className="relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full">
              <Flame size={13} className="text-amber-400" />
              <span className="text-amber-300 text-[11px] font-bold uppercase tracking-widest">Hot Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Today's Specials</h2>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={prev}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 active:scale-95"
              aria-label="Previous deal"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 active:scale-95"
              aria-label="Next deal"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Card tray — 1 on mobile, 3 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

          {/* Left preview */}
          {showSides && (
            <button
              onClick={prev}
              className="hidden md:block text-left w-full rounded-2xl p-5 bg-white/8 border border-white/10 opacity-55 hover:opacity-75 transition-all duration-300 backdrop-blur-md"
            >
              <DealCardInner deal={get(-1)} center={false} />
            </button>
          )}

          {/* Center — active */}
          <div
            className={`rounded-2xl p-6 border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/25 to-orange-600/15 backdrop-blur-md shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500 ${
              showSides ? '' : 'md:col-span-3 md:max-w-lg md:mx-auto'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow">
                Today Only
              </span>
              <span className="text-3xl">{get(0).emoji}</span>
            </div>
            <p className="text-amber-300/70 text-xs font-semibold uppercase tracking-wide mt-3 mb-1">
              {get(0).vendor_name}
            </p>
            <p className="text-white font-bold text-lg leading-snug">{get(0).deal_text}</p>
            {get(0).price != null && (
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-amber-400 font-black text-2xl">GHS {get(0).price}</span>
                {get(0).original_price != null && (
                  <span className="text-white/35 text-base line-through">GHS {get(0).original_price}</span>
                )}
              </div>
            )}
          </div>

          {/* Right preview */}
          {showSides && (
            <button
              onClick={next}
              className="hidden md:block text-left w-full rounded-2xl p-5 bg-white/8 border border-white/10 opacity-55 hover:opacity-75 transition-all duration-300 backdrop-blur-md"
            >
              <DealCardInner deal={get(1)} center={false} />
            </button>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {specials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to deal ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? 'w-5 h-1.5 bg-amber-400'
                  : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/45'
              }`}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Clock size={11} />
            Deals refresh daily — check back tomorrow for new offers
          </div>
        </div>
      </div>
    </section>
  );
}

function DealCardInner({ deal }) {
  return (
    <>
      <div className="text-2xl mb-2">{deal.emoji}</div>
      <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wide truncate">{deal.vendor_name}</p>
      <p className="text-white/70 text-sm font-semibold leading-snug mt-1 line-clamp-2">{deal.deal_text}</p>
      {deal.price != null && (
        <p className="text-amber-400/80 font-bold text-base mt-2">GHS {deal.price}</p>
      )}
    </>
  );
}
