// generate_blueprint_pdfs.js
// Stage 4B: Generates publication-quality tailor blueprint PDF files for Pouch and Tote Bag
// Using pdfkit and buildDesign data.

import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { buildDesign } from './src/engine/index.js';
import { buildTailorBlueprint, TAILOR_DISCLAIMER } from './src/utils/tailorBlueprintData.js';

const ARTIFACT_DIR = 'C:/Users/vinay/.gemini/antigravity/brain/ec75a86c-861d-4711-81f7-d4872260aedc';

// Test Pile (Navy, Beige, Grey cotton scraps)
const TEST_PILE = [
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

function generateBlueprintPdf(productId, sizeKey, outputPath) {
  return new Promise((resolve, reject) => {
    const design = buildDesign(TEST_PILE, productId, sizeKey);
    const bp = buildTailorBlueprint(design);

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true,
      info: {
        Title: `ReWear Tailor Blueprint — ${bp.productName}`,
        Author: 'ReWear Upcycling Studio',
        Subject: 'Tailor Blueprint & Assembly Guide',
      },
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Helpers
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const contentWidth = pageWidth - 80;

    function drawPageHeader(title) {
      // Header background banner
      doc.rect(40, 30, contentWidth, 38).fill('#064E3B');
      doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica-Bold').text(`REWEAR TAILOR BLUEPRINT: ${title.toUpperCase()}`, 50, 38, { width: contentWidth - 20 });
      doc.fillColor('#A7F3D0').fontSize(9).font('Helvetica').text(`Size: ${bp.sizeLabel}  •  Pieces: ${bp.piecesCount}  •  Time: ${bp.estimatedTimeMinutes} mins`, 50, 54);

      // Prominent Mandatory Disclaimer Banner
      doc.rect(40, 72, contentWidth, 22).fill('#FEF3C7');
      doc.rect(40, 72, contentWidth, 22).stroke('#F59E0B');
      doc.fillColor('#92400E').fontSize(9).font('Helvetica-Bold').text(`⚠️  ${TAILOR_DISCLAIMER.toUpperCase()}`, 50, 78);
      doc.fillColor('#B45309').fontSize(8).font('Helvetica').text('Verify physical fabric stretch and grain orientation before cutting. Standard seam allowance: 1.0 cm (0.4 in).', 280, 78, { width: contentWidth - 240, align: 'right' });
    }

    function drawPageFooter() {
      doc.fontSize(8).fillColor('#64748B').font('Helvetica-Bold').text(TAILOR_DISCLAIMER, 40, pageHeight - 30, { align: 'center', width: contentWidth });
    }

    // ==========================================
    // PAGE 1: SPECIFICATION & PATTERN PIECES
    // ==========================================
    drawPageHeader(bp.productName);

    let y = 105;

    // Overview Cards Box
    doc.rect(40, y, contentWidth, 48).fill('#F8FAFC').stroke('#CBD5E1');
    doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold').text('BLUEPRINT SUMMARY', 50, y + 8);

    doc.fontSize(8.5).font('Helvetica').fillColor('#334155');
    doc.text(`Product: ${bp.productName} (${bp.productId})`, 50, y + 22);
    doc.text(`Finished Dimensions: ${bp.pieces[0]?.finishedDimensions?.combined || 'Standard'}`, 50, y + 34);
    doc.text(`Total Cut Pieces: ${bp.piecesCount}`, 260, y + 22);
    doc.text(`Total Extra Seams: ${bp.totalExtraSeams}`, 260, y + 34);
    doc.text(`Est. Sewing Time: ${bp.estimatedTimeMinutes} mins`, 400, y + 22);
    doc.text(`Suggested Retail Price: ₹${bp.pricing?.suggestedPrice}`, 400, y + 34);

    y += 58;

    // Pattern Pieces Table Header
    doc.fillColor('#064E3B').fontSize(11).font('Helvetica-Bold').text('1. PATTERN PIECES & CUTTING SPECIFICATIONS', 40, y);
    y += 16;

    // Table Header Row
    doc.rect(40, y, contentWidth, 18).fill('#E2E8F0');
    doc.fillColor('#1E293B').fontSize(7.5).font('Helvetica-Bold');
    doc.text('#', 45, y + 5);
    doc.text('PIECE NAME & ROLE', 65, y + 5);
    doc.text('CUT SIZE (cm / in)', 210, y + 5);
    doc.text('FINISHED SIZE', 305, y + 5);
    doc.text('GRAIN', 390, y + 5);
    doc.text('SCRAPS & TRIMMED SIZE', 435, y + 5);

    y += 18;

    // Table Data Rows
    bp.pieces.forEach((piece, idx) => {
      const rowHeight = 36;
      doc.rect(40, y, contentWidth, rowHeight).fill(idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC').stroke('#E2E8F0');

      // Piece Number Badge
      doc.rect(45, y + 6, 14, 14).fill('#0F172A');
      doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text(`${piece.pieceNumber}`, 45, y + 9.5, { width: 14, align: 'center' });

      // Name & Role
      doc.fillColor('#0F172A').fontSize(8).font('Helvetica-Bold').text(piece.name, 65, y + 6, { width: 140 });
      doc.fillColor('#059669').fontSize(7).font('Helvetica').text(`Role: ${piece.role.toUpperCase()}  •  SA: ${piece.seamAllowance.cm}`, 65, y + 17);
      doc.fillColor('#64748B').fontSize(6.5).text(`Note: ${piece.seamNote}`, 65, y + 26, { width: 140 });

      // Cut Size
      doc.fillColor('#0F172A').fontSize(8).font('Helvetica-Bold').text(piece.cutDimensions.cm, 210, y + 8);
      doc.fillColor('#64748B').fontSize(7).font('Helvetica').text(`(${piece.cutDimensions.inches})`, 210, y + 19);

      // Finished Size
      doc.fillColor('#0F172A').fontSize(8).font('Helvetica-Bold').text(piece.finishedDimensions.cm, 305, y + 8);
      doc.fillColor('#64748B').fontSize(7).font('Helvetica').text(`(${piece.finishedDimensions.inches})`, 305, y + 19);

      // Grain
      doc.fillColor('#1E3A8A').fontSize(9).font('Helvetica-Bold').text('↕', 395, y + 8);
      doc.fontSize(6.5).font('Helvetica').text('Warp', 392, y + 20);

      // Scraps
      const scrapText = piece.scraps.map(s => `${s.color}: ${s.trimmedDimensions.cm}`).join(', ');
      doc.fillColor('#334155').fontSize(7).font('Helvetica').text(`${piece.scraps.length} scrap(s):`, 435, y + 6);
      doc.fillColor('#475569').fontSize(6.5).text(scrapText, 435, y + 16, { width: contentWidth - 395 });

      y += rowHeight;
    });

    y += 14;

    // Materials List Box
    doc.fillColor('#064E3B').fontSize(11).font('Helvetica-Bold').text('2. MATERIALS & NOTIONS CHECKLIST', 40, y);
    y += 16;

    bp.materials.forEach((mat) => {
      doc.rect(40, y, contentWidth, 24).fill('#F1F5F9').stroke('#E2E8F0');
      doc.fillColor('#0F172A').fontSize(8).font('Helvetica-Bold').text(mat.name, 48, y + 5);
      doc.fillColor('#475569').fontSize(7).font('Helvetica').text(mat.spec, 48, y + 14);
      doc.fillColor('#047857').fontSize(8).font('Helvetica-Bold').text(mat.qty, 460, y + 7, { align: 'right', width: contentWidth - 428 });
      y += 26;
    });

    y += 8;

    // Price Helper Box
    doc.fillColor('#064E3B').fontSize(11).font('Helvetica-Bold').text('3. PRICING & COST HELPER (EDITABLE)', 40, y);
    y += 16;

    doc.rect(40, y, contentWidth, 34).fill('#FEF9C3').stroke('#FDE047');
    doc.fillColor('#713F12').fontSize(8).font('Helvetica');
    doc.text(`Material Cost: ₹${bp.pricing.materialCost}`, 50, y + 7);
    doc.text(`Tailor Labor: ₹${bp.pricing.laborCost} (${(bp.estimatedTimeMinutes / 60).toFixed(2)}h @ ₹${bp.pricing.laborRatePerHour}/h)`, 180, y + 7);
    doc.text(`Extras / Overhead: ₹${bp.pricing.extrasCost}`, 380, y + 7);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#854D0E').text(`RECOMMENDED SELLING PRICE: ₹${bp.pricing.suggestedPrice}`, 50, y + 20);

    drawPageFooter();

    // ==========================================
    // PAGE 2: ASSEMBLY STITCHING STEPS IN ORDER
    // ==========================================
    doc.addPage();
    drawPageHeader(`${bp.productName} — Stitching Guide`);

    y = 105;
    doc.fillColor('#064E3B').fontSize(11).font('Helvetica-Bold').text('4. ASSEMBLY STITCHING STEPS (IN TAILOR ORDER)', 40, y);
    y += 16;

    bp.stitchingSteps.forEach((step) => {
      doc.rect(40, y, contentWidth, 48).fill('#FFFFFF').stroke('#E2E8F0');

      // Step Number Bubble
      doc.rect(46, y + 6, 20, 16).fill('#059669');
      doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold').text(`S${step.stepNumber}`, 46, y + 10, { width: 20, align: 'center' });

      // Step Title & Text
      doc.fillColor('#0F172A').fontSize(9).font('Helvetica-Bold').text(step.title, 72, y + 7);
      doc.fillColor('#334155').fontSize(7.5).font('Helvetica').text(step.instruction, 72, y + 19, { width: contentWidth - 110, leading: 2.5 });

      // Diagram Indicator
      doc.rect(contentWidth - 10, y + 10, 42, 28).fill('#F1F5F9').stroke('#CBD5E1');
      doc.fillColor('#0F172A').fontSize(6).font('Helvetica-Bold').text(`[DIAGRAM]\n${step.diagramType}`, contentWidth - 10, y + 18, { width: 42, align: 'center' });

      y += 52;
    });

    y += 10;
    // Tailor Verification Sign-off Box
    doc.rect(40, y, contentWidth, 46).fill('#F8FAFC').stroke('#CBD5E1');
    doc.fillColor('#0F172A').fontSize(8.5).font('Helvetica-Bold').text('MASTER TAILOR VERIFICATION & SIGN-OFF', 50, y + 8);
    doc.fillColor('#64748B').fontSize(7.5).font('Helvetica').text('I confirm that the physical fabric scraps have been pressed, grain lines checked, and seam allowances tested on machine.', 50, y + 20);
    doc.text('Tailor Signature: _______________________      Date: ______________      Status: [  ] Approved', 50, y + 32);

    drawPageFooter();
    doc.end();

    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
}

async function run() {
  console.log('Generating Tailor Blueprint PDF files...');

  const pouchPdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_pouch.pdf');
  const totePdfPath = path.join(ARTIFACT_DIR, 'tailor_blueprint_tote.pdf');

  await generateBlueprintPdf('pouch', 'small', pouchPdfPath);
  console.log('✓ Generated:', pouchPdfPath);

  await generateBlueprintPdf('tote_bag', 'small', totePdfPath);
  console.log('✓ Generated:', totePdfPath);

  console.log('All PDF files generated successfully.');
}

run().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
