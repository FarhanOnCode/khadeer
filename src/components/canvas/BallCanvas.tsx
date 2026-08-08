"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BallCanvasProps = {
  icon: string;
  name?: string;
};

// 3D Floating Tech Ball Canvas component (Icosahedron 3D Floating Orb with tech decal)
const BallCanvas = ({ icon, name }: BallCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 120;
    let height = container.clientHeight || 120;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(0.5, 1, 2);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xc2a4ff, 1.2);
    backLight.position.set(-1, -1, -1);
    scene.add(backLight);

    // 3. 3D Floating Ball Group
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // Icosahedron Mesh (#fff8eb color with flat shading matching spec)
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fff8eb"),
      roughness: 0.3,
      metalness: 0.1,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: -5,
    });

    const ballMesh = new THREE.Mesh(geometry, material);
    ballGroup.add(ballMesh);

    // Load Tech Icon Decal Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      icon,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const decalGeo = new THREE.PlaneGeometry(1.9, 1.9);
        const decalMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          polygonOffset: true,
          polygonOffsetFactor: -10,
        });

        const decalMesh = new THREE.Mesh(decalGeo, decalMat);
        decalMesh.position.set(0, 0, 1.81);
        ballGroup.add(decalMesh);
      },
      undefined,
      (err) => {
        console.warn(`Could not load icon texture for ${name || icon}`, err);
      }
    );

    // Mouse Drag Rotation (OrbitControls behavior)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      ballGroup.rotation.y += deltaX * 0.01;
      ballGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Float & Auto-Rotation Animation Loop (Float speed={1.75} rotationIntensity={1} floatIntensity={2})
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.02;

      if (!isDragging) {
        // Floating motion
        ballGroup.position.y = Math.sin(time * 1.75) * 0.18;
        ballGroup.rotation.y += 0.008;
        ballGroup.rotation.x = Math.sin(time * 1.2) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      scene.clear();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [icon, name]);

  return (
    <div
      ref={containerRef}
      className="w-28 h-28 sm:w-36 sm:h-36 relative cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform hover:scale-110"
      title={name}
    />
  );
};

export default BallCanvas;
