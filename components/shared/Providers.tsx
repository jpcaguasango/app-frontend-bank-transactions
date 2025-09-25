'use client'

import { Provider } from '@/components/chakra-snippets/provider'
import { Toaster } from '@/components/chakra-snippets/toaster'
import GlobalModal from '@/components/shared/GlobalModal'
import ModalProvider from '@/context/ModalContext'
import { ReactNode } from 'react'
import { store } from '@/redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import '@/lib/i18n'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <ModalProvider>
          {children}
          <Toaster />
          <GlobalModal />
        </ModalProvider>
      </Provider>
    </ReduxProvider>
  )
}
