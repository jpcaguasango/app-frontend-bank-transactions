'use client'

import { useModalContext } from '@/context/ModalContext'
import useColor from '@/hooks/useColor'
import useSizes from '@/hooks/useSizes'
import { Box, CloseButton, Dialog, Portal } from '@chakra-ui/react'

const GlobalModal = () => {
  // Hooks
  const { isMobile, isRunningAsPWA } = useSizes()
  const { bg } = useColor()
  const { isOpen, closeModal, modalConfig } = useModalContext()

  return (
    <Box bg={bg} zIndex={9999}>
      <Dialog.Root
        open={isOpen}
        scrollBehavior="inside"
        size={isMobile ? 'full' : modalConfig?.size}
        placement="center"
        onOpenChange={(open) => !open && closeModal()}
      >
        <Portal>
          <Dialog.Backdrop
            bg="rgba(0, 0, 0, 0.6)"
            style={{ backdropFilter: 'blur(4px)' }}
          />
          <Dialog.Positioner>
            <Dialog.Content
              bg={bg}
              maxW={(isMobile && 'full') || modalConfig?.size || 'md'}
              py={isMobile && !isRunningAsPWA ? 6 : 0}
            >
              <Dialog.Header>
                <Dialog.Title>{modalConfig?.title}</Dialog.Title>

                <Dialog.CloseTrigger
                  mt={isMobile && !isRunningAsPWA ? 10 : 3}
                  asChild
                >
                  <CloseButton size="sm" onClick={closeModal} />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>{modalConfig?.content}</Dialog.Body>
              {modalConfig?.footer && (
                <Dialog.Footer>{modalConfig.footer}</Dialog.Footer>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}

export default GlobalModal
