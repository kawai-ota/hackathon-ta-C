import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [vue()],
    server: {
      host: true,
      port: parseInt(env.PORT) || 3000
    }
  }
})