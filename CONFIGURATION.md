# Configuration Guide

This document describes the configuration file structure and available settings for Sproutkit.

## Storage Location

Configuration is stored in platform-specific user directories using the `conf` npm package:

| Platform | Location                                      |
| -------- | :-------------------------------------------- |
| macOS    | `~/Library/Preferences/sproutkit/config.json` |
| Linux    | `~/.config/sproutkit/config.json`             |
| Windows  | `%APPDATA%/sproutkit/Config/config.json`      |

The configuration directory is created automatically on first use.

## File Format

The configuration file uses JSON format with support for nested objects. All configuration values are validated using a JSON schema to ensure correctness.

### Structure

```json
{
  "templates": {
    "sources": {
      "local": "/path/to/templates",
      "remote": "https://example.com/templates"
    }
  }
}
```

## Configuration Schema

### Template Sources

The `templates.sources` object defines where Sproutkit should look for project templates.

#### `templates.sources.local` (string, optional)

Local path to a templates directory.

**Validation:**

- Must be an existing path
- Validated at set time to ensure the path exists

**Example:**

```json
{
  "templates": {
    "sources": {
      "local": "/Users/username/my-templates"
    }
  }
}
```

#### `templates.sources.remote` (string, optional)

Remote URL to templates.

**Accepted Formats:**

- Any valid URL with http or https protocol
- Examples: `https://github.com/owner/repo`, `https://example.com/templates`

**Validation:**

- Must be a valid URL
- Must use http or https protocol
- Validated at set time

**Example:**

```json
{
  "templates": {
    "sources": {
      "remote": "https://github.com/mayekukhisa/sproutkit-templates"
    }
  }
}
```

## Features

### Atomic Writes

All configuration updates are written atomically to prevent file corruption in case of crashes or power failures.

### Schema Validation

Configuration values are validated against a JSON schema before being stored. Invalid values are rejected with descriptive error messages.

### Dot Notation

Configuration keys can be accessed using dot notation for nested objects:

```shell
bun dev config set templates.sources.local "/path/to/templates"
bun dev config list
```

### Error Handling

The configuration system gracefully handles common errors:

- **Corrupted files:** Detected automatically with recovery options
- **Permission errors:** Clear error messages with guidance
- **Invalid values:** Schema validation prevents invalid data from being stored
- **Missing keys:** Non-existent keys trigger appropriate warnings

## Manual Editing

While it's recommended to use the `config` commands, you can manually edit the configuration file if needed:

1. Locate the configuration file at the platform-specific path
2. Edit the JSON carefully, ensuring valid syntax
3. Ensure values match the schema requirements
4. Save the file

**Note:** Manual edits that violate the schema will be rejected when Sproutkit accesses the configuration.

## Troubleshooting

### Configuration File Corrupted

If the configuration file becomes corrupted:

```shell
bun dev config reset
```

This will clear all configuration and restore defaults.

### Permission Denied

If you encounter permission errors:

1. Check file permissions on the configuration directory
2. Ensure your user has write access to the directory
3. On Unix-like systems, verify ownership with `ls -la`

### Invalid Values

If a value fails validation:

- For local paths: Ensure the path exists
- For remote URLs: Ensure the URL is valid and uses http or https protocol
- Check error messages for specific guidance
