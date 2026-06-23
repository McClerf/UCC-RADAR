import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { vendors } from '../data/vendors';
import { useSavedVendors } from '../context/SavedVendorsContext';
import VendorCard from '../components/VendorCard';

const BG_FOOD    = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80';
const BG_MALL    = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80';
const BG_PRINT   = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80';
const BG_CLOTHES = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80';

export default function SavedVendors() {
  const { savedIds, count } = useSavedVendors();
  const savedVendors = vendors.filter((v) => savedIds.has(v.id));

  return (
    <div className="pt-16 min-h-screen relative">

      {/* Fixed 4-quadrant background — matches Vendors page */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_FOOD}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_MALL}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_PRINT}')` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url('${BG_CLOTHES}')` }} />
        </div>
        <div className="absolute inset-0 bg-[#172554]/87" />
      </div>

      <div className="relative z-10">

        {/* Page Header */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link
              to="/vendors"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to all vendors
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center justify-center">
                <Heart size={20} className="fill-red-400 text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">Saved Vendors</h1>
                <p className="text-white/50 text-sm mt-0.5">
                  {count === 0 ? 'Your favourites list is empty' : `${count} vendor${count !== 1 ? 's' : ''} saved`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
          {savedVendors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {savedVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} glass />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center mb-5">
                <Heart size={32} className="text-white/30" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No saved vendors yet</h3>
              <p className="text-white/50 mb-7 max-w-xs leading-relaxed">
                Tap the heart on any vendor card to save your regular spots — they'll live here for next time.
              </p>
              <Link
                to="/vendors"
                className="px-7 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#172554] hover:from-[#172554] hover:to-[#0f172a] text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Browse Vendors
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
