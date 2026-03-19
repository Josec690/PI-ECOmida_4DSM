# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploy no Vercel (Frontend)

1. Crie (ou use) um projeto no Vercel apontando para este repositório.
2. Em **Root Directory**, selecione `PI`.
3. Em **Environment Variables**, adicione:

	- `VITE_API_URL` = URL pública do backend (ex.: `https://seu-backend.vercel.app`)

4. Confirme as configurações de build:

	- **Build Command**: `npm run build`
	- **Output Directory**: `dist`

5. Faça o deploy.

### Observações

- O arquivo `PI/vercel.json` já está configurado para Vite + SPA rewrite.
- Sem `VITE_API_URL`, o frontend usa fallback local (`http://localhost:5000`), que não funciona em produção.
