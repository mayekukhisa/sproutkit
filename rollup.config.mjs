/*
 * Copyright 2025 Mayeku Khisa
 *
 * Use of this source code is governed by a MIT license as appearing in the
 * LICENSE file included in the root of this source tree.
 */
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import { readFileSync } from "fs"
import { defineConfig } from "rollup"
import del from "rollup-plugin-delete"
import prettier from "rollup-plugin-prettier"

const isProduction = process.env.NODE_ENV === "production"
const outputDir = "dist"

const packageJson = JSON.parse(readFileSync("package.json", "utf8"))

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: `${outputDir}/index.js`,
      format: "esm",
      sourcemap: !isProduction,
    },
    external: ["commander", "conf", "fs", "os", "readline/promises"],
    plugins: [
      del({
        targets: `${outputDir}/*`,
      }),
      replace({
        preventAssignment: true,
        values: {
          __projectName__: packageJson.name,
          __projectDescription__: packageJson.description,
          __projectVersion__: packageJson.version,
        },
      }),
      typescript({ sourceMap: !isProduction }),
      prettier({
        parser: "typescript",
        printWidth: 120,
      }),
    ],
  },
])
