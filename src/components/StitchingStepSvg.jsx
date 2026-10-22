// src/components/StitchingStepSvg.jsx
// Stage 4B / Q4: Visual tailoring diagram for assembly stitching steps
// Uses shared stepDiagramSvg generator for 100% parity with PDFKit exports.

import React from 'react';
import { getStepSvgString } from '../utils/stepDiagramSvg';

export default function StitchingStepSvg({ type, stepNumber = 1, className = '' }) {
  const svgHtml = getStepSvgString(type, stepNumber);

  return (
    <div
      className={`w-28 h-20 shrink-0 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center p-1 select-none ${className}`}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
