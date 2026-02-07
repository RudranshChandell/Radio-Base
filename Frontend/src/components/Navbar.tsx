'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
            <div className="glass rounded-full px-6 py-3 flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-3 group">
                    <Logo className="w-6 h-6" color={isActive('/') ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'} />
                    <span className={`text-sm font-bold tracking-wide transition-colors ${isActive('/') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        Radio-Base Nexus
                    </span>
                </Link>

                <div className="w-px h-4 bg-white/10"></div>

                <Link href="/creator" className="flex items-center space-x-2 group">
                    <div className={`w-2 h-2 rounded-full transition-colors ${isActive('/creator') ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'bg-white/20 group-hover:bg-purple-400'}`}></div>
                    <span className={`text-sm font-medium transition-colors ${isActive('/creator') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        Creator
                    </span>
                </Link>
            </div>
        </nav>
    );
}
