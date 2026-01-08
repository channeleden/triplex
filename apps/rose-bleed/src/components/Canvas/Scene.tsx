import React from 'react';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import BleedingRoseOrb from '../Assets/presets/BleedingRoseOrb';
import ThornVeilIsland from '../Assets/presets/ThornVeilIsland';
import CrimsonPetalPod from '../Assets/presets/CrimsonPetalPod';
import VeinedNeonText from '../Assets/presets/VeinedNeonText';
import BloodGlassSculpture from '../Assets/presets/BloodGlassSculpture';
import SoftDecayParticles from '../Assets/presets/SoftDecayParticles';
import VelvetTearVoid from '../Assets/presets/VelvetTearVoid';
import RoseChromaticMesh from '../Assets/presets/RoseChromaticMesh';

const Scene = () => {
    const preset = useStore((state) => state.preset);

    return (
        <>
            <color attach="background" args={['#0f0008']} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0044" />

            {/* Environment */}
            <Environment preset="city" />

            {/* 3D Asset Presets */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {preset === 'Bleeding Rose Orb' && <BleedingRoseOrb />}
                {preset === 'Thorn Veil Island' && <ThornVeilIsland />}
                {preset === 'Crimson Petal Pod' && <CrimsonPetalPod />}
                {preset === 'Veined Neon Text' && <VeinedNeonText />}
                {preset === 'Blood Glass Sculpture' && <BloodGlassSculpture />}
                {preset === 'Soft Decay Particles' && <SoftDecayParticles />}
                {preset === 'Velvet Tear Void' && <VelvetTearVoid />}
                {preset === 'Rose Chromatic Mesh' && <RoseChromaticMesh />}
                {/* Add more presets here as they are created */}
            </Float>

            <ContactShadows
                position={[0, -2, 0]}
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
            />
        </>
    );
};

export default Scene;
