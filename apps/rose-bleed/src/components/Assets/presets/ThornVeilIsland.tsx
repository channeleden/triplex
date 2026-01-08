import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, TorusKnot, Float } from '@react-three/drei';
import * as THREE from 'three';

const ThornVeilIsland = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
                    <MeshWobbleMaterial
                        color="#0f0008"
                        speed={2}
                        factor={0.4}
                        metalness={1}
                        roughness={0}
                        emissive="#ff0044"
                        emissiveIntensity={0.2}
                    />
                </TorusKnot>
            </Float>

            {/* "Thorns" - Small sharp cylinders scattered around */}
            {[...Array(12)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos(i * Math.PI / 6) * 1.5,
                        Math.sin(i * Math.PI / 3) * 0.5,
                        Math.sin(i * Math.PI / 6) * 1.5
                    ]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                >
                    <coneGeometry args={[0.05, 0.4, 4]} />
                    <meshStandardMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={1} />
                </mesh>
            ))}

            {/* Subtle Glow Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.01, 16, 100]} />
                <meshStandardMaterial
                    color="#88ffff"
                    emissive="#88ffff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    );
};

export default ThornVeilIsland;
