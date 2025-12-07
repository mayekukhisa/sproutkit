/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import { existsSync } from "fs"

/**
 * Validates that a configuration key is non-empty.
 *
 * @param key - The configuration key to validate
 * @throws Error if the key is empty or contains only whitespace
 */
export function validateKey(key: string): void {
  if (!key || key.trim() === "") {
    throw new Error("Configuration key cannot be empty")
  }
}

function validateLocalPath(path: string): void {
  if (!existsSync(path)) {
    throw new Error(`Local path does not exist: ${path}`)
  }
}

async function validateRemoteUrl(url: string): Promise<void> {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Invalid URL protocol. Only http and https are supported")
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Invalid URL format")
    }
    throw error
  }

  try {
    const response = await fetch(url, { method: "HEAD" })
    if (!response.ok) {
      throw new Error(`Remote URL is not reachable: ${url} (status: ${response.status})`)
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Remote URL is not reachable")) {
      throw error
    }
    throw new Error(`Remote URL is not reachable: ${url}`)
  }
}

/**
 * Performs custom validation based on the configuration key.
 *
 * Delegates to specific validators for known configuration keys:
 * - templates.sources.local: Validates the path exists
 * - templates.sources.remote: Validates URL format and existence
 *
 * @param key - The configuration key
 * @param value - The configuration value to validate
 * @throws Error if validation fails for the specific key type
 */
export async function performCustomValidation(key: string, value: string): Promise<void> {
  if (key === "templates.sources.local") {
    validateLocalPath(value)
  } else if (key === "templates.sources.remote") {
    await validateRemoteUrl(value)
  }
}
