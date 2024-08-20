import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(env.VITE_SSL_PRIVATE_KEY)),
        cert: fs.readFileSync(path.resolve(env.VITE_SSL_PUBLIC_KEY)),
      },
      port: 5173,
    },
  };
});
