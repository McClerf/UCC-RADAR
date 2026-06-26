import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
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
  const res = await fetch(url);
  if (!res.ok) throw new Error('Routing service unavailable');
  const json = await res.json();
  if (!json.routes?.[0]) throw new Error('No route found between these points');
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
            width: 34, height: 34, background: '#fff',
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
  const [userPos, setUserPos] = useState(null);
  const [mapStyle, setMapStyle] = useState('street');

  // Silently grab location once on mount — ready before user even taps a pin
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { timeout: 12000, enableHighAccuracy: true },
    );
  }, []);

  const shown = vendors.filter(v =>
    filter === 'food'     ? FOOD_CATS.has(v.category) :
    filter === 'services' ? !FOOD_CATS.has(v.category) : true
  );

  async function handleRoute(vendor, modeId) {
    setRouteError(null);
    if (!userPos) {
      setRouteError('Enable location on your phone/browser, then refresh the page.');
      return;
    }
    setRouting(true);
    try {
      const r = await callOSRM(userPos[0], userPos[1], vendor, modeId);
      setRoute(r);
    } catch (e) {
      setRouteError(e.message);
    }
    setRouting(false);
  }

  function clearRoute() {
    setRoute(null);
    setRouteError(null);
  }

  const activeMode = route ? TRAVEL_MODES.find(m => m.id === route.modeId) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', paddingTop: 64, position: 'relative' }}>

      {/* Header bar */}
      <div style={{ background: '#172554', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 20 }}>🗺️</span>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 20, margin: 0 }}>UCC Campus Map</h1>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginLeft: 4 }}>{shown.length} vendors</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 12px' }}>
          Tap any pin → choose transport → Get Directions
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
        minZoom={14}
        maxZoom={20}
        maxBounds={UCC_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ flex: 1, width: '100%', minHeight: 0 }}
        scrollWheelZoom
        zoomControl
      >
        {mapStyle === 'satellite' ? (
          <>
            {/* Satellite base — native tiles up to z19, upscaled beyond */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              maxNativeZoom={19} maxZoom={20}
            />
            {/* Road names overlay */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
              maxNativeZoom={19} maxZoom={20} opacity={0.85}
            />
            {/* Place / building name labels overlay */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              maxNativeZoom={19} maxZoom={20}
            />
          </>
        ) : (
          /* CartoDB Voyager — crisp vector-quality at any zoom, full building + road labels */
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxNativeZoom={20} maxZoom={20}
          />
        )}
        <LocateButton />
        <RouteLayer route={route} />
        {/* Live blue dot for user position */}
        {userPos && !route && (
          <CircleMarker
            center={userPos}
            radius={9}
            pathOptions={{ color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }}
          />
        )}
        {shown.map(vendor =>
          vendor.lat && vendor.lng ? (
            <Marker
              key={vendor.id}
              position={[vendor.lat, vendor.lng]}
              icon={makeIcon(vendor.category)}
            >
              <Popup maxWidth={244} closeButton>
                <VendorPopup vendor={vendor} onRoute={handleRoute} routing={routing} />
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

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
          background: '#fef2f2', border: '1.5px solid #fca5a5',
          borderRadius: 99, padding: '8px 16px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>{routeError}</span>
          <button onClick={clearRoute} style={{ marginLeft: 4, background: 'none', border: 'none', color: '#dc2626', fontWeight: 900, cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>✕</button>
        </div>
      )}

      {route && (
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, maxWidth: 'calc(100vw - 32px)',
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
          <button
            onClick={clearRoute}
            title="Clear route"
            style={{
              marginLeft: 4, width: 24, height: 24, borderRadius: '50%',
              border: 'none', background: '#f1f5f9', color: '#64748b',
              fontWeight: 900, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >✕</button>
        </div>
      )}

      {/* Category legend */}
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
