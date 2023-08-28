import dns from 'dns';
import { defineConfig } from "vite";

dns.setDefaultResultOrder('verbatim');// 

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: '/src/'
      }
    ]
  },
  server: {
    host: 'localhost',
    port: 8000,
    strictPort: true, // 若端口已被占用则会直接退出
    https: false,// 不启用 TLS + HTTP/2
    open: false,// 不自动打开到浏览器（浏览器可通过设置环境变量 process.env.BROWSER配置）
    proxy: {
      '/api': {
        target: 'https://randomuser.me/',
        changeOrigin: true,// 跨源
      }
    },
    cors: true,// 启用配置开发服务器 CORS 策略
    // todo 其他配置
  }
})
