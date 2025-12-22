# Deployment (Short)

Build and preview locally:

```bash
npm run build
npm run preview
```

- `dist/` contains production files by default.
- Host `dist/` on static hosts like Vercel, Netlify, or GitHub Pages.

Environment variables for API endpoints should be provided at deploy time (e.g., `VITE_API_BASE_URL`).
