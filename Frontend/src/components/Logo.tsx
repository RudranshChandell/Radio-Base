export default function Logo({ className = "w-8 h-8", color = "text-blue-500" }: { className?: string; color?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className} ${color}`}
        >
            <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" className="opacity-30" />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" className="animate-ping origin-center" style={{ animationDuration: '3s' }} />
            <path d="M4.93 4.93l14.14 14.14" className="opacity-20" />
            <path d="M4.93 19.07l14.14-14.14" className="opacity-20" />
        </svg>
    );
}
