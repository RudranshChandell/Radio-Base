"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Import, Loader2, MapPin, Satellite } from 'lucide-react';
import useSatelliteStore from '../stores/SatelliteStore';

export default function LocationComponent() {
  const router = useRouter();
  const setSatelliteData = useSatelliteStore((state) => state.setSatelliteData); // Move hook to the top level
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

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

        // Set coordinates in state
        setCoordinates({ lat, lng });

        // Call the function that will be used to communicate with backend
        sendCoordinatesToBackend(lat, lng);

        setIsLoading(false);
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

  const sendCoordinatesToBackend = async (lat, lng) => {
    try {
      const response = await fetch("http://localhost:8080/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Ensure the backend returns JSON
      setSatelliteData(result); // Use the store's function to update the satellite data
      router.push("/dashboard");
    } catch (error) {
      console.error("Error sending coordinates to backend:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md">
        {!coordinates && !isLoading && (
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-purple-500/20">
            <div className="flex items-center justify-center mb-6">
              <Satellite className="text-purple-400 mr-2" size={28} />
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Satellite Tracker
              </h2>
            </div>

            <p className="text-gray-300 mb-8 text-center">
              Allow access to your location to track satellites visible from your position.
            </p>

            <button
              onClick={getLocation}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg flex items-center justify-center font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              <MapPin className="mr-2" size={20} />
              Use My Location
            </button>

            {error && (
              <p className="mt-4 text-red-400 text-center text-sm">
                {error}
              </p>
            )}
          </div>
        )}

        {isLoading && (
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-purple-500/20 text-center">
            <Loader2 className="animate-spin mx-auto text-purple-400 mb-4" size={36} />
            <p className="text-lg text-blue-300">Getting your location...</p>
            <div className="mt-4 h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {coordinates && (
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-purple-500/20">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-center text-green-300 mb-6">
              Location Retrieved!
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 flex items-center">
                <div className="w-24 text-sm text-gray-400">Latitude:</div>
                <div className="flex-1 font-mono text-blue-300">{coordinates.lat.toFixed(5)}°</div>
              </div>

              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 flex items-center">
                <div className="w-24 text-sm text-gray-400">Longitude:</div>
                <div className="flex-1 font-mono text-blue-300">{coordinates.lng.toFixed(5)}°</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-blue-400 text-sm">
                Scanning for satellites in your area...
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Your location data is used only for satellite tracking purposes</p>
        </div>
      </div>
    </div>
  );
}