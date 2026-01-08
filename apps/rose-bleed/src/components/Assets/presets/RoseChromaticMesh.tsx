import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

const RoseChromaticMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.2;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron ref={meshRef} args={[1.5, 1]}>
                    <MeshDistortMaterial
                        color="#ffaa88"
                        speed={2}
                        distort={0.3}
                        radius={1}
                        wireframe
                        emissive="#ff0044"
                        emissiveIntensity={0.4}
                    />
                </Icosahedron>
            </Float>

            {/* Inner pulsing core */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#aa0066"
                    transparent
                    opacity={0.3}
                    metalness={1}
                    roughness={0}
                />
            </mesh>
        </group>
    );
};

export default RoseChromaticMesh;
