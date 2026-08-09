# 03 — Setup de Infraestrutura

Configuração inicial do `apps/frontend` para a tela de login. Tudo é executado a partir da raiz do repo, organizado em dois commits (A e B) conforme o plano principal.

## Commit A — Tailwind CSS v4 (CSS-first, plugin Vite)

```bash
pnpm --filter frontend add tailwindcss @tailwindcss/vite
```

**`apps/frontend/vite.config.js`** — adicionar o plugin:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**`apps/frontend/src/index.css`** — substituir **inteiro** por:

```css
@import "tailwindcss";
```

> Remove o `#root { width: 1126px }`, o `prefers-color-scheme` e os tokens do starter, que restringiriam o layout full-screen. As cores de referência do design (accent `#aa3bff`, texto `#08060d`/`#6b6375`, borda `#e5e4e7`, fundo social) passam a ser usadas como utility classes.

**`apps/frontend/index.html`** — `lang="pt-BR"` e `<title>Entrar</title>`.

**Nota Tailwind v4**: é CSS-first e funciona **sem** `tailwind.config.js`. Criar um mínimo (`content: ['./index.html', './src/**/*.{js,jsx}']`) apenas para IntelliSense do editor, referenciado via `@config "./tailwind.config.js"` no `index.css`.

```js
// tailwind.config.js (apenas IntelliSense — v4 não exige)
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#aa3bff',
        ink: { DEFAULT: '#08060d', muted: '#6b6375' },
        line: '#e5e4e7',
      },
    },
  },
}
```

## Commit B — Vitest + React Testing Library

```bash
pnpm --filter frontend add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**`apps/frontend/vite.config.js`** — importar `defineConfig` de `vitest/config` e adicionar bloco de teste:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
})
```

**Criar `apps/frontend/src/test/setup.js`**:

```js
import '@testing-library/jest-dom'
```

**`apps/frontend/package.json`** — adicionar scripts:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

**oxlint**: manter `globals: false` (padrão) e importar `{ describe, it, expect, vi } from 'vitest'` **explicitamente** em cada teste — evita mexer no `.oxlintrc.json` para whitelistar globals.

## Estrutura de pastas

```
apps/frontend/src/
  components/
    atoms/
      Button/
      Input/
      Checkbox/
      Icon/
      Logo/
      Banner/
    molecules/
      FormField/
      SocialButtons/
    organisms/
      AuthForm/
    templates/
      AuthLayout/
    pages/
      LoginPage/
  test/
    setup.js
```

## Limpeza do template Vite

- **Remover**: `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`
- **`src/App.jsx`** → renderizar `LoginPage`:

```jsx
import LoginPage from './components/pages/LoginPage/LoginPage.jsx'

function App() {
  return <LoginPage />
}

export default App
```

## Arquivos afetados

| Ação | Arquivo |
|---|---|
| Criar | `tailwind.config.js`, `src/test/setup.js`, `src/components/**`, `src/pages/` (se necessário) |
| Modificar | `apps/frontend/package.json`, `vite.config.js`, `src/index.css`, `src/App.jsx`, `index.html` |
| Remover | `src/App.css`, `src/assets/{react.svg,vite.svg,hero.png}` |

## Commits

1. `chore(front): add tailwindcss v4 with vite plugin` — Commit A
2. `chore(front): set up vitest and testing-library` — Commit B
