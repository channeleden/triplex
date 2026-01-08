import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((event: React.MouseEvent) => {
        // Normalize mouse position to -1 to 1 range
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
    }, []);

    return (
        <div
            style={{ width: '100vw', height: '100vh', background: '#0f0008' }}
            onMouseMove={handleMouseMove}
        >
            <Canvas
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={['#0f0008']} />

                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />

                <ambientLight intensity={0.3} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#ff4466" />

                <ParticleBackground mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
};

export default App;
