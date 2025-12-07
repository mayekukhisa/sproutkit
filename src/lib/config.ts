/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import Conf from "conf"

import { appInfo } from "@/lib/constants"

/** JSON schema for validating configuration values. */
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

export const config = new Conf({
  projectName: appInfo.NAME,
  projectSuffix: "",
  schema,
})

/**
 * Flattens a nested configuration object to dot notation for display.
 *
 * Converts nested objects like { templates: { sources: { local: "/path" } } }
 * to flat keys like "templates.sources.local".
 *
 * @param obj - The configuration object to flatten
 * @returns Flattened object with dot-notation keys
 */
export function flattenConfig(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  const flatten = (current: Record<string, unknown>, prefix = ""): void => {
    for (const [key, value] of Object.entries(current)) {
      const newKey = prefix ? `${prefix}.${key}` : key

      if (value && typeof value === "object" && !Array.isArray(value)) {
        flatten(value as Record<string, unknown>, newKey)
      } else {
        result[newKey] = value
      }
    }
  }

  flatten(obj)
  return result
}
