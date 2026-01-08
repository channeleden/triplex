import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import * as THREE from 'three';

export const exportToGLB = (scene: THREE.Scene) => {
    const exporter = new GLTFExporter();

    exporter.parse(
        scene,
        (result) => {
            const output = result instanceof ArrayBuffer ? result : JSON.stringify(result);
            const blob = new Blob([output], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `rose-bleed-asset-${Date.now()}.glb`;
            link.click();
            URL.revokeObjectURL(url);
        },
        (error) => {
            console.error('An error happened during GLTF export:', error);
        },
        { binary: true }
    );
};

export const takeScreenshot = (gl: THREE.WebGLRenderer) => {
    const link = document.createElement('a');
    link.setAttribute('download', `rose-bleed-capture-${Date.now()}.png`);
    link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    link.click();
};

export const generateEmbedCode = (id: string) => {
    return `<iframe src="https://rosebleed.app/embed/${id}" width="100%" height="500px" frameborder="0"></iframe>`;
};
