import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";

import "dotenv/config";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel({
    edge: false,
    includeFiles: [], // evita que intente enlazar cosas innecesarias
    copyInsteadOfSymlink: true, // fuerza copiar dependencias
  }),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@supabase/supabase-js"],
    },
  },
});
