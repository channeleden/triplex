import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import { exportToGLB, takeScreenshot } from '../../utils/export';

const ExportManager = () => {
    const { scene, gl } = useThree();
    const { exportAction, triggerExport } = useStore();

    useEffect(() => {
        if (exportAction === 'glb') {
            exportToGLB(scene);
            triggerExport(null);
        } else if (exportAction === 'screenshot') {
            takeScreenshot(gl);
            triggerExport(null);
        }
    }, [exportAction, scene, gl, triggerExport]);

    return null;
};

export default ExportManager;
