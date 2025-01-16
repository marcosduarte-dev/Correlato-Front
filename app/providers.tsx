'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import {NextUIProvider} from '@nextui-org/react'
import { ConfigProvider, theme } from 'antd'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}