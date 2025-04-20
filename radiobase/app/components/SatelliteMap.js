"use client";

import { useEffect, useRef } from 'react';

export default function SatelliteMap({ satellites, selectedSatelliteId }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !satellites || satellites.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(55, 65, 81, 0.5)';
    ctx.lineWidth = 1;
    
    // Longitude lines
    for (let i = 0; i <= 360; i += 30) {
      const x = (i / 360) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      
      // Labels
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px sans-serif';
      ctx.fillText(`${i}°`, x + 2, 12);
    }
    
    // Latitude lines
    for (let i = 0; i <= 180; i += 30) {
      const y = (i / 180) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      // Labels
      if (i !== 0 && i !== 180) {
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${90 - i}°`, 2, y + 12);
      }
    }
    
    // Draw Earth's continents (simplified)
    // In a real application, you would use a proper map library
    ctx.fillStyle = 'rgba(55, 65, 81, 0.2)';
    ctx.fillRect(width * 0.2, height * 0.2, width * 0.6, height * 0.6);
    
    // Plot satellites
    satellites.forEach(satellite => {
      const isSelected = satellite.satid === selectedSatelliteId;
      
      // Convert lat/lng to x,y coordinates
      // This is a simple equirectangular projection
      const x = (satellite.satlng + 180) * (width / 360);
      const y = (90 - satellite.satlat) * (height / 180);
      
      // Draw satellite point
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? '#3B82F6' : '#6D28D9';
      ctx.fill();
      
      // Draw satellite name if selected
      if (isSelected) {
        ctx.fillStyle = '#F3F4F6';
        ctx.font = '12px sans-serif';
        ctx.fillText(satellite.satname, x + 8, y + 4);
      }
    });
    
  }, [satellites, selectedSatelliteId]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Satellite Positions</h3>
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width="800" 
          height="400" 
          className="w-full h-auto bg-gray-800 rounded"
        ></canvas>
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          Simple equirectangular projection
        </div>
      </div>
    </div>
  );
}