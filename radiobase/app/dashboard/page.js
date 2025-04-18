"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveLocationTracker from './LiveLocationTracker'; 

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [satellites, setSatellites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for satellite passes
  const mockSatellites = [
    { 
      id: 1, 
      name: "ISS (ZARYA)", 
      noradId: "25544", 
      nextPass: new Date(Date.now() + 3600000).toLocaleString(), 
      duration: "12 min", 
      maxElevation: "63°",
      status: "upcoming" 
    },
    { 
      id: 2, 
      name: "NOAA 19", 
      noradId: "33591", 
      nextPass: new Date(Date.now() + 7200000).toLocaleString(), 
      duration: "15 min", 
      maxElevation: "45°", 
      status: "upcoming"
    },
    { 
      id: 3, 
      name: "METEOR-M 2", 
      noradId: "40069", 
      nextPass: new Date(Date.now() + 10800000).toLocaleString(), 
      duration: "11 min", 
      maxElevation: "71°", 
      status: "upcoming"
    },
    { 
      id: 4,
      name: "STARLINK-1234", 
      noradId: "48234", 
      nextPass: "2 hours ago", 
      duration: "8 min", 
      maxElevation: "32°", 
      status: "past"
    },
    { 
      id: 5, 
      name: "AMSAT OSCAR-7", 
      noradId: "07530", 
      nextPass: "5 hours ago", 
      duration: "14 min", 
      maxElevation: "58°", 
      status: "past"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setSatellites(mockSatellites);
      setIsLoading(false);
      setLoaded(true);
    }, 1000);
  }, []);

  const filteredSatellites = satellites.filter(sat => 
    activeTab === 'all' || sat.status === activeTab
  );

  <main className="grid gap-4 p-6">
      <LiveLocationTracker />
    </main>

  // Sample AI explanation for a satellite pass
  const aiExplanation = "The International Space Station (ISS) will be passing overhead with excellent visibility conditions. This pass reaches a high maximum elevation of 63° above the horizon, making it very easy to spot. The pass duration of 12 minutes is relatively long, giving you plenty of time to track it. For optimal radio communication, tune to 145.800 MHz for voice downlink and consider a directional antenna for clearer reception.";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              RadioBase
            </Link>
          </div>
          <nav className="flex gap-2">
            <button className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700">
              Satellites
            </button>
            <button className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700">
              Settings
            </button>
            <button className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700">
              Profile
            </button>
            <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Satellite Pass Dashboard</h1>
          <p className="text-gray-400 mt-2">Track and monitor upcoming satellite passes in real-time</p>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 p-6 rounded-xl border border-blue-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Next Pass</h3>
            <p className="text-xl font-semibold mt-1">ISS (ZARYA)</p>
            <p className="text-blue-400 mt-2">In 1 hour</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 p-6 rounded-xl border border-purple-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Today's Passes</h3>
            <p className="text-xl font-semibold mt-1">8 Passes</p>
            <p className="text-purple-400 mt-2">3 High Visibility</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-6 rounded-xl border border-green-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Current Location</h3>
            <p className="text-xl font-semibold mt-1">New York, USA</p>
            <p className="text-green-400 mt-2">40.7128° N, 74.0060° W</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 p-6 rounded-xl border border-yellow-700/30 shadow-lg">
            <h3 className="text-gray-400 text-sm uppercase">Weather</h3>
            <p className="text-xl font-semibold mt-1">Clear Skies</p>
            <p className="text-yellow-400 mt-2">Visibility: Excellent</p>
          </div>
        </div>

        {/* Satellite Pass Tracking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Satellite List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'upcoming' ? 'bg-blue-900/30 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  Upcoming Passes
                </button>
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'past' ? 'bg-blue-900/30 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  Past Passes
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === 'all' ? 'bg-blue-900/30 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  All
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-400">Loading satellite passes...</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs uppercase text-gray-500 bg-gray-800/70">
                        <th className="px-6 py-3">Satellite</th>
                        <th className="px-6 py-3">NORAD ID</th>
                        <th className="px-6 py-3">Pass Time</th>
                        <th className="px-6 py-3">Duration</th>
                        <th className="px-6 py-3">Max Elev</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredSatellites.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                            No satellite passes found for this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredSatellites.map(satellite => (
                          <tr key={satellite.id} className="hover:bg-gray-800/50">
                            <td className="px-6 py-4 font-medium">{satellite.name}</td>
                            <td className="px-6 py-4 text-gray-400">{satellite.noradId}</td>
                            <td className="px-6 py-4 text-gray-300">{satellite.nextPass}</td>
                            <td className="px-6 py-4 text-gray-300">{satellite.duration}</td>
                            <td className="px-6 py-4 text-gray-300">{satellite.maxElevation}</td>
                            <td className="px-6 py-4">
                              <button className="px-3 py-1 bg-blue-900/30 hover:bg-blue-800 text-blue-400 hover:text-blue-200 rounded text-xs">
                                Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - AI Explanation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">AI Pass Analysis</h3>
                  <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                    ISS (ZARYA)
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {aiExplanation}
                  </p>

                  <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Radio Communication</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Downlink</span>
                      <span className="text-blue-400">145.800 MHz</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Uplink</span>
                      <span className="text-blue-400">144.490 MHz</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Visibility Rating</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-4/5"></div>
                      </div>
                      <span className="ml-3 text-sm text-blue-400">Excellent</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02]">
                  Set Pass Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}