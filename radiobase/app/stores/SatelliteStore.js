// stores/satelliteStore.js
import { create } from 'zustand';

const useSatelliteStore = create((set) => ({
  satelliteData: null,
  lattitude: null,
  longitude: null,

  setLattitude: (lat) => set({ lattitude: lat }),
  setLongitude: (lng) => set({ longitude: lng }),
  setSatelliteData: (data) => set({ satelliteData: data }),

}));
export default useSatelliteStore;
