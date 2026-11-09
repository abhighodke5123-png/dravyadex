'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dravya } from '@/types/dravya';

interface ComparisonContextType {
  selectedHerbs: Dravya[];
  addHerbToCompare: (herb: Dravya) => boolean;
  removeHerbFromCompare: (slug: string) => void;
  clearComparison: () => void;
  isHerbInCompare: (slug: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedHerbs, setSelectedHerbs] = useState<Dravya[]>([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('dravyadex_compare_herbs');
      if (stored) {
        setSelectedHerbs(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('dravyadex_compare_herbs', JSON.stringify(selectedHerbs));
    } catch (e) {}
  }, [selectedHerbs]);

  const addHerbToCompare = (herb: Dravya): boolean => {
    if (selectedHerbs.some(h => h.slug === herb.slug)) {
      return false;
    }
    if (selectedHerbs.length >= 3) {
      alert('You can compare a maximum of 3 medicinal plants simultaneously.');
      return false;
    }
    setSelectedHerbs(prev => [...prev, herb]);
    return true;
  };

  const removeHerbFromCompare = (slug: string) => {
    setSelectedHerbs(prev => prev.filter(h => h.slug !== slug));
  };

  const clearComparison = () => {
    setSelectedHerbs([]);
  };

  const isHerbInCompare = (slug: string) => {
    return selectedHerbs.some(h => h.slug === slug);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedHerbs,
        addHerbToCompare,
        removeHerbFromCompare,
        clearComparison,
        isHerbInCompare,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
