'use client';

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ChangeEvent, useState } from "react";
import ThreeMesh from "./three-mesh";

export default function ThreeCanvas() {
    const [explosionValue, setExplosionValue] = useState<number>(0);

    function updateExplosionSlider(e: ChangeEvent<HTMLInputElement>) {
        setExplosionValue(parseFloat(e.target.value));
    }

    return (
        <div className="w-full h-full">
            <div className="h-[calc(100%-3rem)]">
            <Canvas>
                <ThreeMesh explosionFactor={explosionValue}/>
                <Environment preset="sunset"/>
                <OrbitControls/>
            </Canvas>
            </div>
            <div className="bg-slate-600 flex justify-center">
                <input className="w-80 h-8 m-2" type="range" min="0" max="10" step={0.01} defaultValue={0} onChange={e => updateExplosionSlider(e)}/>
            </div>
        </div>
    );
}
