"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SatellitesList from '../components/SatellitesList';
import useSatelliteStore from '../stores/SatelliteStore';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const satelliteData = useSatelliteStore((state) => state.satelliteData);
  const lattitude = useSatelliteStore((state) => state.lattitude)?.toFixed(5) || '0.00000';
  const longitude = useSatelliteStore((state) => state.longitude)?.toFixed(5) || '0.00000';
  const setLattitude = useSatelliteStore((state) => state.setLattitude);
  const setLongitude = useSatelliteStore((state) => state.setLongitude);
  const setSatelliteData = useSatelliteStore((state) => state.setSatelliteData);

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get location from browser
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLattitude(lat);
        setLongitude(lng);

        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        sendCoordinatesToBackend(lat, lng);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred");
        }
      },
      { enableHighAccuracy: true }
    );
  };

  // Send location to backend
  const sendCoordinatesToBackend = async (lat, lng) => {
    try {
      const response = await fetch("http://localhost:8080/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSatelliteData(data);
      setIsLoading(false);
      
            console.log(isLoading)

      console.log("Received satellite data:", data);
    } catch (error) {
      console.error("Error sending coordinates to backend:", error);
      setError("Failed to fetch satellite data from server");
    }
  };

  // Lifecycle hook
  useEffect(() => {
    if (!satelliteData) {
      getLocation();
      return;
    }

    if (satelliteData.above && satelliteData.above.length > 0) {
      setIsLoading(false);
    } else {
      setError("Failed to load satellite data");
      router.push("/location");
    }
  }, [satelliteData]);


  const getStats = () => {
    if (!satelliteData || !satelliteData.above || satelliteData.above.length === 0) {
      return { total: 0, avgAlt: 0, highestAlt: 0, category: 'N/A' };
    }

    const total = satelliteData.above.length;
    const altitudes = satelliteData.above.map((sat) => sat.satalt);
    const avgAlt = total > 0 ? altitudes.reduce((sum, alt) => sum + alt, 0) / total : 0;
    const highestAlt = total > 0 ? Math.max(...altitudes) : 0;
    const category = satelliteData.info?.category || 'N/A';

    return { total, avgAlt, highestAlt, category };
  };


  const stats = getStats();

  const formatAltitude = (alt) => (alt ? `${Math.round(alt)} km` : 'N/A');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            RadioBase
          </Link>
          <nav className="flex gap-2">
            <button className="px-4 py-2 text-blue-400 border-b-2 border-blue-400 rounded-lg bg-gray-700/50">
              Dashboard
            </button>
            <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Satellite Pass Dashboard</h1>
          <p className="text-gray-400 mt-2">
            {isLoading
              ? "Loading satellite data..."
              : error
              ? "Error loading data"
              : `Tracking ${stats.total} satellites in the "${stats.category}" category`}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Satellites Overhead</h3>
            <p className="text-xl font-semibold mt-1">{stats.total}</p>
            <p className="text-blue-400 mt-2">{stats.category}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Average Altitude</h3>
            <p className="text-xl font-semibold mt-1">{formatAltitude(stats.avgAlt)}</p>
            <p className="text-purple-400 mt-2">Above Earth's Surface</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-6 rounded-xl border border-green-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Highest Satellite</h3>
            <p className="text-xl font-semibold mt-1">{formatAltitude(stats.highestAlt)}</p>
            <p className="text-green-400 mt-2">
              {satelliteData?.above.find((sat) => sat.satalt === stats.highestAlt)?.satname || 'N/A'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 p-6 rounded-xl border border-yellow-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Your Coordinates</h3>
            <p className="text-xl font-semibold mt-1">{lattitude}, {longitude}</p>
            <p className="text-yellow-400 mt-2">Data Updated</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading satellite data...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-400">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <SatellitesList satellites={satelliteData?.above || []} />
          )}
        </div>
      </main>
    </div>
  );
}
