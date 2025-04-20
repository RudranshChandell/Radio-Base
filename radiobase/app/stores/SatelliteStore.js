// stores/satelliteStore.js
import { create } from 'zustand';

const useSatelliteStore = create((set) => ({
  satelliteData: null,
  setSatelliteData: (data) => set({ satelliteData: data }),
}));
export default useSatelliteStore;
