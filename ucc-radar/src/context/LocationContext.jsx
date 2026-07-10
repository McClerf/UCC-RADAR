import { createContext, useContext, useState, useEffect, useRef } from 'react';

const LocationContext = createContext(null);

const MIN_MOVE_DEG = 0.000045; // ~5 m threshold before adding a new trail point

export function LocationProvider({ children }) {
  const [position, setPosition]         = useState(null);
  const [trail, setTrail]               = useState([]);
  const [granted, setGranted]           = useState(false);
  const [locationError, setLocationError] = useState(null); // 'denied' | 'unavailable' | null
  const watchId = useRef(null);

  function startTracking() {
    if (!navigator.geolocation || watchId.current != null) return;
    setLocationError(null);

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const pt = [pos.coords.latitude, pos.coords.longitude];
        setPosition(pt);
        setGranted(true);
        setLocationError(null);
        setTrail(prev => {
          if (!prev.length) return [pt];
          const last = prev[prev.length - 1];
          if (Math.hypot(pt[0] - last[0], pt[1] - last[1]) < MIN_MOVE_DEG) return prev;
          const next = [...prev, pt];
          return next.length > 600 ? next.slice(next.length - 600) : next;
        });
      },
      (err) => {
        if (err.code === 1) setLocationError('denied');
        else if (err.code === 2) setLocationError('unavailable');
        // code 3 = timeout — keep watching, don't flag as error
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 },
    );
  }

  // Clean up the watcher when the app unmounts
  useEffect(() => () => {
    if (watchId.current != null) navigator.geolocation.clearWatch(watchId.current);
  }, []);

  function clearTrail() { setTrail([]); }

  return (
    <LocationContext.Provider value={{ position, trail, granted, locationError, startTracking, clearTrail }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useUserLocation() {
  return useContext(LocationContext);
}
