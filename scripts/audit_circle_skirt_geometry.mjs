// scripts/audit_circle_skirt_geometry.mjs
import { SANDY_SKIRT_DATA } from '../src/engine/sandySkirtData.js';

console.log('='.repeat(80));
console.log('CIRCLE SKIRT GEOMETRY AUDIT');
console.log('='.repeat(80));

for (const [sizeKey, data] of Object.entries(SANDY_SKIRT_DATA)) {
  const waistCm = data.waistCm; // 54 or 56
  const easeCm = 2.0;
  const waistWithEaseCm = waistCm + easeCm; // 56 or 58
  
  // Half-circle: total angle theta = 180 degrees = pi radians
  const totalAngleDeg = 180.0;
  const totalAngleRad = Math.PI;

  // Inner waist radius R_in = waist_with_ease / pi
  const rIn = waistWithEaseCm / Math.PI;

  // Gore pieces
  const goreKeys = Object.keys(data.pieces).filter((k) => k.startsWith('skirt_gore'));
  const numGores = goreKeys.length;
  const goreAngleDeg = totalAngleDeg / numGores;
  const goreAngleRad = totalAngleRad / numGores;

  // Finished length L = height of gore along radial centerline
  const gore1 = data.pieces[goreKeys[0]];
  const finishedLengthCm = gore1.heightCm; // 25.8 cm for waist54
  const rOut = rIn + finishedLengthCm;

  // Arcs
  const singleWaistArcCm = rIn * goreAngleRad;
  const totalWaistArcCm = singleWaistArcCm * numGores;

  const singleHemArcCm = rOut * goreAngleRad;
  const totalHemArcCm = singleHemArcCm * numGores;

  // Area:
  // Mathematical formula for 180° ring sector: (pi / 2) * (R_out^2 - R_in^2)
  const theoreticalTotalAreaCm2 = (Math.PI / 2) * (Math.pow(rOut, 2) - Math.pow(rIn, 2));
  
  // Sum of net gore areas from Shoelace polygon calculation
  const sumNetGoreAreaCm2 = goreKeys.reduce((sum, k) => sum + data.pieces[k].netAreaCm2, 0);
  const singleGoreAreaCm2 = gore1.netAreaCm2;

  console.log(`\nSize: ${data.label} (${sizeKey})`);
  console.log(`- Gore count: ${numGores} gores`);
  console.log(`- Single gore angle: ${goreAngleDeg.toFixed(2)}°`);
  console.log(`- Sum of all gore angles: ${(goreAngleDeg * numGores).toFixed(1)}° (Half-circle requirement: 180.0°)`);
  console.log(`- Inner waist radius (R_in): ${rIn.toFixed(4)} cm`);
  console.log(`- Outer hem radius (R_out): ${rOut.toFixed(4)} cm`);
  console.log(`- Single gore waist arc: ${singleWaistArcCm.toFixed(2)} cm`);
  console.log(`- Total waist arc length of all gores: ${totalWaistArcCm.toFixed(2)} cm (Waist + Ease: ${waistWithEaseCm.toFixed(1)} cm)`);
  console.log(`- Single gore outer hem arc: ${singleHemArcCm.toFixed(2)} cm`);
  console.log(`- Total outer hem arc length (Hem Sweep): ${totalHemArcCm.toFixed(2)} cm (pi * R_out: ${(Math.PI * rOut).toFixed(2)} cm)`);
  console.log(`- Single gore net area (Shoelace): ${singleGoreAreaCm2.toFixed(1)} cm²`);
  console.log(`- Sum of net gore areas (Shoelace): ${sumNetGoreAreaCm2.toFixed(1)} cm²`);
  console.log(`- Theoretical ring-sector area formula (pi/2) * (R_out^2 - R_in^2): ${theoreticalTotalAreaCm2.toFixed(1)} cm²`);
  console.log(`- Area delta: ${Math.abs(sumNetGoreAreaCm2 - theoreticalTotalAreaCm2).toFixed(2)} cm² (${(Math.abs(sumNetGoreAreaCm2 - theoreticalTotalAreaCm2) / theoreticalTotalAreaCm2 * 100).toFixed(3)}%)`);
}
