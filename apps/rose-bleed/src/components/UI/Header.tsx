import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { EyeOff, Eye } from 'lucide-react';

interface HeaderProps {
    onToggleUI?: (visible: boolean) => void;
}

const Header = ({ onToggleUI }: HeaderProps) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [uiVisible, setUIVisible] = useState(true);

    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(headerRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, []);

    const handleToggle = () => {
        const newState = !uiVisible;
        setUIVisible(newState);
        onToggleUI?.(newState);
    };

    return (
        <header
            ref={headerRef}
            className="flex items-center justify-between px-2"
        >
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-white">
                        Rose<span className="text-rose-red">Bleed</span>
                    </h1>
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-rose-red/50 via-rose-magenta/30 to-transparent" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-rose-peach/40 hidden sm:block">
                    3D Asset Creator
                </span>
            </div>

            {/* UI Toggle */}
            <button
                onClick={handleToggle}
                className="pointer-events-auto p-2.5 glass rounded-lg hover:bg-white/10 transition-all group"
                title={uiVisible ? 'Hide UI (Focus Mode)' : 'Show UI'}
            >
                {uiVisible ? (
                    <EyeOff size={16} className="text-rose-peach/60 group-hover:text-white transition-colors" />
                ) : (
                    <Eye size={16} className="text-rose-red group-hover:text-white transition-colors" />
                )}
            </button>
        </header>
    );
};

export default Header;
