import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Truck, MessageCircle, ChevronRight, Heart, Map } from 'lucide-react';
import { getOpenStatus } from '../utils/openHours';
import { useSavedVendors } from '../context/SavedVendorsContext';
import { useLiveRating } from '../context/RatingsContext';

const categoryStyles = {
  // Food
  local:      { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Local Dishes' },
  restaurant: { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Restaurant' },
  fast_food:  { bg: 'bg-orange-100',  text: 'text-orange-700',  label: 'Fast Food' },
  cafe:       { bg: 'bg-teal-100',    text: 'text-teal-700',    label: 'Café & Drinks' },
  chinese:    { bg: 'bg-red-100',     text: 'text-red-700',     label: 'Chinese' },
  // Student
  printing:   { bg: 'bg-purple-100',  text: 'text-purple-700',  label: 'Printing' },
  beauty:     { bg: 'bg-pink-100',    text: 'text-pink-700',    label: 'Hair & Beauty' },
  tech:       { bg: 'bg-sky-100',     text: 'text-sky-700',     label: 'Tech Services' },
  clothing:   { bg: 'bg-indigo-100',  text: 'text-indigo-700',  label: 'Clothing' },
  tutoring:   { bg: 'bg-violet-100',  text: 'text-violet-700',  label: 'Tutoring' },
};

function StarRating({ rate, count, glass, live }) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            className={
              i <= full
                ? 'text-amber-400 fill-amber-400'
                : i === full + 1 && half
                ? 'text-amber-400 fill-amber-200'
                : glass ? 'text-white/20 fill-white/10' : 'text-gray-300 fill-gray-100'
            }
          />
        ))}
      </div>
      <span className={`text-xs font-semibold ${glass ? 'text-white/80' : 'text-gray-700'}`}>{rate.toFixed(1)}</span>
      <span className={`text-xs ${glass ? 'text-white/40' : 'text-gray-400'}`}>
        ({count} {live ? 'reviews' : 'est.'})
      </span>
      {live && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" title="Live rating from student reviews" />
      )}
    </div>
  );
}

export default function VendorCard({ vendor, glass = false }) {
  const { id, name, shortDescription, image, location, rating, delivery, category, menu, whatsapp, openHours } =
    vendor;
  const navigate = useNavigate();

  const cat = categoryStyles[category];
  const minPrice = menu && menu.length > 0 ? Math.min(...menu.map((m) => m.priceMin)) : null;
  const maxPrice = menu && menu.length > 0 ? Math.max(...menu.map((m) => m.priceMax)) : null;
  const openStatus = getOpenStatus(openHours);

  const { toggle, isSaved } = useSavedVendors();
  const saved = isSaved(id);
  const liveRating = useLiveRating(id);
  const displayRating = liveRating ?? rating;

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  const handleMapView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/map?vendor=${id}`);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp}`, '_blank', 'noopener,noreferrer');
  };

  const cardClass = glass
    ? 'bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/18'
    : 'bg-white shadow-md border border-gray-100 hover:shadow-2xl';

  return (
    <div className={`${cardClass} rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col group`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Category Badge */}
        {cat && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text} shadow-sm`}
          >
            {cat.label}
          </span>
        )}
        {/* Delivery Badge */}
        {delivery && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
            <Truck size={10} />
            Delivery
          </span>
        )}
        {/* Map button */}
        <button
          onClick={handleMapView}
          aria-label="View on map"
          className="absolute bottom-2.5 right-12 w-8 h-8 flex items-center justify-center rounded-full shadow-md bg-white/80 backdrop-blur-sm text-[#1E3A8A] hover:bg-white hover:text-[#172554] transition-all duration-200 active:scale-90"
        >
          <Map size={15} />
        </button>
        {/* Save / Heart button */}
        <button
          onClick={handleSave}
          aria-label={saved ? 'Remove from saved' : 'Save vendor'}
          className={`absolute bottom-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-200 active:scale-90 ${
            saved
              ? 'bg-red-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart size={15} className={saved ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className={`font-bold text-base leading-snug ${glass ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
          {minPrice && (
            <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${glass ? 'text-amber-300 bg-amber-500/20' : 'text-[#1E3A8A] bg-blue-50'}`}>
              GHS {minPrice}+
            </span>
          )}
        </div>

        <StarRating rate={displayRating.rate} count={displayRating.count} glass={glass} live={!!liveRating} />

        {/* Open / Closed badge */}
        {openStatus && (
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            openStatus.status === 'open'
              ? glass ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-700'
              : openStatus.status === 'closed'
              ? glass ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
              : glass ? 'bg-white/10 text-white/45' : 'bg-gray-100 text-gray-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              openStatus.status === 'open' ? 'bg-green-400' :
              openStatus.status === 'closed' ? 'bg-red-400' : 'bg-gray-400'
            }`} />
            {openStatus.label}
          </div>
        )}

        <p className={`mt-2 text-sm line-clamp-2 leading-relaxed flex-1 ${glass ? 'text-white/60' : 'text-gray-500'}`}>
          {shortDescription}
        </p>

        <div className={`mt-3 flex items-start gap-1.5 text-xs ${glass ? 'text-white/45' : 'text-gray-400'}`}>
          <MapPin size={12} className={`shrink-0 mt-0.5 ${glass ? 'text-amber-400' : 'text-[#1E3A8A]'}`} />
          <span className="line-clamp-2">{location}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleWhatsApp}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
              glass
                ? 'bg-green-500/15 text-green-300 border-green-400/25 hover:bg-green-500/25'
                : 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
            }`}
          >
            <MessageCircle size={13} />
            WhatsApp
          </button>
          <Link
            to={`/vendors/${id}`}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#172554] hover:from-[#172554] hover:to-[#0f172a] text-white text-xs font-semibold transition-all shadow-sm hover:shadow-blue-200 hover:shadow-md"
          >
            View Details
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
