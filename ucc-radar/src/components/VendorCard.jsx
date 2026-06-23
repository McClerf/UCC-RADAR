import { Link } from 'react-router-dom';
import { MapPin, Star, Truck, MessageCircle, ChevronRight } from 'lucide-react';

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

function StarRating({ rate, count }) {
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
                : 'text-gray-300 fill-gray-100'
            }
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700">{rate.toFixed(1)}</span>
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
}

export default function VendorCard({ vendor }) {
  const { id, name, shortDescription, image, location, rating, delivery, category, menu, whatsapp } =
    vendor;

  const cat = categoryStyles[category];
  const minPrice = menu && menu.length > 0 ? Math.min(...menu.map((m) => m.priceMin)) : null;
  const maxPrice = menu && menu.length > 0 ? Math.max(...menu.map((m) => m.priceMax)) : null;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
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
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{name}</h3>
          {minPrice && (
            <span className="shrink-0 text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-full">
              GHS {minPrice}+
            </span>
          )}
        </div>

        <StarRating rate={rating.rate} count={rating.count} />

        <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {shortDescription}
        </p>

        <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400">
          <MapPin size={12} className="shrink-0 mt-0.5 text-[#1E3A8A]" />
          <span className="line-clamp-2">{location}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors border border-green-100"
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
