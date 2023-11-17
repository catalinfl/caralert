import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from "daisyui/src/theming/themes"

const light = themes.light

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
        'neutral': '#4F46E5', 
      }
    }]
  }
}
export default config
