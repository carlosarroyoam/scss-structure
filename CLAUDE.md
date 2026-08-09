# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An Angular 22 application whose primary purpose is demonstrating a scalable SCSS architecture (tokens → themes → base → layout → components → utilities, `@layer`-based cascade, dark/light theming via `data-theme`). Treat `src/styles/` as the focal point of this codebase, not incidental styling.

## Commands

```bash
npm start                     # ng serve, http://localhost:4200
npm run build                 # ng build (production by default)
npm run watch                 # ng build --watch --configuration development
npm test                      # ng test (Vitest via @angular/build:unit-test)
npm run lint                  # ng lint (ESLint, .ts and .html)
npm run lint:styles           # stylelint src/**/*.scss --fix
npm run lint:styles:check     # stylelint src/**/*.scss (no fix)
npm run format                # prettier --write .
npm run format:check          # prettier --check .
```

Run a single test file with `ng test -- <pattern>` or by using Vitest's own filtering (e.g. `npx vitest run src/app/shared/services/theme-service/theme.service.spec.ts`).

There is no e2e framework configured.

## SCSS architecture (`src/styles/`)

Layer order is declared once in `src/styles.scss`: `@layer reset, tokens, base, layout, components, utilities;`. Every partial wraps its rules in the matching `@layer` block, so cascade order is explicit regardless of source order. Component styles (e.g. `app.scss`) belong to the `components` layer.

Directory responsibilities:
- `tokens/` — `_primitives.scss` holds private Sass maps (space, radius, breakpoints) not consumed directly by components. `_semantic.scss` exposes `emit-foundation`, the single mixin (included once, in `styles.scss`) that writes non-theme CSS custom properties (`--space-*`, `--radius-*`, `--font-*`, `--shadow-*`, `--duration-*`, `--z-*`) into `:root` under `@layer tokens`.
- `themes/` — `_palette.scss` holds private `$light-colors`/`$dark-colors` maps. `_light.scss`/`_dark.scss` turn a palette into `--color-*` custom properties via a private `values` mixin. `_index.scss` exposes `emit-themes` (included once, in `styles.scss`), which wires up `:root[data-theme="light"]`, `:root[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` for `:root:not([data-theme])`. This is the pattern to extend for new theme-dependent tokens — never hardcode colors in component styles.
- `base/` — reset, document defaults, typography, accessibility (focus-visible ring, reduced-motion, forced-colors), print. Forwarded individually from `styles.scss`, not through an `_index.scss`.
- `layout/` — composable layout primitives (`.container`, `.stack`, `.cluster`) that expose a local custom-property override point (e.g. `--stack-space`, `--cluster-space`, `--container-gutter`) with a token-based default. Follow this override-point pattern for any new layout primitive.
- `tools/` — Sass-only helpers with **zero CSS output**: `rem()` px→rem conversion, `respond-to`/`respond-below` breakpoint mixins, `focus-ring`/`sr-only`/`motion-safe`/`reduced-motion` mixins. Forwarded as a unit via `tools/_index.scss`; components `@use 'styles/tools' as tools;` and call e.g. `tools.respond-to('md')`.
- `utilities/` — small single-purpose classes (`.flow`, `.block`, `.hidden`, `.text-center`, `.visually-hidden`, `.skip-link`), forwarded as a unit via `utilities/_index.scss`.

Naming convention in components: BEM-like blocks with `&__element` nesting (see `app.scss`'s `.app-header`, `.theme-selector`, `.hero`), local custom properties for per-instance overrides, all values sourced from `--color-*`/`--space-*`/`--font-*`/etc. tokens rather than literals.

### Stylelint constraints (`stylelint.config.mjs`) — these will fail CI/hooks if violated

- `@import` is disallowed — use `@use`/`@forward` only.
- `max-nesting-depth: 2`.
- No ID selectors (`selector-max-id: 0`); max specificity `0,4,0`.
- `!important` is disallowed — this is why `base/_print.scss` avoids overriding component colors.
- Custom property names must match `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$`.

Global SCSS include path is `src` (see `angular.json` → `stylePreprocessorOptions.includePaths`), so partials use bare `@use 'styles/...'` from `styles.scss` but relative `@use '../tools'` etc. from within `src/styles/`.

## Angular architecture (`src/app/`)

Small app; folders are organized by layer, not by feature (feature-based subfolders should be introduced under `core/` and `shared/` as needed, following the same pattern):
- `core/` — singleton, app-wide concerns: `constants/`, `data-access/services/` (e.g. the abstract `StorageService` in `storage-service.ts`, extended by `LocalStorageService`/`SessionStorageService` for namespacing + TTL-aware JSON storage).
- `shared/` — reusable, non-singleton-scoped-by-nature pieces consumed across features, e.g. `services/theme-service/`.

Path alias `@/*` → `src/app/*` (and `@/environments/*` → `src/environments/*`), configured in `tsconfig.json`. Always import via `@/...` rather than relative paths across directories.

`ThemeService` (`shared/services/theme-service/theme.service.ts`) is the reference implementation for how the token/theme SCSS layer is driven at runtime: it holds a `signal<ThemePreference>`, persists the preference via `LocalStorageService`, and toggles `document.documentElement.dataset['theme']`, which is exactly the attribute the `themes/_index.scss` selectors key off of.

## Follow `AGENTS.md`

`AGENTS.md` at the repo root defines the TypeScript/Angular conventions for this project (Angular v22-idiomatic: no explicit `standalone: true` or `OnPush`, signals-based state, `input()`/`output()` functions, `inject()` over constructor injection, `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singletons, Signal Forms for new forms, native control flow in templates, no `ngClass`/`ngStyle`, AXE/WCAG AA compliance). Read it before writing component or service code.
