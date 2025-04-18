'use client';

import { useEffect, useState } from 'react';

export default function LiveLocationTracker() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [satelliteInfo, setSatelliteInfo] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => {
        setError('Location access denied or unavailable.');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const fetchSatelliteData = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/satellite/passes?lat=${location.lat}&lon=${location.lon}`
          );
          const data = await res.json();
          setSatelliteInfo(data);
        } catch (e) {
          console.error('Failed to fetch satellite info', e);
        }
      };

      fetchSatelliteData();
      const interval = setInterval(fetchSatelliteData, 30000); // every 30s

      return () => clearInterval(interval);
    }
  }, [location.lat, location.lon]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-2">📡 Live Satellite Tracking</h2>
      {error && <p className="text-red-400">{error}</p>}
      {location.lat && location.lon ? (
        <p>
          Your location: <strong>{location.lat.toFixed(5)}, {location.lon.toFixed(5)}</strong>
        </p>
      ) : (
        <p>Detecting your location...</p>
      )}
      {satelliteInfo && (
        <div className="mt-4">
          <p>Next satellite: {satelliteInfo.name}</p>
          <p>Pass at: {new Date(satelliteInfo.time).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
