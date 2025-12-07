# Change: Add config command to manage template sources

## Why

Sproutkit needs a way for users to manage template sources (both local paths and remote URLs) to enable project scaffolding from custom templates. Without persistent configuration, users cannot specify where templates should be sourced from.

## What Changes

- Add `config` subcommand to the CLI with four operations:
  - `config set <key> <value>` - Set a configuration value
  - `config list` - Display all configuration settings
  - `config delete <key>` - Remove a configuration value
  - `config reset` - Reset all configuration to defaults
- Use `conf` npm package for configuration management
  - Provides automatic storage location handling following system conventions
  - Built-in JSON schema validation
  - Atomic file writes to prevent corruption
  - Dot notation support for nested configuration
- Configuration stored at system-appropriate location:
  - macOS: `~/Library/Preferences/sproutkit/config.json`
  - Linux: `~/.config/sproutkit/config.json`
  - Windows: `%APPDATA%/sproutkit/Config/config.json`
- Support template source configuration for local and remote sources
  - Local paths validated for existence
  - Remote URLs validated for format and reachability (via HTTP HEAD request)
- Provide configuration validation via JSON schema
- Handle errors gracefully (corrupted files, validation errors, etc.)

## Impact

- Affected specs: `configuration-management` (new capability)
- Affected code:
  - `src/index.ts` - Add config subcommand registration
  - `src/commands/config.ts` - New file for CLI command handlers
  - `src/lib/config.ts` - New file for configuration wrapper
  - `src/lib/validators.ts` - New file for validation logic
- Package dependencies: Add `conf` npm package (runtime dependency)
