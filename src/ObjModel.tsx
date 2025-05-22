import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MTLLoader, OBJLoader } from "three-stdlib";
import * as THREE from "three";

interface ObjModelProps {
  objPath: string;
  mtlPath: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotationSpeed?: number;
  color?: string;
}

export function ObjModel({
  objPath,
  mtlPath,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotationSpeed = 0.01,
  color = "#ff0000",
}: ObjModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Override all mesh materials with the selected color
  obj.traverse((child: unknown) => {
    if (child instanceof THREE.Mesh) {
      const name = child.name.toLowerCase();
      const matName = child.material?.name?.toLowerCase?.() ?? "";

      // Only apply color to car body parts
      if (
        name.includes("carroceria") ||
        name.includes("pueratas") || // doors
        matName === "material" // generic body material
      ) {
        child.material = new THREE.MeshStandardMaterial({
          color,
          metalness: 0.3,
          roughness: 0.6,
        });
      }
    }
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
