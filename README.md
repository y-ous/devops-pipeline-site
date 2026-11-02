# Takenlijst: CI/CD-pipeline demo

Een simpele takenlijst-website (HTML, CSS en JavaScript met Vite) die laat zien hoe een volledige CI/CD-pipeline werkt met GitHub Actions. Gemaakt voor het datapunt DevOps & Testing.

## Pipeline

Bij elke push en pull request naar `main` draait `.github/workflows/ci-cd.yml`:

```
lint ──┐
       ├──> build ──> e2e-test ──> deploy (alleen push naar main)
unit ──┘
```

| Stap | Wat het doet | Faalt als |
| --- | --- | --- |
| Lint | ESLint op de JavaScript, html-validate op `index.html` | Er een codefout of ongeldige HTML is |
| Unit tests | Vitest op de logica in `src/tasks.js`, met coverage-rapport | Een test faalt of coverage onder 90% komt |
| Build | `vite build` maakt de productieversie in `dist/` | De build niet lukt |
| E2E tests | Playwright test de gebouwde site in Chromium zoals een gebruiker | De site in de browser niet werkt zoals verwacht |
| Deploy | Zet `dist/` op GitHub Pages | Alleen na geslaagde vorige stappen, alleen op `main` |

Pull requests draaien alles behalve deploy, zodat kapotte code nooit live gaat. Coverage- en Playwright-rapporten worden als artifacts bewaard. Dependabot houdt npm-pakketten en Actions wekelijks up-to-date.

## Lokaal draaien

```bash
npm install
npm run dev            # ontwikkelserver
npm run lint
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
```

## GitHub Pages aanzetten

Ga in de repo naar **Settings → Pages** en kies bij **Source** de optie **GitHub Actions**.
