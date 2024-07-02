import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Директория, в которой находятся статические файлы
  publicDir: 'public',
  // Папка, куда будут скопированы статические файлы
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // Установите лимит на размер чанка в КБ
  },
  server: {
    host: 'localhost', // можно использовать '0.0.0.0' для прослушивания на всех интерфейсах
    port: 5173, // измените на нужный вам порт
  },
});
