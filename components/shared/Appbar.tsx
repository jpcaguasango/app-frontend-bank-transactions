'use client'

import { Box, Heading, HStack, SegmentGroup } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/chakra-snippets/color-mode'
import useColor from '@/hooks/useColor'
import { PiBankDuotone } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

const Appbar = () => {
  // Hooks
  const { t, i18n } = useTranslation('common')
  const { bg } = useColor()

  return (
    <Box bg={bg} w="full" py={4} px={8} shadow="md">
      <HStack>
        <Box w="full">
          <HStack gap={5}>
            <PiBankDuotone size={36} />
            <Heading>{t('bankTransactions')}</Heading>
          </HStack>
        </Box>

        <SegmentGroup.Root
          defaultValue="en"
          size="xs"
          onValueChange={(e) => i18n.changeLanguage(e.value as string)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={['en', 'es']} />
        </SegmentGroup.Root>

        <ColorModeButton />
      </HStack>
    </Box>
  )
}

export default Appbar
