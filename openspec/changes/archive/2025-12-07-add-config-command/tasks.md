# Implementation Tasks

## 1. Setup and Dependencies

- [x] 1.1 Install `conf` npm package
  - [x] 1.1.1 Run `bun add conf` to add as runtime dependency
  - [x] 1.1.2 Verify package installation and Bun compatibility

## 2. Core Configuration Management

- [x] 2.1 Create configuration wrapper module (`src/lib/config.ts`)
  - [x] 2.1.1 Import and initialize `Conf` with project name from constants
  - [x] 2.1.2 Define JSON schema for configuration validation
  - [x] 2.1.3 Export configured `Conf` instance for use in commands
- [x] 2.2 Create utility functions for configuration display
  - [x] 2.2.1 Implement function to flatten nested config to dot notation for `list` command

## 3. Configuration Schema and Validation

- [x] 3.1 Create validators module (`src/lib/validators.ts`)
  - [x] 3.1.1 Implement `validateKey` for non-empty key validation
  - [x] 3.1.2 Implement `validateLocalPath` to check path existence
  - [x] 3.1.3 Implement `validateRemoteUrl` for URL format and existence validation (async, uses HEAD request)
  - [x] 3.1.4 Implement `performCustomValidation` async to delegate based on key
  - [x] 3.1.5 Update `config set` command action to be async for URL validation

## 4. CLI Commands

- [x] 4.1 Create config command module (`src/commands/config.ts`)
- [x] 4.2 Implement `config set` command
  - [x] 4.2.1 Add Commander.js command definition with arguments
  - [x] 4.2.2 Validate key and perform custom validation
  - [x] 4.2.3 Store value and display success message
- [x] 4.3 Implement `config list` command
  - [x] 4.3.1 Get all configuration and flatten to dot notation
  - [x] 4.3.2 Handle empty configuration case
- [x] 4.4 Implement `config delete` command
  - [x] 4.4.1 Check if key exists and warn if not
  - [x] 4.4.2 Delete key and display success message
- [x] 4.5 Implement `config reset` command
  - [x] 4.5.1 Implement confirmation prompt using readline/promises
  - [x] 4.5.2 Clear configuration and display confirmation
- [x] 4.6 Register config subcommand in main CLI
  - [x] 4.6.1 Update `src/index.ts` to register config command

## 5. Testing & Validation

- [x] 5.1 Manual testing of core functionality
  - [x] 5.1.1 Test `config set` with various key-value pairs
  - [x] 5.1.2 Test `config list` with empty and populated configuration
  - [x] 5.1.3 Test `config delete` with existing and non-existent keys
  - [x] 5.1.4 Test `config reset` with confirmation prompt
- [x] 5.2 Template source configuration testing
  - [x] 5.2.1 Test setting local template path (valid and invalid paths)
  - [x] 5.2.2 Test setting remote template source (valid and invalid URLs)
- [x] 5.3 Build and code quality
  - [x] 5.3.1 Run `bun run lint` and fix any issues
  - [x] 5.3.2 Verify MIT license headers on all new files

## 6. Documentation

- [x] 6.1 Update README with config command examples
  - [x] 6.1.1 Add usage examples for all four config subcommands
  - [x] 6.1.2 Document template source configuration
- [x] 6.2 Document configuration file structure
  - [x] 6.2.1 Create CONFIGURATION.md with storage locations per platform
  - [x] 6.2.2 Document JSON schema for template sources
