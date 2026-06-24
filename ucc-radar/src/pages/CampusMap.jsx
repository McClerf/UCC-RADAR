import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
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

const UCC_BOUNDS = [
  [5.110, -1.295],
  [5.131, -1.268],
];

// Travel modes — 'car' profile used for both motor and car (same road network)
const TRAVEL_MODES = [
  { id: 'foot',  emoji: '🚶', label: 'Walk',  osrm: 'foot', color: '#3b82f6' },
  { id: 'motor', emoji: '🏍️', label: 'Motor', osrm: 'car',  color: '#f97316' },
  { id: 'car',   emoji: '🚗', label: 'Car',   osrm: 'car',  color: '#22c55e' },
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
    duration: r.duration,
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

function MapClickHandler({ active, onMapClick }) {
  useMapEvents({
    click(e) {
      if (active) onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
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
  const [placingStart, setPlacingStart] = useState(false);
  const [pending, setPending] = useState(null); // { vendor, modeId } waiting for manual tap

  const shown = vendors.filter(v =>
    filter === 'food'     ? FOOD_CATS.has(v.category) :
    filter === 'services' ? !FOOD_CATS.has(v.category) : true
  );

  async function routeFrom(lat, lng, vendor, modeId) {
    setRouting(true);
    setRouteError(null);
    try {
      const r = await callOSRM(lat, lng, vendor, modeId);
      setRoute(r);
    } catch (e) {
      setRouteError(e.message);
    }
    setRouting(false);
  }

  function handleRoute(vendor, modeId) {
    setRouteError(null);
    if (!navigator.geolocation) {
      // No GPS at all — go straight to tap mode
      setPending({ vendor, modeId });
      setPlacingStart(true);
      return;
    }
    setRouting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => routeFrom(pos.coords.latitude, pos.coords.longitude, vendor, modeId),
      () => {
        // GPS denied — let user tap their location on the map
        setRouting(false);
        setPending({ vendor, modeId });
        setPlacingStart(true);
      },
      { timeout: 10000 },
    );
  }

  function handleMapClick(lat, lng) {
    if (!placingStart || !pending) return;
    setPlacingStart(false);
    const { vendor, modeId } = pending;
    setPending(null);
    routeFrom(lat, lng, vendor, modeId);
  }

  function clearRoute() {
    setRoute(null);
    setRouteError(null);
    setPlacingStart(false);
    setPending(null);
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
        <MapClickHandler active={placingStart} onMapClick={handleMapClick} />
        <RouteLayer route={route} />
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

      {/* "Tap your location" instruction banner */}
      {placingStart && (
        <div style={{
          position: 'absolute', top: 'calc(64px + 110px)', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001, pointerEvents: 'none',
          background: '#1e3a8a', color: '#fff',
          padding: '10px 20px', borderRadius: 14, textAlign: 'center',
          boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
          width: 'max-content', maxWidth: 'calc(100vw - 40px)',
        }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>👆</div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Tap your location on the map</div>
          <div style={{ fontSize: 11, opacity: 0.65, marginTop: 3 }}>GPS not available — tap where you are to start routing</div>
        </div>
      )}

      {placingStart && (
        <button
          onClick={clearRoute}
          style={{
            position: 'absolute', top: 'calc(64px + 110px + 104px)', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
            background: '#fff', color: '#64748b',
            border: '1.5px solid #e2e8f0', borderRadius: 99,
            padding: '6px 18px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          Cancel
        </button>
      )}

      {/* Route info bar */}
      {(route || routeError) && (
        <div style={{
          position: 'absolute',
          bottom: 70, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000,
          background: routeError ? '#fef2f2' : '#fff',
          border: `2px solid ${routeError ? '#fca5a5' : activeMode?.color ?? '#e2e8f0'}`,
          borderRadius: 16,
          padding: '12px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: 14,
          maxWidth: 'calc(100vw - 40px)',
          minWidth: 260,
        }}>
          {routeError ? (
            <>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, flex: 1 }}>{routeError}</span>
            </>
          ) : route && (
            <>
              <span style={{ fontSize: 22 }}>{activeMode?.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 2 }}>
                  To {route.vendorName}
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 900, fontSize: 17, color: '#0f172a' }}>
                    {fmtDistance(route.distance)}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: activeMode?.color }}>
                    ~{fmtDuration(route.duration)}
                  </span>
                  <span style={{ fontSize: 11, color: '#cbd5e1', fontWeight: 600 }}>
                    {activeMode?.label}
                  </span>
                </div>
              </div>
            </>
          )}
          <button
            onClick={clearRoute}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              border: 'none', background: '#f1f5f9',
              color: '#64748b', fontWeight: 900, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
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
