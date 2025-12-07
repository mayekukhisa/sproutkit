/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import { Command } from "commander"
import { createInterface } from "readline/promises"

import { config, flattenConfig } from "@/lib/config"
import { performCustomValidation, validateKey } from "@/lib/validators"

/**
 * Creates the config command and its subcommands.
 *
 * @returns Commander.js Command instance for the config command
 */
export function createConfigCommand(): Command {
  const configCommand = new Command("config")
    .description("Manage tool configuration settings")
    .helpOption(undefined, "Display help for command")
    .helpCommand("help [command]", "Display help for command")

  configCommand
    .command("set")
    .description("Set a configuration value")
    .argument("<key>", "Configuration key (supports dot notation)")
    .argument("<value>", "Configuration value")
    .action(async (key: string, value: string) => {
      try {
        validateKey(key)
        await performCustomValidation(key, value)
        config.set(key, value)
        console.log(`Configuration updated: ${key} = ${value}`)
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`)
          process.exit(1)
        }
        throw error
      }
    })

  configCommand
    .command("list")
    .description("Display all configuration settings")
    .action(() => {
      try {
        const store = config.store
        const isEmpty = Object.keys(store).length === 0

        if (isEmpty) {
          console.log("No configuration set")
          return
        }

        const flattened = flattenConfig(store)
        console.log("Current configuration:")
        for (const [key, value] of Object.entries(flattened)) {
          console.log(`  ${key} = ${value}`)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`)
          process.exit(1)
        }
        throw error
      }
    })

  configCommand
    .command("delete")
    .description("Remove a configuration value")
    .argument("<key>", "Configuration key to remove")
    .action((key: string) => {
      try {
        validateKey(key)

        if (!config.has(key as keyof typeof config.store)) {
          console.warn(`Warning: Configuration key '${key}' does not exist`)
          return
        }

        config.delete(key as keyof typeof config.store)
        console.log(`Configuration deleted: ${key}`)
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`)
          process.exit(1)
        }
        throw error
      }
    })

  configCommand
    .command("reset")
    .description("Reset all configuration to defaults")
    .action(async () => {
      try {
        const rl = createInterface({
          input: process.stdin,
          output: process.stdout,
        })

        const answer = await rl.question("Are you sure you want to reset all configuration? (yes/no): ")
        rl.close()

        if (answer.toLowerCase() !== "yes") {
          console.log("Reset cancelled")
          return
        }

        config.clear()
        console.log("Configuration reset to defaults")
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`)
          process.exit(1)
        }
        throw error
      }
    })

  return configCommand
}
