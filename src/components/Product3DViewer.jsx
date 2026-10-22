import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Real patchwork colorways from Pile B (10 Navy, 10 Beige, 10 Grey)
const CUSHION_PALETTES = [
  {
    name: 'Pile B Balanced (Navy Base, Beige Accent, Grey Support)',
    frontPatches: [
      '#1B2A4A', '#D4C4A8', '#1B2A4A',
      '#7A8288', '#1B2A4A', '#7A8288',
      '#D4C4A8', '#7A8288', '#1B2A4A'
    ],
    backUpper: '#1B2A4A',
    backLower: '#D4C4A8',
    piping: '#7A8288'
  },
  {
    name: 'Pile B Diagonal Colorblock',
    frontPatches: [
      '#D4C4A8', '#7A8288', '#1B2A4A',
      '#7A8288', '#1B2A4A', '#D4C4A8',
      '#1B2A4A', '#D4C4A8', '#7A8288'
    ],
    backUpper: '#7A8288',
    backLower: '#1B2A4A',
    piping: '#D4C4A8'
  },
  {
    name: 'Pile B High-Contrast Navy & Beige',
    frontPatches: [
      '#1B2A4A', '#D4C4A8', '#1B2A4A',
      '#D4C4A8', '#7A8288', '#D4C4A8',
      '#1B2A4A', '#D4C4A8', '#1B2A4A'
    ],
    backUpper: '#1B2A4A',
    backLower: '#1B2A4A',
    piping: '#1B2A4A'
  }
];

export default function Product3DViewer({ onBack, initialModel = 'cushion' }) {
  const [engine, setEngine] = useState('three'); // Default Three.js (high performance)
  const [modelType, setModelType] = useState(initialModel); // 'cushion' | 'pouch' | 'top'
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [fps, setFps] = useState('--');
  const [loadTime, setLoadTime] = useState('--');
  const [showCanvas, setShowCanvas] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const canvasRef = useRef(null);
  const mvRef = useRef(null);
  const threeMountRef = useRef(null);

  const threeState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    mesh: null,
    texture: null,
    animId: null
  });

  const palette = CUSHION_PALETTES[paletteIndex % CUSHION_PALETTES.length];

  // Draw 2D patchwork layout onto 512x512 hidden texture canvas
  const drawTexture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (modelType === 'cushion') {
      // Background neutral cloth
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(0, 0, w, h);

      // ---------------------------------------------------------
      // 1. FRONT PATCHWORK PANEL: UV [0.0, 0.0] to [0.5, 1.0]
      // Pixel bounds: x: 0 to 256, y: 0 to 512
      // Real ReWear 3x3 Patchwork Grid (9 patches, 8 seam lines)
      // ---------------------------------------------------------
      const frontW = 256;
      const frontH = 512;
      const cols = 3;
      const rows = 3;
      const cellW = frontW / cols;
      const cellH = frontH / rows;

      // Draw 9 patches
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const patchColor = palette.frontPatches[idx % palette.frontPatches.length];
          const px = c * cellW;
          const py = r * cellH;

          ctx.fillStyle = patchColor;
          ctx.fillRect(px, py, cellW, cellH);

          // Subtle internal tonal shading
          const grad = ctx.createLinearGradient(px, py, px + cellW, py + cellH);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0.10)');
          ctx.fillStyle = grad;
          ctx.fillRect(px, py, cellW, cellH);

          // Patch ID watermark
          ctx.save();
          ctx.font = 'bold 13px monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`P${idx + 1}`, px + cellW / 2, py + cellH / 2);
          ctx.restore();
        }
      }

      // Vertical seam lines between patch columns
      for (let c = 1; c < cols; c++) {
        drawSeamLine(ctx, c * cellW, 0, c * cellW, frontH);
      }
      // Horizontal seam lines between patch rows
      for (let r = 1; r < rows; r++) {
        drawSeamLine(ctx, 0, r * cellH, frontW, r * cellH);
      }
      // Outer perimeter border seam
      drawSeamLine(ctx, 2, 2, frontW - 2, 2);
      drawSeamLine(ctx, frontW - 2, 2, frontW - 2, frontH - 2);
      drawSeamLine(ctx, frontW - 2, frontH - 2, 2, frontH - 2);
      drawSeamLine(ctx, 2, frontH - 2, 2, 2);

      drawZoneLabel(ctx, 'FRONT: 3x3 PATCHWORK', frontW / 2, 28, 14);

      // ---------------------------------------------------------
      // 2. BACK ENVELOPE OPENING: UV [0.5, 0.0] to [1.0, 1.0]
      // Pixel bounds: x: 256 to 512, y: 0 to 512
      // Upper flap: 40×27 cm (y: 0 to 280)
      // Lower flap: 40×20 cm (y: 240 to 512) -> overlap zone
      // ---------------------------------------------------------
      const backX = 256;
      const backW = 256;

      // Lower envelope flap base (underneath)
      ctx.fillStyle = palette.backLower;
      ctx.fillRect(backX, 240, backW, 272);

      // Upper envelope flap (on top, overlapping)
      ctx.fillStyle = palette.backUpper;
      ctx.fillRect(backX, 0, backW, 280);

      // Envelope flap shadow on lower panel
      const shadowGrad = ctx.createLinearGradient(backX, 280, backX, 298);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(backX, 280, backW, 18);

      // Hem stitch on upper overlap edge
      drawSeamLine(ctx, backX, 278, backX + backW, 278);

      // Back outer perimeter seams
      drawSeamLine(ctx, backX + 2, 2, backX + backW - 2, 2);
      drawSeamLine(ctx, backX + backW - 2, 2, backX + backW - 2, 510);
      drawSeamLine(ctx, backX + backW - 2, 510, backX + 2, 510);
      drawSeamLine(ctx, backX + 2, 510, backX + 2, 2);

      drawZoneLabel(ctx, 'BACK: ENVELOPE OVERLAP', backX + backW / 2, 28, 14);
      drawZoneLabel(ctx, 'Upper Flap (2/3)', backX + backW / 2, 140, 12);
      drawZoneLabel(ctx, 'Lower Flap (1/2)', backX + backW / 2, 390, 12);

    } else if (modelType === 'pouch') {
      // Zippered Utility Pouch texture (512x512)
      ctx.fillStyle = palette.frontPatches[0];
      ctx.fillRect(0, 0, 512, 102);
      drawSeamLine(ctx, 256, 0, 256, 102);
      drawZoneLabel(ctx, 'UPPER ZIPPER BAND', 256, 50, 14);

      ctx.fillStyle = palette.frontPatches[1];
      ctx.fillRect(0, 102, 256, 205);
      ctx.fillStyle = palette.frontPatches[2];
      ctx.fillRect(256, 102, 256, 205);
      drawSeamLine(ctx, 256, 102, 256, 307);
      drawZoneLabel(ctx, 'FRONT PANEL', 256, 205, 14);

      ctx.fillStyle = palette.backUpper;
      ctx.fillRect(0, 307, 512, 205);
      drawSeamLine(ctx, 256, 307, 256, 512);
      drawZoneLabel(ctx, 'BACK PANEL', 256, 410, 14);
    } else {
      // Child Bodice Top (512x512)
      ctx.fillStyle = palette.frontPatches[0];
      ctx.fillRect(25, 25, 220, 460);
      drawZoneLabel(ctx, 'FRONT BODICE', 135, 256, 14);

      ctx.fillStyle = palette.backUpper;
      ctx.fillRect(265, 25, 220, 460);
      drawZoneLabel(ctx, 'BACK BODICE', 375, 256, 14);
    }

    // Overlay subtle cotton fabric weave across entire canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 0; y < 512; y += 4) ctx.fillRect(0, y, 512, 1.5);
    for (let x = 0; x < 512; x += 4) ctx.fillRect(x, 0, 1.5, 512);
  };

  const drawSeamLine = (ctx, x1, y1, x2, y2) => {
    // Structural shadow line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Topstitching thread line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 6]);
    const dx = (y2 - y1 !== 0) ? 5 : 0;
    const dy = (x2 - x1 !== 0) ? 5 : 0;
    ctx.beginPath();
    ctx.moveTo(x1 + dx, y1 + dy);
    ctx.lineTo(x2 + dx, y2 + dy);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawZoneLabel = (ctx, text, x, y, size = 18) => {
    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textW = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x - textW / 2 - 10, y - size / 2 - 5, textW + 20, size + 10);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, x, y);
    ctx.restore();
  };

  // -------------------------------------------------------------
  // GOOGLE <model-viewer> Texture Application
  // -------------------------------------------------------------
  const applyTextureToMV = async () => {
    const mv = mvRef.current;
    if (!mv || !mv.model) return;
    const t0 = performance.now();
    try {
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
      const texture = await mv.createTexture(dataUrl);
      const materials = mv.model.materials;
      if (materials && materials.length > 0) {
        for (const mat of materials) {
          if (mat.pbrMetallicRoughness) {
            if (mat.pbrMetallicRoughness.setBaseColorFactor) {
              mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
            }
            if (mat.pbrMetallicRoughness.baseColorTexture) {
              mat.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
            }
          }
        }
      }
      setLoadTime(Math.round(performance.now() - t0) + ' ms');
    } catch (e) {
      console.warn('model-viewer texture error:', e);
    }
  };

  // Redraw canvas texture when dependencies change
  useEffect(() => {
    drawTexture();
    if (engine === 'model-viewer') {
      applyTextureToMV();
    } else if (threeState.current.texture) {
      const t0 = performance.now();
      threeState.current.texture.needsUpdate = true;
      setLoadTime(Math.round(performance.now() - t0) + ' ms');
    }
  }, [paletteIndex, modelType, engine]);

  // Hook model-viewer load event
  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;
    const handleLoad = () => applyTextureToMV();
    mv.addEventListener('load', handleLoad);
    return () => mv.removeEventListener('load', handleLoad);
  }, [modelType]);

  // Measure FPS for model-viewer
  useEffect(() => {
    if (engine !== 'model-viewer') return;
    let frames = 0;
    let lastTime = performance.now();
    let animId;

    const loop = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [engine]);

  // -------------------------------------------------------------
  // THREE.JS Engine Setup & Lifecycle
  // -------------------------------------------------------------
  useEffect(() => {
    if (engine !== 'three') {
      if (threeState.current.animId) {
        cancelAnimationFrame(threeState.current.animId);
        threeState.current.animId = null;
      }
      return;
    }

    const container = threeMountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8FAFC);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 10);
    camera.position.set(0, 0.05, 0.55);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.5;

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(amb);
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dir1.position.set(2, 4, 3);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xdbeafe, 0.8);
    dir2.position.set(-2, -1, -3);
    scene.add(dir2);

    threeState.current.scene = scene;
    threeState.current.camera = camera;
    threeState.current.renderer = renderer;
    threeState.current.controls = controls;

    // Model selection
    const glbUrl = modelType === 'cushion'
      ? './plain_cushion.glb'
      : (modelType === 'pouch' ? './plain_pouch.glb' : './plain_top.glb');

    const t0 = performance.now();
    const loader = new GLTFLoader();
    loader.load(glbUrl, (gltf) => {
      const mesh = gltf.scene;
      const texture = new THREE.CanvasTexture(canvasRef.current);
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      mesh.traverse((c) => {
        if (c.isMesh && c.material) {
          c.material.color.setRGB(1, 1, 1);
          c.material.map = texture;
          c.material.roughness = 0.82;
          c.material.metalness = 0.0;
          c.material.needsUpdate = true;
        }
      });

      scene.add(mesh);
      threeState.current.mesh = mesh;
      threeState.current.texture = texture;
      setLoadTime(Math.round(performance.now() - t0) + ' ms');
    });

    let frameCount = 0;
    let lastFps = performance.now();

    const animate = () => {
      threeState.current.animId = requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.update();
      renderer.render(scene, camera);

      frameCount++;
      const now = performance.now();
      if (now - lastFps >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFps)));
        frameCount = 0;
        lastFps = now;
      }
    };
    threeState.current.animId = requestAnimationFrame(animate);

    return () => {
      if (threeState.current.animId) cancelAnimationFrame(threeState.current.animId);
      renderer.dispose();
    };
  }, [engine, modelType, autoRotate]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Hidden 2D Texture Canvas (512x512) */}
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        className={showCanvas ? 'block border-2 border-amber-400 my-2 mx-auto max-w-[280px]' : 'hidden'}
      />

      {/* Top Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
            >
              ← Back
            </button>
          )}
          <span className="font-bold text-sm tracking-wide text-white">ReWear 3D Spike</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/60 text-emerald-400 border border-emerald-700">
            {fps} FPS
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700">
            {loadTime}
          </span>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-950/70 border-b border-amber-800/60 px-4 py-1.5 text-center text-[11px] text-amber-200 font-medium">
        ⚠️ Measurements & fit to be verified by a tailor
      </div>

      {/* Main 3D Viewport Area */}
      <div className="relative w-full h-[360px] bg-slate-950 overflow-hidden flex items-center justify-center">
        {engine === 'model-viewer' ? (
          <model-viewer
            ref={mvRef}
            src={modelType === 'cushion' ? './plain_cushion.glb' : (modelType === 'pouch' ? './plain_pouch.glb' : './plain_top.glb')}
            camera-controls
            auto-rotate={autoRotate ? '' : null}
            rotation-per-second="30deg"
            shadow-intensity="1.2"
            exposure="1.0"
            style={{ width: '100%', height: '100%', backgroundColor: '#0F172A' }}
          />
        ) : (
          <div ref={threeMountRef} className="w-full h-full" />
        )}

        {/* Viewport Floating Overlays */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 backdrop-blur text-slate-300 border border-slate-700 font-mono">
            Engine: <b className="text-white">{engine}</b>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 backdrop-blur text-slate-300 border border-slate-700 font-mono">
            Model: <b className="text-white">{modelType} (CC0)</b>
          </span>
        </div>

        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2 py-1 rounded text-[10px] font-semibold border ${
              autoRotate ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-300'
            }`}
          >
            {autoRotate ? '⏸ Auto-Rotate' : '▶ Auto-Rotate'}
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="p-4 space-y-4 max-w-md mx-auto w-full">
        {/* Engine Toggle */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            1. 3D Engine Evaluation
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setEngine('three')}
              className={`p-2.5 rounded-lg border text-left transition ${
                engine === 'three'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-xs">Three.js Engine</div>
              <div className="text-[10px] text-slate-400 mt-0.5">CanvasTexture direct GPU upload (360 ms)</div>
            </button>
            <button
              onClick={() => setEngine('model-viewer')}
              className={`p-2.5 rounded-lg border text-left transition ${
                engine === 'model-viewer'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-xs">&lt;model-viewer&gt;</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Google Web Component (520 ms)</div>
            </button>
          </div>
        </div>

        {/* Model Shell Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            2. Product 3D Shell (CC0 1.0 Universal)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setModelType('cushion')}
              className={`py-2 px-2 rounded border text-center text-xs font-medium transition ${
                modelType === 'cushion'
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              🛋️ Cushion
            </button>
            <button
              onClick={() => setModelType('pouch')}
              className={`py-2 px-2 rounded border text-center text-xs font-medium transition ${
                modelType === 'pouch'
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              👝 Pouch
            </button>
            <button
              onClick={() => setModelType('top')}
              className={`py-2 px-2 rounded border text-center text-xs font-medium transition ${
                modelType === 'top'
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              👗 Bodice
            </button>
          </div>
        </div>

        {/* Pile B Colorway Switcher */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            3. Dynamic Patchwork Texture (Pile B Scraps)
          </label>
          <div className="space-y-1.5">
            {CUSHION_PALETTES.map((pal, idx) => (
              <button
                key={idx}
                onClick={() => setPaletteIndex(idx)}
                className={`w-full py-2 px-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${
                  paletteIndex === idx
                    ? 'bg-slate-700 border-amber-400 text-white'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="font-medium truncate pr-2">{pal.name}</span>
                <div className="flex gap-1 shrink-0">
                  {pal.frontPatches.slice(0, 3).map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-slate-600" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hidden Canvas Inspector Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Hidden 2D Texture Map (512×512)</span>
          <button
            onClick={() => setShowCanvas(!showCanvas)}
            className="text-xs text-blue-400 hover:underline"
          >
            {showCanvas ? 'Hide Texture Canvas' : 'Inspect Texture Canvas'}
          </button>
        </div>

        {/* Technical Benchmark Summary Card */}
        <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700 text-[11px] space-y-1 text-slate-300">
          <div className="font-bold text-slate-200 text-xs flex justify-between">
            <span>Spike Metrics:</span>
            <span className="text-emerald-400 font-mono">{fps} FPS | {loadTime}</span>
          </div>
          <div>• Shell: <code>plain_cushion.glb</code> (3.97 KB, CC0 1.0 Universal)</div>
          <div>• Mapping: 3x3 patchwork front ($U: 0 \to 0.5$) &amp; envelope back ($U: 0.5 \to 1.0$)</div>
          <div>• In-App Environment: Android Capacitor WebKit / Chromium WebGL</div>
        </div>
      </div>
    </div>
  );
}
