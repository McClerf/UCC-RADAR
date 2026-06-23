import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Star,
  Truck,
  Tag,
  ChevronRight,
  AlertCircle,
  Send,
  UserCircle2,
  Pencil,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import { vendors, getApprovedVendors } from '../data/vendors';
import { supabase } from '../config/supabase';
import { getOpenStatus } from '../utils/openHours';

const categoryLabel = {
  local:      'Local Dishes',
  restaurant: 'Restaurant',
  fast_food:  'Fast Food',
  cafe:       'Café & Drinks',
  chinese:    'Chinese',
  printing:   'Printing & Stationery',
  beauty:     'Hair & Beauty',
  tech:       'Tech Services',
  clothing:   'Clothing & Accessories',
  tutoring:   'Tutoring & Academic',
};

const categoryColor = {
  local:      'bg-amber-100 text-amber-700',
  restaurant: 'bg-blue-100 text-blue-700',
  fast_food:  'bg-orange-100 text-orange-700',
  cafe:       'bg-teal-100 text-teal-700',
  chinese:    'bg-red-100 text-red-700',
  printing:   'bg-purple-100 text-purple-700',
  beauty:     'bg-pink-100 text-pink-700',
  tech:       'bg-sky-100 text-sky-700',
  clothing:   'bg-indigo-100 text-indigo-700',
  tutoring:   'bg-violet-100 text-violet-700',
};

const foodCategories = new Set(['local', 'restaurant', 'fast_food', 'cafe', 'chinese']);

function StarRating({ rate, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={
              i <= Math.floor(rate)
                ? 'text-amber-400 fill-amber-400'
                : i === Math.floor(rate) + 1 && rate % 1 >= 0.5
                ? 'text-amber-400 fill-amber-200'
                : 'text-gray-300 fill-gray-100'
            }
          />
        ))}
      </div>
      <span className="font-bold text-gray-900">{rate.toFixed(1)}</span>
      <span className="text-gray-400 text-sm">({count} reviews)</span>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={24}
            className={
              star <= (hovered || value)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 fill-gray-100'
            }
          />
        </button>
      ))}
    </div>
  );
}

function CommentsSection({ vendorId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [myCommentIds, setMyCommentIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('myCommentIds')) || []; }
    catch { return []; }
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    setComments(data || []);
  }

  useEffect(() => { fetchComments(); }, [vendorId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) { setError('Please fill in both fields.'); return; }
    if (!rating) { setError('Please select a star rating.'); return; }
    setError('');
    setSubmitting(true);
    const { data: inserted, error: err } = await supabase
      .from('comments')
      .insert({ vendor_id: vendorId, name: name.trim(), text: text.trim(), rating })
      .select()
      .single();
    if (err) { setError(`Could not post review: ${err.message}`); setSubmitting(false); return; }
    if (inserted) {
      const updated = [...myCommentIds, inserted.id];
      localStorage.setItem('myCommentIds', JSON.stringify(updated));
      setMyCommentIds(updated);
    }
    await fetchComments();
    setName(''); setText(''); setRating(0);
    setSubmitting(false);
  }

  async function handleSaveEdit(id) {
    if (!editText.trim() || !editRating) return;
    await supabase.from('comments').update({ text: editText.trim(), rating: editRating }).eq('id', id);
    await fetchComments();
    setEditingId(null);
  }

  async function handleDelete(id) {
    await supabase.from('comments').delete().eq('id', id);
    const updated = myCommentIds.filter((i) => i !== id);
    localStorage.setItem('myCommentIds', JSON.stringify(updated));
    setMyCommentIds(updated);
    setConfirmDeleteId(null);
    await fetchComments();
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-black text-gray-900 mb-5">Reviews & Comments</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
        />
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Your Rating *</p>
          <StarPicker value={rating} onChange={setRating} />
        </div>
        <textarea
          placeholder="Leave a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] placeholder:text-gray-400"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1E3A8A] hover:bg-[#172554] disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-colors"
        >
          <Send size={14} />
          {submitting ? 'Posting…' : 'Post Review'}
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No reviews yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((c) => {
            const isMine = myCommentIds.includes(c.id);
            const isEditing = editingId === c.id;
            const isConfirmingDelete = confirmDeleteId === c.id;

            return (
              <div key={c.id} className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <UserCircle2 size={32} className="text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{c.name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    {isMine && !isEditing && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => { setEditingId(c.id); setEditText(c.text); setEditRating(c.rating); setConfirmDeleteId(null); }}
                          className="p-1.5 text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(c.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex flex-col gap-2 mt-1">
                      <StarPicker value={editRating} onChange={setEditRating} />
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(c.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A8A] hover:bg-[#172554] text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          <Check size={12} /> Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                        >
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-0.5 mb-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} className={s <= c.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed break-words">{c.text}</p>
                      {isConfirmingDelete && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-100">
                          <span className="text-xs text-red-600 flex-1">Delete this review?</span>
                          <button onClick={() => handleDelete(c.id)} className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-md transition-colors">Yes</button>
                          <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md transition-colors">No</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [approvedVendors, setApprovedVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedVendors()
      .then(setApprovedVendors)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const vendor = [...vendors, ...approvedVendors].find((v) => v.id === id);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="text-2xl font-black text-gray-900">Vendor Not Found</h2>
        <p className="text-gray-500">The vendor you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/vendors"
          className="px-6 py-3 bg-[#1E3A8A] text-white font-semibold rounded-xl hover:bg-[#172554] transition-colors"
        >
          Browse All Vendors
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    image,
    flyer,
    location,
    contact,
    whatsapp,
    rating,
    menu,
    delivery,
    deliveryFee,
    openHours,
    category,
    tags,
  } = vendor;

  const minPrice = menu && menu.length > 0 ? Math.min(...menu.map((m) => m.priceMin)) : null;
  const maxPrice = menu && menu.length > 0 ? Math.max(...menu.map((m) => m.priceMax)) : null;

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* ─── Hero Banner ─── */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor[category]}`}>
                {categoryLabel[category]}
              </span>
              {delivery && (
                <span className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <Truck size={10} /> Campus Delivery
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">{name}</h1>
            <StarRating rate={rating.rate} count={rating.count} />
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Description + Menu */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-4">About {name}</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Board */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900">
                  {foodCategories.has(category) ? 'Menu' : 'Services & Pricing'}
                </h2>
                {minPrice !== null && (
                  <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    GHS {minPrice} – {maxPrice}
                  </span>
                )}
              </div>

              {menu && menu.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {menu.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="mt-2 inline-block text-xs font-bold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-full w-fit">
                          GHS {item.priceMin} – {item.priceMax}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-6">
                  Detailed {foodCategories.has(category) ? 'menu' : 'service'} information will be added soon. Contact the vendor directly for pricing.
                </p>
              )}
            </div>

            {/* Flyer / Promo Image */}
            {flyer && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-50">
                  <h2 className="text-lg font-black text-gray-900">Promotions & Flyer</h2>
                </div>
                <img src={flyer} alt={`${name} flyer`} className="w-full object-cover max-h-72" />
              </div>
            )}
          </div>

          {/* Right: Info Card */}
          <div className="flex flex-col gap-5">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-gray-900 mb-5">Vendor Info</h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="text-sm text-gray-700 leading-snug">{location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#1E3A8A]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Open Hours
                    </p>
                    {(() => {
                      const st = getOpenStatus(openHours);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-1.5 ${
                          st.status === 'open'
                            ? 'bg-green-50 text-green-700'
                            : st.status === 'closed'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            st.status === 'open' ? 'bg-green-500 animate-pulse' :
                            st.status === 'closed' ? 'bg-red-400' : 'bg-gray-400'
                          }`} />
                          {st.label}
                        </span>
                      );
                    })()}
                    <p className="text-sm text-gray-600 leading-snug">{openHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact}`}
                      className="text-sm text-[#1E3A8A] font-semibold hover:underline"
                    >
                      {contact}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Truck size={16} className="text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Delivery
                    </p>
                    <p className="text-sm text-gray-700">
                      {delivery
                        ? `Available · ${deliveryFee} delivery fee`
                        : 'Not available (dine-in only)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range Card */}
            {minPrice !== null ? (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider mb-1">
                  Price Range
                </p>
                <p className="text-2xl font-black text-[#172554]">
                  GHS {minPrice} <span className="text-base font-medium text-[#1E3A8A]">to</span> GHS {maxPrice}
                </p>
                <p className="text-xs text-[#1E3A8A] mt-1">Prices vary per item and portion size</p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Pricing
                </p>
                <p className="text-sm text-gray-500">Contact this vendor directly for pricing information.</p>
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base rounded-2xl shadow-md transition-colors"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>

            {/* Call Button */}
            <a
              href={`tel:${contact}`}
              className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-base rounded-2xl hover:bg-blue-50 transition-colors"
            >
              <Phone size={18} />
              Call Vendor
            </a>

            {/* Comments */}
            <CommentsSection vendorId={vendor.id} />
          </div>
        </div>

        {/* Back to all vendors */}
        <div className="mt-12 text-center">
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:text-[#172554] transition-colors"
          >
            <ArrowLeft size={16} />
            Browse More Vendors
          </Link>
        </div>
      </div>
    </div>
  );
}
