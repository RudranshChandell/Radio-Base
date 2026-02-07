'use client';

import React from 'react';

export default function CreatorPage() {
    return (
        <main className="min-h-screen relative flex items-center justify-center p-8 overflow-hidden font-sans">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">

                    <div className="md:flex md:items-start md:gap-12">
                        {/* Left Column: Image & Badge */}
                        <div className="relative shrink-0 mx-auto md:mx-0 mb-8 md:mb-0 group flex-col items-center flex">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl skew-y-0 hover:skew-y-1 transition-all duration-500">
                                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src="/rudransh.jpg"
                                    alt="Rudransh Chandel"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="mt-6 glass px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/30">
                                Lead Architect
                            </div>

                            {/* Location */}
                            <div className="mt-4 flex items-center text-gray-400 text-sm gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Greater Noida, India
                            </div>
                        </div>

                        {/* Right Column: Bio & Details */}
                        <div className="flex-1 space-y-8 text-center md:text-left">

                            {/* Header */}
                            <div>
                                <h2 className="text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 animate-pulse">Engineer Profile</h2>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-300">
                                    Rudransh Chandel
                                </h1>
                                <p className="text-xl text-blue-200/80 mt-2 font-light">Backend Software Engineer | Scalable Systems Specialist</p>
                            </div>

                            {/* Summary */}
                            <p className="text-gray-300 leading-relaxed text-lg font-light border-l-2 border-blue-500/50 pl-6 italic">
                                "Specializing in architecting high-performance RESTful APIs and distributed data management.
                                Proven ability to optimize system latency and reduce infrastructure costs through algorithmic efficiency."
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Core Arsenal</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {['Java 17', 'Spring Boot', 'System Design', 'Next.js', 'PostgreSQL', 'Docker'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs font-medium hover:bg-blue-500/20 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Highlights Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">
                                <a href="https://waste2-plate-b8jr.vercel.app/" target="_blank" rel="noopener noreferrer" className="group glass-card p-4 hover:border-blue-400/50 transition-all cursor-pointer block">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-blue-300 font-semibold group-hover:text-blue-200">Waste2Plate Platform</h4>
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">Next.js • Firebase • Google Maps API</p>
                                    <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                                        <li>Implemented Atomic Firestore Transactions for consistency.</li>
                                        <li>Optimized Maps API overhead by 90% via Haversine filtering.</li>
                                    </ul>
                                </a>

                                <div className="glass-card p-4 hover:border-purple-400/50 transition-all">
                                    <h4 className="text-purple-300 font-semibold mb-2">High Perf API Gateway</h4>
                                    <p className="text-xs text-gray-400 mb-2">Java 17 • Zero Dependency • Concurrency</p>
                                    <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                                        <li>Token Bucket algorithm for Layer 7 traffic control.</li>
                                        <li>Cache-Aside pattern serving read-heavy requests in O(1).</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="pt-6 flex items-center justify-center md:justify-start gap-6 border-t border-white/5">
                                <a href="https://github.com/RudranshChandell" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                                    <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">GitHub</span>
                                </a>
                                <div className="w-px h-4 bg-gray-700"></div>
                                <a href="https://www.linkedin.com/in/rudransh-chandel/" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                                    <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
