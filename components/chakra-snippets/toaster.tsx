'use client'

import useColor from '@/hooks/useColor'
import {
  Box,
  Toaster as ChakraToaster,
  createToaster,
  Portal,
  Spinner,
  Text,
  Toast,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  duration: 5000,
  max: 3,
})

export const Toaster = () => {
  const { primaryColor } = useColor()

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'md' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color={primaryColor} />
            ) : (
              <Toast.Indicator />
            )}
            <Box gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title>
                  <Text textStyle="xs">{toast.title}</Text>
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description>
                  <Text textStyle="xs">{toast.description}</Text>
                </Toast.Description>
              )}
            </Box>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
