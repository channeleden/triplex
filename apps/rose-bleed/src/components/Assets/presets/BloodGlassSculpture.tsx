import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Octahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

const BloodGlassSculpture = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.4;
            meshRef.current.rotation.x = time * 0.2;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Octahedron ref={meshRef} args={[1.5, 0]}>
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={1}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.1}
                        color="#ff0044"
                        attenuationDistance={0.5}
                        attenuationColor="#000000"
                    />
                </Octahedron>
            </Float>

            {/* Internal "Blood" - Smaller pulsing core inside the glass */}
            <mesh>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color="#aa0066"
                    emissive="#ff0044"
                    emissiveIntensity={2}
                    roughness={0}
                    metalness={1}
                />
            </mesh>

            {/* Refracted glow */}
            <pointLight position={[0, 0, 0]} color="#ff0044" intensity={5} distance={3} />
        </group>
    );
};

export default BloodGlassSculpture;
