// src/components/Product3DViewer.jsx
// Stage 6 / Q12d: Real-Design 3D Look for Finished Garments (Tote Bag, Cushion Cover, Pouch)
// 1. Procedural 3D geometries (no external .glb download required)
// 2. Texture generated from user's REAL design (exact placements, colours, prints, seams) via product2DLayout.js
// 3. Mobile optimized: MeshLambertMaterial, DPR capped at min(dpr, 1.5), antialias off on mobile
// 4. Touch interaction: touch-action: none prevents scrolling page while rotating
// 5. Automatic fallback to 2D preview if WebGL is missing or FPS < 20 for 2 consecutive seconds
// 6. Persistent label: "Illustrative preview, not exact fit"

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArrowLeft, RotateCw, AlertTriangle, Eye, Layers } from 'lucide-react';
import { drawDesignToCanvas, getProductDrawRectangles } from '../utils/product2DLayout.js';
import Product2DPreview from './Product2DPreview.jsx';

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Creates procedural 3D meshes for the supported products.
 * Returns { group, frontMaterial, backMaterial, sideMaterial }
 */
function createProductMesh(productId) {
  const group = new THREE.Group();

  // Create base Lambert materials with neutral fallbacks
  const frontMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const backMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const sideMaterial = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const trimMaterial = new THREE.MeshLambertMaterial({ color: 0x64748b });

  if (productId === 'cushion_cover') {
    // -------------------------------------------------------------
    // Plumped Pillow Geometry (40 cm × 40 cm × 12 cm)
    // -------------------------------------------------------------
    const w = 0.40;
    const h = 0.40;
    const d = 0.12;
    const geom = new THREE.BoxGeometry(w, h, d, 24, 24, 8);

    // Bulge center vertices along Z to simulate an inflated soft pillow
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);

      const normX = (vx / (w / 2));
      const normY = (vy / (h / 2));
      const factor = Math.max(0, 1 - (normX * normX * 0.7 + normY * normY * 0.7));

      if (vz > 0.001) {
        pos.setZ(i, vz + factor * 0.04);
      } else if (vz < -0.001) {
        pos.setZ(i, vz - factor * 0.04);
      }
    }
    geom.computeVertexNormals();

    // Box faces: [right, left, top, bottom, front (+Z), back (-Z)]
    const materials = [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      backMaterial,
    ];

    const pillowMesh = new THREE.Mesh(geom, materials);
    pillowMesh.castShadow = false;
    pillowMesh.receiveShadow = false;
    group.add(pillowMesh);

  } else if (productId === 'tote_bag') {
    // -------------------------------------------------------------
    // Tote Bag Body (36 cm × 40 cm × 8 cm) + Twin Tubular Handles
    // -------------------------------------------------------------
    const w = 0.36;
    const h = 0.40;
    const d = 0.08;
    const bodyGeom = new THREE.BoxGeometry(w, h, d, 16, 16, 4);

    // Slight soft expansion at base
    const pos = bodyGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      if (vy < 0) {
        const expand = (-vy / (h / 2)) * 0.015;
        pos.setZ(i, vz > 0 ? vz + expand : vz - expand);
      }
    }
    bodyGeom.computeVertexNormals();

    const materials = [
      sideMaterial,
      sideMaterial,
      trimMaterial, // top open rim
      sideMaterial, // bottom gusset
      frontMaterial, // front face (+Z)
      backMaterial,  // back face (-Z)
    ];

    const bodyMesh = new THREE.Mesh(bodyGeom, materials);
    group.add(bodyMesh);

    // Tubular shoulder carry handles (front & back)
    const handleW = 0.16;
    const handleH = 0.22;
    const handleY = h / 2;

    const createHandleCurve = (zOffset) => {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-handleW / 2, handleY - 0.02, zOffset),
        new THREE.Vector3(-handleW / 2, handleY + handleH, zOffset * 1.5),
        new THREE.Vector3(handleW / 2, handleY + handleH, zOffset * 1.5),
        new THREE.Vector3(handleW / 2, handleY - 0.02, zOffset)
      );
      const handleGeom = new THREE.TubeGeometry(curve, 20, 0.009, 8, false);
      return new THREE.Mesh(handleGeom, trimMaterial);
    };

    group.add(createHandleCurve(d / 2 + 0.005));
    group.add(createHandleCurve(-d / 2 - 0.005));

  } else if (productId === 'pouch') {
    // -------------------------------------------------------------
    // Zippered Utility Pouch (22 cm × 14 cm × 5 cm)
    // -------------------------------------------------------------
    const w = 0.22;
    const h = 0.14;
    const d = 0.05;
    const pouchGeom = new THREE.BoxGeometry(w, h, d, 16, 16, 4);

    // Taper upward to simulate zippered top wedge
    const pos = pouchGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      if (vy > 0) {
        const pinch = (vy / (h / 2)) * 0.018;
        pos.setZ(i, vz > 0 ? Math.max(0.002, vz - pinch) : Math.min(-0.002, vz + pinch));
      }
    }
    pouchGeom.computeVertexNormals();

    const materials = [
      sideMaterial,
      sideMaterial,
      trimMaterial, // top zipper teeth strip
      sideMaterial, // bottom
      frontMaterial, // front face
      backMaterial,  // back face
    ];

    const pouchMesh = new THREE.Mesh(pouchGeom, materials);
    group.add(pouchMesh);

    // Subtle zipper pull tab on left
    const tabGeom = new THREE.BoxGeometry(0.018, 0.03, 0.006);
    const tabMesh = new THREE.Mesh(tabGeom, trimMaterial);
    tabMesh.position.set(-w / 2 - 0.008, h / 2 - 0.025, 0);
    group.add(tabMesh);
  }

  return { group, frontMaterial, backMaterial, sideMaterial, trimMaterial };
}

export default function Product3DViewer({ design, onBack }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [fallbackMessage, setFallbackMessage] = useState(null);
  const [fps, setFps] = useState(60);
  const [autoRotate, setAutoRotate] = useState(true);

  const containerRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);

  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animId: null,
    frontTexture: null,
    backTexture: null,
    materials: null,
  });

  const productId = design?.productId || design?.product?.id || 'tote_bag';
  const productName = design?.productName || design?.product?.name || 'Handmade Garment';

  // 1. Initial WebGL check
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      setFallbackMessage('3D preview requires WebGL support on your device. Showing 2D preview.');
    }
  }, []);

  // 2. Extract primary color for sides/trim from real design rectangles
  const primaryColorHex = useMemo(() => {
    const rects = getProductDrawRectangles(design, 'front');
    return rects[0]?.colorHex || '#1E3A8A';
  }, [design]);

  // 3. Render real design to offscreen canvases
  useEffect(() => {
    if (!hasWebGL || fallbackMessage) return;

    if (frontCanvasRef.current) {
      drawDesignToCanvas(frontCanvasRef.current, design, 'front');
      if (threeRef.current.frontTexture) {
        threeRef.current.frontTexture.needsUpdate = true;
      }
    }
    if (backCanvasRef.current) {
      drawDesignToCanvas(backCanvasRef.current, design, 'back');
      if (threeRef.current.backTexture) {
        threeRef.current.backTexture.needsUpdate = true;
      }
    }
  }, [design, hasWebGL, fallbackMessage]);

  // 4. Initialize Three.js Engine with Mobile Constraints
  useEffect(() => {
    if (!hasWebGL || fallbackMessage) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    // Detect mobile browser / WebView
    const isMobile =
      typeof navigator !== 'undefined' &&
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8FAFC);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.05, 10);
    const dist = productId === 'pouch' ? 0.45 : (productId === 'cushion_cover' ? 0.65 : 0.75);
    camera.position.set(0, 0.02, dist);

    // Renderer (DPR capped at 1.5, antialias off on mobile)
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(dpr, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls (Orbit with clamped pitch & touch support)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0; // slow gentle rotation
    controls.minDistance = 0.25;
    controls.maxDistance = 1.5;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = Math.PI * 0.15;

    // Lighting (soft ambient + two directional rim lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(2, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe2e8f0, 0.7);
    dirLight2.position.set(-2, -1, -3);
    scene.add(dirLight2);

    // Generate Canvas Textures
    const frontTex = new THREE.CanvasTexture(frontCanvasRef.current);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    frontTex.generateMipmaps = false;
    frontTex.minFilter = THREE.LinearFilter;

    const backTex = new THREE.CanvasTexture(backCanvasRef.current);
    backTex.colorSpace = THREE.SRGBColorSpace;
    backTex.generateMipmaps = false;
    backTex.minFilter = THREE.LinearFilter;

    // Build Product Mesh
    const meshPack = createProductMesh(productId);
    meshPack.frontMaterial.map = frontTex;
    meshPack.frontMaterial.needsUpdate = true;
    meshPack.backMaterial.map = backTex;
    meshPack.backMaterial.needsUpdate = true;
    meshPack.sideMaterial.color = new THREE.Color(primaryColorHex);
    meshPack.trimMaterial.color = new THREE.Color(primaryColorHex);

    scene.add(meshPack.group);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      animId: null,
      frontTexture: frontTex,
      backTexture: backTex,
      materials: meshPack,
    };

    // -----------------------------------------------------------
    // Demand-Driven Render Loop & FPS Monitor
    // -----------------------------------------------------------
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let lowFpsSeconds = 0;

    const animate = () => {
      threeRef.current.animId = requestAnimationFrame(animate);

      controls.autoRotate = autoRotate;
      controls.update();
      renderer.render(scene, camera);

      frameCount++;
      const now = performance.now();
      const elapsed = now - lastFpsTime;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / elapsed);
        setFps(currentFps);
        console.info(`[3D-FPS] ${currentFps}`);

        // Automated fallback check: under 20 FPS for 2 consecutive seconds
        if (currentFps < 20) {
          lowFpsSeconds++;
          if (lowFpsSeconds >= 2) {
            console.warn('[ReWear 3D] Low frame rate detected (<20 FPS). Falling back to 2D.');
            setFallbackMessage('3D switched to 2D preview for smooth performance on your device.');
          }
        } else {
          lowFpsSeconds = 0;
        }

        frameCount = 0;
        lastFpsTime = now;
      }
    };

    threeRef.current.animId = requestAnimationFrame(animate);

    // Handle container resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const nw = container.clientWidth || 360;
      const nh = container.clientHeight || 420;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current.animId) {
        cancelAnimationFrame(threeRef.current.animId);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, [hasWebGL, fallbackMessage, productId, primaryColorHex, autoRotate]);

  // If fallen back or WebGL is missing, display 2D layout with short notification
  if (!hasWebGL || fallbackMessage) {
    return (
      <div className="space-y-4 pb-24 text-stone-900">
        <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-bold">{fallbackMessage || '3D preview unavailable. Showing 2D preview.'}</span>
          </div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 rounded-xl text-xs font-bold text-amber-950 transition"
            >
              Back
            </button>
          )}
        </div>

        {/* Flat 2D Vector Preview */}
        <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
          <Product2DPreview design={design} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-900 text-stone-100 font-sans pb-16">
      {/* Offscreen 512×512 Texture Canvases */}
      <canvas ref={frontCanvasRef} width={512} height={512} className="hidden" />
      <canvas ref={backCanvasRef} width={512} height={512} className="hidden" />

      {/* Top Navigation Bar */}
      <div className="bg-stone-800/90 backdrop-blur-md border-b border-stone-700/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl bg-stone-700/80 hover:bg-stone-600 text-white transition active:scale-95"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-sm font-black text-white tracking-tight">{productName}</h1>
            <p className="text-[10px] text-stone-400 font-semibold">3D Look &amp; Texture Map</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* FPS Badge */}
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
            {fps} FPS
          </span>

          {/* Auto-rotate Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
              autoRotate
                ? 'bg-indigo-600 border-indigo-400 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-300'
            }`}
            title="Toggle Slow Auto-Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Persistent Disclaimer Label */}
      <div className="py-2 px-4 flex justify-center">
        <div className="text-[11px] font-bold text-amber-200 bg-amber-950/70 border border-amber-500/50 px-3.5 py-1 rounded-full shadow-xs text-center flex items-center gap-1.5">
          <Eye className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Illustrative preview, not exact fit</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container with touch-action: none */}
      <div className="flex-1 flex flex-col items-center justify-center p-2">
        <div
          ref={containerRef}
          style={{ touchAction: 'none' }}
          className="w-full max-w-md h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-700/60 bg-gradient-to-b from-stone-100 to-stone-200 touch-none cursor-grab active:cursor-grabbing relative"
        />

        <p className="text-[11px] text-stone-400 mt-3 text-center">
          Touch and drag to rotate • Pinch to zoom in/out
        </p>
      </div>
    </div>
  );
}
