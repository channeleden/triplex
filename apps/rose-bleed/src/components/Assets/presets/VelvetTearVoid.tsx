import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

const VelvetTearVoid = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.z = time * 0.5;
        }
    });

    return (
        <group>
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <Torus ref={meshRef} args={[1.2, 0.1, 16, 100]}>
                    <MeshWobbleMaterial
                        color="#aa0066"
                        speed={5}
                        factor={1}
                        emissive="#ff0044"
                        emissiveIntensity={2}
                    />
                </Torus>
            </Float>

            {/* "Tear" - A dripping effect */}
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[0, -1 - i * 0.4, 0]}>
                    <sphereGeometry args={[0.1 - i * 0.01, 16, 16]} />
                    <meshStandardMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={1} />
                </mesh>
            ))}

            <pointLight position={[0, -2, 0]} color="#ff0044" intensity={3} />
        </group>
    );
};

export default VelvetTearVoid;
