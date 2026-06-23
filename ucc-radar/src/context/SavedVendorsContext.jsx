import { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'ucc_saved_vendors';

const SavedVendorsContext = createContext(null);

export function SavedVendorsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
    } catch {
      return new Set();
    }
  });

  const toggle = useCallback((id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  return (
    <SavedVendorsContext.Provider value={{ savedIds, toggle, isSaved, count: savedIds.size }}>
      {children}
    </SavedVendorsContext.Provider>
  );
}

export function useSavedVendors() {
  return useContext(SavedVendorsContext);
}
