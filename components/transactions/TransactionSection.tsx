import React, { useMemo } from 'react'
import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Show,
  SimpleGrid,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import FormSelect from '@/components/forms/FormSelect'
import useColor from '@/hooks/useColor'
import TransactionForm from '@/components/transactions/TransactionForm'
import { Transaction } from '@/types/transaction.type'
import { Account } from '@/types/account.type'
import { useModalContext } from '@/context/ModalContext'
import FormInput from '@/components/forms/FormInput'
import TransactionInfo from '@/components/transactions/TransactionInfo'
import CustomEmptyState from '@/components/shared/CustomEmptyState'
import { useTranslation } from 'react-i18next'

type TransactionSectionProps = {
  transactions: Transaction[]
  accounts: Account[]
}

const TransactionSection = ({
  transactions,
  accounts,
}: TransactionSectionProps) => {
  // Form
  const form = useForm({
    defaultValues: {
      originAccount: '',
      destinationAccount: '',
      amount: 0,
    },
  })

  // Hooks
  const { t } = useTranslation('common')
  const { bg } = useColor()
  const { openModal } = useModalContext()
  const [originAccount = '', destinationAccount = '', amount = 0] = form.watch([
    'originAccount',
    'destinationAccount',
    'amount',
  ])

  // Constants
  const accountOptions = accounts.map((account: Account) => ({
    value: account.accountNumber,
    label: account.accountNumber,
  }))

  // Memo
  const filteredTransactions: Transaction[] = useMemo(() => {
    if (!originAccount && !destinationAccount && !amount) return transactions

    return transactions.filter(
      (tx: Transaction) =>
        tx.originAccount.accountNumber === originAccount ||
        tx.destinationAccount.accountNumber === destinationAccount ||
        tx.amount === Number(amount)
    )
  }, [transactions, originAccount, destinationAccount, amount])

  // Functions
  const openCreateModal = () => {
    openModal({
      title: t('newTransaction'),
      size: 'md',
      content: <TransactionForm accounts={accounts} />,
    })
  }

  return (
    <Box
      bg={bg}
      display="flex"
      flexDirection="column"
      overflowY="auto"
      borderRadius="2xl"
      shadow="xl"
      gap={5}
      p={5}
    >
      <HStack justify="space-between">
        <Heading size="md">
          {t('transactions')} ({filteredTransactions.length})
        </Heading>

        <Button colorPalette="purple" size="xs" onClick={openCreateModal}>
          {t('new')}
        </Button>
      </HStack>

      <FormProvider {...form}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={5}>
          <GridItem>
            <FormSelect
              name="originAccount"
              label={t('originAccount')}
              placeholder={t('selectOneOption')}
              options={accountOptions}
            />
          </GridItem>
          <GridItem>
            <FormSelect
              name="destinationAccount"
              label={t('destinationAccount')}
              placeholder={t('selectOneOption')}
              options={accountOptions}
            />
          </GridItem>
          <GridItem>
            <FormInput
              name="amount"
              label={t('value')}
              placeholder={t('typeValue')}
            />
          </GridItem>
        </SimpleGrid>
      </FormProvider>

      <Box
        h="60vh"
        display="flex"
        flexDirection="column"
        overflowY="auto"
        gap={5}
        p={2}
      >
        <Show when={filteredTransactions.length > 0}>
          {filteredTransactions.map((transaction, index) => (
            <Box borderRadius="2xl" shadow="md" key={index}>
              <TransactionInfo {...transaction} />
            </Box>
          ))}
        </Show>

        <Show when={filteredTransactions.length === 0}>
          <CustomEmptyState />
        </Show>
      </Box>
    </Box>
  )
}

export default TransactionSection
