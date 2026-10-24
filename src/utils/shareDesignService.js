// src/utils/shareDesignService.js
// Stage 6 / Task A9: Share Design Card to Customers via WhatsApp & Native Share
// Generates a canvas summary card and shares via @capacitor/share & @capacitor/filesystem

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

/**
 * Generate a clean 2D summary card canvas for a design.
 * @param {Object} options
 * @param {string} options.productName
 * @param {string} options.sizeLabel
 * @param {string} options.priceText
 * @param {Array} options.scraps
 * @param {string} options.tailorNote
 * @returns {HTMLCanvasElement}
 */
export function renderDesignCardCanvas({
  productName = 'Upcycled Garment',
  sizeLabel = 'Standard',
  priceText = '₹150 – ₹300 (estimate)',
  scraps = [],
  tailorNote = 'Measurements to be verified by a tailor',
  shopName = 'ReWear Studio',
}) {
  const width = 800;
  const height = 960;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background
  ctx.fillStyle = '#064e3b'; // Emerald-900
  ctx.fillRect(0, 0, width, height);

  // Card Inner
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(30, 30, width - 60, height - 60, 36);
  ctx.fill();

  // Header Banner
  ctx.fillStyle = '#047857'; // Emerald-700
  ctx.beginPath();
  ctx.roundRect(50, 50, width - 100, 100, 24);
  ctx.fill();

  // Brand text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('🧵 ReWear Design', 80, 112);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '18px sans-serif';
  ctx.fillText(shopName, 520, 110);

  // Product Name & Size
  ctx.fillStyle = '#1c1917';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(productName, 60, 210);

  ctx.fillStyle = '#059669';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(`Size: ${sizeLabel}`, 60, 250);

  // Scrap Color Palette Preview Box
  ctx.fillStyle = '#f5f5f4';
  ctx.beginPath();
  ctx.roundRect(60, 280, width - 120, 280, 24);
  ctx.fill();
  ctx.strokeStyle = '#e7e5e4';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#78716c';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('FABRIC SCRAP PALETTE & PLACEMENT', 85, 320);

  // Draw swatches
  const swatchCount = Math.min(scraps.length || 4, 6);
  const swatchWidth = 90;
  const swatchGap = 16;
  const startX = 85;
  const swatchY = 350;

  for (let i = 0; i < swatchCount; i++) {
    const s = scraps[i] || { color: '#047857', label: `Piece ${i + 1}` };
    const colorHex = s.hex || s.color || '#059669';
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.roundRect(startX + i * (swatchWidth + swatchGap), swatchY, swatchWidth, 110, 16);
    ctx.fill();
    ctx.strokeStyle = '#d6d3d1';
    ctx.stroke();

    ctx.fillStyle = '#44403c';
    ctx.font = '12px sans-serif';
    const lbl = (s.name || s.color || `P${i + 1}`).substring(0, 10);
    ctx.fillText(lbl, startX + i * (swatchWidth + swatchGap), swatchY + 135);
  }

  // Estimated Price Section
  ctx.fillStyle = '#fef3c7'; // Amber-100
  ctx.beginPath();
  ctx.roundRect(60, 590, width - 120, 110, 24);
  ctx.fill();
  ctx.strokeStyle = '#fde68a';
  ctx.stroke();

  ctx.fillStyle = '#92400e';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ESTIMATED TAILORING CHARGE (estimate)', 85, 625);

  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 38px sans-serif';
  ctx.fillText(priceText, 85, 672);

  // Honesty & Tailor Verification Notice
  ctx.fillStyle = '#fef2f2'; // Red-50
  ctx.beginPath();
  ctx.roundRect(60, 725, width - 120, 95, 20);
  ctx.fill();
  ctx.strokeStyle = '#fecaca';
  ctx.stroke();

  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('⚠️ Tailor Verification Rule:', 85, 760);

  ctx.fillStyle = '#b91c1c';
  ctx.font = '16px sans-serif';
  ctx.fillText(tailorNote, 85, 792);

  // Footer branding
  ctx.fillStyle = '#a8a29e';
  ctx.font = '15px sans-serif';
  ctx.fillText('Crafted locally with ReWear • Zero fabric waste initiative', 190, 865);

  return canvas;
}

/**
 * Share a design summary image with customers via WhatsApp / native share sheet.
 * @param {Object} params
 * @returns {Promise<{ success: boolean, method: string, fileUri?: string }>}
 */
export async function shareDesignSummary({
  productName,
  sizeLabel,
  priceText,
  scraps = [],
  shopName = 'ReWear Studio',
}) {
  const tailorNote = 'Measurements to be verified by a tailor';
  const shareText = `🧵 ReWear Upcycled Design: ${productName} (${sizeLabel})\n💰 Est. Price: ${priceText} (estimate)\n⚠️ ${tailorNote}\nMade with sustainable fabric offcuts!`;

  if (typeof document === 'undefined') {
    return { success: true, method: 'mock_headless', text: shareText };
  }

  const canvas = renderDesignCardCanvas({
    productName,
    sizeLabel,
    priceText,
    scraps,
    tailorNote,
    shopName,
  });

  const safeName = productName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `ReWear_Design_${safeName}.png`;

  // Native Capacitor Platform (Android / iOS)
  if (Capacitor.isNativePlatform()) {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        try {
          if (!blob) throw new Error('Canvas blob generation failed');
          const arrayBuffer = await blob.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = '';
          const len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64Data = btoa(binary);

          const writeResult = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache,
          });

          await Share.share({
            title: `ReWear Design: ${productName}`,
            text: shareText,
            url: writeResult.uri,
            dialogTitle: 'Share with Customer via WhatsApp',
          });

          resolve({ success: true, method: 'native_share', fileUri: writeResult.uri });
        } catch (err) {
          if (err?.message && /cancel|dismiss/i.test(err.message)) {
            resolve({ success: true, method: 'share_canceled' });
          } else {
            resolve({ success: false, method: 'error', error: err.message });
          }
        }
      }, 'image/png');
    });
  }

  // Web Browser fallback
  if (navigator.share && navigator.canShare) {
    try {
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      if (blob) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `ReWear Design: ${productName}`,
            text: shareText,
            files: [file],
          });
          return { success: true, method: 'web_share_file' };
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: true, method: 'share_canceled' };
      }
    }
  }

  // Default web download fallback
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve({ success: false, method: 'error', error: 'Failed blob' });
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve({ success: true, method: 'browser_download', fileName });
    }, 'image/png');
  });
}
