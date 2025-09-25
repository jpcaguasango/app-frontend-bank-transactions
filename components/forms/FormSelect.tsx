'use client'

import { Field } from '@/components/chakra-snippets/field'
import useColor from '@/hooks/useColor'
import useSizes from '@/hooks/useSizes'
import {
  createListCollection,
  HStack,
  Select,
  Text,
  useSelectContext,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface FormSelectProps {
  name: string
  label: string
  options: {
    value: string | number
    label: string
    icon?: ReactNode
    description?: string | ReactNode
  }[]
  placeholder?: string
  helperText?: string
  isRequired?: boolean
  disabled?: boolean
  multiple?: boolean
  maxHeight?: string
  value?: string | string[] | number | number[]
  onChange?: (_value: string | string[] | number | number[]) => void
  validationRules?: object
}

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const select = useSelectContext()
  const items = select.selectedItems as Array<{
    label: string
    icon: ReactNode
  }>
  const { label, icon } = items[0] ?? {}

  if (label) {
    return (
      <Select.ValueText placeholder={placeholder}>
        <HStack>
          {icon}
          {label}
        </HStack>
      </Select.ValueText>
    )
  }

  return <Select.ValueText placeholder={placeholder} fontSize={12} />
}

const FormSelect = ({
  name,
  label,
  options,
  placeholder,
  helperText,
  isRequired,
  disabled,
  multiple,
  maxHeight = '200px',
  validationRules = {},
}: FormSelectProps) => {
  const { colorPalette } = useColor()
  const { inputSize } = useSizes()
  const {
    formState: { errors },
    control,
  } = useFormContext()

  const _options = createListCollection({
    items: options,
  })

  return (
    <Field
      label={label}
      invalid={!!errors[name]}
      errorText={errors[name]?.message as string}
      helperText={helperText}
      disabled={disabled}
      required={isRequired}
    >
      <Controller
        control={control}
        name={name}
        rules={{ ...validationRules }}
        render={({ field }) => (
          <Select.Root
            name={field.name}
            value={Array.isArray(field.value) ? field.value : [field.value]}
            multiple={multiple}
            onValueChange={({ value }) => {
              const newValue = multiple ? value : value[0]
              field.onChange(newValue)
            }}
            onInteractOutside={() => field.onBlur()}
            collection={_options}
            colorPalette={colorPalette}
            size={inputSize}
          >
            <Select.Control>
              <Select.HiddenSelect />
              <Select.Trigger>
                <SelectValue placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
                <Select.ClearTrigger />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content maxHeight={maxHeight}>
                {_options.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    <VStack align="start" py={2}>
                      <HStack w="100%">
                        {item.icon && item.icon}
                        <Text fontWeight="bold">{item.label}</Text>
                      </HStack>

                      {item.description && item.description}
                    </VStack>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
    </Field>
  )
}

export default FormSelect
