"use client";

import { useEffect, useState } from "react";
import { SatelliteInfo } from "@/types/satellite";

type Props = {
  satellite: SatelliteInfo;
};

export default function SatelliteCard({ satellite }: Props) {
  const [countdown, setCountdown] = useState<number | null>(
    satellite.countdownSeconds
  );

  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      setCountdown(0);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-400/20 transition-all duration-500"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white mb-2">
          {satellite.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${satellite.status === 'CURRENT' ? 'bg-green-500/20 text-green-300' :
                satellite.status === 'UPCOMING' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
              }`}>
              {satellite.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Altitude</span>
            <span className="font-mono text-white">{satellite.altitude.toFixed(2)} km</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            {countdown !== null ? (
              <div className="flex flex-col items-center">
                <span className="text-xs text-blue-300 uppercase tracking-wider mb-1">Next Pass In</span>
                <span className="text-2xl font-mono font-bold text-white tabular-nums">
                  {new Date(countdown * 1000).toISOString().substr(11, 8)}
                </span>
                <span className="text-xs text-gray-500 mt-1">hh:mm:ss</span>
              </div>
            ) : (
              <div className="text-center py-2 text-gray-500 text-xs italic">
                No active countdown
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
