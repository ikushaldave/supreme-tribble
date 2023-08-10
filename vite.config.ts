import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
// import alias from "@rollup/plugin-alias"
// https://vitejs.dev/config/

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, './src'),
      '@assets': resolve(projectRootDir, '.src/assets'),
      '@lib': resolve(projectRootDir, './src/lib'),
      '@pages': resolve(projectRootDir, './src/pages'),
      '@components': resolve(projectRootDir, './src/components'),
      '@store': resolve(projectRootDir, './src/store'),
      '@reducer': resolve(projectRootDir, './src/reducer'),
      '@service': resolve(projectRootDir, './src/service'),
      '@interface': resolve(projectRootDir, './src/interface')
    }
  }
});
