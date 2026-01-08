import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { ChevronRight, ChevronLeft, Download, Image, Code, Palette } from 'lucide-react';
import { clsx } from 'clsx';
import { generateEmbedCode } from '../../utils/export';
import gsap from 'gsap';

interface SidebarProps {
    side: 'left' | 'right';
}

const Sidebar = ({ side }: SidebarProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(true);
    const { preset, setPreset, triggerExport } = useStore();

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { x: side === 'left' ? -200 : 200, opacity: 1 },
                { x: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.8 }
            );
        }
    }, [side]);

    const presets = [
        'Bleeding Rose Orb',
        'Thorn Veil Island',
        'Crimson Petal Pod',
        'Veined Neon Text',
        'Blood Glass Sculpture',
        'Soft Decay Particles',
        'Velvet Tear Void',
        'Rose Chromatic Mesh',
    ];

    return (
        <div
            ref={containerRef}
            className={clsx(
                "pointer-events-auto flex items-center transition-transform duration-500 ease-in-out",
                // Reduced height constraint and positioned centrally
                side === 'left' ? "items-start pt-20" : "items-end pb-20",
                !isOpen && (side === 'left' ? "-translate-x-[calc(100%-1rem)]" : "translate-x-[calc(100%-1rem)]")
            )}
        >
            <div className={clsx(
                "relative glass rounded-3xl p-5 flex flex-col gap-4 transition-all duration-300",
                side === 'left' ? "w-72" : "w-64",
                isOpen ? "opacity-100" : "opacity-80 hover:opacity-100"
            )}
                style={{ maxHeight: '65vh' }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "absolute top-6 glass-rose w-6 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-110 active:scale-95 shadow-lg z-20",
                        side === 'left' ? "-right-3" : "-left-3"
                    )}
                >
                    {side === 'left' ? (
                        isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />
                    ) : (
                        isOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />
                    )}
                </button>

                {side === 'left' ? (
                    <>
                        <div className="flex items-center gap-3 text-rose-peach border-b border-white/5 pb-3">
                            <div className="p-2 bg-rose-red/10 rounded-lg">
                                <Palette size={18} className="text-rose-red" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold tracking-tight text-white">Asset Generator</h2>
                                <p className="text-[10px] text-rose-peach/50 uppercase tracking-widest">Select Model Config</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar -mr-2">
                            <div className="flex flex-col gap-2">
                                {presets.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPreset(p)}
                                        className={clsx(
                                            "group relative w-full text-left p-3 rounded-xl text-sm transition-all border outline-none",
                                            preset === p
                                                ? "bg-rose-900/40 border-rose-red/50 text-white shadow-[0_0_15px_rgba(255,0,68,0.2)]"
                                                : "border-transparent hover:bg-white/5 text-rose-peach/70 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <span className="font-medium tracking-wide">{p}</span>
                                            {preset === p && <div className="w-1.5 h-1.5 rounded-full bg-rose-red shadow-[0_0_5px_#ff0044]" />}
                                        </div>
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-red/0 via-rose-red/5 to-rose-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3 text-rose-peach border-b border-white/5 pb-3">
                            <div className="p-2 bg-rose-red/10 rounded-lg">
                                <Download size={18} className="text-rose-red" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold tracking-tight text-white">Export Lab</h2>
                                <p className="text-[10px] text-rose-peach/50 uppercase tracking-widest">Save Output</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => triggerExport('glb')}
                                className="group w-full flex items-center justify-between p-4 bg-rose-red/10 border border-rose-red/20 rounded-xl text-sm hover:bg-rose-red/20 hover:border-rose-red/40 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                            >
                                <span className="font-bold text-white tracking-wide">Download .GLB</span>
                                <Download size={16} className="text-rose-red group-hover:text-white transition-colors" />
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => triggerExport('screenshot')}
                                    className="flex flex-col items-center justify-center gap-2 p-3 glass rounded-xl text-xs border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all"
                                >
                                    <Image size={18} className="text-rose-peach/60 mb-1" />
                                    <span>Capture</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const code = generateEmbedCode('rose-bleed-asset');
                                        navigator.clipboard.writeText(code);
                                        alert('Embed code copied to clipboard!');
                                    }}
                                    className="flex flex-col items-center justify-center gap-2 p-3 glass rounded-xl text-xs border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all"
                                >
                                    <Code size={18} className="text-rose-peach/60 mb-1" />
                                    <span>Embed</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-white/10 pt-4">
                            <div className="flex items-center justify-center gap-2 opacity-40">
                                <div className="w-1 h-1 bg-rose-red rounded-full animate-pulse" />
                                <p className="text-[10px] uppercase tracking-widest text-rose-peach">
                                    System Online
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
