import React, { useState, useRef, useEffect } from 'react';
import { useControls, Leva } from 'leva';
import { useStore } from '../../store/useStore';
import { Settings, X } from 'lucide-react';
import gsap from 'gsap';
import { clsx } from 'clsx';

const Controls = () => {
    const setPostProcessing = useStore((state) => state.setPostProcessing);
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    const postSettings = useControls('Engine', {
        bloomIntensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Bloom' },
        bloomRadius: { value: 0.4, min: 0, max: 1, step: 0.01, label: 'Bloom Radius' },
        chromaticAberration: { value: 0.002, min: 0, max: 0.05, step: 0.001, label: 'Aberration' },
    });

    useEffect(() => {
        setPostProcessing(postSettings);
    }, [postSettings, setPostProcessing]);

    useEffect(() => {
        if (panelRef.current) {
            gsap.to(panelRef.current, {
                x: isOpen ? 0 : 20,
                opacity: isOpen ? 1 : 0,
                duration: 0.3,
                ease: 'power2.out',
                pointerEvents: isOpen ? 'auto' : 'none',
            });
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-30 pointer-events-auto flex items-end gap-3">
            {/* Leva Panel */}
            <div
                ref={panelRef}
                className={clsx(
                    "transition-all",
                    !isOpen && "opacity-0 pointer-events-none translate-x-5"
                )}
            >
                <Leva
                    fill
                    flat
                    hideCopyButton
                    titleBar={{ drag: false, title: 'ENGINE PARAMS' }}
                />
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "p-3.5 rounded-xl transition-all shadow-lg",
                    isOpen
                        ? "bg-rose-red text-white hover:bg-rose-red/80"
                        : "glass-rose text-rose-peach hover:text-white"
                )}
                title={isOpen ? 'Close Settings' : 'Open Settings'}
            >
                {isOpen ? <X size={18} /> : <Settings size={18} />}
            </button>
        </div>
    );
};

export default Controls;
