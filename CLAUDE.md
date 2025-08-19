# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `pnpm dev` - Start H5 development server (default)
- `pnpm dev:mp-weixin` - Start WeChat Mini Program development
- `pnpm dev:h5:ssr` - Start H5 with SSR
- `pnpm build` - Build for H5 (default)
- `pnpm build:mp-weixin` - Build for WeChat Mini Program

### Code Quality

- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm type-check` - Run TypeScript type checking

### Testing

- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage
- `pnpm test:debug` - Run tests in debug mode

### API Generation

- `npx alova gen -f` - Generate API definitions from OpenAPI/Swagger

## Architecture Overview

### UniApp Template Structure

This is a feature-rich UniApp template focused on developer experience and functionality. The project uses Vue 3 with TypeScript and is designed for cross-platform development (H5, WeChat Mini Program, etc.).

### Key Technologies

- **Framework**: UniApp with Vue 3 + TypeScript
- **Build Tool**: Vite 6
- **CSS**: UnoCSS with WeApp preset for atomic styling
- **State Management**: Pinia
- **HTTP Client**: Alova (lightweight request strategy library)
- **UI Library**: wot-design-uni
- **Router**: uni-mini-router for enhanced routing
- **Testing**: Vitest
- **Code Quality**: ESLint with @antfu/eslint-config

### Core Systems

#### Theme System

- Runtime dynamic theme switching using CSS variables
- Supports both Mini Program and H5 platforms
- Theme configuration in `src/hooks/useTheme.ts`
- Theme styles in `src/uni.scss`

#### Request Management (Alova)

- Auto-generated API definitions from OpenAPI/Swagger
- Global loading state management
- Request caching and sharing
- Automatic token injection
- Configuration in `alova.config.ts` and `src/api/index.ts`
- Must use `useRequest` for reactive execution or explicitly `await`/`.then()`

#### Auto-Import System

- Vue APIs, Pinia, and Alova auto-imported
- Custom hooks from `src/hooks/` auto-imported
- Store modules from `src/store/modules/` auto-imported
- Components with `$` prefix available globally with full type support

#### Bundle Optimization

- Cross-package async component loading
- Subpackage optimization using `@uni-ku/bundle-optimizer`
- Component lazy loading with async imports
- Configuration in `plugins/config.ts` and `pages.config.ts`

#### Router Enhancement

- Name-based route navigation using `uni-mini-router`
- Route guards and permission control
- Page preloading capabilities
- Router configuration in `src/router/`

### Project Structure Patterns

#### Pages Organization

- `src/pages/` - Main package pages
- `src/pages-sub/` - Subpackage pages for optimization
- Each page can have its own `components/` folder

#### Component Structure

- `src/components/` - Global components
- Components auto-registered if following naming conventions
- Support for dynamic components with `component is`

#### State Management

- `src/store/modules/` - Pinia store modules
- Simple store setup in `src/store/index.ts`
- Manual persistence recommended using watch + cache utilities

#### Utilities

- `src/utils/cache/` - Cache management (default 7-day expiration)
- `src/utils/utility/` - General utility functions
- `src/utils/cipher.ts` - Encryption/decryption utilities (MD5, Base64, AES)

### Development Guidelines

#### File Locations

- Static images should go in `src/static/` (not `public/`)
- `public/` is reserved for web server root files needed by embedded H5

#### Code Style

- ESLint configuration uses @antfu/eslint-config with custom rules
- 2-space indentation, single quotes, semicolons required
- Pre-commit hooks run lint-staged for all files

#### Platform-Specific Development

- Use UnoCSS with WeApp preset for cross-platform styling
- Icon library: prefer `i-lucide-*` (tree-shaken) over `wd-icon`
- Test platform-specific features on both H5 and target Mini Program

#### Environment Configuration

- Environment variables in `.env` and `.env.*` files
- Subpackage configuration in `vite.config.ts`
- Bundle optimization settings in `pages.config.ts`

### Common Patterns

#### API Usage

```typescript
// Auto-imported, reactive execution
const { data, loading, error } = useRequest(Apis.someEndpoint());

// Manual execution (must await or .then)
await Apis.someEndpoint();
```

#### Theme Switching

Theme utilities are auto-imported from `src/hooks/useTheme.ts`.

#### Cache Management

Cache utilities are auto-imported from `src/utils/cache/` with configurable expiration.

### VSCode Extensions

The project recommends specific extensions for optimal development experience (see `.vscode/extensions.json`).
