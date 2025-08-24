import { defineConfig } from 'vite'

import reactSWC from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/siri-constructions-ui/',
    plugins: [reactSWC(), tailwindcss()],
})
