import { Canvas } from "@react-three/fiber";
import { ObjModel } from "./ObjModel";
import { OrbitControls } from "@react-three/drei";

export default function Car() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <ObjModel
        objPath="/models/chevrolet/car.obj"
        mtlPath="/models/chevrolet/car.mtl"
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        rotationSpeed={0.005}
      />
      <OrbitControls enablePan={false}
        maxPolarAngle={Math.PI / 2} // restrict vertical rotation
 />
    </Canvas>
  );
}
