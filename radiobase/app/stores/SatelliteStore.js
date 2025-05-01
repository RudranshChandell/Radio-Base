// stores/satelliteStore.js
import { create } from 'zustand';

const useSatelliteStore = create((set) => ({
  satelliteData: null,
  lattitude: null,
  longitude: null,

  setLattitude: (lattitude) => set({ lattitude }),
  setLongitude: (longitude) => set({ longitude }),
  setSatelliteData: (data) => set({ satelliteData: data }),
}));
export default useSatelliteStore;
