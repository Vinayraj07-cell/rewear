import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'apk-mime-type',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.endsWith('.apk') || req.url.includes('.apk?'))) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="ReWear.apk"');
          }
          next();
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
