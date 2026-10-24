// src/utils/test_gemini.js
// Unit & Regression test suite for Gemini AI Vision Service (Task A11)

import assert from 'node:assert';
import {
  suggestProductFromFabricImage,
  parseImagePayload,
  AI_HONESTY_LABEL,
  TAILOR_SYSTEM_INSTRUCTION,
} from './geminiService.js';

console.log('====================================================');
console.log('👁️  RUNNING GEMINI AI VISION INTEGRATION TEST SUITE');
console.log('====================================================\n');

// 1. Honesty rule & System instruction constants
console.log('--- 1. Honesty Label & System Instruction Verification ---');
assert.strictEqual(
  AI_HONESTY_LABEL,
  '✨ AI Suggestion - Please verify measurements with a tailor.',
  'Honesty label must strictly match specification'
);
assert.ok(
  TAILOR_SYSTEM_INSTRUCTION.includes('You are an expert tailor.'),
  'System instruction must match expert tailor persona'
);
assert.ok(
  TAILOR_SYSTEM_INSTRUCTION.includes('suggest ONE or TWO products that can be made from it out of our catalog'),
  'System instruction must specify product catalog guidance'
);
console.log('  ✅ PASS: Mandatory honesty label and system prompt verified');

// 2. Payload parsing tests
console.log('\n--- 2. Base64 & Data URI Payload Parsing ---');
const parsedDataUri = parseImagePayload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
assert.strictEqual(parsedDataUri.mimeType, 'image/png');
assert.strictEqual(parsedDataUri.base64Data, 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');

const parsedRaw = parseImagePayload('   aW1hZ2VkYXRhCg==   ');
assert.strictEqual(parsedRaw.mimeType, 'image/jpeg');
assert.strictEqual(parsedRaw.base64Data, 'aW1hZ2VkYXRhCg==');

const parsedObj = parseImagePayload({ data: 'dGVzdA==', mimeType: 'image/webp' });
assert.strictEqual(parsedObj.mimeType, 'image/webp');
assert.strictEqual(parsedObj.base64Data, 'dGVzdA==');

assert.throws(() => parseImagePayload(''), /No image data provided/);
console.log('  ✅ PASS: Data URI, raw base64, and object inputs correctly parsed');

// 3. Graceful failure on missing API key
console.log('\n--- 3. Graceful Failure on Missing API Key ---');
async function testMissingApiKey() {
  try {
    await suggestProductFromFabricImage('data:image/jpeg;base64,ZmFrZQ==', { apiKey: '' });
    assert.fail('Should have thrown when API key is missing');
  } catch (err) {
    assert.ok(
      err.message.includes('AI service unavailable'),
      `Error must contain user-friendly message "AI service unavailable", got: "${err.message}"`
    );
  }
}
await testMissingApiKey();
console.log('  ✅ PASS: Missing API key fails gracefully with user-friendly "AI service unavailable" message');

// 4. Successful mocked Gemini API call
console.log('\n--- 4. Mocked Successful Gemini 1.5 Flash Vision Call ---');
const mockRecommendation =
  'I recommend making a Quilted Tote Bag and an Apron. This durable cotton twill has excellent structural body for sturdy handles and straps.';

const mockFetchSuccess = async (url, options) => {
  assert.ok(url.includes('gemini-1.5-flash'), 'Calls gemini-1.5-flash model endpoint');
  assert.ok(url.includes('test-key-123'), 'Includes API key');
  assert.strictEqual(options.method, 'POST');

  const body = JSON.parse(options.body);
  assert.strictEqual(body.system_instruction.parts[0].text, TAILOR_SYSTEM_INSTRUCTION);
  assert.strictEqual(body.contents[0].parts[0].inline_data.mime_type, 'image/jpeg');
  assert.strictEqual(body.contents[0].parts[0].inline_data.data, 'ZmFrZWJhc2U2NA==');

  return {
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [
        {
          content: {
            parts: [{ text: mockRecommendation }],
          },
        },
      ],
    }),
  };
};

const result = await suggestProductFromFabricImage('data:image/jpeg;base64,ZmFrZWJhc2U2NA==', {
  apiKey: 'test-key-123',
  fetchFn: mockFetchSuccess,
});

assert.strictEqual(result.success, true);
assert.strictEqual(result.suggestion, mockRecommendation);
assert.strictEqual(result.honestyLabel, AI_HONESTY_LABEL);
console.log('  ✅ PASS: Successful Gemini API call produces suggestion with strict honesty label');

// 5. Mocked API Error Response (HTTP 403 / 500)
console.log('\n--- 5. Mocked API Error Response Handling ---');
const mockFetchHttpError = async () => ({
  ok: false,
  status: 403,
  json: async () => ({
    error: { message: 'API key expired or invalid' },
  }),
});

try {
  await suggestProductFromFabricImage('data:image/png;base64,ZmFrZQ==', {
    apiKey: 'bad-key',
    fetchFn: mockFetchHttpError,
  });
  assert.fail('Should have thrown on HTTP error');
} catch (err) {
  assert.ok(err.message.includes('AI service unavailable'), 'Propagates friendly message on API error');
  assert.ok(err.message.includes('API key expired or invalid'), 'Carries upstream reason details');
}
console.log('  ✅ PASS: HTTP error responses handled gracefully with "AI service unavailable"');

console.log('\n====================================================');
console.log('🎉 ALL 5 GEMINI SERVICE TESTS PASSED PERFECTLY!');
console.log('====================================================\n');
