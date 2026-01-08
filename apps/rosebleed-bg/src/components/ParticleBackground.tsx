import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleBackgroundProps {
    mousePosition: { x: number; y: number };
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mousePosition }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Create more particles for a fuller effect
    const count = 8000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread particles in a large sphere
            const radius = 8 + Math.random() * 12;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, []);

    // Create varied sizes for depth effect
    const sizes = useMemo(() => {
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            s[i] = Math.random() * 0.5 + 0.1;
        }
        return s;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (pointsRef.current) {
            // Gentle continuous rotation
            pointsRef.current.rotation.y = time * 0.02;
            pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
        }

        if (groupRef.current) {
            // Cursor-based rotation with smooth easing
            const targetX = mousePosition.y * 0.15;
            const targetY = mousePosition.x * 0.15;

            groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
            groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            <Points ref={pointsRef} positions={positions} stride={3}>
                <PointMaterial
                    transparent
                    color="#ffccaa"
                    size={0.04}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>

            {/* Secondary layer with different color */}
            <Points positions={positions} stride={3} rotation={[0, Math.PI / 4, 0]}>
                <PointMaterial
                    transparent
                    color="#ff6699"
                    size={0.025}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.5}
                />
            </Points>

            {/* Subtle core glow */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial
                    color="#1a0010"
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};

export default ParticleBackground;
