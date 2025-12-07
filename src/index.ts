/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import { program } from "commander"
import { EOL } from "os"

import { createConfigCommand } from "@/commands/config"
import { appInfo } from "@/lib/constants"

program
  .name(appInfo.NAME)
  .description(appInfo.DESCRIPTION)
  .version(appInfo.VERSION, "--version", "Show the version and exit")
  .helpOption(undefined, "Show this message and exit")
  .helpCommand("help [command]", "Display help for command")
  .addHelpText("after", EOL + `Homepage: ${appInfo.HOMEPAGE}`)

program.addCommand(createConfigCommand())

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
