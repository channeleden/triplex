import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scene from './components/Canvas/Scene';
import Header from './components/UI/Header';
import Sidebar from './components/UI/Sidebar';
import PostProcessing from './components/Canvas/PostProcessing';
import Controls from './components/UI/Controls';
import ExportManager from './components/Canvas/ExportManager';
import CanvasErrorBoundary from './components/UI/CanvasErrorBoundary';
import { clsx } from 'clsx';

const App = () => {
    const [uiVisible, setUIVisible] = useState(true);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            <div className="grain-overlay" />

            {/* 3D Canvas Layer - Wrapped in Error Boundary */}
            <CanvasErrorBoundary>
                <Canvas
                    shadows
                    gl={{
                        antialias: true,
                        stencil: false,
                        alpha: false,
                        powerPreference: 'high-performance',
                        failIfMajorPerformanceCaveat: false
                    }}
                    dpr={[1, 1.5]}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#0f0008');
                    }}
                >
                    <Suspense fallback={null}>
                        <Scene />
                        <ExportManager />
                        {/* PostProcessing temporarily disabled due to library compatibility issue */}
                        {/* <PostProcessing /> */}
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableDamping
                        dampingFactor={0.05}
                        maxPolarAngle={Math.PI / 1.75}
                        minDistance={1.5}
                        maxDistance={12}
                    />
                    <PerspectiveCamera makeDefault position={[2.5, 1.5, 3.5]} fov={32} />
                </Canvas>
            </CanvasErrorBoundary>

            {/* UI Layer */}
            <div
                className={clsx(
                    "absolute inset-0 pointer-events-none z-10 flex flex-col p-4 sm:p-6 transition-opacity duration-500",
                    !uiVisible && "opacity-0"
                )}
            >
                {/* Top Bar */}
                <Header onToggleUI={setUIVisible} />

                {/* Sidebars */}
                <div className="flex-1 flex items-center justify-between mt-4">
                    <Sidebar side="left" />
                    <Sidebar side="right" />
                </div>
            </div>

            {/* Controls (always visible for quick access) */}
            <Controls />
        </div>
    );
};

export default App;
