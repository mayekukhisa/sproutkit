# Sproutkit

**Sproutkit** aims to become a project scaffolding tool that will allow developers to skip boilerplate setup and immediately start building.

> [!NOTE]
>
> This tool is in its early stages of development.

## Getting Started

Follow these steps to obtain a copy of the project and run it on your local machine.

### System Requirements

To run this project, ensure the following software is installed on your system:

- [Bun](https://bun.com/) v1.3.3 or later

### Installation

1. Clone the repository to your local machine.

   ```shell
   git clone https://github.com/mayekukhisa/sproutkit.git && cd sproutkit
   ```

2. Install dependencies:

   ```shell
   bun install
   ```

3. Run in development mode:

   ```shell
   bun dev
   ```

## Configuration

Sproutkit uses a configuration file to manage template sources. See [CONFIGURATION.md](CONFIGURATION.md) for detailed information about the configuration file structure and storage locations.

### Config Commands

#### Set Configuration Values

Set a configuration value using dot notation for nested keys:

```shell
bun dev config set templates.sources.local "/path/to/templates"
bun dev config set templates.sources.remote "https://example.com/templates"
```

#### List Configuration

Display all current configuration settings:

```shell
bun dev config list
```

#### Delete Configuration Values

Remove a specific configuration key:

```shell
bun dev config delete templates.sources.local
```

#### Reset Configuration

Reset all configuration to defaults (with confirmation prompt):

```shell
bun dev config reset
```

### Template Sources

Sproutkit supports two types of template sources:

- **Local:** Paths to template directories

  ```shell
  bun dev config set templates.sources.local "/path/to/templates"
  ```

- **Remote:** URLs to template repositories
  ```shell
  bun dev config set templates.sources.remote "https://github.com/mayekukhisa/sproutkit-templates"
  bun dev config set templates.sources.remote "https://example.com/templates"
  ```

## License

This tool is available under the terms of the [MIT license](LICENSE).

&copy; 2025 Mayeku Khisa.
