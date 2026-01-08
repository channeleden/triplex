import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const BleedingRoseOrb = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.2;
            meshRef.current.rotation.z = time * 0.1;
        }
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        }
    });

    return (
        <group>
            {/* Outer Shell - Distorted & Semi-transparent */}
            <Sphere ref={meshRef} args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#ff0044"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    transparent
                    opacity={0.6}
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#aa0066"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Inner Core - Glowing & Pulsing */}
            <Sphere ref={coreRef} args={[0.8, 32, 32]}>
                <MeshWobbleMaterial
                    color="#ffaa88"
                    speed={5}
                    factor={0.6}
                    emissive="#ff0044"
                    emissiveIntensity={2}
                />
            </Sphere>

            {/* Subtle Vein-like Particles or Highlights */}
            <points>
                <sphereGeometry args={[1.6, 32, 32]} />
                <pointsMaterial
                    color="#88ffff"
                    size={0.02}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export default BleedingRoseOrb;
