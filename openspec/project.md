# Project Context

## Purpose

Sproutkit is a project scaffolding tool designed to help developers skip boilerplate setup and immediately start building. The tool is in early stages of development and aims to provide ready-to-use project structures from templates.

## Tech Stack

- TypeScript (strict mode enabled)
- Node.js 24 or newer
- Commander.js for CLI interface
- Rollup for bundling
- pnpm for package management
- ESLint + Prettier for code quality
- Husky + lint-staged for pre-commit hooks
- Codecap for copyright header management

## Project Conventions

### Code Style

- No semicolons (Prettier configured with `semi: false`)
- ESLint enforces import sorting via `eslint-plugin-simple-import-sort`
- Relative imports (`./` or `../`) are prohibited; use path aliases (`@/*` maps to `src/*`)
- TypeScript strict mode with additional compiler checks:
  - `noImplicitAny`, `noImplicitThis`, `noImplicitReturns`
  - `noUnusedLocals`, `noUnusedParameters`
  - `noFallthroughCasesInSwitch`
- MIT License headers required on all source files (`.mjs`, `.ts`)

**Code Comments:**

- Write comments only where genuinely helpful
- Focus on **why** decisions were made or what purpose code serves, not **how** it works
- Use brief "title" comments for logical blocks or specific tasks
- Avoid line-by-line explanations or syntax documentation
- Keep style clean and professional — document reasoning for future reference

### Architecture Patterns

- ESM modules exclusively (type: "module")
- Module resolution: bundler
- Path aliases: `@/*` for `src/*`
- Build output: single ESM bundle in `dist/`
- Source maps enabled in development, disabled in production
- Build-time replacements for project metadata (`__projectName__`, `__projectDescription__`, `__projectVersion__`)

### Testing Strategy

Not yet established (early development stage)

### Git Workflow

**Commit Convention:**

- Use Conventional Commits format
- Summary header: max 72 characters, imperative mood
- Description: max 72 characters per line, imperative mood
- Footer: max 72 characters per line

**Pre-commit Hooks:**

- Husky + lint-staged automatically run on staged files:
  - `.mjs`, `.ts` files: ESLint + Codecap
  - `.json`, `.md`, `.yml` files: Prettier

### Documentation Strategy

- Use Context 7 MCP server to fetch current documentation when implementing features
- Ensures AI assistants have access to up-to-date library documentation
- Reduces reliance on potentially outdated knowledge

## Domain Context

Sproutkit operates in the developer tooling space, specifically project initialization and scaffolding. The tool will help developers bypass repetitive setup tasks by providing pre-configured project templates with best practices built in.

## Important Constraints

- Node.js 24+ requirement (modern runtime features)
- TypeScript strict mode is non-negotiable
- All source files must have MIT license headers
- Import paths must use aliases, not relative paths
- CLI tool must be self-contained (minimal runtime dependencies)

## External Dependencies

### Runtime

- Commander.js: CLI framework for command parsing and help generation

### Development

- Rollup ecosystem: TypeScript plugin, replace plugin, prettier plugin, delete plugin
- ESLint ecosystem: typescript-eslint, prettier integration, import sorting
- Husky + lint-staged: Git hooks automation
- Codecap: Copyright header management
