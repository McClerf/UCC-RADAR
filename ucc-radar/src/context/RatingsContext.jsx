import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const RatingsContext = createContext({});

export function RatingsProvider({ children }) {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    supabase
      .from('comments')
      .select('vendor_id, rating')
      .then(({ data }) => {
        if (!data || !data.length) return;
        const map = {};
        data.forEach(({ vendor_id, rating }) => {
          if (!map[vendor_id]) map[vendor_id] = { sum: 0, count: 0 };
          map[vendor_id].sum += rating;
          map[vendor_id].count++;
        });
        const result = {};
        Object.entries(map).forEach(([id, { sum, count }]) => {
          result[id] = { rate: Math.round((sum / count) * 10) / 10, count };
        });
        setRatings(result);
      })
      .catch(() => {});
  }, []);

  return <RatingsContext.Provider value={ratings}>{children}</RatingsContext.Provider>;
}

export function useLiveRating(vendorId) {
  return useContext(RatingsContext)[vendorId] ?? null;
}
