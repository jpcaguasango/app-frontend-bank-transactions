'use client'

import { Stat, StatProps } from '@/components/shared/Stat'
import useColor from '@/hooks/useColor'
import { Card } from '@chakra-ui/react'

type CardStatProps = StatProps

const CardStat = ({
  label,
  value,
  change,
  info,
  formatOptions,
  helperText,
  icon,
  loading,
  ...rest
}: CardStatProps) => {
  const { bg } = useColor()

  return (
    <Card.Root bg={bg} variant="elevated" borderRadius="2xl" size="sm">
      <Card.Body>
        <Stat
          {...rest}
          label={label}
          value={value}
          change={change}
          info={info}
          formatOptions={formatOptions}
          helperText={helperText}
          icon={icon}
          loading={loading}
        />
      </Card.Body>
    </Card.Root>
  )
}

export default CardStat
