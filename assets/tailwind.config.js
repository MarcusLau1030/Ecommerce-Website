// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

import plugin from "tailwindcss/plugin"
import { readdirSync, readFileSync } from "fs"
import { join, basename } from "path"

export const content = [
  "./js/**/*.js",
  "../lib/*_web.ex",
  "../lib/*_web/**/*.*ex",
  './src/**/*.html',
  "./node_modules/flowbite/**/*.js"
]
export const theme = {
  extend: {
    colors: {
      brand: "#FD4F00",
      'limegreen': "#02A751"
    }
  },
  backgroundSize: {
    '25%': '25%',
    '50%': '50%',
    '75%': '75%',
    '100%': '100%',
  },
  width: {
    '10': '10%',
    '50': '50%',
    '200': '200%',
    '125': '125%',
    '150': '150%',
    '175': '175%'
  }
}
export const plugins = [
  require("@tailwindcss/forms"),
  require('flowbite/plugin'),
  // Allows prefixing tailwind classes with LiveView classes to add rules
  // only when LiveView classes are applied, for example:
  //
  //     <div class="phx-click-loading:animate-ping">
  //
  plugin(({ addVariant }) => addVariant("phx-no-feedback", [".phx-no-feedback&", ".phx-no-feedback &"])),
  plugin(({ addVariant }) => addVariant("phx-click-loading", [".phx-click-loading&", ".phx-click-loading &"])),
  plugin(({ addVariant }) => addVariant("phx-submit-loading", [".phx-submit-loading&", ".phx-submit-loading &"])),
  plugin(({ addVariant }) => addVariant("phx-change-loading", [".phx-change-loading&", ".phx-change-loading &"])),

  // Embeds Heroicons (https://heroicons.com) into your app.css bundle
  // See your `CoreComponents.icon/1` for more information.
  //
  plugin(function ({ matchComponents, theme }) {
    let iconsDir = join(__dirname, "./vendor/heroicons/optimized")
    let values = {}
    let icons = [
      ["", "/24/outline"],
      ["-solid", "/24/solid"],
      ["-mini", "/20/solid"]
    ]
    icons.forEach(([suffix, dir]) => {
      readdirSync(join(iconsDir, dir)).map(file => {
        let name = basename(file, ".svg") + suffix
        values[name] = { name, fullPath: join(iconsDir, dir, file) }
      })
    })
    matchComponents({
      "hero": ({ name, fullPath }) => {
        let content = readFileSync(fullPath).toString().replace(/\r?\n|\r/g, "")
        return {
          [`--hero-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
          "-webkit-mask": `var(--hero-${name})`,
          "mask": `var(--hero-${name})`,
          "mask-repeat": "no-repeat",
          "background-color": "currentColor",
          "vertical-align": "middle",
          "display": "inline-block",
          "width": theme("spacing.5"),
          "height": theme("spacing.5")
        }
      }
    }, { values })
  })
]
