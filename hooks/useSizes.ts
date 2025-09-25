import { useBreakpointValue } from '@chakra-ui/react'

type VariantSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const useSizes = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false })
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const isLargeDesktop = useBreakpointValue({
    base: false,
    lg: false,
    xl: true,
  })

  const isRunningAsPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches
  }

  const buttonSize: VariantSize = 'md'
  const inputSize: VariantSize = 'md'

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isRunningAsPWA: isRunningAsPWA(),
    buttonSize,
    inputSize,
  }
}

export default useSizes
