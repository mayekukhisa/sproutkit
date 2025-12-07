# Project Context

## Purpose

Sproutkit aims to become a project scaffolding tool that helps developers skip boilerplate setup and start building immediately. The tool is in early development and will provide ready-to-use project structures from templates with best practices built in.

## Tech Stack

- TypeScript (strict mode)
- Bun runtime and package manager
- Commander.js for CLI interface
- ESLint + Prettier for code quality
- Knip for dead code and clutter detection
- Husky + lint-staged for pre-commit hooks
- Codecap for copyright header management

## Project Conventions

### Code Style

- No semicolons (Prettier `semi: false`)
- ESLint enforces import sorting via `eslint-plugin-simple-import-sort`
- Relative imports (`./` or `../`) prohibited; use path aliases (`@/*` maps to `src/*`)
- TypeScript strict mode with additional checks:
  - `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`
  - `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`
  - `noPropertyAccessFromIndexSignature`, `noImplicitOverride`
- MIT license headers required on all `.ts` source files

**Code Comments:**

- Write comments only where genuinely helpful
- Focus on **why** decisions were made, not **how** code works
- Use brief "title" comments for logical blocks
- Avoid line-by-line explanations

### Architecture Patterns

- ESM modules exclusively (`"type": "module"`)
- Module resolution: bundler
- Path aliases: `@/*` for `src/*`
- Source structure: `src/` with `lib/` for shared utilities

### Testing Strategy

Not yet established (early development stage)

### Git Workflow

**Commit Convention:**

- Conventional Commits format
- Summary: max 72 characters, imperative mood
- Description: max 72 characters per line, imperative mood

**Pre-commit Hooks:**

- Husky + lint-staged runs on staged files:
  - `.ts` files: ESLint + Codecap
  - `.json`, `.md`, `.yml` files: Prettier
- Knip catches unused exports, dependencies, and files before commits

### Documentation Strategy

- Use JSDoc-style comments for public APIs and exported functions
- Document parameters, return types, and notable behavior

### AI Assistant Guidelines

- Use Context7 MCP server to fetch current documentation when implementing features
- Always reference up-to-date docs rather than relying on training knowledge

## Domain Context

Sproutkit operates in the developer tooling space, specifically project initialization and scaffolding. The tool will help developers bypass repetitive setup by providing pre-configured project templates.

## Important Constraints

- Bun runtime required
- TypeScript strict mode is non-negotiable
- All source files must have MIT license headers
- Import paths must use aliases, not relative paths
- CLI tool should minimize runtime dependencies

## External Dependencies

### Runtime

- Commander.js: CLI framework for command parsing and help generation

### Development

- ESLint ecosystem: typescript-eslint, prettier integration, import sorting
- Husky + lint-staged: Git hooks automation
- Knip: Finds unused code, exports, and dependencies
- Codecap: Copyright header management
