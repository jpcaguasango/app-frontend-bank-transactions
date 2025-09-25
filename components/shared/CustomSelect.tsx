'use client'

import { createListCollection, Select } from '@chakra-ui/react'
import { FC } from 'react'

type SelectorProps = {
  label?: string
  placeholder?: string
  value?: string | string[]
  options: { value: string | number; label: string }[]
  multiple?: boolean
  maxHeight?: string
  onChange: (_value: string | string[]) => void
}

const CustomSelect: FC<SelectorProps> = ({
  label,
  placeholder,
  value,
  options,
  multiple = false,
  maxHeight = '200px',
  onChange,
}: SelectorProps) => {
  // Hooks
  const _options = createListCollection({
    items: options,
  })

  return (
    <Select.Root
      collection={_options}
      size="xs"
      // @ts-ignore
      value={value && Array.isArray(value) ? value : [value]}
      multiple={multiple}
      onValueChange={({ value }) => {
        const newValue = multiple ? value : value[0]
        onChange(newValue)
      }}
    >
      <Select.HiddenSelect />
      {label && (
        <Select.Label fontSize={10} fontWeight="semibold">
          {label}
        </Select.Label>
      )}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText
            placeholder={placeholder ? placeholder : ''}
            fontSize={value ? '' : 12}
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content maxHeight={maxHeight}>
          {_options.items.map((option) => (
            <Select.Item item={option} key={option.value}>
              {option.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

export default CustomSelect
