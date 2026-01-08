import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectState {
    preset: string;
    setPreset: (preset: string) => void;

    // Post-processing settings
    bloomIntensity: number;
    bloomRadius: number;
    chromaticAberration: number;
    setPostProcessing: (settings: Partial<{ bloomIntensity: number; bloomRadius: number; chromaticAberration: number }>) => void;

    // Export trigger
    exportAction: 'glb' | 'screenshot' | null;
    triggerExport: (action: 'glb' | 'screenshot' | null) => void;
}

export const useStore = create<ProjectState>()(
    persist(
        (set) => ({
            preset: 'Bleeding Rose Orb',
            setPreset: (preset) => set({ preset }),

            bloomIntensity: 1.5,
            bloomRadius: 0.4,
            chromaticAberration: 0.002,

            setPostProcessing: (settings) => set((state) => ({ ...state, ...settings })),

            exportAction: null,
            triggerExport: (action) => set({ exportAction: action }),
        }),
        {
            name: 'rose-bleed-storage',
            partialize: (state) => ({
                preset: state.preset,
                bloomIntensity: state.bloomIntensity,
                bloomRadius: state.bloomRadius,
                chromaticAberration: state.chromaticAberration,
            }),
        }
    )
);
