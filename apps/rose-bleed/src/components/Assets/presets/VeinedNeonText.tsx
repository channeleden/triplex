import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const VeinedNeonText = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        }
    });

    return (
        <group>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Text
                    ref={meshRef as any}
                    font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvL-7_WveNoM2QNf-zv321.woff"
                    fontSize={1.5}
                    color="#ff0044"
                    anchorX="center"
                    anchorY="middle"
                >
                    ROSE{' '}
                    <MeshWobbleMaterial
                        speed={2}
                        factor={0.1}
                        emissive="#ff0044"
                        emissiveIntensity={2}
                    />
                </Text>
                <Text
                    position={[0, -1.2, 0]}
                    font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvL-7_WveNoM2QNf-zv321.woff"
                    fontSize={1}
                    color="#88ffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    BLEED
                    <MeshWobbleMaterial
                        speed={1}
                        factor={0.05}
                        emissive="#88ffff"
                        emissiveIntensity={1}
                    />
                </Text>
            </Float>

            {/* "Veins" - Abstract lines coming out of the text */}
            {[...Array(20)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 2,
                        (Math.random() - 0.5) * 1
                    ]}
                    rotation={[0, 0, Math.random() * Math.PI]}
                >
                    <boxGeometry args={[0.01, Math.random() * 2, 0.01]} />
                    <meshStandardMaterial
                        color="#ff0044"
                        emissive="#ff0044"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default VeinedNeonText;
