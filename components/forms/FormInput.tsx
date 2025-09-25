'use client'

import { Field } from '@/components/chakra-snippets/field'
import { InputGroup } from '@/components/chakra-snippets/input-group'
import useColor from '@/hooks/useColor'
import useSizes from '@/hooks/useSizes'
import { Input } from '@chakra-ui/react'
import get from 'lodash.get'
import { JSX } from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  helperText?: string
  isRequired?: boolean
  disabled?: boolean
  validationRules?: object
  startElement?: JSX.Element
}

const FormInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  isRequired,
  disabled,
  validationRules = {},
  startElement,
}: FormInputProps) => {
  const { colorPalette } = useColor()
  const { inputSize } = useSizes()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = get(errors, name)

  return (
    <Field
      label={label}
      invalid={!!error}
      errorText={error?.message as string}
      helperText={helperText}
      required={isRequired}
      disabled={disabled}
    >
      <InputGroup w="100%" startElement={startElement}>
        <Input
          {...register(name, validationRules)}
          placeholder={placeholder}
          _placeholder={{ fontSize: 12 }}
          colorPalette={colorPalette}
          type={type}
          size={inputSize}
        />
      </InputGroup>
    </Field>
  )
}

export default FormInput
