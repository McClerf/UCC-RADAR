import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { vendors } from '../data/vendors';
import { getOpenStatus } from '../utils/openHours';
import { useLiveRating } from '../context/RatingsContext';

const CATEGORY_CFG = {
  local:      { emoji: '🍛', color: '#F59E0B', label: 'Local Dishes' },
  restaurant: { emoji: '🍽️', color: '#3B82F6', label: 'Restaurant' },
  fast_food:  { emoji: '🍔', color: '#F97316', label: 'Fast Food' },
  cafe:       { emoji: '☕', color: '#14B8A6', label: 'Café & Drinks' },
  chinese:    { emoji: '🥢', color: '#EF4444', label: 'Chinese' },
  printing:   { emoji: '🖨️', color: '#A855F7', label: 'Printing' },
  beauty:     { emoji: '✂️', color: '#EC4899', label: 'Beauty' },
  tech:       { emoji: '💻', color: '#0EA5E9', label: 'Tech' },
  clothing:   { emoji: '👗', color: '#6366F1', label: 'Clothing' },
  tutoring:   { emoji: '📚', color: '#8B5CF6', label: 'Tutoring' },
};

const FOOD_CATS = new Set(['local', 'restaurant', 'fast_food', 'cafe', 'chinese']);
const UCC_CENTER = [5.119, -1.280];

// Locked strictly to UCC campus vendor area — no surrounding neighbourhoods
const UCC_BOUNDS = [
  [5.110, -1.295],   // SW corner
  [5.131, -1.268],   // NE corner
];

function makeIcon(category) {
  const c = CATEGORY_CFG[category] ?? { emoji: '📍', color: '#1E3A8A' };
  return L.divIcon({
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;width:40px">
        <div style="
          width:40px;height:40px;
          background:${c.color};
          border:3px solid #fff;
          border-radius:50%;
          box-shadow:0 3px 14px rgba(0,0,0,0.32);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;line-height:1;
        ">${c.emoji}</div>
        <div style="
          width:0;height:0;
          border-left:8px solid transparent;
          border-right:8px solid transparent;
          border-top:11px solid ${c.color};
          margin-top:-2px;
        "></div>
      </div>`,
    iconSize: [40, 53],
    iconAnchor: [20, 53],
    popupAnchor: [0, -55],
    className: '',
  });
}

function VendorPopup({ vendor }) {
  const liveRating = useLiveRating(vendor.id);
  const rating = liveRating ?? vendor.rating;
  const openStatus = getOpenStatus(vendor.openHours);
  const c = CATEGORY_CFG[vendor.category] ?? { emoji: '📍', color: '#1E3A8A', label: vendor.category };
  const isOpen = openStatus.status === 'open';

  return (
    <div style={{ width: 228, fontFamily: 'system-ui,-apple-system,sans-serif', padding: '2px 0' }}>
      <p style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', margin: '0 0 7px', lineHeight: 1.25 }}>
        {vendor.name}
      </p>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ background: c.color + '22', color: c.color, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
          {c.emoji} {c.label}
        </span>
        <span style={{
          background: isOpen ? '#f0fdf4' : '#fef2f2',
          color: isOpen ? '#16a34a' : '#dc2626',
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
        }}>
          {isOpen ? '● Open' : '● Closed'}
        </span>
      </div>

      {rating.count > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, marginBottom: 7 }}>
          <span style={{ color: '#f59e0b' }}>★</span>
          <strong style={{ color: '#111' }}>{rating.rate.toFixed(1)}</strong>
          <span style={{ color: '#9ca3af' }}>({rating.count} {liveRating ? 'reviews' : 'est.'})</span>
          {liveRating && (
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          )}
        </div>
      )}

      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, margin: '0 0 11px' }}>
        {vendor.shortDescription}
      </p>

      <div style={{ display: 'flex', gap: 7 }}>
        {vendor.whatsapp && (
          <a
            href={`https://wa.me/${vendor.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '8px 0', borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: 'center', display: 'block' }}
          >
            💬 WhatsApp
          </a>
        )}
        <a
          href={`/vendors/${vendor.id}`}
          style={{ flex: 1, background: '#1e3a8a', color: '#fff', textDecoration: 'none', padding: '8px 0', borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: 'center', display: 'block' }}
        >
          View Details →
        </a>
      </div>
    </div>
  );
}

function LocateButton() {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  function handleLocate() {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 17, { duration: 1.2 });
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  }

  if (!navigator.geolocation) return null;

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 80 }}>
      <div className="leaflet-control">
        <button
          onClick={handleLocate}
          title="Find my location"
          style={{
            width: 34, height: 34,
            background: '#fff',
            border: '2px solid rgba(0,0,0,0.2)',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 5px rgba(0,0,0,0.15)',
          }}
        >
          {locating ? '⏳' : '📍'}
        </button>
      </div>
    </div>
  );
}

const FILTER_TABS = [
  { value: 'all',      label: 'All Vendors' },
  { value: 'food',     label: '🍽️ Food' },
  { value: 'services', label: '🎓 Services' },
];

export default function CampusMap() {
  const [filter, setFilter] = useState('all');

  const shown = vendors.filter(v =>
    filter === 'food'     ? FOOD_CATS.has(v.category) :
    filter === 'services' ? !FOOD_CATS.has(v.category) : true
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', paddingTop: 64 }}>

      {/* Header bar */}
      <div style={{ background: '#172554', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 20 }}>🗺️</span>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 20, margin: 0 }}>UCC Campus Map</h1>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginLeft: 4 }}>{shown.length} vendors</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 12px' }}>
          Tap any pin to see details · University of Cape Coast
        </p>
        <div style={{ display: 'flex', gap: 7 }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              style={{
                padding: '5px 14px', borderRadius: 999,
                border: filter === tab.value ? 'none' : '1px solid rgba(255,255,255,0.2)',
                background: filter === tab.value ? '#fff' : 'rgba(255,255,255,0.1)',
                color: filter === tab.value ? '#1e3a8a' : 'rgba(255,255,255,0.8)',
                fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={UCC_CENTER}
        zoom={16}
        minZoom={15}
        maxZoom={19}
        maxBounds={UCC_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ flex: 1, width: '100%', minHeight: 0 }}
        scrollWheelZoom
        zoomControl
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <LocateButton />
        {shown.map(vendor =>
          vendor.lat && vendor.lng ? (
            <Marker
              key={vendor.id}
              position={[vendor.lat, vendor.lng]}
              icon={makeIcon(vendor.category)}
            >
              <Popup maxWidth={244} closeButton>
                <VendorPopup vendor={vendor} />
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

      {/* Category legend — horizontally scrollable */}
      <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '10px 16px', flexShrink: 0, overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 7, width: 'max-content' }}>
          {Object.entries(CATEGORY_CFG).map(([key, c]) => (
            <span
              key={key}
              style={{
                background: c.color + '18', color: c.color,
                border: `1px solid ${c.color}40`,
                fontSize: 11, fontWeight: 700,
                padding: '4px 10px', borderRadius: 99,
                whiteSpace: 'nowrap',
              }}
            >
              {c.emoji} {c.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
