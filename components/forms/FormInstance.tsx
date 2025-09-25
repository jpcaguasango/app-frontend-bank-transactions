'use client'

import { FC, FormEventHandler, ReactNode } from 'react'

interface FormInstanceProps {
  children: ReactNode
  onSubmit?: () => void
}

const FormInstance: FC<FormInstanceProps> = (props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    props.onSubmit?.()
  }

  return (
    <form {...props} onSubmit={handleSubmit} className="w-full">
      {props.children}
    </form>
  )
}

export default FormInstance
