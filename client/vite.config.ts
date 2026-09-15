import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build vers ../public : Express sert ce dossier tel quel (voir server.js).
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../public",
    assetsDir: "app-assets",
    emptyOutDir: false,
  },
});
