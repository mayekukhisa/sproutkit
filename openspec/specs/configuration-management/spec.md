# configuration-management Specification

## Purpose

TBD - created by archiving change add-config-command. Update Purpose after archive.

## Requirements

### Requirement: Configuration File Location

The system SHALL use the `conf` npm package to store user configuration following platform conventions.

#### Scenario: Platform-appropriate storage location

- **WHEN** configuration is accessed
- **THEN** the configuration file SHALL be stored at the platform-appropriate location:
  - macOS: `~/Library/Preferences/sproutkit/config.json`
  - Linux: `~/.config/sproutkit/config.json`
  - Windows: `%APPDATA%/sproutkit/Config/config.json`

#### Scenario: Automatic directory creation

- **WHEN** configuration is accessed for the first time
- **THEN** the configuration directory SHALL be created automatically by the `conf` package

#### Scenario: Configuration file initialization

- **WHEN** the configuration file does not exist
- **THEN** an empty configuration object SHALL be created with default values if specified

### Requirement: Set Configuration Values

The system SHALL provide a `config set <key> <value>` command to store configuration settings.

#### Scenario: Setting a template source

- **WHEN** user executes `sproutkit config set templates.sources.local "/path/to/templates"`
- **THEN** the key-value pair SHALL be stored in the configuration file
- **AND** a success message SHALL be displayed

#### Scenario: Updating existing value

- **WHEN** user sets a key that already exists
- **THEN** the existing value SHALL be replaced with the new value
- **AND** no warning SHALL be displayed

#### Scenario: Setting nested keys

- **WHEN** user provides a dotted key path (e.g., `templates.sources.remote`)
- **THEN** the `conf` package SHALL automatically create nested objects as needed in the JSON structure

#### Scenario: Invalid key format

- **WHEN** user provides an empty key
- **THEN** an error message SHALL be displayed
- **AND** the configuration SHALL remain unchanged

### Requirement: List Configuration Values

The system SHALL provide a `config list` command to display all configuration settings.

#### Scenario: Listing all settings

- **WHEN** user executes `sproutkit config list`
- **THEN** all configuration key-value pairs SHALL be displayed in a readable format

#### Scenario: Empty configuration

- **WHEN** no configuration values are set
- **THEN** a message indicating empty configuration SHALL be displayed

#### Scenario: Nested configuration display

- **WHEN** configuration contains nested objects
- **THEN** keys SHALL be displayed using dot notation (e.g., `templates.sources.local`)

### Requirement: Delete Configuration Values

The system SHALL provide a `config delete <key>` command to remove configuration settings.

#### Scenario: Deleting existing key

- **WHEN** user executes `sproutkit config delete templates.sources.local`
- **THEN** the key SHALL be removed from the configuration file
- **AND** a success message SHALL be displayed

#### Scenario: Deleting non-existent key

- **WHEN** user attempts to delete a key that does not exist
- **THEN** a warning message SHALL be displayed
- **AND** the configuration SHALL remain unchanged

#### Scenario: Deleting nested keys

- **WHEN** user deletes a nested key
- **THEN** only that specific key SHALL be removed
- **AND** parent objects SHALL remain if they contain other keys

### Requirement: Reset Configuration

The system SHALL provide a `config reset` command to restore configuration to default values.

#### Scenario: Resetting all configuration

- **WHEN** user executes `sproutkit config reset`
- **THEN** all configuration values SHALL be cleared using the `conf` package's `clear()` method
- **AND** the configuration SHALL be restored to defaults if specified
- **AND** a confirmation message SHALL be displayed

#### Scenario: Reset with confirmation

- **WHEN** user executes `sproutkit config reset`
- **THEN** the system SHALL prompt for confirmation before proceeding
- **AND** reset SHALL only occur if user confirms

### Requirement: Template Source Configuration

The system SHALL support configuration of template sources for both local and remote locations.

#### Scenario: Configuring local template source

- **WHEN** user sets `templates.sources.local` to a file system path
- **THEN** the path SHALL be validated to exist
- **AND** the path SHALL be stored as a template source

#### Scenario: Configuring remote template source

- **WHEN** user sets `templates.sources.remote` to a URL
- **THEN** the format SHALL be validated as a valid URL
- **AND** the URL SHALL be validated to exist via HTTP HEAD request
- **AND** the URL SHALL be stored as a template source

#### Scenario: Multiple template sources

- **WHEN** multiple template sources are configured
- **THEN** all sources SHALL be stored in the configuration
- **AND** each source SHALL be independently accessible

### Requirement: Configuration Validation

The system SHALL use JSON schema validation via the `conf` package to validate configuration values.

#### Scenario: Schema-based validation

- **WHEN** user sets a configuration value
- **THEN** the value SHALL be validated against the defined JSON schema
- **AND** validation errors SHALL prevent the value from being stored
- **AND** a descriptive error message SHALL be displayed

#### Scenario: Atomic file writes

- **WHEN** any configuration operation modifies the file
- **THEN** the `conf` package SHALL write the file atomically to prevent corruption
- **AND** the resulting configuration MUST be valid JSON

#### Scenario: File permission errors

- **WHEN** the configuration file cannot be written due to permissions
- **THEN** a clear error message SHALL be displayed
- **AND** the user SHALL be notified of the permission issue

### Requirement: Configuration Error Handling

The system SHALL handle configuration errors gracefully using the `conf` package's error handling capabilities.

#### Scenario: Corrupted configuration file

- **WHEN** the configuration file exists but contains invalid JSON
- **THEN** the `conf` package SHALL detect the corruption
- **AND** an error message SHALL be displayed
- **AND** the user SHALL be offered options to reset the configuration

#### Scenario: Schema validation errors

- **WHEN** a set operation fails due to schema validation
- **THEN** the specific validation error SHALL be caught and displayed
- **AND** the current configuration SHALL remain unchanged

#### Scenario: File system errors

- **WHEN** file system operations fail (disk full, I/O error)
- **THEN** specific error details SHALL be provided
- **AND** the operation SHALL fail safely without data loss
