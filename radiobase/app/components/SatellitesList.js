"use client";

import { useState } from 'react';

export default function SatellitesList({ satellites }) {
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'satname', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort satellites based on current sortConfig
  const sortedSatellites = [...satellites].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter satellites based on search term
  const filteredSatellites = sortedSatellites.filter(satellite => 
    satellite.satname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    satellite.intDesignator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format altitude for display
  const formatAltitude = (alt) => {
    return `${Math.round(alt).toLocaleString()} km`;
  };

  // Format coordinates for display
  const formatCoordinate = (coord) => {
    return coord.toFixed(4) + '°';
  };

  return (
    <div>
      {/* Header with search */}
      <div className="p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Active Satellites</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search satellites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Satellites table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-500 bg-gray-800/70">
              <th 
                className="px-6 py-3 cursor-pointer hover:text-gray-300"
                onClick={() => requestSort('satname')}
              >
                Name
                {sortConfig.key === 'satname' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="px-6 py-3 cursor-pointer hover:text-gray-300"
                onClick={() => requestSort('intDesignator')}
              >
                Designator
              </th>
              <th 
                className="px-6 py-3 cursor-pointer hover:text-gray-300"
                onClick={() => requestSort('launchDate')}
              >
                Launch Date
              </th>
              <th 
                className="px-6 py-3 cursor-pointer hover:text-gray-300"
                onClick={() => requestSort('satalt')}
              >
                Altitude
              </th>
              <th className="px-6 py-3">Coordinates</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredSatellites.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                  No satellites found matching your search.
                </td>
              </tr>
            ) : (
              filteredSatellites.map(satellite => (
                <tr 
                  key={satellite.satid} 
                  className={`hover:bg-gray-800/50 ${selectedSatellite === satellite.satid ? 'bg-blue-900/20' : ''}`}
                  onClick={() => setSelectedSatellite(selectedSatellite === satellite.satid ? null : satellite.satid)}
                >
                  <td className="px-6 py-4 font-medium">{satellite.satname}</td>
                  <td className="px-6 py-4 text-gray-400">{satellite.intDesignator}</td>
                  <td className="px-6 py-4 text-gray-300">{satellite.launchDate}</td>
                  <td className="px-6 py-4 text-gray-300">{formatAltitude(satellite.satalt)}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatCoordinate(satellite.satlat)}, {formatCoordinate(satellite.satlng)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-blue-900/30 hover:bg-blue-800 text-blue-400 hover:text-blue-200 rounded text-xs">
                      Track
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected satellite details panel */}
      {selectedSatellite && (
        <div className="border-t border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {filteredSatellites.find(s => s.satid === selectedSatellite)?.satname}
            </h3>
            <button 
              onClick={() => setSelectedSatellite(null)}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Satellite Information</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white">{selectedSatellite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Int'l Designator:</span>
                  <span className="text-white">
                    {filteredSatellites.find(s => s.satid === selectedSatellite)?.intDesignator}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Launch Date:</span>
                  <span className="text-white">
                    {filteredSatellites.find(s => s.satid === selectedSatellite)?.launchDate}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Current Position</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latitude:</span>
                  <span className="text-white">
                    {formatCoordinate(filteredSatellites.find(s => s.satid === selectedSatellite)?.satlat)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longitude:</span>
                  <span className="text-white">
                    {formatCoordinate(filteredSatellites.find(s => s.satid === selectedSatellite)?.satlng)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Altitude:</span>
                  <span className="text-white">
                    {formatAltitude(filteredSatellites.find(s => s.satid === selectedSatellite)?.satalt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300">
              Get Map View 
            </button>
          </div>
        </div>
      )}
    </div>
  );
}