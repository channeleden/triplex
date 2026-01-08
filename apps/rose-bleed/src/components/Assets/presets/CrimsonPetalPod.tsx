import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron, Trail } from '@react-three/drei';
import * as THREE from 'three';

const CrimsonPetalPod = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(time) * 0.5;
            meshRef.current.rotation.y = time * 0.5;
        }
    });

    return (
        <group>
            <Trail
                width={1}
                length={5}
                color={'#ff0044'}
                attenuation={(t) => t * t}
            >
                <Icosahedron ref={meshRef} args={[1, 4]}>
                    <MeshDistortMaterial
                        color="#aa0066"
                        speed={4}
                        distort={0.6}
                        radius={1}
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#ff0044"
                        emissiveIntensity={0.8}
                    />
                </Icosahedron>
            </Trail>

            {/* "Petals" - Flat discs rotating around */}
            {[...Array(6)].map((_, i) => (
                <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
                    <mesh position={[2, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
                        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial
                            color="#ffaa88"
                            side={THREE.DoubleSide}
                            transparent
                            opacity={0.7}
                            metalness={0.5}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export default CrimsonPetalPod;
