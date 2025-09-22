import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// FIX: Import `cwd` from the `process` module to ensure the correct types are available for the current working directory function.
import { cwd } from 'process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})