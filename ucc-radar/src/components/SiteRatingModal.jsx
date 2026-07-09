import { useState } from 'react';
import { X, Star } from 'lucide-react';

export default function SiteRatingModal({ average, count, hasRated, onSubmit, onClose }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!selected) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(selected);
      setSubmitted(true);
    } catch (err) {
      console.error('Site rating error:', err);
      setError(err?.message || JSON.stringify(err) || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-[#1e3a8a] to-[#172554] border border-white/20 rounded-3xl p-7 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {submitted || hasRated ? (
          <>
            <div className="text-5xl mb-4">🙏</div>
            <h2 className="text-xl font-black text-white mb-2">Thanks for rating!</h2>
            <p className="text-blue-200 text-sm mb-5">
              Your feedback helps us improve UCC Radar.
            </p>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/15">
              <p className="text-4xl font-black text-white mb-0.5">
                {average > 0 ? average.toFixed(1) : '0.0'}
                <span className="text-lg font-semibold text-white/50"> / 5</span>
              </p>
              <p className="text-blue-200 text-sm">{count} rating{count !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">Rate UCC Radar</h2>
            <p className="text-blue-200 text-sm mb-6">
              How would you rate your experience exploring the site?
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setSelected(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={36}
                    className={`transition-colors ${
                      star <= (hovered || selected)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-white/30'
                    }`}
                  />
                </button>
              ))}
            </div>

            {selected > 0 && (
              <p className="text-blue-200 text-xs mb-4">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][selected]}
              </p>
            )}

            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
            >
              {submitting ? 'Submitting…' : 'Submit Rating'}
            </button>

            {count > 0 && (
              <p className="mt-4 text-white/40 text-xs">
                {average.toFixed(1)} avg · {count} rating{count !== 1 ? 's' : ''}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
