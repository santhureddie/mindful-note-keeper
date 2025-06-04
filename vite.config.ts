
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use environment variable first, then fallback based on mode
  const basePath = process.env.VITE_BASE_PATH || (mode === 'production' ? '/mindful-note-keeper/' : '/');
  
  console.log('Build mode:', mode);
  console.log('Base path:', basePath);
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    base: basePath,
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-toast', '@radix-ui/react-dialog'],
            query: ['@tanstack/react-query']
          }
        }
      }
    },
    define: {
      // Ensure environment variables are available at build time
      'import.meta.env.BASE_URL': JSON.stringify(basePath)
    }
  };
});
