'use client'

import { InfoTip } from '@/components/chakra-snippets/toggle-tip'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import {
  Badge,
  Box,
  FormatNumber,
  HStack,
  Show,
  Stat as ChakraStat,
} from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import CustomSpinner from './CustomSpinner'

export type StatProps = ChakraStat.RootProps & {
  label?: ReactNode
  value?: number
  info?: ReactNode
  valueText?: ReactNode
  formatOptions?: Intl.NumberFormatOptions
  change?: number
  helperText?: string
  icon?: ReactNode
  loading?: boolean
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  function Stat(props, ref) {
    const {
      label,
      value,
      valueText,
      change,
      info,
      formatOptions,
      helperText,
      icon,
      loading,
      ...rest
    } = props
    return (
      <ChakraStat.Root {...rest}>
        <HStack justify="space-between">
          {label && (
            <ChakraStat.Label fontSize={12}>
              {label}
              {info && <InfoTip>{info}</InfoTip>}
            </ChakraStat.Label>
          )}

          {icon}
        </HStack>

        {!loading ? (
          <Box display="flex" gap={2}>
            <ChakraStat.ValueText {...rest} ref={ref} fontSize={16}>
              {valueText ||
                (value != null && formatOptions && (
                  <AnimatedNumber
                    value={value}
                    formatter={(v) => (
                      <FormatNumber
                        value={v}
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                        {...formatOptions}
                      />
                    )}
                  />
                ))}
            </ChakraStat.ValueText>

            {change != null && (
              <Badge
                display="flex"
                alignItems="center"
                colorPalette={change > 0 ? 'green' : 'red'}
                variant="plain"
                size="xs"
                gap="0"
              >
                <Show when={change > 0} fallback={<ChakraStat.DownIndicator />}>
                  <ChakraStat.UpIndicator />
                </Show>
                <AnimatedNumber
                  value={change}
                  formatter={(v) => (
                    <FormatNumber
                      value={Math.abs(v)}
                      style="percent"
                      minimumFractionDigits={1}
                      maximumFractionDigits={1}
                    />
                  )}
                />
              </Badge>
            )}
          </Box>
        ) : (
          <CustomSpinner size="xs" align="left" />
        )}

        {helperText && (
          <ChakraStat.HelpText fontSize={10}>{helperText}</ChakraStat.HelpText>
        )}
      </ChakraStat.Root>
    )
  }
)
