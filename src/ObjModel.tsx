import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { MTLLoader, OBJLoader } from "three-stdlib";
import * as THREE from "three";

interface ObjModelProps {
  objPath: string;
  mtlPath: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotationSpeed?: number;
}

export function ObjModel({
  objPath,
  mtlPath,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotationSpeed = 0.01,
}: ObjModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <primitive
      object={obj}
      ref={groupRef}
      position={position}
      scale={scale}
    />
  );
}
