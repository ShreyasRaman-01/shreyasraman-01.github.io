import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./index.module.css";

const ROOM_W = 9;
const ROOM_D = 8;
const ROOM_H = 3.15;
const HALF_W = ROOM_W / 2;
const HALF_D = ROOM_D / 2;

type Bounds = { minX: number; maxX: number; minZ: number; maxZ: number };

const FURNITURE: Bounds[] = [
  { minX: -4.35, maxX: -2.15, minZ: -2.35, maxZ: 1.15 },
  { minX: -4.4, maxX: -3.15, minZ: 1.85, maxZ: 3.15 },
  { minX: -1.45, maxX: 1.45, minZ: -3.95, maxZ: -3.35 },
];

function blocked(x: number, z: number, radius: number) {
  if (x < -HALF_W + 0.55 || x > HALF_W - 0.55 || z < -HALF_D + 0.55 || z > HALF_D - 0.55) {
    return true;
  }
  return FURNITURE.some(
    (box) =>
      x > box.minX - radius &&
      x < box.maxX + radius &&
      z > box.minZ - radius &&
      z < box.maxZ + radius
  );
}

export default function Room() {
  const mountRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#241c18");
    scene.fog = new THREE.Fog("#241c18", 14, 24);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.08, 40);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const mat = (color: number, roughness = 0.82, extras?: Partial<THREE.MeshStandardMaterialParameters>) => {
      const material = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.04, ...extras });
      materials.push(material);
      return material;
    };

    const add = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
      rotY = 0,
      rotZ = 0
    ) => {
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.rotation.y = rotY;
      mesh.rotation.z = rotZ;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    const wall = mat(0xf0e2d0, 0.92);
    const trim = mat(0xd7c3aa, 0.7);
    const wood = mat(0x8d5a34, 0.62);
    const darkWood = mat(0x5c3b24, 0.55);
    const cloth = mat(0xc46b6b, 0.9);
    const pillow = mat(0xf4efe6, 0.95);
    const metal = mat(0x2c2c30, 0.35, { metalness: 0.6 });
    const screen = mat(0x1a2433, 0.25, { emissive: 0x243044, emissiveIntensity: 0.55 });
    const curtain = mat(0x8e2f3a, 0.88);
    const glass = mat(0xffffff, 0.05, { transparent: true, opacity: 0.12 });

    add(scene, new THREE.BoxGeometry(ROOM_W, 0.12, ROOM_D), mat(0xb88858, 0.7), 0, -0.06, 0);
    add(scene, new THREE.BoxGeometry(ROOM_W, 0.1, ROOM_D), mat(0xf7f1e8, 0.95), 0, ROOM_H, 0);
    add(scene, new THREE.BoxGeometry(0.16, ROOM_H, ROOM_D), wall, HALF_W, ROOM_H / 2, 0);
    add(scene, new THREE.BoxGeometry(0.16, ROOM_H, ROOM_D), wall, -HALF_W, ROOM_H / 2, 0);

    const doorW = 1.15;
    const doorH = 2.25;
    add(scene, new THREE.BoxGeometry((ROOM_W - doorW) / 2, ROOM_H, 0.16), wall, -(doorW + ROOM_W) / 4, ROOM_H / 2, HALF_D);
    add(scene, new THREE.BoxGeometry((ROOM_W - doorW) / 2, ROOM_H, 0.16), wall, (doorW + ROOM_W) / 4, ROOM_H / 2, HALF_D);
    add(scene, new THREE.BoxGeometry(doorW, ROOM_H - doorH, 0.16), wall, 0, doorH + (ROOM_H - doorH) / 2, HALF_D);
    add(scene, new THREE.BoxGeometry(doorW + 0.16, doorH + 0.08, 0.08), darkWood, 0, doorH / 2, HALF_D - 0.08);
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-(doorW - 0.08) / 2, 0, HALF_D - 0.14);
    scene.add(doorPivot);
    add(doorPivot, new THREE.BoxGeometry(doorW - 0.08, doorH - 0.06, 0.06), wood, (doorW - 0.08) / 2, doorH / 2, 0);
    add(doorPivot, new THREE.SphereGeometry(0.045, 12, 12), metal, doorW - 0.28, 1.05, -0.06);
    let doorOpen = false;
    let doorAngle = 0;

    add(scene, new THREE.BoxGeometry(ROOM_W - 0.2, 0.08, 0.08), trim, 0, 0.06, -HALF_D + 0.12);
    add(scene, new THREE.BoxGeometry(0.08, 0.08, ROOM_D - 0.2), trim, -HALF_W + 0.12, 0.06, 0);
    add(scene, new THREE.BoxGeometry(0.08, 0.08, ROOM_D - 0.2), trim, HALF_W - 0.12, 0.06, 0);

    const bedZ = -0.55;
    const winW = 2.2;
    const winH = 1.55;
    const winY = 1.72;
    const winX = -2.55;
    const winBottom = winY - winH / 2;
    const winTop = winY + winH / 2;
    const winX0 = winX - winW / 2;
    const winX1 = winX + winW / 2;
    const belowH = winBottom;
    const aboveH = ROOM_H - winTop;
    const sideLeft = winX0 + HALF_W;
    const sideRight = HALF_W - winX1;
    add(scene, new THREE.BoxGeometry(ROOM_W, belowH, 0.16), wall, 0, belowH / 2, -HALF_D);
    add(scene, new THREE.BoxGeometry(ROOM_W, aboveH, 0.16), wall, 0, winTop + aboveH / 2, -HALF_D);
    add(scene, new THREE.BoxGeometry(sideLeft, winH, 0.16), wall, -HALF_W + sideLeft / 2, winY, -HALF_D);
    add(scene, new THREE.BoxGeometry(sideRight, winH, 0.16), wall, HALF_W - sideRight / 2, winY, -HALF_D);
    add(scene, new THREE.BoxGeometry(0.08, winH + 0.14, 0.08), darkWood, winX0, winY, -HALF_D + 0.1);
    add(scene, new THREE.BoxGeometry(0.08, winH + 0.14, 0.08), darkWood, winX1, winY, -HALF_D + 0.1);
    add(scene, new THREE.BoxGeometry(winW, 0.08, 0.08), darkWood, winX, winTop, -HALF_D + 0.1);
    add(scene, new THREE.BoxGeometry(winW, 0.08, 0.08), darkWood, winX, winBottom, -HALF_D + 0.1);
    add(scene, new THREE.BoxGeometry(0.045, winH, 0.05), darkWood, winX, winY, -HALF_D + 0.12);
    add(scene, new THREE.BoxGeometry(winW, 0.045, 0.05), darkWood, winX, winY, -HALF_D + 0.12);
    const pane = add(scene, new THREE.BoxGeometry(winW - 0.04, winH - 0.04, 0.02), glass, winX, winY, -HALF_D + 0.06);
    pane.castShadow = false;

    const outdoors = document.createElement("canvas");
    outdoors.width = 640;
    outdoors.height = 380;
    const paint = outdoors.getContext("2d");
    if (paint) {
      const sky = paint.createLinearGradient(0, 0, 0, outdoors.height);
      sky.addColorStop(0, "#79c7fb");
      sky.addColorStop(0.58, "#d7f1ff");
      sky.addColorStop(0.74, "#c6eb86");
      sky.addColorStop(1, "#6eae45");
      paint.fillStyle = sky;
      paint.fillRect(0, 0, outdoors.width, outdoors.height);
      paint.fillStyle = "#ffe56a";
      paint.beginPath();
      paint.arc(500, 78, 46, 0, Math.PI * 2);
      paint.fill();
      paint.strokeStyle = "#ffd24a";
      paint.lineWidth = 5;
      for (let i = 0; i < 10; i += 1) {
        const angle = (i / 10) * Math.PI * 2;
        paint.beginPath();
        paint.moveTo(500 + Math.cos(angle) * 58, 78 + Math.sin(angle) * 58);
        paint.lineTo(500 + Math.cos(angle) * 82, 78 + Math.sin(angle) * 82);
        paint.stroke();
      }
      const cloud = (cx: number, cy: number, scale: number) => {
        paint.fillStyle = "#ffffff";
        paint.beginPath();
        paint.arc(cx, cy, 22 * scale, 0, Math.PI * 2);
        paint.arc(cx + 26 * scale, cy + 6 * scale, 16 * scale, 0, Math.PI * 2);
        paint.arc(cx - 24 * scale, cy + 8 * scale, 14 * scale, 0, Math.PI * 2);
        paint.fill();
      };
      cloud(120, 70, 1.15);
      cloud(280, 54, 0.85);
      const tree = (tx: number, ground: number) => {
        paint.fillStyle = "#6b4423";
        paint.fillRect(tx - 7, ground - 58, 14, 58);
        paint.fillStyle = "#3fa34d";
        paint.beginPath();
        paint.arc(tx, ground - 74, 32, 0, Math.PI * 2);
        paint.arc(tx - 22, ground - 56, 22, 0, Math.PI * 2);
        paint.arc(tx + 22, ground - 58, 24, 0, Math.PI * 2);
        paint.fill();
      };
      tree(80, 292);
      tree(190, 276);
      tree(300, 300);
      tree(410, 270);
    }
    const outdoorsMap = new THREE.CanvasTexture(outdoors);
    outdoorsMap.colorSpace = THREE.SRGBColorSpace;
    const outdoorsMat = new THREE.MeshBasicMaterial({
      map: outdoorsMap,
      side: THREE.DoubleSide,
    });
    materials.push(outdoorsMat);
    const view = add(scene, new THREE.PlaneGeometry(winW + 0.7, winH + 0.55), outdoorsMat, winX, winY, -HALF_D - 0.32);
    view.castShadow = false;
    view.receiveShadow = false;
    add(scene, new THREE.BoxGeometry(0.12, 0.85, 3.15), darkWood, -4.22, 0.5, bedZ);
    add(scene, new THREE.BoxGeometry(2.05, 0.28, 3.05), mat(0xf7f4ef, 0.9), -3.15, 0.38, bedZ);
    add(scene, new THREE.BoxGeometry(1.95, 0.16, 2.15), cloth, -3.12, 0.55, bedZ + 0.25);
    add(scene, new THREE.BoxGeometry(0.55, 0.16, 0.85), pillow, -3.85, 0.64, bedZ - 0.85);
    add(scene, new THREE.BoxGeometry(0.55, 0.16, 0.85), pillow, -3.85, 0.64, bedZ + 0.15);
    const shelfY = [1.15, 1.65, 2.15];
    shelfY.forEach((y) => add(scene, new THREE.BoxGeometry(2.7, 0.06, 0.32), darkWood, 0, y, -3.78));
    const grabbables: THREE.Object3D[] = [];
    const books: Array<[number, number, number, number]> = [
      [-0.95, 1.38, 0.22, 0x3d5a80],
      [-0.7, 1.32, 0.16, 0xc46b6b],
      [-0.5, 1.42, 0.26, 0xe0b15a],
      [0.15, 1.88, 0.2, 0x6b8f71],
      [0.4, 1.8, 0.14, 0xf4efe6],
      [0.85, 2.38, 0.24, 0x8e2f3a],
    ];
    books.forEach(([bx, by, h, color]) => {
      grabbables.push(add(scene, new THREE.BoxGeometry(0.16, h, 0.22), mat(color, 0.8), bx, by, -3.78));
    });
    const plant = new THREE.Group();
    plant.position.set(0.95, 1.26, -3.76);
    scene.add(plant);
    add(plant, new THREE.CylinderGeometry(0.1, 0.12, 0.14, 12), mat(0xc47b4a, 0.7), 0, 0, 0);
    add(plant, new THREE.SphereGeometry(0.16, 12, 12), mat(0x6b8f71, 0.85), 0, 0.22, 0);
    grabbables.push(plant);

    const tvZ = 2.45;
    add(scene, new THREE.BoxGeometry(0.42, 0.48, 1.35), darkWood, -4.12, 0.24, tvZ);
    add(scene, new THREE.BoxGeometry(0.08, 0.12, 0.28), wood, -3.88, 0.54, tvZ);
    add(scene, new THREE.BoxGeometry(0.08, 0.72, 1.2), metal, -3.84, 0.96, tvZ);
    add(scene, new THREE.BoxGeometry(0.04, 0.58, 1.05), screen, -3.78, 0.96, tvZ);

    add(scene, new THREE.BoxGeometry(0.08, 0.95, 0.85), darkWood, -4.34, 1.85, tvZ);
    add(scene, new THREE.BoxGeometry(0.05, 0.7, 0.12), curtain, -4.22, 1.72, tvZ - 0.28);
    add(scene, new THREE.BoxGeometry(0.05, 0.7, 0.12), curtain, -4.22, 1.72, tvZ + 0.28);
    add(scene, new THREE.BoxGeometry(0.16, 0.16, 0.22), metal, -4.22, 1.95, tvZ);
    add(scene, new THREE.CylinderGeometry(0.055, 0.055, 0.08, 16), mat(0x111111, 0.2, { metalness: 0.7 }), -4.14, 1.95, tvZ, 0, Math.PI / 2);
    grabbables.push(add(scene, new THREE.BoxGeometry(0.28, 0.22, 0.28), wood, -3.7, 0.11, tvZ + 0.55));
    grabbables.push(add(scene, new THREE.SphereGeometry(0.13, 16, 16), mat(0xe07a3d, 0.5), 0.95, 0.15, 0.55));

    add(scene, new THREE.BoxGeometry(2.4, 0.025, 1.7), mat(0x8e2f3a, 0.95), 0.4, 0.02, 0.2);

    scene.add(new THREE.AmbientLight(0xfff6ea, 0.16));
    scene.add(new THREE.HemisphereLight(0xd7ecff, 0xc4a574, 0.42));

    const sun = new THREE.DirectionalLight(0xfff3d2, 2.05);
    sun.position.set(winX - 0.4, 4.8, -HALF_D - 4);
    sun.target.position.set(winX + 1.1, 0.15, 1.4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 22;
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    scene.add(sun);
    scene.add(sun.target);

    const ceiling = new THREE.PointLight(0xffe0bf, 1.1, 10, 2);
    ceiling.position.set(0, 2.9, 0);
    scene.add(ceiling);

    const robot = new THREE.Group();
    const bodyMat = mat(0xd9dde3, 0.45, { metalness: 0.35 });
    const accent = mat(0x3d5a80, 0.4, { metalness: 0.2 });
    add(robot, new THREE.CylinderGeometry(0.28, 0.32, 0.22, 20), bodyMat, 0, 0.2, 0);
    add(robot, new THREE.BoxGeometry(0.34, 0.16, 0.34), accent, 0, 0.38, 0);
    add(robot, new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), metal, -0.24, 0.1, 0.12, 0, Math.PI / 2);
    add(robot, new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), metal, 0.24, 0.1, 0.12, 0, Math.PI / 2);
    add(robot, new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), metal, -0.24, 0.1, -0.12, 0, Math.PI / 2);
    add(robot, new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), metal, 0.24, 0.1, -0.12, 0, Math.PI / 2);
    add(robot, new THREE.BoxGeometry(0.08, 0.08, 0.12), mat(0xc46b6b, 0.4), 0, 0.28, -0.28);

    const yawPivot = new THREE.Group();
    yawPivot.position.set(0, 0.48, 0);
    robot.add(yawPivot);
    const pitchPivot = new THREE.Group();
    yawPivot.add(pitchPivot);
    add(pitchPivot, new THREE.BoxGeometry(0.08, 0.08, 0.42), bodyMat, 0, 0, -0.24);
    const elbow = new THREE.Group();
    elbow.position.set(0, 0, -0.44);
    elbow.rotation.x = 0.45;
    pitchPivot.add(elbow);
    add(elbow, new THREE.BoxGeometry(0.07, 0.07, 0.36), accent, 0, 0, -0.16);
    add(elbow, new THREE.BoxGeometry(0.12, 0.05, 0.08), metal, 0, -0.02, -0.36);
    const grip = new THREE.Group();
    grip.position.set(0, -0.02, -0.48);
    elbow.add(grip);
    scene.add(robot);

    let yaw = 0;
    let cameraPitch = 0;
    let x = 1.1;
    let z = 1.4;
    let armYaw = 0;
    let armPitch = 0.2;
    let control: "view" | "arm" = "view";
    let held: THREE.Object3D | null = null;
    robot.position.set(x, 0, z);

    const gripPoint = new THREE.Vector3();
    const itemPoint = new THREE.Vector3();
    const writeHint = () => {
      if (!hintRef.current) return;
      const arrows = control === "view" ? "Arrows turn the view" : "Arrows move the arm";
      const next = control === "view" ? "arm" : "view";
      const hand = held ? "E drops" : "E grabs";
      hintRef.current.textContent = `WASD moves the base · ${arrows} · Space: ${next} · ${hand}`;
    };
    writeHint();

    const nearestGrab = (): THREE.Object3D | null => {
      grip.getWorldPosition(gripPoint);
      let best: THREE.Object3D | null = null;
      let bestDist = 0.95;
      for (let i = 0; i < grabbables.length; i += 1) {
        const item = grabbables[i];
        if (item === held) continue;
        item.getWorldPosition(itemPoint);
        const dist = gripPoint.distanceTo(itemPoint);
        if (dist < bestDist) {
          best = item;
          bestDist = dist;
        }
      }
      return best;
    };

    const interact = () => {
      if (held) {
        scene.attach(held);
        if (held.position.y < 0.08) held.position.y = 0.08;
        held = null;
        writeHint();
        return;
      }
      const item = nearestGrab();
      if (item) {
        grip.attach(item);
        item.position.set(0, 0, -0.1);
        item.rotation.set(0, 0, 0);
        held = item;
        writeHint();
        return;
      }
      const doorDist = Math.hypot(x, z - HALF_D);
      if (doorDist < 1.45) doorOpen = !doorOpen;
    };

    const keys = new Set<string>();
    const onKey = (event: KeyboardEvent, down: boolean) => {
      const key = event.key.toLowerCase();
      const used = key === "w" || key === "a" || key === "s" || key === "d" || key === "e" || key === " " || key.startsWith("arrow");
      if (!used) return;
      event.preventDefault();
      if (down) {
        const fresh = !keys.has(key);
        keys.add(key);
        if (fresh && key === " ") {
          control = control === "view" ? "arm" : "view";
          writeHint();
        }
        if (fresh && key === "e") interact();
      } else keys.delete(key);
    };
    const bridge = window as Window & {
      __roomInput?: { onKey: (event: KeyboardEvent, down: boolean) => void } | null;
      __roomInputBound?: boolean;
      __roomGen?: number;
    };
    bridge.__roomInput = { onKey };
    if (!bridge.__roomInputBound) {
      window.addEventListener("keydown", (event) => bridge.__roomInput?.onKey(event, true));
      window.addEventListener("keyup", (event) => bridge.__roomInput?.onKey(event, false));
      bridge.__roomInputBound = true;
    }

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener("resize", resize);

    const look = new THREE.Vector3();
    const desired = new THREE.Vector3();
    const offset = new THREE.Vector3();
    let frame = 0;
    let last = performance.now();
    const generation = (bridge.__roomGen || 0) + 1;
    bridge.__roomGen = generation;

    const tick = (now: number) => {
      if (bridge.__roomGen !== generation) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const drive = (keys.has("w") ? 1 : 0) - (keys.has("s") ? 1 : 0);
      const strafe = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
      if (drive !== 0 || strafe !== 0) {
        const speed = 2.1 * dt;
        const dx = Math.sin(yaw) * drive * speed + Math.cos(yaw) * strafe * speed;
        const dz = -Math.cos(yaw) * drive * speed + Math.sin(yaw) * strafe * speed;
        if (!blocked(x + dx, z, 0.36)) x += dx;
        if (!blocked(x, z + dz, 0.36)) z += dz;
      }

      if (control === "view") {
        if (keys.has("arrowleft")) yaw -= 1.35 * dt;
        if (keys.has("arrowright")) yaw += 1.35 * dt;
        if (keys.has("arrowup")) cameraPitch += 0.85 * dt;
        if (keys.has("arrowdown")) cameraPitch -= 0.85 * dt;
        cameraPitch = THREE.MathUtils.clamp(cameraPitch, -0.5, 0.62);
      } else {
        if (keys.has("arrowleft")) armYaw -= 1.2 * dt;
        if (keys.has("arrowright")) armYaw += 1.2 * dt;
        if (keys.has("arrowup")) armPitch += 1.1 * dt;
        if (keys.has("arrowdown")) armPitch -= 1.1 * dt;
        armYaw = THREE.MathUtils.clamp(armYaw, -1.25, 1.25);
        armPitch = THREE.MathUtils.clamp(armPitch, -0.85, 1.15);
      }

      const doorTarget = doorOpen ? 1.2 : 0;
      doorAngle += (doorTarget - doorAngle) * Math.min(1, dt * 5);
      doorPivot.rotation.y = doorAngle;

      robot.position.set(x, 0, z);
      robot.rotation.y = yaw;
      yawPivot.rotation.y = armYaw;
      pitchPivot.rotation.x = armPitch;

      const back = 3.6 * Math.cos(cameraPitch);
      offset.set(-Math.sin(yaw) * back, 1.85 + Math.sin(cameraPitch) * 1.5, Math.cos(yaw) * back);
      desired.set(x, 0, z).add(offset);
      desired.y = 1.85 + Math.sin(cameraPitch) * 1.5;
      desired.x = THREE.MathUtils.clamp(desired.x, -4.2, 4.2);
      desired.z = THREE.MathUtils.clamp(desired.z, -3.6, 3.6);
      if (camera.position.lengthSq() < 0.01) camera.position.copy(desired);
      camera.position.lerp(desired, 1 - Math.pow(0.001, dt));
      look.set(x + Math.sin(yaw) * 2.2, 0.85 + Math.sin(cameraPitch) * 2.5, z - Math.cos(yaw) * 2.2);
      camera.lookAt(look);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (bridge.__roomInput?.onKey === onKey) bridge.__roomInput = null;
      window.removeEventListener("resize", resize);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      outdoorsMap.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={styles.stage} ref={mountRef}>
      <p className={styles.hint} ref={hintRef}>
        WASD moves the base · Arrows turn the view · Space: arm · E grabs
      </p>
    </div>
  );
}
