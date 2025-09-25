import { useColorMode } from '@/components/chakra-snippets/color-mode'
import { useToken } from '@chakra-ui/react'

const useColor = () => {
  const [primaryColor] = useToken('colors', ['purple.solid'])

  const { colorMode } = useColorMode()

  return {
    bg: { base: 'white', _dark: 'black' },
    content: { base: 'bg.subtle', _dark: 'gray.900' },
    borderColor: { base: 'gray.200', _dark: 'gray.700' },
    colorPalette: 'purple',
    isDarkMode: colorMode === 'dark',
    primaryColor,
  }
}

export default useColor
