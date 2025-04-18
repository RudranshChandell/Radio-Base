"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="satellite-orbit">
          <div className={`satellite ${loaded ? 'animate-orbit' : ''}`}>
            <div className="satellite-body"></div>
            <div className="satellite-panel left"></div>
            <div className="satellite-panel right"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="z-10 w-full max-w-5xl px-5 backdrop-blur-sm bg-gray-900/40 py-16 rounded-lg flex flex-col items-center justify-center">
        {/* Logo & Title */}
        <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            RadioBase
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">
            Live satellite pass predictions powered by AI.
          </p>
        </div>

        {/* Buttons */}
        <div className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
            Login
          </Link>
          <Link href="http://localhost:8080/oauth2/authorization/google" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
            Register
          </Link>
        </div>

        {/* Description Card */}
        <div className={`mt-16 max-w-2xl text-center bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl font-semibold mb-2">Track satellites in real-time</h2>
          <p className="text-gray-400">
            RadioBase provides accurate satellite pass predictions and AI-powered explanations for amateur radio operators, space enthusiasts, and satellite trackers.
          </p>
        </div>
      </div>

      <style jsx>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), 
                           radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), 
                           radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), 
                           radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), 
                           radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), 
                           radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }

        .satellite-orbit {
          position: absolute;
          width: 150%;
          height: 300%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px dashed rgba(100, 100, 255, 0.1);
          border-radius: 50%;
        }

        .satellite {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 20px;
          opacity: 0.8;
        }

        .animate-orbit {
          animation: orbit 40s linear infinite;
        }

        .satellite-body {
          position: absolute;
          width: 20px;
          height: 10px;
          background: #aaa;
          border-radius: 3px;
          left: 10px;
          top: 5px;
          box-shadow: 0 0 10px rgba(100, 100, 255, 0.8);
        }

        .satellite-panel {
          position: absolute;
          width: 14px;
          height: 5px;
          background: #66f;
          top: 7px;
        }

        .satellite-panel.left {
          left: -4px;
        }

        .satellite-panel.right {
          right: -4px;
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(75%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(75%) rotate(-360deg);
          }
        }
      `}</style>
    </main>
  );
}