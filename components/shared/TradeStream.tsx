import React, { useEffect, useState } from 'react'
import {
  Badge,
  FormatNumber,
  HStack,
  Show,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CustomEmptyState from '@/components/shared/CustomEmptyState'

type Trade = {
  p: number
  s: string
  t: number
  v: number
}

export default function TradeStream() {
  const [trades, setTrades] = useState<Trade[]>([])

  // Hooks
  const { t } = useTranslation('common')

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_TRADE_API_TOKEN}`
    )

    const sendMessage = (msg: object) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msg))
      } else {
        socket.addEventListener(
          'open',
          () => socket.send(JSON.stringify(msg)),
          { once: true }
        )
      }
    }

    socket.onopen = () => {
      sendMessage({ type: 'subscribe', symbol: 'AAPL' })
      sendMessage({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' })
      sendMessage({ type: 'subscribe', symbol: 'IC MARKETS:1' })
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'trade') {
        setTrades((prev) => [...message.data, ...prev].slice(0, 20))
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    return () => {
      sendMessage({ type: 'unsubscribe', symbol: 'AAPL' })
      socket.close()
    }
  }, [])

  return (
    <VStack h="240px" align="start" gap={2}>
      <Text textStyle="xs" fontWeight="bold">
        {t('tradesInRealTime')}
      </Text>

      <Show when={trades.length > 0}>
        <VStack w="full" align="start" gap={2}>
          {trades.slice(0, 8).map((trade, i) => (
            <HStack key={i} w="full" gap={5} justify="space-between">
              <Badge colorPalette="green">{trade.s}</Badge>

              <Text textStyle="2xs">
                <FormatNumber value={trade.p} style="currency" currency="COP" />
              </Text>
            </HStack>
          ))}
        </VStack>
      </Show>

      <Show when={trades.length === 0}>
        <CustomEmptyState />
      </Show>
    </VStack>
  )
}
