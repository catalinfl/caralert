import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from "daisyui/src/theming/themes"

const light = themes.light
const dark = themes.dark

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      light: {
        ...light,
        'neutral': '#800080', 
        'primary': '#BF40BF'
        // make this primary colour more lighter
      }
    }]
  }
}
export default config
