/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import Conf from "conf"

/**
 * JSON schema for configuration validation.
 *
 * Defines the structure and types for template sources configuration:
 * - templates.sources.local: Local path to templates
 * - templates.sources.remote: Remote URL to templates
 */
const schema = {
  templates: {
    type: "object",
    properties: {
      sources: {
        type: "object",
        properties: {
          local: {
            type: "string",
            description: "Local path to templates directory",
          },
          remote: {
            type: "string",
            description: "Remote URL to templates",
          },
        },
      },
    },
  },
} as const

/**
 * Global configuration instance using the conf package.
 *
 * Provides platform-appropriate configuration storage with:
 * - Automatic directory creation
 * - JSON schema validation
 * - Atomic file writes
 * - Dot notation support for nested keys
 */
export const config = new Conf({
  projectName: "__projectName__",
  schema,
})

/**
 * Flattens a nested configuration object to dot notation for display.
 *
 * Converts nested objects like { templates: { sources: { local: "/path" } } }
 * to flat keys like "templates.sources.local".
 *
 * @param obj - The configuration object to flatten
 * @param prefix - Internal prefix for recursion (do not provide externally)
 * @returns Flattened object with dot-notation keys
 */
export function flattenConfig(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenConfig(value as Record<string, unknown>, newKey))
    } else {
      result[newKey] = value
    }
  }

  return result
}
