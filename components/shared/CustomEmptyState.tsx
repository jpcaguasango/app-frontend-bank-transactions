'use client'

import { Box, EmptyState, Text } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { PiDatabaseDuotone } from 'react-icons/pi'

type CustomEmptyStateProps = {
  title?: string
  description?: string
  icon?: ReactNode
}

const CustomEmptyState: FC<CustomEmptyStateProps> = ({
  title = 'No results',
  description = 'Data not found',
  icon,
}: CustomEmptyStateProps) => {
  return (
    // @ts-ignore
    <EmptyState.Root size="md">
      <EmptyState.Content>
        <EmptyState.Indicator>
          {icon ? icon : <PiDatabaseDuotone size={64} />}
        </EmptyState.Indicator>
        <Box textAlign="center" maxW={500}>
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            {title}
          </Text>
          <Text fontSize="xs">{description}</Text>
        </Box>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default CustomEmptyState
