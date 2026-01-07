import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vite는 자동으로 .env.[mode] 파일을 로드합니다
// --mode kiro 또는 --mode yooni로 실행하면 해당 .env 파일이 로드됩니다
export default defineConfig(({ mode }) => {
  // mode에 따라 환경변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // 환경변수를 명시적으로 정의
    define: {
      'import.meta.env.VITE_PERSON': JSON.stringify(env.VITE_PERSON || (mode === 'yooni' ? 'yooni' : 'kiro')),
    },
  }
})
