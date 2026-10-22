#!/usr/bin/env node
/**
 * CLI Tool: check-products
 *
 * Runs validation across all products in the ReWear product registry.
 * Prints exactly one line per product.
 * Exits with 0 on complete success, or 1 on any validation error.
 */

import { validateRegistry } from './productValidator.js';
import { PRODUCT_TEMPLATES } from './templates.js';

const report = validateRegistry(PRODUCT_TEMPLATES);

// Print exactly one line per product
for (const line of report.oneLineSummaries) {
  console.log(line);
}

if (!report.valid) {
  process.exit(1);
} else {
  process.exit(0);
}
