import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onProgress?: (val: number) => void
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          "/models/new.glb",
          (gltf) => {
            character = gltf.scene;
            character.scale.setScalar(7.2);
            character.position.set(0, 1.2, 0);

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Fix skin poking through shirt (mesh penetration & Z-fighting at collar)
                if (child.name === "avaturn_look_1" || child.name.includes("look_1")) {
                  if (mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.polygonOffset = true;
                    mat.polygonOffsetFactor = -2;
                    mat.polygonOffsetUnits = -2;
                  }
                  const pos = mesh.geometry?.attributes?.position;
                  const norm = mesh.geometry?.attributes?.normal;
                  if (pos && norm) {
                    for (let i = 0; i < pos.count; i++) {
                      const y = pos.getY(i);
                      if (y > 1.30 && y < 1.55) {
                        pos.setX(i, pos.getX(i) + norm.getX(i) * 0.002);
                        pos.setY(i, pos.getY(i) + norm.getY(i) * 0.002);
                        pos.setZ(i, pos.getZ(i) + norm.getZ(i) * 0.002);
                      }
                    }
                    pos.needsUpdate = true;
                  }
                }

                if (child.name === "Body_Mesh" || child.name.includes("Body")) {
                  const pos = mesh.geometry?.attributes?.position;
                  if (pos) {
                    for (let i = 0; i < pos.count; i++) {
                      const y = pos.getY(i);
                      const z = pos.getZ(i);
                      // Pull chest area underneath shirt inward so it never penetrates the fabric
                      if (y > 1.25 && y < 1.52 && z > 0) {
                        pos.setZ(i, z - 0.005);
                      }
                    }
                    pos.needsUpdate = true;
                  }
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();

            // Run compileAsync asynchronously in background so loader is never blocked
            renderer.compileAsync(character, camera, scene).catch(() => {});
            dracoLoader.dispose();
          },
          (xhr) => {
            if (xhr.lengthComputable && xhr.total > 0 && onProgress) {
              const p = Math.min(Math.round((xhr.loaded / xhr.total) * 98), 98);
              onProgress(p);
            }
          },
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
