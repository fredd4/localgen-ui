import preact from '@preact/preset-vite'
import path from "path"
import { defineConfig, loadEnv } from 'vite'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [preact(), viteSingleFile()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define environment variables to expose to the client
    define: {
      'import.meta.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY || ''),
    }
  }
})
