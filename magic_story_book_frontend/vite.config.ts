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
    port: 5175, // Set the port to 5175
    proxy: {
      "/api": {
        target: "http://localhost:8081", // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },

});
