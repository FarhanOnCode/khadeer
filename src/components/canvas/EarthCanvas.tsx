"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const EarthCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for Earth + Rings
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // 1. Core Globe Sphere
    const sphereGeometry = new THREE.SphereGeometry(3.6, 64, 64);
    
    // Procedural Earth Material with landmass & atmosphere Shader
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1a162b"),
      roughness: 0.6,
      metalness: 0.3,
      emissive: new THREE.Color("#2a1240"),
      emissiveIntensity: 0.4,
    });

    const globe = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthGroup.add(globe);

    // 2. Continents Overlay Mesh (stylized land wireframe / glow points)
    const landGeometry = new THREE.SphereGeometry(3.62, 48, 48);
    const landMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c2a4ff"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const landMesh = new THREE.Mesh(landGeometry, landMaterial);
    earthGroup.add(landMesh);

    // 3. Glowing Atmospheric Spiral Rings (matching screenshot inspiration)
    const ringsCount = 7;
    const ringGroup = new THREE.Group();
    earthGroup.add(ringGroup);

    for (let i = 0; i < ringsCount; i++) {
      const radius = 4.2 + i * 0.35;
      const ringGeo = new THREE.TorusGeometry(radius, 0.08, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? new THREE.Color("#c2a4ff") : new THREE.Color("#fb8dff"),
        transparent: true,
        opacity: 0.7 - i * 0.08,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3 + (i * 0.15);
      ringMesh.rotation.y = (i * Math.PI) / 6;
      ringGroup.add(ringMesh);
    }

    // 4. Outer Atmosphere Glow Sphere
    const atmosphereGeo = new THREE.SphereGeometry(4.1, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#a855f7"),
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc2a4ff, 3.0);
    dirLight1.position.set(10, 10, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfb8dff, 2.0);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 4, 20);
    pointLight.position.set(0, 0, 8);
    scene.add(pointLight);

    // Mouse Drag Rotation Controls
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

      earthGroup.rotation.y += deltaX * 0.005;
      earthGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-rotation when not dragging
      if (!isDragging) {
        earthGroup.rotation.y += 0.004;
        ringGroup.rotation.z += 0.002;
        ringGroup.rotation.x += 0.001;
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[350px] sm:h-[450px] lg:h-[550px] relative cursor-grab active:cursor-grabbing flex items-center justify-center"
    />
  );
};

export default EarthCanvas;
