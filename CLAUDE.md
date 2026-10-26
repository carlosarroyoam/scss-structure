# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An Angular 22 application whose purpose is to demonstrate a scalable SCSS architecture: Sass primitives → CSS custom-property tokens → themes → base → layout → components → utilities, with an explicit `@layer` cascade and light/dark theming driven by `data-theme` on `<html>`. Treat `src/styles/` as the focal point of the codebase.

The UI copy is in Spanish (`<html lang="es">`, routes `/` "Inicio" and `/estilos` "Guía de estilos"). Keep new user-facing text in Spanish.

## Commands

```bash
npm start                     # ng serve (development config), http://localhost:4200
npm run build                 # ng build (production by default) → dist/
npm run watch                 # ng build --watch --configuration development
npm test                      # ng test (Vitest via @angular/build:unit-test, jsdom)
npm run lint                  # ng lint (angular-eslint on src/**/*.ts and src/**/*.html)
npm run lint:styles           # stylelint "src/**/*.scss" --fix
npm run lint:styles:check     # stylelint "src/**/*.scss" (no fix)
npm run format                # prettier --write .
npm run format:check          # prettier --check .
```

Run a single spec with `npx ng test --include src/app/features/home/home.spec.ts`. There is no e2e framework configured.

Production budgets (`angular.json`): initial bundle warns at 500 kB / errors at 1 MB; **any single component stylesheet warns at 4 kB / errors at 8 kB** — keep component SCSS lean and push shared rules into `src/styles/`.

## Directory layout

```
src/
├── index.html                 # Poppins via Google Fonts; inline pre-boot theme script (see below)
├── main.ts                    # bootstrapApplication(App, appConfig)
├── styles.scss                # the only global stylesheet: layer order + token/theme emission
├── styles/
│   ├── tokens/                # _primitives (private maps), _semantic (emit-foundation), _index
│   ├── themes/                # _scales, _palette, _light, _dark, _index (emit-themes)
│   ├── base/                  # _reset, _document, _typography, _accessibility, _print
│   ├── layout/                # _container
│   ├── tools/                 # _functions, _breakpoints, _mixins, _index (zero CSS output)
│   └── utilities/             # _display, _spacing, _text, _visibility, _index
└── app/
    ├── app.ts|html|scss       # root shell: skip link, header, nav, theme selector, <router-outlet>
    ├── app.config.ts          # provideBrowserGlobalErrorListeners + provideRouter
    ├── app.routes.ts          # lazy loadComponent routes into features/
    ├── core/
    │   ├── constants/storage-keys.constants.ts
    │   └── data-access/services/storage-service/   # abstract StorageService + Local/Session subclasses
    ├── shared/services/theme-service/              # ThemeService
    └── features/
        ├── home/              # landing page (hero + principles grid)
        └── style-guide/       # living documentation of the tokens
```

## SCSS architecture (`src/styles/`)

### Entry point and cascade

`src/styles.scss` `@use`s every module, declares `@layer reset, tokens, base, layout, components, utilities;`, then calls `@include tokens.emit-foundation;` and `@include themes.emit-themes;`. Those two mixins are emitted **only here** — never include them elsewhere.

Every partial wraps its output in its matching `@layer` block. Component stylesheets (`app.scss`, `features/**/*.scss`) wrap everything in `@layer components { ... }`.

### Module responsibilities

- **`tokens/`**
  - `_primitives.scss` — private Sass maps `$space` (keys like `px`, `0`, `'0-5'`, `1` … `96`), `$radius` (`none` … `3xl`, `full`), `$breakpoints` (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `xxl` 96rem). Not consumed by components.
  - `_semantic.scss` — `emit-foundation` writes non-theme custom properties to `:root` in `@layer tokens`: `--spacing-*` and `--radius-*` (generated from the maps), `--font-sans|serif|mono`, `--font-size-{xs…6xl}`, `--line-height-{xs…6xl}`, `--font-weight-{normal,medium,bold}`, `--shadow-{xs,sm,md,lg}`, `--duration-{fast,normal}`, `--ease-{in,out,in-out}`, `--focus-ring-width|offset`, `--content-max-width`, `--z-{0…50,auto}` plus semantic aliases `--z-sticky|dropdown|overlay|modal|toast`. Prefer the semantic z aliases.
  - `_index.scss` — `@forward 'semantic' show emit-foundation;` (only the mixin is public).
- **`themes/`**
  - `_scales.scss` — raw hue scales (`$primary`, `$accent`, `$neutral`, `$success`, `$warning`, `$danger`, `$info`, steps 50–950). Single source of truth for hex values; never emitted directly.
  - `_palette.scss` — `$light-colors` / `$dark-colors` map semantic names (`background`, `surface`, `surface-muted`, `text-*`, `border*`, `focus-ring`, `overlay`, `primary*`, `on-primary`, `accent*`, and `success|warning|danger|info` each with `-surface` and `on-` variants) to scale steps via `map.get`. **Both maps must have the same keys.**
  - `_light.scss` / `_dark.scss` — private `values` mixin iterating a palette into `--color-<name>` plus `--color-scheme`.
  - `_index.scss` — `emit-themes`: `:root, :root[data-theme='light']` → light; `@media (prefers-color-scheme: dark) { :root:not([data-theme]) }` → dark; `:root[data-theme='dark']` → dark.
  - To add a theme-dependent color: add a scale step if needed, add the key to **both** palette maps, then consume `var(--color-<name>)`. Never hardcode colors in components.
- **`base/`** — reset, document defaults (font, `color-scheme`, body colors, links, `::selection`), typography (body/h1–h3/p/code), accessibility (global `:focus-visible` ring, reduced motion, `forced-colors` fallback to `Highlight`), print (hides `.skip-link`, prints external hrefs). Each file is `@use`d individually from `styles.scss`; there is no `base/_index.scss`.
- **`layout/`** — `.container`: centered, max `--content-max-width`, with a local override point `--container-gutter` (default `clamp(var(--spacing-4), 4vw, var(--spacing-8))`). New layout primitives should follow this "local custom property with token default" pattern.
- **`tools/`** — Sass-only, **no CSS output**, forwarded via `tools/_index.scss`:
  - `rem($pixels, $base: 16)` — unitless px → rem (errors on units).
  - `breakpoint($name)`, `respond-to($name)` (`width >= bp`), `respond-below($name)` (`width < bp`); unknown names raise `@error`.
  - `focus-ring`, `sr-only`, `motion-safe`, `reduced-motion` mixins.
- **`utilities/`** — forwarded via `utilities/_index.scss`: `.block`, `.full-width`, `.hidden` / `[hidden]`, `.flow` (override with `--flow-space`), `.text-center`, `.visually-hidden`, `.skip-link`.

### `@use` paths

`angular.json` sets `stylePreprocessorOptions.includePaths: ["src"]`, so:

- From `styles.scss` and component stylesheets: `@use 'styles/tools' as tools;` then `tools.respond-to('md')`.
- From inside `src/styles/`: relative paths, e.g. `@use '../tools';`, `@use '../tokens/primitives';`.

### Component styling conventions

- BEM-like blocks with `&__element` nesting and attribute-state selectors (e.g. `.theme-selector__button[aria-selected='true']`, `.app-nav__link[aria-current='page']`).
- All values come from tokens (`--color-*`, `--spacing-*`, `--radius-*`, `--font-*`, `--shadow-*`, `--z-*`, …), not literals.
- Use logical properties (`inline-size`, `block-size`, `margin-inline`, `inset-block-start`, `padding-block`).
- Routed feature components set `:host { display: contents; }` so their sections participate directly in the `.app-main` flex layout.

### Stylelint rules (`stylelint.config.mjs`) — violations fail lint

Extends `stylelint-config-standard-scss` + `stylelint-config-recess-order` (property order is enforced; `--fix` reorders). Additionally:

- `@import` disallowed — use `@use` / `@forward`.
- `max-nesting-depth: 2`.
- No ID selectors; max specificity `0,4,0`.
- No `!important` (why `base/_print.scss` does not override component colors).
- Custom property names must match `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$`.
- Blank-line rules for custom properties / `$` variables are disabled to allow grouping.

## Angular architecture (`src/app/`)

**Follow `AGENTS.md`** for TypeScript/Angular conventions. Key points as applied in this repo: standalone components without `standalone: true`; no explicit `OnPush` (default in v22); signals for state, `computed()` for derived state; `input()`/`output()` functions; `inject()` instead of constructor injection; `@Service()` (from `@angular/core`) for singletons; native control flow (`@if`, `@for`); `class`/`style` bindings instead of `ngClass`/`ngStyle`; `host` object instead of `@HostBinding`/`@HostListener`; Signal Forms for new forms; lazy-loaded feature routes; must pass AXE and WCAG AA.

- **Routing** — `app.routes.ts` lazy-loads each page via `loadComponent` from `features/<name>/<name>.ts` and sets a Spanish `title`. Add new pages as a folder under `features/` and a route here; add a matching link to the nav in `app.html`.
- **File naming** — components are `name.ts|html|scss|spec.ts` with class names without a `Component` suffix (`App`, `Home`, `StyleGuide`), using external `templateUrl`/`styleUrl` relative to the TS file. Services use a `*-service.ts` / `*.service.ts` file inside a folder of the same name.
- **`core/`** — app-wide singletons and constants. `StorageService` is an abstract base (SSR-safe via `isPlatformBrowser`) that namespaces keys as `<namespace>:<key>` and stores JSON records `{ value, expiresAt }` with optional TTL; `LocalStorageService` and `SessionStorageService` are `@Service()` subclasses using `APP_NAMESPACE`.
- **`shared/`** — reusable services. `ThemeService` holds a private `signal<ThemePreference>` (`'system' | 'light' | 'dark'`) exposed read-only as `preference`, sets/removes `document.documentElement.dataset['theme']`, and persists explicit choices via `LocalStorageService` (removing the key for `'system'`).
- **Pre-boot theme script** — `src/index.html` contains an inline script that reads `localStorage['scss-structure:theme-preference']` and sets `data-theme` before Angular boots to avoid a flash of the wrong theme. That literal key must stay in sync with `APP_NAMESPACE` + `THEME_PREFERENCE_KEY` in `core/constants/storage-keys.constants.ts` and with the `StorageService` record shape (`.value`).
- **Style guide sync** — `features/style-guide/style-guide.ts` hand-maintains lists of token names/labels that mirror `_palette.scss`, `_primitives.scss` and `_semantic.scss`. When tokens change, update these lists too.

### Imports and TypeScript

- Path alias `@/*` → `src/app/*` (also `@/environments/*` → `src/environments/*`, though that folder does not exist yet). Use `@/...` for cross-directory imports; same-folder imports use `./`.
- Strict-leaning compiler options: `noImplicitOverride`, `noPropertyAccessFromIndexSignature` (hence `dataset['theme']`), `noImplicitReturns`, `noFallthroughCasesInSwitch`, `strictInjectionParameters`, `strictInputAccessModifiers`.
- Members are explicitly marked `public` / `protected` / `private`; template-bound members are `protected readonly`.

## Testing

- Vitest globals (`describe`, `it`, `expect`) with `TestBed`; specs live next to the code as `*.spec.ts`.
- Component specs include an accessibility check: `const results = await axe.run(fixture.nativeElement); expect(results.violations).toEqual([]);` (`axe-core`). Add the same check to new components.
- Specs that touch theming reset state in `beforeEach` (`localStorage.clear()`, remove `data-theme`).

## Formatting and linting

- Prettier: `printWidth: 100`, `singleQuote: true`, Angular parser for `*.html`. ESLint runs Prettier as a rule, so formatting issues are lint errors.
- ESLint: `@eslint/js` recommended, `typescript-eslint` recommended + stylistic, angular-eslint TS recommended, template recommended + **template accessibility**. Selector prefix `app` (elements kebab-case, attribute directives camelCase).
- `.editorconfig`: UTF-8, 2-space indent, LF line endings, final newline, trimmed trailing whitespace (except Markdown).

## Tooling notes

- `.claude/skills/angular-developer/` (mirrored in `.agents/skills/`, tracked by `skills-lock.json` from `angular/skills`) provides Angular reference material; consult it for Angular APIs.
- VS Code: `stylelint.validate` is enabled for CSS/SCSS; launch configs exist for `ng serve` and `ng test`.
