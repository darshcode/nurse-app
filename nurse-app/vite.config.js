import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "nurseApp",
      filename: "remoteEntry.js",
      exposes: {
        "./NurseAppComponent": "./src/NurseAppComponent",
      },
      shared: ["react", "react-dom", "@apollo/client", "lucide-react"],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3002,
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 3002,
    allowedHosts: ["nurse-app-izij.onrender.com"],
  },

  build: {
    modulePreload: false,
    target: "esnext",
    outDir: "dist",
    minify: false,
    cssCodeSplit: false,
  },
});
