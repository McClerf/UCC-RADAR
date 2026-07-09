import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const STORAGE_KEY = 'ucc_radar_visited';

export function useSiteVisits() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function trackVisit() {
      // Record visit if first time
      if (!localStorage.getItem(STORAGE_KEY)) {
        const { error } = await supabase.from('site_visits').insert({});
        if (!error) localStorage.setItem(STORAGE_KEY, '1');
      }

      // Fetch total unique visitors
      const { count: total } = await supabase
        .from('site_visits')
        .select('*', { count: 'exact', head: true });

      if (total != null) setCount(total);
    }

    trackVisit().catch(() => {});
  }, []);

  return count;
}
