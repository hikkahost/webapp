import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import animations from '@midudev/tailwind-animations'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
      boxShadow: {
        card: '0px 0px 15px 0px rgba(34, 60, 80, 0.2)',
      },
      colors: {
        primary: colors.sky,
        secondary: colors.slate,
        success: colors.lime,
        info: colors.blue,
        warning: colors.yellow,
        danger: colors.red,
      },
    },
  },
  plugins: [animations],
}
