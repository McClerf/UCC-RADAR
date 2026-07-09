import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const STORAGE_KEY = 'ucc_radar_site_rated';

export function useSiteRating() {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasRated, setHasRated] = useState(() => !!localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    supabase
      .from('site_ratings')
      .select('rating')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const sum = data.reduce((acc, r) => acc + r.rating, 0);
          setAverage(Math.round((sum / data.length) * 10) / 10);
          setCount(data.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function submitRating(value) {
    const { error } = await supabase.from('site_ratings').insert({ rating: value });
    if (error) throw error;

    // Re-fetch the true aggregate from all users
    const { data } = await supabase.from('site_ratings').select('rating');
    if (data && data.length > 0) {
      const sum = data.reduce((acc, r) => acc + r.rating, 0);
      setAverage(Math.round((sum / data.length) * 10) / 10);
      setCount(data.length);
    }

    setHasRated(true);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  return { average, count, loading, hasRated, submitRating };
}
