import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vite는 자동으로 .env.[mode] 파일을 로드합니다
// --mode kiro 또는 --mode yooni로 실행하면 해당 .env 파일이 로드됩니다
export default defineConfig({
  plugins: [react()],
})
