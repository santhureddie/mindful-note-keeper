
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get base path from environment variable or use repository name for production
  const basePath = process.env.VITE_BASE_PATH || (mode === 'production' ? '/mindful-note-keeper/' : '/');
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    // Use the determined base path
    base: basePath,
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
