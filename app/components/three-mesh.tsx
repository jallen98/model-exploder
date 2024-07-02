'use client';

import { useLoader } from "@react-three/fiber";
import { Box3, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function ThreeMesh({ explosionFactor }: { explosionFactor: number }) {
    // Load the model
    const model = useLoader(GLTFLoader, 'microphone_model/scene.gltf');

    // Traverse the scene to find meshes
    model.scene.traverse((obj) => {
        // Cast to mesh
        const mesh = obj as Mesh;

        if (mesh.isMesh) {
            // Reset position
            mesh.position.set(0, 0, 0);

            // Placeholders for center and translation direction
            const meshCenter = new Vector3();
            const direction = new Vector3();

            // If there's a bounding box, calculate direction and translate
            if (mesh.geometry.boundingBox) {
                mesh.geometry.boundingBox.getCenter(meshCenter);
                meshCenter.normalize().multiplyScalar(explosionFactor);
                obj.position.add(meshCenter);
            }
        }
    });

    return (
        <primitive object={model.scene}/>
    );
}
