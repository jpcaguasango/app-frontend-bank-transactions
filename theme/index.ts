import {
  createSystem,
  defaultConfig,
  defineConfig,
  SystemConfig,
} from '@chakra-ui/react'

const config: SystemConfig = defineConfig({
  strictTokens: false,
  theme: {
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    tokens: {
      fonts: {
        body: { value: "'Poppins', sans-serif" },
        heading: { value: "'Poppins', sans-serif" },
        mono: { value: "'Poppins', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        orange: {
          contrast: { value: 'white' },
        },
      },
    },
    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },
})

export default createSystem(defaultConfig, config)
