'use client'

import theme from '@/theme/index'
import { ChakraProvider, LocaleProvider } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <LocaleProvider locale="es-CO">
        <ColorModeProvider {...props} />
      </LocaleProvider>
    </ChakraProvider>
  )
}
