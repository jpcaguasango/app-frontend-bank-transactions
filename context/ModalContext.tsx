'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full'

type ModalConfig = {
  title?: string
  size?: ModalSize
  content: ReactNode
  footer?: ReactNode
}

type ModalContextType = {
  isOpen: boolean
  openModal: (_config: ModalConfig) => void
  closeModal: () => void
  modalConfig: ModalConfig | null
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null)

  const openModal = (config: ModalConfig) => {
    setModalConfig(config)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalConfig(null)
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalConfig }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context)
    throw new Error('useModalContext must be used within a ModalProvider')
  return context
}

export default ModalProvider
