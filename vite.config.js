import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Gunakan polyfill untuk modul-modul yang Anda perlukan
      exclude: ["fs"], // contoh untuk mengecualikan 'fs' jika tidak diperlukan
    }),
  ],
  resolve: {
    alias: {
      // Tambahkan alias untuk polyfill global jika diperlukan
      global: "globalThis",
    },
  },
});
