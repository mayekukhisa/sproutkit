/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import { program } from "commander"
import { EOL } from "os"

program
  .name("__projectName__")
  .description("__projectDescription__")
  .version("__projectVersion__", "--version", "Show the version and exit")
  .helpOption(undefined, "Show this message and exit")
  .addHelpText("after", EOL + "Homepage: https://github.com/mayekukhisa/sproutkit#readme")

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
