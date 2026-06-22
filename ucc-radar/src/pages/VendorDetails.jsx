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
} from 'lucide-react';
import { vendors, getApprovedVendors } from '../data/vendors';

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

function CommentsSection({ vendorId }) {
  const storageKey = `comments_${vendorId}`;
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    setComments((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        text: text.trim(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      },
      ...prev,
    ]);
    setName('');
    setText('');
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-black text-gray-900 mb-5">Comments</h2>

      {/* Post form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400"
        />
        <textarea
          placeholder="Leave a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors"
        >
          <Send size={14} />
          Post Comment
        </button>
      </form>

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <UserCircle2 size={32} className="text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-800">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-words">{c.text}</p>
              </div>
            </div>
          ))}
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
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
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
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
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
                <span className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                      className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
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
                        <span className="mt-2 inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
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
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="text-sm text-gray-700 leading-snug">{location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Open Hours
                    </p>
                    <p className="text-sm text-gray-700 leading-snug">{openHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact}`}
                      className="text-sm text-emerald-700 font-semibold hover:underline"
                    >
                      {contact}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Truck size={16} className="text-emerald-600" />
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
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                  Price Range
                </p>
                <p className="text-2xl font-black text-emerald-800">
                  GHS {minPrice} <span className="text-base font-medium text-emerald-600">to</span> GHS {maxPrice}
                </p>
                <p className="text-xs text-emerald-600 mt-1">Prices vary per item and portion size</p>
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
              className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-emerald-600 text-emerald-700 font-bold text-base rounded-2xl hover:bg-emerald-50 transition-colors"
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
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Browse More Vendors
          </Link>
        </div>
      </div>
    </div>
  );
}
