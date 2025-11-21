# Implementation Tasks

## 1. Setup and Dependencies

- [x] 1.1 Install `conf` npm package
  - [x] 1.1.1 Run `pnpm add conf` to add as runtime dependency
  - [x] 1.1.2 Verify package installation and version compatibility

## 2. Core Configuration Management

- [x] 2.1 Create configuration wrapper module
  - [x] 2.1.1 Import and initialize `Conf` with project name using Rollup's `__projectName__` replacement token
  - [x] 2.1.2 Define JSON schema for configuration validation
  - [x] 2.1.3 Set up default configuration values (if any)
  - [x] 2.1.4 Configure `conf` options (projectName, defaults, schema, clearInvalidConfig)
  - [x] 2.1.5 Export configured `Conf` instance for use in commands
- [x] 2.2 Create utility functions for configuration display
  - [x] 2.2.1 Implement function to flatten nested config to dot notation for `list` command
  - [x] 2.2.2 Implement function to format configuration output in readable format

## 3. Configuration Schema and Validation

- [x] 3.1 Define JSON schema for template sources
  - [x] 3.1.1 Define schema for `templates.sources.local` (string, path validation)
  - [x] 3.1.2 Define schema for `templates.sources.remote` (string, URL validation)
  - [x] 3.1.3 Set up schema properties and types
- [x] 3.2 Implement custom validation logic
  - [x] 3.2.1 Validate local template paths exist (pre-validation before set)
  - [x] 3.2.2 Validate remote source is a valid URL
  - [x] 3.2.3 Validate key is non-empty before operations
- [x] 3.3 Implement error handling
  - [x] 3.3.1 Catch and handle schema validation errors from `conf`
  - [x] 3.3.2 Handle file permission errors gracefully
  - [x] 3.3.3 Handle corrupted config file errors (leverage `conf`'s built-in handling)

## 4. CLI Commands

- [x] 4.1 Implement `config set` command
  - [x] 4.1.1 Add Commander.js command definition with arguments
  - [x] 4.1.2 Parse key and value arguments
  - [x] 4.1.3 Validate key is non-empty
  - [x] 4.1.4 Perform custom validation (template paths, GitHub format)
  - [x] 4.1.5 Call `config.set(key, value)` using the `conf` instance
  - [x] 4.1.6 Catch and display schema validation errors
  - [x] 4.1.7 Display success message
- [x] 4.2 Implement `config list` command
  - [x] 4.2.1 Add Commander.js command definition
  - [x] 4.2.2 Get all configuration using `config.store` property from `conf`
  - [x] 4.2.3 Flatten nested configuration to dot notation
  - [x] 4.2.4 Format and display configuration in readable format
  - [x] 4.2.5 Handle empty configuration case with appropriate message
- [x] 4.3 Implement `config delete` command
  - [x] 4.3.1 Add Commander.js command definition with key argument
  - [x] 4.3.2 Parse key argument
  - [x] 4.3.3 Check if key exists using `config.has(key)` from `conf`
  - [x] 4.3.4 Call `config.delete(key)` to remove the key
  - [x] 4.3.5 Display success message if deleted, warning if key didn't exist
- [x] 4.4 Implement `config reset` command
  - [x] 4.4.1 Add Commander.js command definition
  - [x] 4.4.2 Implement confirmation prompt (use Node.js readline or similar)
  - [x] 4.4.3 Call `config.clear()` from `conf` to reset all configuration
  - [x] 4.4.4 Display confirmation message
- [x] 4.5 Register config subcommand in main CLI
  - [x] 4.5.1 Update `src/index.ts` to register config command
  - [x] 4.5.2 Add help text and descriptions for all subcommands

## 5. Testing & Validation

- [x] 5.1 Manual testing of core functionality
  - [x] 5.1.1 Test `config set` with various key-value pairs
  - [x] 5.1.2 Test `config set` with nested keys using dot notation
  - [x] 5.1.3 Test `config list` with empty configuration
  - [x] 5.1.4 Test `config list` with populated configuration (verify dot notation display)
  - [x] 5.1.5 Test `config delete` with existing keys
  - [x] 5.1.6 Test `config delete` with non-existent keys (verify warning)
  - [x] 5.1.7 Test `config reset` with confirmation prompt
  - [x] 5.1.8 Test `config reset` cancellation
- [x] 5.2 Template source configuration testing
  - [x] 5.2.1 Test setting local template path (valid path)
  - [x] 5.2.2 Test setting local template path (invalid/non-existent path)
  - [x] 5.2.3 Test setting remote template source (valid URL)
  - [x] 5.2.4 Test setting remote template source (invalid URL format)
- [x] 5.3 Error scenario testing
  - [x] 5.3.1 Test schema validation errors (catch and display properly)
  - [x] 5.3.2 Test with empty key (verify error handling)
  - [x] 5.3.3 Manually corrupt config file and verify `conf` error handling
  - [x] 5.3.4 Verify atomic writes (check file integrity during writes)
- [x] 5.4 Platform-specific testing
  - [x] 5.4.1 Verify configuration file location on current platform
  - [x] 5.4.2 Verify directory creation on first use
  - [x] 5.4.3 Test across different platforms if possible
- [x] 5.5 Build and code quality
  - [x] 5.5.1 Run `pnpm build` and ensure no TypeScript errors
  - [x] 5.5.2 Test built CLI with `pnpm start config --help`
  - [x] 5.5.3 Verify MIT license headers on all new files
  - [x] 5.5.4 Run `pnpm lint` and fix any issues
  - [x] 5.5.5 Run `pnpm format` to ensure consistent formatting

## 6. Documentation

- [x] 6.1 Update README with config command examples
  - [x] 6.1.1 Add usage examples for all four config subcommands
  - [x] 6.1.2 Document template source configuration
- [x] 6.2 Document configuration file structure
  - [x] 6.2.1 Document storage locations per platform
  - [x] 6.2.2 Document JSON schema for template sources
- [x] 6.3 Add inline code documentation
  - [x] 6.3.1 Document configuration wrapper module
  - [x] 6.3.2 Document schema definitions and validation logic
