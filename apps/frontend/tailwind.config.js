/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Fonte Prompt do Figma
      fontFamily: {
        prompt: ['"Prompt"', 'sans-serif'],
        promptSemiBold: ['"Prompt SemiBold"', '"Prompt"', 'sans-serif'],
      },
      colors: {
        // Background navy (#00090e) e painel (#171d1f) — do Figma Login
        navy: {
          DEFAULT: '#00090e',
        },
        panel: {
          DEFAULT: '#171d1f',
        },
        // Inputs — fill (#888888) com texto dark-teal (#132e35)
        input: {
          DEFAULT: '#888888',
          text: '#132e35',
        },
        // Brand green (#81fe88) — botões, acentos, logo
        brand: {
          DEFAULT: '#81fe88',
          deep: '#1d4f2c',
        },
        // Texto do formulário no painel escuro
        form: {
          DEFAULT: '#e1e1e1',
          muted: '#96989a',
        },
        // Cor de link/accent (do Figma — soft grey-blue #7f9b9f)
        accent: '#7f9b9f',
        // Linha e cores estruturais
        line: '#3a3f42',
        social: '#171d1f',
        // Verde petróleo do Figma (#132e35) — texto do botão CTA e campos de input
        petroleum: '#132e35',
        // Cinza escuro do Figma (#171d1f) — mesmo que panel, nome explícito
        darkGrey: '#171d1f',
      },
      fontSize: {
        // Tipografia do Figma — Prompt font family
        'display-31': ['31px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '600' }],
        'display-26': ['26px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '600' }],
        'display-22': ['22px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
        'body-18': ['18px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
        'body-semibold-18': ['18px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '600' }],
        'body-15': ['15px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
        'label-12-5': ['12.5px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
        'label-14': ['14px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
        'label-16': ['16px', { lineHeight: '1.5', fontFamily: 'Prompt', fontWeight: '400' }],
      },
      borderRadius: {
        '4': '4px',
        '8': '8px',
        '32': '32px',
      },
      spacing: {
        // Valores de espaçamento do Figma
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '56': '56px',
        '60': '60px',
        '78': '78px',
      },
      height: {
        // Símbolos decorativos do Figma
        '340': '340px',
        '343': '343px',
        '486': '486px',
        '487': '487px',
      },
    },
  },
}
