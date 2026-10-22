// generate_blueprint_pdfs.js
// Stage 4B / Q4: Publication-quality tailor blueprint PDF files for all four products
// (pouch, tote_bag, cushion_cover, kids_frock).
// Uses pdfkit, svg-to-pdfkit, and embedded Unicode fonts supporting ₹ and arrows.

import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';
import { buildDesign } from './src/engine/index.js';
import {
  buildTailorBlueprint,
  TAILOR_DISCLAIMER,
  TYPICAL_DEFAULTS_DISCLAIMER,
} from './src/utils/tailorBlueprintData.js';
import { getStepSvgString } from './src/utils/stepDiagramSvg.js';

const ARTIFACT_DIR = 'C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc';

// Resolve embedded Unicode fonts with system fallbacks
function resolveFonts() {
  const localRegular = path.resolve('src/assets/fonts/NotoSans-Regular.ttf');
  const localBold = path.resolve('src/assets/fonts/NotoSans-Bold.ttf');
  const winArial = 'C:/Windows/Fonts/arial.ttf';
  const winArialBd = 'C:/Windows/Fonts/arialbd.ttf';

  const regular = fs.existsSync(localRegular) ? localRegular : (fs.existsSync(winArial) ? winArial : null);
  const bold = fs.existsSync(localBold) ? localBold : (fs.existsSync(winArialBd) ? winArialBd : null);

  return { regular, bold };
}

// Standard Test Pile (Navy, Beige, Grey cotton scraps)
export const TEST_PILE = [
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `navy_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'navy',
    colorHex: '#1E3A8A',
    print: 'plain',
  })),
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `beige_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'beige',
    colorHex: '#D6C0A4',
    print: 'plain',
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `grey_${i + 1}`,
    width: 14,
    height: 14,
    fabricType: 'cotton',
    thickness: 'medium',
    stretchy: false,
    color: 'grey',
    colorHex: '#9CA3AF',
    print: 'plain',
  })),
];

export function generateBlueprintPdf(productId, sizeKey, outputPath, pile = TEST_PILE) {
  return new Promise((resolve, reject) => {
    const design = buildDesign(pile, productId, sizeKey);
    const bp = buildTailorBlueprint(design);

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 30, bottom: 40, left: 40, right: 40 },
      autoFirstPage: true,
      bufferPages: true,
      info: {
        Title: `ReWear Tailor Blueprint — ${bp.productName}`,
        Author: 'ReWear Upcycling Studio',
        Subject: 'Tailor Blueprint & Assembly Guide',
      },
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Register Unicode TTF font supporting ₹ and ↕
    const { regular, bold } = resolveFonts();
    const fontName = regular ? 'UnicodeRegular' : 'Helvetica';
    const fontBoldName = bold ? 'UnicodeBold' : 'Helvetica-Bold';

    if (regular) doc.registerFont('UnicodeRegular', regular);
    if (bold) doc.registerFont('UnicodeBold', bold);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const contentWidth = pageWidth - 80;

    // Vector warning triangle (crisp, resolution-independent, zero broken glyphs)
    function drawWarningIcon(x, y, size = 12) {
      doc.save();
      doc.polygon([x, y + size], [x + size / 2, y], [x + size, y + size])
         .fillAndStroke('#F59E0B', '#B45309');
      doc.rect(x + size / 2 - 0.75, y + 3.5, 1.5, 4.5).fill('#78350F');
      doc.circle(x + size / 2, y + 9.5, 0.8).fill('#78350F');
      doc.restore();
    }

    function drawPageHeader(title, pageNum = 1) {
      // Header background banner
      doc.rect(40, 30, contentWidth, 38).fill('#064E3B');
      const headerTitle = `REWEAR TAILOR BLUEPRINT: ${title.toUpperCase()}`;
      const headerFontSize = headerTitle.length > 45 ? 10.5 : 12;
      doc.fillColor('#FFFFFF').fontSize(headerFontSize).font(fontBoldName).text(
        headerTitle,
        50,
        39,
        { width: contentWidth - 20 }
      );
      doc.fillColor('#A7F3D0').fontSize(8).font(fontName).text(
        `Size: ${bp.sizeLabel}  •  Pieces: ${bp.piecesCount}  •  Est. Time: ${bp.estimatedTimeMinutes} mins (${TYPICAL_DEFAULTS_DISCLAIMER})`,
        50,
        54
      );

      // Prominent Mandatory Disclaimer Banner
      doc.rect(40, 72, contentWidth, 22).fill('#FEF3C7').stroke('#F59E0B');
      drawWarningIcon(48, 77, 12);
      doc.fillColor('#92400E').fontSize(8.5).font(fontBoldName).text(
        TAILOR_DISCLAIMER.toUpperCase(),
        66,
        78
      );
      doc.fillColor('#B45309').fontSize(7.5).font(fontName).text(
        'Verify physical fabric stretch and grain orientation before cutting. Standard seam allowance: 1.0 cm (0.4 in).',
        280,
        78,
        { width: contentWidth - 245, align: 'right' }
      );
    }

    function drawPageFooter(pageNum, totalPages = 2) {
      const footerY = 780;
      doc.fontSize(7.5).fillColor('#64748B').font(fontBoldName).text(
        `${TAILOR_DISCLAIMER}   •   Page ${pageNum} of ${totalPages}`,
        40,
        footerY,
        { align: 'center', width: contentWidth }
      );
    }

    // ==========================================
    // PAGE 1: SPECIFICATION & PATTERN PIECES
    // ==========================================
    drawPageHeader(bp.productName, 1);

    let y = 102;

    // Overview Cards Box
    doc.rect(40, y, contentWidth, 44).fill('#F8FAFC').stroke('#CBD5E1');
    doc.fillColor('#0F172A').fontSize(9.5).font(fontBoldName).text('BLUEPRINT SUMMARY', 48, y + 6);

    doc.fontSize(8).font(fontName).fillColor('#334155');
    doc.text(`Product: ${bp.productName} (${bp.productId})`, 48, y + 19);
    doc.text(`Finished Dimensions: ${bp.pieces[0]?.finishedDimensions?.combined || 'Standard'}`, 48, y + 30);
    doc.text(`Total Cut Pieces: ${bp.piecesCount}`, 240, y + 19);
    doc.text(`Total Extra Seams: ${bp.totalExtraSeams}`, 240, y + 30);
    doc.text(`Est. Sewing Time: ${bp.estimatedTimeMinutes} mins (typical default)`, 380, y + 19);
    doc.text(`Suggested Retail Price: ₹${bp.pricing?.suggestedPrice} (typical default)`, 380, y + 30);

    y += 52;

    // Pattern Pieces Table Header
    doc.fillColor('#064E3B').fontSize(10).font(fontBoldName).text('1. PATTERN PIECES & CUTTING SPECIFICATIONS', 40, y);
    y += 14;

    // Table Header Row
    doc.rect(40, y, contentWidth, 16).fill('#E2E8F0');
    doc.fillColor('#1E293B').fontSize(7.5).font(fontBoldName);
    doc.text('#', 44, y + 4);
    doc.text('PIECE NAME & ROLE', 62, y + 4);
    doc.text('CUT SIZE (cm / in)', 200, y + 4);
    doc.text('FINISHED SIZE', 290, y + 4);
    doc.text('GRAIN', 376, y + 4);
    doc.text('SCRAPS SUMMARY', 416, y + 4);

    y += 16;

    // Table Data Rows (compact, clean, and non-overlapping)
    const rowHeight = bp.pieces.length > 6 ? 25 : 28;
    bp.pieces.forEach((piece, idx) => {
      doc.rect(40, y, contentWidth, rowHeight).fill(idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC').stroke('#E2E8F0');

      // Piece Number Badge
      doc.rect(44, y + 4, 13, 13).fill('#0F172A');
      doc.fillColor('#FFFFFF').fontSize(7).font(fontBoldName).text(
        `${piece.pieceNumber}`,
        44,
        y + 6.5,
        { width: 13, align: 'center' }
      );

      // Name & Role
      doc.fillColor('#0F172A').fontSize(7.5).font(fontBoldName).text(piece.name, 62, y + 4, { width: 134, ellipsis: true });
      doc.fillColor('#059669').fontSize(6.5).font(fontName).text(
        `Role: ${piece.role.toUpperCase()} • SA: ${piece.seamAllowance.cm}`,
        62,
        y + 14
      );

      // Cut Size
      doc.fillColor('#0F172A').fontSize(7.5).font(fontBoldName).text(piece.cutDimensions.cm, 200, y + 5);
      doc.fillColor('#64748B').fontSize(6.5).font(fontName).text(`(${piece.cutDimensions.inches})`, 200, y + 14);

      // Finished Size
      doc.fillColor('#0F172A').fontSize(7.5).font(fontBoldName).text(piece.finishedDimensions.cm, 290, y + 5);
      doc.fillColor('#64748B').fontSize(6.5).font(fontName).text(`(${piece.finishedDimensions.inches})`, 290, y + 14);

      // Grain Direction from Data
      const grainSymbol = piece.grainLine?.symbol || '↕';
      const grainDesc = piece.grainLine?.orientation === 'crosswise' ? 'Weft' : 'Warp';
      doc.fillColor('#1E3A8A').fontSize(9).font(fontBoldName).text(grainSymbol, 380, y + 4);
      doc.fontSize(6).font(fontName).text(grainDesc, 376, y + 15);

      // Scraps Summary (summarised compact text, never cut off)
      const summaryText = piece.scrapsSummary || `${piece.scraps.length} scrap(s)`;
      doc.fillColor('#334155').fontSize(6.5).font(fontName).text(summaryText, 416, y + 5, { width: contentWidth - 380, height: rowHeight - 6 });

      y += rowHeight;
    });

    y += 12;

    // Materials List Box
    doc.fillColor('#064E3B').fontSize(10).font(fontBoldName).text(
      `2. MATERIALS & NOTIONS CHECKLIST (${TYPICAL_DEFAULTS_DISCLAIMER})`,
      40,
      y
    );
    y += 14;

    bp.materials.forEach((mat) => {
      doc.rect(40, y, contentWidth, 20).fill('#F1F5F9').stroke('#E2E8F0');
      doc.fillColor('#0F172A').fontSize(7.5).font(fontBoldName).text(mat.name, 46, y + 3);
      doc.fillColor('#475569').fontSize(6.5).font(fontName).text(mat.spec, 46, y + 11, { width: contentWidth - 140, ellipsis: true });
      doc.fillColor('#047857').fontSize(7.5).font(fontBoldName).text(mat.qty, 440, y + 5, { align: 'right', width: contentWidth - 405 });
      y += 22;
    });

    y += 6;

    // Price Helper Box
    doc.fillColor('#064E3B').fontSize(10).font(fontBoldName).text(
      `3. PRICING & COST HELPER (${TYPICAL_DEFAULTS_DISCLAIMER})`,
      40,
      y
    );
    y += 14;

    doc.rect(40, y, contentWidth, 34).fill('#FEF9C3').stroke('#FDE047');
    doc.fillColor('#713F12').fontSize(7.5).font(fontName);
    doc.text(`Material Cost: ₹${bp.pricing.materialCost}`, 48, y + 6);
    doc.text(
      `Tailor Labor: ₹${bp.pricing.laborCost} (${(bp.estimatedTimeMinutes / 60).toFixed(2)}h @ ₹${bp.pricing.laborRatePerHour}/h)`,
      170,
      y + 6
    );
    doc.text(`Extras / Overhead: ₹${bp.pricing.extrasCost}`, 380, y + 6);
    doc.fontSize(9.5).font(fontBoldName).fillColor('#854D0E').text(
      `RECOMMENDED SELLING PRICE: ₹${bp.pricing.suggestedPrice} (typical default)`,
      48,
      y + 19
    );

    drawPageFooter(1, 2);

    // ==========================================
    // PAGE 2: ASSEMBLY STITCHING STEPS IN ORDER
    // ==========================================
    doc.addPage();
    drawPageHeader(`${bp.productName} — Stitching Guide`, 2);

    y = 104;
    doc.fillColor('#064E3B').fontSize(10).font(fontBoldName).text(
      '4. ASSEMBLY STITCHING STEPS (IN TAILOR ORDER)',
      40,
      y
    );
    y += 14;

    bp.stitchingSteps.forEach((step) => {
      const stepBoxHeight = 52;
      doc.rect(40, y, contentWidth, stepBoxHeight).fill('#FFFFFF').stroke('#E2E8F0');

      // Step Number Bubble
      doc.rect(46, y + 6, 20, 16).fill('#059669');
      doc.fillColor('#FFFFFF').fontSize(8.5).font(fontBoldName).text(
        `S${step.stepNumber}`,
        46,
        y + 10,
        { width: 20, align: 'center' }
      );

      // Step Title & Instruction Text (dynamic to size)
      doc.fillColor('#0F172A').fontSize(8.5).font(fontBoldName).text(step.title, 72, y + 6);
      doc.fillColor('#334155').fontSize(7).font(fontName).text(
        step.instruction,
        72,
        y + 18,
        { width: contentWidth - 170, leading: 2.2 }
      );

      // Real Vector Step Diagram (via svg-to-pdfkit, zero placeholders!)
      const svgXml = getStepSvgString(step.diagramType, step.stepNumber);
      try {
        SVGtoPDF(doc, svgXml, 40 + contentWidth - 85, y + 4, {
          width: 80,
          height: 44,
          preserveAspectRatio: 'xMidYMid meet',
        });
      } catch (err) {
        // Fallback drawing if SVGtoPDF encounters unparseable element
        doc.rect(40 + contentWidth - 85, y + 4, 80, 44).fill('#F1F5F9').stroke('#CBD5E1');
        doc.fillColor('#047857').fontSize(7).font(fontBoldName).text(step.title, 40 + contentWidth - 85, y + 18, { width: 80, align: 'center' });
      }

      y += stepBoxHeight + 4;
    });

    y += 4;
    // Tailor Verification Sign-off Box
    doc.rect(40, y, contentWidth, 42).fill('#F8FAFC').stroke('#CBD5E1');
    doc.fillColor('#0F172A').fontSize(8).font(fontBoldName).text('MASTER TAILOR VERIFICATION & SIGN-OFF', 48, y + 6);
    doc.fillColor('#64748B').fontSize(7).font(fontName).text(
      'I confirm that physical fabric scraps have been pressed, grain lines checked, and seam allowances tested on machine.',
      48,
      y + 17
    );
    doc.text(
      'Tailor Signature: _______________________      Date: ______________      Status: [  ] Approved',
      48,
      y + 28
    );

    drawPageFooter(2, 2);
    doc.end();

    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
}

export async function run() {
  console.log('Generating Tailor Blueprint PDF files for all four products...');

  const pouchPdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_pouch.pdf');
  const totePdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_tote.pdf');
  const cushionPdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_cushion.pdf');
  const frockPdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_frock.pdf');

  await generateBlueprintPdf('pouch', 'small', pouchPdfPath);
  console.log('✓ Generated:', pouchPdfPath);

  await generateBlueprintPdf('tote_bag', 'small', totePdfPath);
  console.log('✓ Generated:', totePdfPath);

  await generateBlueprintPdf('cushion_cover', 'small', cushionPdfPath);
  console.log('✓ Generated:', cushionPdfPath);

  await generateBlueprintPdf('kids_frock', '0-1y', frockPdfPath);
  console.log('✓ Generated:', frockPdfPath);

  console.log('All 4 PDF files generated successfully.');
}

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('generate_blueprint_pdfs.js')) {
  run().catch((err) => {
    console.error('Error generating PDFs:', err);
    process.exit(1);
  });
}
