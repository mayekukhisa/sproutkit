# Change: Add config subcommand to manage tool settings

## Why

Sproutkit needs a way for users to manage template sources (both local paths and remote URLs) to enable project scaffolding from custom templates. Without persistent configuration, users cannot specify where templates should be sourced from.

## What Changes

- Add `config` subcommand to the CLI with four operations:
  - `config set <key> <value>` - Set a configuration value
  - `config list` - Display all configuration settings
  - `config delete <key>` - Remove a configuration value
  - `config reset` - Reset all configuration to defaults
- Use `conf` npm package (by Sindre Sorhus) for configuration management
  - Provides automatic storage location handling following system conventions
  - Built-in JSON schema validation
  - Atomic file writes to prevent corruption
  - Dot notation support for nested configuration
- Configuration stored at system-appropriate location:
  - macOS: `~/Library/Preferences/sproutkit-nodejs/config.json`
  - Linux: `~/.config/sproutkit-nodejs/config.json`
  - Windows: `%APPDATA%/sproutkit-nodejs/Config/config.json`
- Support template source configuration for local and remote sources
- Provide configuration validation via JSON schema
- Handle errors gracefully (corrupted files, validation errors, etc.)

## Impact

- Affected specs: `configuration-management` (new capability)
- Affected code:
  - `src/index.ts` - Add config subcommand registration
  - New files for CLI command handlers and configuration wrapper
- Package dependencies: Add `conf` npm package (runtime dependency)
