'use client'

import { useEffect, useState } from "react";
import { fetchSatellites } from "@/api/satelliteApi";
import { SatelliteInfo } from "@/types/satellite";
import SatelliteCard from "@/components/SatelliteCard";

export default function Home() {
  const [satellites, setSatellites] = useState<SatelliteInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const response = await fetchSatellites(lat, lon);
          setSatellites(response.satellites);
        } catch (err) {
          console.error(err);
          setError("Unable to connect to Orbital Backend. Ensure Radio-Base Service is active.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied. Please enable location services to track satellites.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <main className="min-h-screen relative flex flex-col p-8 md:p-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Orbit Animation Circle */}
        <div className="absolute top-1/2 left-1/2 -ml-[150px] -mt-[150px] w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -ml-[250px] -mt-[250px] w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none opacity-20">
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,0.8)]"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative z-10">
          Radio-Base <span className="text-blue-500">Nexus</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Real-time AI-Powered Satellite Telemetry & Intelligence Platform for the modern radio enthusiast.
        </p>

        {!loading && !error && satellites.length === 0 && (
          <div className="inline-flex glass px-6 py-3 rounded-full text-sm text-blue-200 animate-pulse">
            Waiting for telemetry uplink...
          </div>
        )}
      </section>

      {/* Dashboard Section */}
      <section className="relative z-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white/90 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Active Passes
          </h2>
          {loading && <span className="text-sm text-blue-400 animate-pulse">Synchronizing...</span>}
        </div>

        {error && (
          <div className="w-full glass border-red-500/30 p-8 rounded-2xl text-center">
            <div className="text-red-400 text-xl font-bold mb-2">Signal Lost</div>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
            >
              Retry Uplink
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card h-48 animate-pulse flex flex-col justify-between p-6">
              <div className="h-6 w-1/2 bg-white/5 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}

          {satellites.map((sat) => (
            <SatelliteCard key={sat.id} satellite={sat} />
          ))}
        </div>
      </section>
    </main>
  );
}