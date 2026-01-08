import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useStore } from '../../store/useStore';

const PostProcessing = () => {
    const { bloomIntensity, bloomRadius } = useStore();

    return (
        <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
                intensity={bloomIntensity}
                radius={bloomRadius}
                luminanceThreshold={0.85}
                mipmapBlur
            />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
    );
};

export default PostProcessing;
