import { useParams, Link, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { vendors } from '../data/vendors';

const categoryLabel = {
  local: 'Local Dishes',
  continental: 'Continental',
  'fast-food': 'Fast Food',
  drinks: 'Drinks & Juices',
};

const categoryColor = {
  local: 'bg-amber-100 text-amber-700',
  continental: 'bg-blue-100 text-blue-700',
  'fast-food': 'bg-orange-100 text-orange-700',
  drinks: 'bg-teal-100 text-teal-700',
};

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

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find((v) => v.id === id);

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

  const minPrice = Math.min(...menu.map((m) => m.priceMin));
  const maxPrice = Math.max(...menu.map((m) => m.priceMax));

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
                <h2 className="text-xl font-black text-gray-900">Menu</h2>
                <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  GHS {minPrice} – {maxPrice}
                </span>
              </div>

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
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                Price Range
              </p>
              <p className="text-2xl font-black text-emerald-800">
                GHS {minPrice} <span className="text-base font-medium text-emerald-600">to</span> GHS {maxPrice}
              </p>
              <p className="text-xs text-emerald-600 mt-1">Prices vary per item and portion size</p>
            </div>

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
