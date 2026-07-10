import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from 'react-router-dom';
import { vendors } from '../data/vendors';
import { getOpenStatus } from '../utils/openHours';
import { useLiveRating } from '../context/RatingsContext';
import { useUserLocation } from '../context/LocationContext';

const MAPTILER_KEY = 'YfKuF1pv1JfcKgCn9YqD';
const MAPTILER_ATTR = '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Only 10 high-confidence navigation anchors — OSM tiles handle all other building names
const CAMPUS_LANDMARKS = [
  // ── Gates ──────────────────────────────────────────────────────────────
  { name: 'Main Gate',              lat: 5.1083,   lng: -1.2858,  icon: '🚪', minZoom: 14 },
  { name: 'North Gate',             lat: 5.1310,   lng: -1.2848,  icon: '🚪', minZoom: 14 },
  { name: 'Amamoma Gate',           lat: 5.1138,   lng: -1.2938,  icon: '🚪', minZoom: 15 },
  { name: 'Science Gate',           lat: 5.1208,   lng: -1.2710,  icon: '🚪', minZoom: 15 },
  { name: 'Back Gate (Pedu)',       lat: 5.1298,   lng: -1.2858,  icon: '🚪', minZoom: 15 },

  // ── Landmarks visible from far out ─────────────────────────────────────
  { name: 'Cape Coast Castle',      lat: 5.1003,   lng: -1.2913,  icon: '🏰', minZoom: 14 },
  { name: 'University Hospital',    lat: 5.1053,   lng: -1.2831,  icon: '🏥', minZoom: 14 },
  { name: 'Sports Complex',         lat: 5.1245,   lng: -1.2805,  icon: '⚽', minZoom: 14 },
  { name: 'College of Engineering', lat: 5.1206,   lng: -1.2727,  icon: '⚙️', minZoom: 14 },

  // ── Old Site — South Campus (near Atlantic Ocean) ──────────────────────
  { name: 'Admin Block',            lat: 5.1065,   lng: -1.2862,  icon: '🏛️', minZoom: 15 },
  { name: 'Great Hall',             lat: 5.1068,   lng: -1.2840,  icon: '🏛️', minZoom: 15 },
  { name: 'Faculty of Arts',        lat: 5.1072,   lng: -1.2848,  icon: '🎓', minZoom: 15 },
  { name: 'School of Business',     lat: 5.1080,   lng: -1.2845,  icon: '🎓', minZoom: 15 },
  { name: 'Faculty of Law',         lat: 5.1095,   lng: -1.2838,  icon: '⚖️', minZoom: 15 },
  { name: 'IEPA',                   lat: 5.1057,   lng: -1.2852,  icon: '🏫', minZoom: 15 },
  { name: 'University Clinic',      lat: 5.1075,   lng: -1.2855,  icon: '💊', minZoom: 16 },
  { name: 'Council Chamber',        lat: 5.1068,   lng: -1.2865,  icon: '🏛️', minZoom: 16 },
  { name: 'Cash Office',            lat: 5.1067,   lng: -1.2858,  icon: '💰', minZoom: 16 },
  { name: 'Registrars Office',      lat: 5.1066,   lng: -1.2864,  icon: '📋', minZoom: 16 },
  { name: 'Guest Centre',           lat: 5.1055,   lng: -1.2870,  icon: '🏨', minZoom: 16 },
  { name: 'UCC Hotel',              lat: 5.1048,   lng: -1.2878,  icon: '🏨', minZoom: 16 },
  { name: 'Museum & Monument',      lat: 5.1070,   lng: -1.2842,  icon: '🏛️', minZoom: 16 },
  { name: 'Old Site Shuttle Stop',  lat: 5.1072,   lng: -1.2850,  icon: '🚌', minZoom: 17 },

  // ── New Site — North Campus (Kwaprow / Amamoma area) ───────────────────
  { name: 'Sam Jonah Library',      lat: 5.1190,   lng: -1.2835,  icon: '📚', minZoom: 15 },
  { name: 'Science Complex',        lat: 5.1218,   lng: -1.2758,  icon: '🔬', minZoom: 15 },
  { name: 'College of Agriculture', lat: 5.1235,   lng: -1.2700,  icon: '🌾', minZoom: 15 },
  { name: 'School of Medical Sci',  lat: 5.1160,   lng: -1.2795,  icon: '🩺', minZoom: 15 },
  { name: 'Social Sciences',        lat: 5.1175,   lng: -1.2840,  icon: '🎓', minZoom: 15 },
  { name: 'School of Education',    lat: 5.1225,   lng: -1.2865,  icon: '🎓', minZoom: 15 },
  { name: 'Lecture Theatres',       lat: 5.1200,   lng: -1.2820,  icon: '🏫', minZoom: 15 },
  { name: 'ICT Centre',             lat: 5.1218,   lng: -1.2832,  icon: '💻', minZoom: 16 },
  { name: 'Language Centre',        lat: 5.1213,   lng: -1.2848,  icon: '🗣️', minZoom: 16 },
  { name: 'Students Union',         lat: 5.1225,   lng: -1.2852,  icon: '🏢', minZoom: 16 },
  { name: 'UCC Main Chapel',        lat: 5.1215,   lng: -1.2870,  icon: '⛪', minZoom: 16 },
  { name: 'EPP Bookshop',           lat: 5.1188,   lng: -1.2835,  icon: '📖', minZoom: 16 },
  { name: 'Post Office',            lat: 5.1192,   lng: -1.2848,  icon: '📮', minZoom: 16 },
  { name: 'Main Shuttle Stop',      lat: 5.1195,   lng: -1.2832,  icon: '🚌', minZoom: 16 },
  { name: 'Science Junction',       lat: 5.1205,   lng: -1.2745,  icon: '🔀', minZoom: 16 },
  { name: 'Library Junction',       lat: 5.1188,   lng: -1.2825,  icon: '🔀', minZoom: 17 },
  { name: 'ITTU Workshop',          lat: 5.1175,   lng: -1.2740,  icon: '🔧', minZoom: 16 },
  { name: 'Botanical Garden',       lat: 5.1145,   lng: -1.2800,  icon: '🌿', minZoom: 16 },

  // ── Sports (New Site) ───────────────────────────────────────────────────
  { name: 'UCC Stadium',            lat: 5.1255,   lng: -1.2798,  icon: '🏟️', minZoom: 15 },
  { name: 'Swimming Pool',          lat: 5.1260,   lng: -1.2808,  icon: '🏊', minZoom: 16 },
  { name: 'Tennis Courts',          lat: 5.1248,   lng: -1.2818,  icon: '🎾', minZoom: 17 },
  { name: 'Basketball Court',       lat: 5.1242,   lng: -1.2810,  icon: '🏀', minZoom: 17 },
  { name: 'Volleyball Court',       lat: 5.1244,   lng: -1.2815,  icon: '🏐', minZoom: 17 },

  // ── Halls — Old Site ───────────────────────────────────────────────────
  { name: 'Atlantic Hall',          lat: 5.1054,   lng: -1.2866,  icon: '🏠', minZoom: 15 },
  { name: 'Oguaa Hall',             lat: 5.1065,   lng: -1.2878,  icon: '🏠', minZoom: 15 },
  { name: 'Adehye Hall',            lat: 5.1070,   lng: -1.2892,  icon: '🏠', minZoom: 15 },
  { name: 'Casely Hayford Hall',    lat: 5.1089,   lng: -1.2934,  icon: '🏠', minZoom: 15 },

  // ── Halls — New Site ───────────────────────────────────────────────────
  { name: 'Kwame Nkrumah Hall',     lat: 5.1162,   lng: -1.2809,  icon: '🏠', minZoom: 15 },
  { name: 'Valco Trust Hall',       lat: 5.1156,   lng: -1.2822,  icon: '🏠', minZoom: 15 },
  { name: 'Independence Hall',      lat: 5.1148,   lng: -1.2815,  icon: '🏠', minZoom: 15 },
  { name: 'Amamoma Hall',           lat: 5.1145,   lng: -1.2920,  icon: '🏠', minZoom: 15 },
  { name: 'Jubilee Hall',           lat: 5.1185,   lng: -1.2895,  icon: '🏠', minZoom: 16 },

  // ── Surrounding community areas ────────────────────────────────────────
  { name: 'Amamoma Community',      lat: 5.1131,   lng: -1.2941,  icon: '🏘️', minZoom: 15 },
  { name: 'Apewosika Area',         lat: 5.1042,   lng: -1.2880,  icon: '🏘️', minZoom: 15 },
  { name: 'Kwaprow Area',           lat: 5.1220,   lng: -1.2910,  icon: '🏘️', minZoom: 15 },
  { name: 'Pedu Junction',          lat: 5.1312,   lng: -1.2870,  icon: '🔀', minZoom: 15 },
  { name: 'Kotokuraba Market',      lat: 5.1038,   lng: -1.2945,  icon: '🛒', minZoom: 15 },
];

function makeLandmarkIcon(icon, name) {
  return L.divIcon({
    html: `<div style="
      background:rgba(255,255,255,0.78);
      border:1px solid rgba(0,0,0,0.10);
      border-radius:4px;
      padding:1px 6px 1px 4px;
      font-size:10.5px;
      font-weight:650;
      color:#1a2744;
      white-space:nowrap;
      box-shadow:0 1px 3px rgba(0,0,0,0.12);
      display:inline-flex;
      align-items:center;
      gap:3px;
      pointer-events:none;
      line-height:1.5;
    ">${icon} ${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    className: '',
  });
}

function LandmarkLayer() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

  return CAMPUS_LANDMARKS
    .filter(lm => zoom >= lm.minZoom)
    .map(lm => (
      <Marker
        key={lm.name}
        position={[lm.lat, lm.lng]}
        icon={makeLandmarkIcon(lm.icon, lm.name)}
        interactive={false}
        zIndexOffset={-500}
      />
    ));
}

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

// Wide enough to show full routing paths to any vendor
const UCC_BOUNDS = [
  [5.095, -1.315],
  [5.150, -1.250],
];

// Travel modes — motor uses car road network but is ~28% faster (traffic weaving)
const TRAVEL_MODES = [
  { id: 'foot',  emoji: '🚶', label: 'Walk',  osrm: 'foot', color: '#3b82f6', speedFactor: 1.00 },
  { id: 'motor', emoji: '🏍️', label: 'Motor', osrm: 'car',  color: '#f97316', speedFactor: 0.72 },
  { id: 'car',   emoji: '🚗', label: 'Car',   osrm: 'car',  color: '#22c55e', speedFactor: 1.00 },
];

function fmtDistance(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}
function fmtDuration(s) {
  const min = Math.round(s / 60);
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)}h ${min % 60}m`;
}

async function callOSRM(userLat, userLng, vendor, modeId) {
  const mode = TRAVEL_MODES.find(m => m.id === modeId);
  const url =
    `https://router.project-osrm.org/route/v1/${mode.osrm}` +
    `/${userLng},${userLat};${vendor.lng},${vendor.lat}` +
    `?geometries=geojson&overview=full`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error('server_error');
    const json = await res.json();
    if (!json.routes?.[0]) throw new Error('no_route');
    const r = json.routes[0];
    return {
      coords: r.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      distance: r.distance,
      duration: r.duration * mode.speedFactor,
      userPos: [userLat, userLng],
      color: mode.color,
      modeId,
      vendorName: vendor.name,
    };
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

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

function makeIconWithLabel(category, name) {
  const c = CATEGORY_CFG[category] ?? { emoji: '📍', color: '#1E3A8A' };
  return L.divIcon({
    html: `
      <div style="position:relative;width:40px">
        <div style="
          position:absolute;
          top:-22px;
          left:50%;
          transform:translateX(-50%);
          background:#fff;
          border-radius:5px;
          padding:2px 7px;
          font-size:10px;
          font-weight:700;
          color:#1a2744;
          white-space:nowrap;
          box-shadow:0 1px 4px rgba(0,0,0,0.22);
          pointer-events:none;
        ">${name}</div>
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
          margin-left:12px;
        "></div>
      </div>`,
    iconSize: [40, 53],
    iconAnchor: [20, 53],
    popupAnchor: [0, -75],
    className: '',
  });
}

function VendorPopup({ vendor, onRoute, routing }) {
  const liveRating = useLiveRating(vendor.id);
  const rating = liveRating ?? vendor.rating;
  const openStatus = getOpenStatus(vendor.openHours);
  const c = CATEGORY_CFG[vendor.category] ?? { emoji: '📍', color: '#1E3A8A', label: vendor.category };
  const isOpen = openStatus.status === 'open';
  const [mode, setMode] = useState('foot');

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

      {rating && rating.count > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, marginBottom: 7 }}>
          <span style={{ color: '#f59e0b' }}>★</span>
          <strong style={{ color: '#111' }}>{rating.rate.toFixed(1)}</strong>
          <span style={{ color: '#9ca3af' }}>({rating.count} {liveRating ? 'reviews' : 'est.'})</span>
          {liveRating && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />}
        </div>
      )}

      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, margin: '0 0 10px' }}>
        {vendor.shortDescription}
      </p>

      {/* Transport mode selector */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
        {TRAVEL_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: '6px 0', borderRadius: 9,
              border: mode === m.id ? `2px solid ${m.color}` : '2px solid #e2e8f0',
              background: mode === m.id ? m.color + '18' : '#f8fafc',
              color: mode === m.id ? m.color : '#94a3b8',
              fontWeight: 700, fontSize: 12, cursor: 'pointer',
              transition: 'all 0.12s',
            }}
          >
            <div style={{ fontSize: 16, lineHeight: 1 }}>{m.emoji}</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>{m.label}</div>
          </button>
        ))}
      </div>

      {/* Directions button */}
      <button
        onClick={() => onRoute(vendor, mode)}
        disabled={routing}
        style={{
          width: '100%', padding: '9px 0', borderRadius: 10, border: 'none',
          background: routing
            ? '#94a3b8'
            : `linear-gradient(135deg, ${TRAVEL_MODES.find(m => m.id === mode).color}, ${TRAVEL_MODES.find(m => m.id === mode).color}cc)`,
          color: '#fff', fontWeight: 800, fontSize: 13,
          cursor: routing ? 'default' : 'pointer',
          marginBottom: 8,
          boxShadow: routing ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {routing ? '⏳ Finding route…' : '🧭 Get Directions'}
      </button>

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

// Draws the route polyline and user dot; also fits the map to the route bounds
function RouteLayer({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route?.coords?.length) {
      map.fitBounds(L.latLngBounds(route.coords), { padding: [60, 60], maxZoom: 17 });
    }
  }, [route, map]);

  if (!route) return null;
  return (
    <>
      {/* Outer glow */}
      <Polyline
        positions={route.coords}
        pathOptions={{ color: route.color, weight: 12, opacity: 0.18 }}
      />
      {/* Main line */}
      <Polyline
        positions={route.coords}
        pathOptions={{ color: route.color, weight: 5, opacity: 0.9 }}
      />
      {/* User location dot */}
      <CircleMarker
        center={route.userPos}
        radius={9}
        pathOptions={{ color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }}
      />
    </>
  );
}

function LocateButton() {
  const map = useMap();
  const { position, granted, startTracking } = useUserLocation();
  const [locating, setLocating] = useState(false);

  function handleLocate() {
    if (!granted) {
      // First time — ask permission and start persistent tracking
      setLocating(true);
      startTracking();
      // Wait up to 8s for the first fix then fly
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.flyTo([pos.coords.latitude, pos.coords.longitude], 17, { duration: 1.2 });
          setLocating(false);
        },
        () => setLocating(false),
        { timeout: 8000 },
      );
    } else if (position) {
      // Already tracking — just fly to current position
      map.flyTo(position, 17, { duration: 1.2 });
    }
  }

  if (!navigator.geolocation) return null;
  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 80 }}>
      <div className="leaflet-control">
        <button
          onClick={handleLocate}
          title="Find my location"
          style={{
            width: 34, height: 34, background: granted ? '#3b82f6' : '#fff',
            border: '2px solid rgba(0,0,0,0.2)', borderRadius: 4,
            cursor: 'pointer', fontSize: 18,
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

function FlyToVendor({ vendor }) {
  const map = useMap();
  useEffect(() => {
    if (vendor?.lat && vendor?.lng) {
      map.flyTo([vendor.lat, vendor.lng], 19, { duration: 1.0 });
    }
  }, [vendor, map]);
  return null;
}

function ZoomAwareMarkers({ vendors, onRoute, routing }) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

  return vendors.map(vendor =>
    vendor.lat && vendor.lng ? (
      <Marker
        key={vendor.id}
        position={[vendor.lat, vendor.lng]}
        icon={zoom >= 18 ? makeIconWithLabel(vendor.category, vendor.name) : makeIcon(vendor.category)}
      >
        <Popup maxWidth={244} closeButton>
          <VendorPopup vendor={vendor} onRoute={onRoute} routing={routing} />
        </Popup>
      </Marker>
    ) : null
  );
}

const FILTER_TABS = [
  { value: 'all',      label: 'All Vendors' },
  { value: 'food',     label: '🍽️ Food' },
  { value: 'services', label: '🎓 Services' },
];

export default function CampusMap() {
  const [filter, setFilter] = useState('all');
  const [route, setRoute] = useState(null);
  const [routing, setRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [routeFallbackUrl, setRouteFallbackUrl] = useState(null);
  const [mapStyle, setMapStyle] = useState('street');
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedVendor, setFocusedVendor] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Global persistent location — survives page navigation
  const { position: userPos, trail, granted, locationError, startTracking, clearTrail } = useUserLocation();

  // If arriving from a vendor card's map button, fly to that vendor
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const vendorId = searchParams.get('vendor');
    if (vendorId) {
      const v = vendors.find(x => x.id === vendorId || String(x.id) === vendorId);
      if (v) setFocusedVendor(v);
    }
  }, []);

  const searchResults = search.trim().length > 0
    ? vendors.filter(v => v.name.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 6)
    : [];

  function selectVendor(vendor) {
    setFocusedVendor(vendor);
    setSearch('');
    setShowDropdown(false);
  }

  // Fallback one-shot fetch for routing when watchPosition hasn't fired yet
  function fetchLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) { reject(new Error('no-geo')); return; }
      navigator.geolocation.getCurrentPosition(
        pos => resolve([pos.coords.latitude, pos.coords.longitude]),
        err => reject(err),
        { timeout: 10000, enableHighAccuracy: false },
      );
    });
  }

  // Do NOT auto-call startTracking() here — doing so sets watchId before the
  // "Enable" banner button fires, causing the guard to block the permission prompt.

  const q = search.trim().toLowerCase();
  const shown = vendors.filter(v => {
    if (categoryFilter) return v.category === categoryFilter && (!q || v.name.toLowerCase().includes(q));
    const matchesFilter =
      filter === 'food'     ? FOOD_CATS.has(v.category) :
      filter === 'services' ? !FOOD_CATS.has(v.category) : true;
    return matchesFilter && (!q || v.name.toLowerCase().includes(q));
  });

  async function handleRoute(vendor, modeId) {
    setRouteError(null);
    setRouteFallbackUrl(null);
    setRouting(true);

    // ── Step 1: get user location ──
    let loc = userPos;
    if (!loc) {
      try {
        loc = await fetchLocation();
      } catch (e) {
        if (e.message === 'no-geo') {
          setRouteError('Your device does not support location services.');
        } else if (e.code === 1) {
          setRouteError('Location access denied. Tap the 📍 button and allow location in your browser settings, then try again.');
        } else if (e.code === 3) {
          setRouteError('Location timed out — make sure GPS is turned on and try again.');
        } else {
          setRouteError('Could not get your location. Make sure location is enabled and try again.');
        }
        setRouting(false);
        return;
      }
    }

    // ── Step 2: get route from OSRM ──
    try {
      const r = await callOSRM(loc[0], loc[1], vendor, modeId);
      setRoute(r);
    } catch {
      setRouteError(`Could not draw route to ${vendor.name} on map.`);
      setRouteFallbackUrl(
        `https://www.google.com/maps/dir/?api=1&origin=${loc[0]},${loc[1]}&destination=${vendor.lat},${vendor.lng}`
      );
    }

    setRouting(false);
  }

  function clearRoute() {
    setRoute(null);
    setRouteError(null);
    setRouteFallbackUrl(null);
  }

  const activeMode = route ? TRAVEL_MODES.find(m => m.id === route.modeId) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', paddingTop: 64, position: 'relative' }}>

      {/* Header bar */}
      <div style={{ background: '#172554', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 20 }}>🗺️</span>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 20, margin: 0 }}>UCC Campus Map</h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 10px' }}>
          Tap any pin → choose transport → Get Directions
        </p>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              fontSize: 14, opacity: 0.5, pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search vendors…"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '8px 32px 8px 32px',
                borderRadius: 10, border: 'none',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 13, fontWeight: 600,
                outline: 'none',
              }}
            />
            {search && (
              <button
                onMouseDown={() => { setSearch(''); setShowDropdown(false); }}
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0,
                }}
              >✕</button>
            )}
          </div>

          {/* Dropdown results */}
          {showDropdown && searchResults.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999,
              background: '#fff', borderRadius: 10, marginTop: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)', overflow: 'hidden',
            }}>
              {searchResults.map(v => {
                const c = CATEGORY_CFG[v.category] ?? { emoji: '📍', label: v.category };
                return (
                  <div
                    key={v.id}
                    onMouseDown={() => selectVendor(v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <span style={{ fontSize: 18 }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 7 }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => { setFilter(tab.value); setSearch(''); setCategoryFilter(null); }}
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

      {/* ── Location permission banner ── */}
      {!granted && !locationError && (
        <div style={{
          background: '#1e40af', padding: '10px 16px', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, flex: 1, lineHeight: 1.3 }}>
            Allow location to see yourself on the map and get directions
          </span>
          <button
            onClick={startTracking}
            style={{
              padding: '7px 16px', borderRadius: 99, border: 'none',
              background: '#fff', color: '#1e40af',
              fontWeight: 800, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            Enable
          </button>
        </div>
      )}

      {/* ── Location denied banner ── */}
      {locationError === 'denied' && (
        <div style={{
          background: '#fef2f2', borderBottom: '1px solid #fca5a5',
          padding: '10px 16px', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>
            Location blocked. Open your browser settings → Site permissions → allow Location for this site.
          </span>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={UCC_CENTER}
        zoom={17}
        minZoom={14}
        maxZoom={22}
        maxBounds={UCC_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ flex: 1, width: '100%', minHeight: 0 }}
        scrollWheelZoom
        zoomControl
      >
        {mapStyle === 'satellite' ? (
          <TileLayer
            url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`}
            attribution={MAPTILER_ATTR}
            maxNativeZoom={20} maxZoom={22}
          />
        ) : (
          <TileLayer
            url={`https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
            attribution={MAPTILER_ATTR}
            maxNativeZoom={19} maxZoom={22}
          />
        )}
        <LocateButton />
        <LandmarkLayer />
        <RouteLayer route={route} />
        <FlyToVendor vendor={focusedVendor} />
        {/* Movement trail — shows path the user has walked */}
        {trail.length > 1 && (
          <>
            <Polyline
              positions={trail}
              pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.25 }}
            />
            <Polyline
              positions={trail}
              pathOptions={{ color: '#3b82f6', weight: 2, opacity: 0.7, dashArray: '6 6' }}
            />
          </>
        )}
        {/* Live blue dot — always on top of trail */}
        {userPos && (
          <CircleMarker
            center={userPos}
            radius={9}
            pathOptions={{ color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }}
          />
        )}
        <ZoomAwareMarkers vendors={shown} onRoute={handleRoute} routing={routing} />
      </MapContainer>

      {/* Clear trail button — appears above satellite toggle when trail exists */}
      {trail.length > 1 && (
        <button
          onClick={clearTrail}
          style={{
            position: 'absolute', bottom: 118, left: 12, zIndex: 1000,
            padding: '6px 12px', borderRadius: 99, border: 'none',
            background: '#1e293b', color: '#fff',
            fontWeight: 700, fontSize: 11, cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          🗑 Clear Trail
        </button>
      )}

      {/* Satellite / Street toggle — bottom-left corner */}
      <div style={{
        position: 'absolute', bottom: 72, left: 12,
        zIndex: 1000,
        display: 'flex', borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        border: '2px solid rgba(255,255,255,0.7)',
      }}>
        {[
          { id: 'satellite', label: '🛰 Satellite' },
          { id: 'street',    label: '🗺 Street' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setMapStyle(opt.id)}
            style={{
              padding: '6px 12px', fontSize: 12, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              background: mapStyle === opt.id ? '#1e3a8a' : '#fff',
              color: mapStyle === opt.id ? '#fff' : '#374151',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Route info — compact pill at top so it never blocks the route line */}
      {routeError && (
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, maxWidth: 'calc(100vw - 32px)',
          background: '#fff', border: '1.5px solid #fca5a5',
          borderRadius: 16, padding: '12px 14px',
          display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
          minWidth: 260,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ fontSize: 16, marginTop: 1 }}>⚠️</span>
            <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, margin: 0, lineHeight: 1.4, flex: 1 }}>
              {routeError}
            </p>
            <button
              onClick={clearRoute}
              style={{ background: 'none', border: 'none', color: '#9ca3af', fontWeight: 900, cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 2, marginTop: 1 }}
            >✕</button>
          </div>
          {routeFallbackUrl && (
            <a
              href={routeFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontSize: 13, fontWeight: 800, color: '#fff',
                background: '#1d4ed8', padding: '10px 16px',
                borderRadius: 10, textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(29,78,216,0.35)',
              }}
            >
              🗺 Open in Google Maps ↗
            </a>
          )}
        </div>
      )}

      {route && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, maxWidth: 'calc(100vw - 32px)',
        }}>
          {/* Route info pill */}
          <div style={{
            background: '#fff', border: `2px solid ${activeMode?.color}`,
            borderRadius: 99, padding: '8px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: 18 }}>{activeMode?.emoji}</span>
            <span style={{ fontWeight: 900, fontSize: 15, color: '#0f172a' }}>{fmtDistance(route.distance)}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: activeMode?.color }}>~{fmtDuration(route.duration)}</span>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{activeMode?.label}</span>
          </div>
          {/* Prominent close button below the pill */}
          <button
            onClick={clearRoute}
            style={{
              padding: '7px 22px', borderRadius: 99, border: 'none',
              background: '#1e293b', color: '#fff',
              fontWeight: 700, fontSize: 12, cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            ✕ Close Route
          </button>
        </div>
      )}

      {/* Category legend / filter chips */}
      <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '10px 16px', flexShrink: 0, overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 7, width: 'max-content' }}>
          {Object.entries(CATEGORY_CFG).map(([key, c]) => {
            const active = categoryFilter === key;
            return (
              <button
                key={key}
                onClick={() => setCategoryFilter(active ? null : key)}
                style={{
                  background: active ? c.color : c.color + '18',
                  color: active ? '#fff' : c.color,
                  border: `1.5px solid ${active ? c.color : c.color + '40'}`,
                  fontSize: 11, fontWeight: 700,
                  padding: '4px 10px', borderRadius: 99,
                  whiteSpace: 'nowrap', cursor: 'pointer',
                  transform: active ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: active ? `0 2px 8px ${c.color}55` : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {c.emoji} {c.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
