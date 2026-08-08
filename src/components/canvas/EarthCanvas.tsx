"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// 3D Earth Canvas matching the exact R3F / 3D Planet specification
const EarthCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera (matching camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }})
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(-4, 3, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Earth Planet Group
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Procedural City Lights & Landmass Texture Generator
    const createEarthTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;

      // Dark Deep Space Oceans
      ctx.fillStyle = "#0a0817";
      ctx.fillRect(0, 0, 1024, 512);

      // Draw Stylized Landmasses & Golden City Lights
      ctx.fillStyle = "#1e1738";
      for (let i = 0; i < 180; i++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 512;
        const cr = Math.random() * 60 + 20;

        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();

        // City Light Clusters
        for (let j = 0; j < 12; j++) {
          const lx = cx + (Math.random() - 0.5) * cr * 1.4;
          const ly = cy + (Math.random() - 0.5) * cr * 1.4;
          ctx.fillStyle = Math.random() > 0.4 ? "#ff9d3b" : "#ffd175";
          ctx.beginPath();
          ctx.arc(lx, ly, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    const earthTexture = createEarthTexture();

    // 3. Core Planet Mesh
    const planetGeometry = new THREE.SphereGeometry(2.3, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.2,
      emissive: new THREE.Color("#2a1845"),
      emissiveIntensity: 0.5,
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planetMesh);

    // 4. Thick Spiraling Cloud Ribbon Swirls (matching screenshot model)
    const cloudSwirlGroup = new THREE.Group();
    planetGroup.add(cloudSwirlGroup);

    // Generate smooth ribbon swirl curves
    const createCloudRibbon = (radiusOffset: number, rotY: number, rotZ: number, colorHex: string) => {
      const points: THREE.Vector3[] = [];
      const numPoints = 120;

      for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2.8;
        const phi = Math.sin((i / numPoints) * Math.PI) * 1.2 - 0.6;
        const r = 2.45 + radiusOffset + Math.sin(i * 0.1) * 0.08;

        const x = r * Math.cos(theta) * Math.cos(phi);
        const y = r * Math.sin(phi);
        const z = r * Math.sin(theta) * Math.cos(phi);

        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.22, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.rotation.y = rotY;
      tubeMesh.rotation.z = rotZ;
      return tubeMesh;
    };

    // Add ribbon bands around the planet
    cloudSwirlGroup.add(createCloudRibbon(0.05, 0, 0.2, "#8f9ee0"));
    cloudSwirlGroup.add(createCloudRibbon(0.12, Math.PI / 3, -0.3, "#bfa8ff"));
    cloudSwirlGroup.add(createCloudRibbon(0.08, (Math.PI * 2) / 3, 0.5, "#6b7bb8"));
    cloudSwirlGroup.add(createCloudRibbon(0.18, Math.PI, -0.4, "#a885ee"));

    // 5. Atmosphere Glow Outer Shell
    const atmosGeo = new THREE.SphereGeometry(2.65, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#9365e6"),
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    planetGroup.add(atmosMesh);

    // 6. Lighting Setup (Cinematic key light matching screenshot)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xd1c4ff, 3.5);
    mainLight.position.set(-6, 8, 10);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x7c52d9, 2.0);
    fillLight.position.set(8, -6, -8);
    scene.add(fillLight);

    // 7. Interactive Orbit / Drag Controls (OrbitControls behavior)
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

      planetGroup.rotation.y += deltaX * 0.005;
      planetGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch Support for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      planetGroup.rotation.y += deltaX * 0.005;
      planetGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop (autoRotate matching R3F OrbitControls autoRotate)
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        planetGroup.rotation.y += 0.006; // Auto-rotate y
        cloudSwirlGroup.rotation.z += 0.002;
        cloudSwirlGroup.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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
