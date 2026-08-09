/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Background navy (#00090e) and panel (#171d1f) — from Login.png
        navy: {
          DEFAULT: '#00090e',
        },
        panel: {
          DEFAULT: '#171d1f',
        },
        // Form inputs — grey fill (#888888) with dark-teal typed text (#132e35)
        input: {
          DEFAULT: '#888888',
          text: '#132e35',
        },
        // Brand green (#81fe88) — button, accents, logo
        brand: {
          DEFAULT: '#81fe88',
          deep: '#1d4f2c',
        },
        // Form text on the dark panel
        form: {
          DEFAULT: '#e1e1e1',
          muted: '#96989a',
        },
        // Link/accent color (from label samples) — soft grey-blue
        accent: '#7f9b9f',
        // Legacy colors (kept for existing usage/tests, no longer used by login)
        primary: '#81fe88',
        ink: {
          DEFAULT: '#e1e1e1',
          muted: '#96989a',
        },
        line: '#3a3f42',
        social: '#171d1f',
      },
    },
  },
}
