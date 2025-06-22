import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSatelliteStore = create(
  persist(
    (set) => ({
      satelliteData: null,
      lattitude: null,
      longitude: null,
      setSatelliteData: (data) => set({ satelliteData: data }),
      setLattitude: (lat) => set({ lattitude: lat }),
      setLongitude: (lng) => set({ longitude: lng }),
    }),
    {
      name: 'satellite-storage', // unique name
    }
  )
);

export default useSatelliteStore;