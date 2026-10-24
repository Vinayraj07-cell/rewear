// src/utils/pdfExportService.js
// Stage 6 / Q12: Isomorphic In-App Blueprint PDF Export Service
// Generates tiled tailor blueprint PDFs directly inside the browser/WebView,
// downloads in web browsers, and writes & shares via Capacitor on Android devices.

import * as pdfkitModule from 'pdfkit';
import Helvetica from 'pdfkit/standard-fonts/Helvetica';
import HelveticaBold from 'pdfkit/standard-fonts/HelveticaBold';
import HelveticaBoldOblique from 'pdfkit/standard-fonts/HelveticaBoldOblique';
import HelveticaOblique from 'pdfkit/standard-fonts/HelveticaOblique';
import Courier from 'pdfkit/standard-fonts/Courier';
import CourierBold from 'pdfkit/standard-fonts/CourierBold';
import TimesRoman from 'pdfkit/standard-fonts/TimesRoman';
import TimesBold from 'pdfkit/standard-fonts/TimesBold';
import SymbolFont from 'pdfkit/standard-fonts/Symbol';
import ZapfDingbats from 'pdfkit/standard-fonts/ZapfDingbats';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { generateBlueprintPdfBlob } from './curvedBlueprintPDF.js';

// Ensure standard fonts are registered in browser/WebView environment
const registerFn = pdfkitModule.registerStdFonts || pdfkitModule.default?.registerStdFonts;
if (typeof registerFn === 'function') {
  registerFn(
    Helvetica,
    HelveticaBold,
    HelveticaBoldOblique,
    HelveticaOblique,
    Courier,
    CourierBold,
    TimesRoman,
    TimesBold,
    SymbolFont,
    ZapfDingbats
  );
}

/**
 * Converts a Uint8Array into a standard base64 string in chunks to prevent stack overflow.
 *
 * @param {Uint8Array} uint8Array
 * @returns {string} base64 string
 */
export function uint8ArrayToBase64(uint8Array) {
  let binary = '';
  const len = uint8Array.byteLength;
  const chunkSize = 8192;
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, len));
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

/**
 * Exports a precision tailor blueprint PDF for any of the 13 products.
 * On native Android: writes to Directory.Cache and opens the native Share sheet.
 * In browser/Vite: triggers a direct browser file download via Blob URL.
 * 
 * @param {Object} options
 * @param {string} options.productId
 * @param {string} options.sizeKey
 * @param {Array} [options.pile]
 * @param {string} [options.productName]
 * @returns {Promise<{ success: boolean, method: string, fileName: string, totalPages: number, fileUri?: string }>}
 */
export async function exportTailorBlueprintPdf({
  productId,
  sizeKey = 'small',
  pile = null,
  productName = 'Product',
}) {
  if (!productId) {
    throw new Error('Cannot export PDF: missing product ID.');
  }

  try {
    const { blob, uint8Array, totalPages } = await generateBlueprintPdfBlob(productId, sizeKey, pile);
    const safeName = productName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `ReWear_Blueprint_${safeName}_${sizeKey}.pdf`;

    if (Capacitor.isNativePlatform()) {
      // 1. Native platform (Android / iOS): Write to cache and invoke native share
      const base64Data = uint8ArrayToBase64(uint8Array);
      const writeResult = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache,
      });

      const fileUri = writeResult.uri;
      try {
        await Share.share({
          title: `ReWear Blueprint — ${productName}`,
          text: `ReWear Precision Tailor Blueprint for ${productName} (${sizeKey}). 10 cm scale calibration square and 1.0 cm seam allowances.`,
          url: fileUri,
          dialogTitle: 'Share or Save Tailor Blueprint',
        });
      } catch (shareErr) {
        // If user cancelled or dismissed share dialog, don't treat as fatal error
        if (shareErr?.message && /cancel|dismiss/i.test(shareErr.message)) {
          return { success: true, method: 'share_canceled', fileName, fileUri, totalPages };
        }
        throw shareErr;
      }

      return { success: true, method: 'native_share', fileName, fileUri, totalPages };
    } else {
      // 2. Web browser / Vite dev / preview: Trigger standard browser file download
      if (!blob) {
        throw new Error('Failed to create PDF binary blob.');
      }
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup blob url after 10 seconds
      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch {
          // ignore cleanup error
        }
      }, 10000);

      return { success: true, method: 'browser_download', fileName, totalPages };
    }
  } catch (err) {
    console.error('Error during blueprint PDF export:', err);
    throw new Error(err?.message || 'Failed to generate or save blueprint PDF');
  }
}
