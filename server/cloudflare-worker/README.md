# ReWear AI Photo Preview — Cloudflare Worker Proxy

This Cloudflare Worker acts as a secure reverse-proxy for the ReWear application's AI realistic photo preview.

### Security Guarantees
- The `GEMINI_API_KEY` is stored **strictly as an encrypted Cloudflare secret** (`env.GEMINI_API_KEY`).
- The secret is **never** included in the client app bundle, source code, or Android APK.
- Implements a per-device daily rate limit (10 previews/day) and an overall daily server cap to protect quotas and prevent abuse.

---

## Deployment Steps

Follow these exact steps from your terminal:

### 1. Install Wrangler CLI (if not already installed)
```bash
npm install -g wrangler
# or use npx directly
```

### 2. Navigate to Worker directory
```bash
cd server/cloudflare-worker
```

### 3. Log in to Cloudflare (Free Tier)
```bash
npx wrangler login
```
*(A browser window will open asking you to authorize Wrangler with your free Cloudflare account).*

### 4. Store your Gemini API Key as an Encrypted Secret
```bash
npx wrangler secret put GEMINI_API_KEY
```
When prompted:
```
Enter a secret value: <paste your Google AI Studio API key here>
```
*(The key is encrypted in Cloudflare's secure secret store and will never appear in plaintext).*

### 5. Deploy the Worker
```bash
npx wrangler deploy
```

Upon completion, Wrangler will output your live URL:
```
Published rewear-ai-proxy (https://rewear-ai-proxy.<your-subdomain>.workers.dev)
```

### 6. Connect App to Live Proxy
Open `src/config/aiConfig.js` in the app and set:
```javascript
export const AI_CONFIG = {
  MOCK_AI: false, // Set to false once pay-as-you-go image quota is active
  AI_PROXY_URL: 'https://rewear-ai-proxy.<your-subdomain>.workers.dev',
  AI_MODEL: 'models/gemini-2.5-flash-image',
  ...
};
```
