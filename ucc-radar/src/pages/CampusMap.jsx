import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Navigation } from 'lucide-react';
import { vendors } from '../data/vendors';
import VendorCard from '../components/VendorCard';

const BG_FOOD    = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80';
const BG_MALL    = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80';
const BG_PRINT   = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80';
const BG_CLOTHES = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80';

const ZONES = [
  {
    id: 'main-campus',
    label: 'Main Campus',
    sublabel: 'Admin block, Library & Academic areas',
    emoji: '🏛️',
    border: 'border-blue-400/40',
    bg: 'bg-blue-500/15',
    bgHover: 'hover:bg-blue-500/22',
    bgActive: 'bg-blue-500/30',
    ring: 'ring-2 ring-blue-400/60',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    accent: 'text-blue-300',
    dot: 'bg-blue-400',
    match: (loc) =>
      loc.includes('on campus') &&
      !loc.includes('female hostel') &&
      !loc.includes('male hostel') &&
      !loc.includes('clubhouse'),
  },
  {
    id: 'senior-clubhouse',
    label: 'Senior Clubhouse',
    sublabel: 'Campus social hub & café corner',
    emoji: '☕',
    border: 'border-teal-400/40',
    bg: 'bg-teal-500/15',
    bgHover: 'hover:bg-teal-500/22',
    bgActive: 'bg-teal-500/30',
    ring: 'ring-2 ring-teal-400/60',
    glow: 'shadow-[0_0_30px_rgba(20,184,166,0.2)]',
    accent: 'text-teal-300',
    dot: 'bg-teal-400',
    match: (loc) => loc.includes('clubhouse'),
  },
  {
    id: 'hostels',
    label: 'Hostel Areas',
    sublabel: 'Male & Female residential halls',
    emoji: '🏘️',
    border: 'border-purple-400/40',
    bg: 'bg-purple-500/15',
    bgHover: 'hover:bg-purple-500/22',
    bgActive: 'bg-purple-500/30',
    ring: 'ring-2 ring-purple-400/60',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    accent: 'text-purple-300',
    dot: 'bg-purple-400',
    match: (loc) => loc.includes('female hostel') || loc.includes('male hostel'),
  },
  {
    id: 'amamoma',
    label: 'Amamoma Village',
    sublabel: 'Student streets, local food & services',
    emoji: '🍽️',
    border: 'border-amber-400/40',
    bg: 'bg-amber-500/15',
    bgHover: 'hover:bg-amber-500/22',
    bgActive: 'bg-amber-500/30',
    ring: 'ring-2 ring-amber-400/60',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
    accent: 'text-amber-300',
    dot: 'bg-amber-400',
    match: (loc) => loc.includes('amamoma') || loc.includes('ayensu'),
  },
  {
    id: 'school-bus-rd',
    label: 'School Bus Road',
    sublabel: 'Near the main campus entrance',
    emoji: '🚌',
    border: 'border-orange-400/40',
    bg: 'bg-orange-500/15',
    bgHover: 'hover:bg-orange-500/22',
    bgActive: 'bg-orange-500/30',
    ring: 'ring-2 ring-orange-400/60',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    accent: 'text-orange-300',
    dot: 'bg-orange-400',
    match: (loc) => loc.includes('school bus'),
  },
  {
    id: 'off-campus',
    label: 'Off Campus',
    sublabel: 'Cape Coast & Takoradi Road',
    emoji: '🏙️',
    border: 'border-gray-400/30',
    bg: 'bg-white/8',
    bgHover: 'hover:bg-white/12',
    bgActive: 'bg-white/16',
    ring: 'ring-2 ring-gray-400/50',
    glow: 'shadow-[0_0_30px_rgba(156,163,175,0.15)]',
    accent: 'text-gray-300',
    dot: 'bg-gray-400',
    match: (loc) =>
      loc.includes('off campus') || loc.includes('cape coast') || loc.includes('takoradi'),
  },
];

function assignZone(vendor) {
  const loc = vendor.location.toLowerCase();
  return ZONES.find((z) => z.match(loc)) ?? ZONES[0];
}

export default function CampusMap() {
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const vendorListRef = useRef(null);

  const vendorsByZone = useMemo(() => {
    const map = {};
    ZONES.forEach((z) => (map[z.id] = []));
    vendors.forEach((v) => {
      const zone = assignZone(v);
      map[zone.id].push(v);
    });
    return map;
  }, []);

  function handleZoneClick(zoneId) {
    const isDeselect = selectedZoneId === zoneId;
    setSelectedZoneId(isDeselect ? null : zoneId);
    if (!isDeselect) {
      setTimeout(() => {
        vendorListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  const selectedZone = ZONES.find((z) => z.id === selectedZoneId);
  const selectedVendors = selectedZoneId ? vendorsByZone[selectedZoneId] : [];

  return (
    <div className="pt-16 min-h-screen relative">

      {/* Fixed 4-quadrant background */}
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

        {/* Page header */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link
              to="/vendors"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to all vendors
            </Link>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#1E3A8A]/60 border border-blue-400/30 rounded-xl flex items-center justify-center">
                  <Navigation size={22} className="text-blue-300" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">Campus Zone Map</h1>
                  <p className="text-white/50 text-sm mt-0.5">Select a zone to see vendors in that area</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/35 text-xs">
                <MapPin size={12} />
                University of Cape Coast
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">

          {/* Zone Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
            {ZONES.map((zone) => {
              const count = vendorsByZone[zone.id].length;
              const isActive = selectedZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.id)}
                  className={`relative text-left rounded-2xl p-5 border backdrop-blur-md transition-all duration-300 active:scale-[0.98] group ${
                    zone.border
                  } ${
                    isActive
                      ? `${zone.bgActive} ${zone.ring} ${zone.glow}`
                      : `${zone.bg} ${zone.bgHover}`
                  }`}
                >
                  {/* Vendor count badge */}
                  <span
                    className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-black text-white ${
                      isActive ? zone.dot : 'bg-white/20'
                    } transition-colors`}
                  >
                    {count}
                  </span>

                  <span className="text-3xl block mb-3">{zone.emoji}</span>
                  <h3 className={`font-black text-base leading-tight mb-1 ${isActive ? zone.accent : 'text-white'} transition-colors`}>
                    {zone.label}
                  </h3>
                  <p className="text-white/45 text-xs leading-snug">{zone.sublabel}</p>

                  {/* Active indicator dot */}
                  <div className={`absolute bottom-3 right-3 flex items-center gap-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${zone.dot} animate-pulse`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <p className="text-center text-white/25 text-xs mb-10">
            Tap a zone to browse its vendors
          </p>

          {/* Vendor list for selected zone */}
          <div ref={vendorListRef}>
            {selectedZone && (
              <div>
                {/* Zone heading */}
                <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md mb-6 ${selectedZone.border} ${selectedZone.bgActive}`}>
                  <span className="text-xl">{selectedZone.emoji}</span>
                  <span className={`font-bold text-base ${selectedZone.accent}`}>{selectedZone.label}</span>
                  <span className="text-white/40 text-sm">·</span>
                  <span className="text-white/50 text-sm">{selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''}</span>
                </div>

                {selectedVendors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {selectedVendors.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} glass />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-16 text-center">
                    <div className="text-4xl mb-3">{selectedZone.emoji}</div>
                    <p className="text-white/40 text-sm">No vendors listed in this zone yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
