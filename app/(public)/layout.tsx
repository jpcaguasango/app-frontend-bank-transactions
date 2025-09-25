'use client'

import { ReactChildren } from '@/types/global.type'
import Appbar from '@/components/shared/Appbar'
import { Box, Flex } from '@chakra-ui/react'
import useColor from '@/hooks/useColor'

export default function RootLayout({ children }: Readonly<ReactChildren>) {
  const { content } = useColor()

  return (
    <Flex direction="column" flex="1" h="100%" bg={content} overflow="hidden">
      <Appbar />

      <Box h="100dvh" flex="1" overflowY="auto" py={4}>
        {children}
      </Box>
    </Flex>
  )
}
