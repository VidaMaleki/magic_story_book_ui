import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-icons"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", 
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    proxy: {
      "/api": {
        target: "https://magicstorybook.onrender.com", // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },

});
