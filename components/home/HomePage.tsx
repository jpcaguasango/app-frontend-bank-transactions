'use client'

import {
  Box,
  Card,
  Container,
  GridItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import TransactionSection from '@/components/transactions/TransactionSection'
import AccountSection from '@/components/accounts/AccountSection'
import CardStat from '@/components/shared/CardStat'
import useColor from '@/hooks/useColor'
import { Transaction } from '@/types/transaction.type'
import TradeStream from '@/components/shared/TradeStream'
import { useTranslation } from 'react-i18next'

const Home = () => {
  // Redux
  const { accounts, transactions } = useSelector(
    (state: RootState) => state.app
  )

  // Hooks
  const { t } = useTranslation('common')
  const { bg } = useColor()

  // Constants
  const transactionsCount = transactions.length
  const transactionsAmount = transactions.reduce(
    (sum, trans) => sum + (Number(trans.amount) ?? 0),
    0
  )
  const counts = transactions.reduce<Record<string, number>>(
    (acc, trans: Transaction) => {
      acc[trans.originAccount.accountNumber] =
        (acc[trans.originAccount.accountNumber] || 0) + 1
      return acc
    },
    {}
  )

  const mostRepeated =
    Object.entries(counts).length > 0
      ? Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))
      : []

  return (
    <Container fluid>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={5}>
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <AccountSection accounts={accounts} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 5 }}>
          <TransactionSection transactions={transactions} accounts={accounts} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <Box w="full" display="flex" flexDirection="column" gap={5}>
            <CardStat
              label={t('totalTransactions')}
              value={transactionsCount}
              formatOptions={{
                style: 'decimal',
              }}
            />
            <CardStat
              label={t('totalTransferred')}
              value={transactionsAmount}
              formatOptions={{
                style: 'currency',
                currency: 'COP',
              }}
            />

            <Card.Root bg={bg} variant="elevated" borderRadius="2xl" size="sm">
              <Card.Body>
                <VStack align="start" gap={4}>
                  <Text textStyle="xs">{t('accountWithMoreTransfers')}</Text>
                  <Text textStyle="md" fontWeight="bold">
                    {mostRepeated?.[0] ?? '-'}
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root bg={bg} variant="elevated" borderRadius="2xl" size="sm">
              <Card.Body>
                <TradeStream />
              </Card.Body>
            </Card.Root>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default Home
