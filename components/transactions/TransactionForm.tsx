'use client'

import FormInput from '@/components/forms/FormInput'
import FormInstance from '@/components/forms/FormInstance'
import FormSelect from '@/components/forms/FormSelect'
import { useModalContext } from '@/context/ModalContext'
import useColor from '@/hooks/useColor'
import useSizes from '@/hooks/useSizes'
import useValidationRules from '@/hooks/useValidationRules'
import {
  Button,
  FormatNumber,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Account } from '@/types/account.type'
import { useEffect } from 'react'
import { TransactionPayload } from '@/types/transaction.type'
import { addTransaction } from '@/redux/slices/appSlice'
import { useDispatch } from 'react-redux'
import { toaster } from '@/components/chakra-snippets/toaster'
import { useTranslation } from 'react-i18next'

type TransactionFormProps = {
  accounts: Account[]
}

const TransactionForm = ({ accounts }: TransactionFormProps) => {
  // Form
  const form = useForm({
    defaultValues: {
      originAccountNumber: '',
      destinationAccountNumber: '',
      amount: 0,
    },
  })

  // Hooks
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { buttonSize } = useSizes()
  const { colorPalette } = useColor()
  const { getValidationRules } = useValidationRules()
  const { closeModal } = useModalContext()

  const [originAccountNumber] = form.watch(['originAccountNumber'])

  const availableAccounts = accounts.filter((ft) => ft.balance > 0)
  const destinationAccounts = accounts.filter(
    (ft) => ft.accountNumber !== originAccountNumber
  )

  const getListOptions = (filteredAccounts: Account[]) => {
    return filteredAccounts.map((account: Account) => ({
      value: account.accountNumber,
      label: `${account.user.fullName} - ${account.accountNumber}`,
      icon: (
        <Image
          w="30px"
          src={account.user.profilePicture}
          alt={account.user.fullName}
        />
      ),
      description: (
        <Text
          mx={10}
          textStyle="xs"
          fontWeight="bold"
          color={account.balance < 0 ? 'red' : 'green'}
        >
          <FormatNumber
            value={account.balance}
            style="currency"
            currency="COP"
          />
        </Text>
      ),
    }))
  }

  const originAccount = accounts.find(
    (fd: Account) => fd.accountNumber === originAccountNumber
  )

  // Functions
  const handleSubmit = (data: TransactionPayload) => {
    dispatch(addTransaction(data))
    closeModal()
    toaster.create({
      type: 'success',
      title: t('transactionSubmitted'),
      description: t('transferIsConfirmed'),
    })
  }

  useEffect(() => {
    form.setValue('destinationAccountNumber', '')
    form.clearErrors()
  }, [originAccountNumber])

  return (
    <FormProvider {...form}>
      <FormInstance onSubmit={form.handleSubmit(handleSubmit)}>
        <SimpleGrid columns={1} gap={2}>
          <GridItem>
            <FormSelect
              name="originAccountNumber"
              label={t('originAccount')}
              placeholder={t('selectOneOption')}
              options={getListOptions(availableAccounts)}
              validationRules={getValidationRules(['required'])}
            />
          </GridItem>

          <GridItem>
            <FormSelect
              name="destinationAccountNumber"
              label={t('destinationAccount')}
              placeholder={t('selectOneOption')}
              options={getListOptions(destinationAccounts)}
              disabled={!originAccountNumber}
              validationRules={getValidationRules(['required'])}
            />
          </GridItem>

          <GridItem>
            <FormInput
              key={originAccount?.balance}
              name="amount"
              label={t('value')}
              placeholder={t('typeValue')}
              validationRules={getValidationRules([
                'required',
                'onlyNumbers',
                'min:0',
                `max:${originAccount?.balance}`,
              ])}
            />
          </GridItem>

          <GridItem>
            <Button
              w="100%"
              mt={4}
              colorPalette={colorPalette}
              type="submit"
              size={buttonSize}
            >
              {t('transfer')}
            </Button>
          </GridItem>
        </SimpleGrid>
      </FormInstance>
    </FormProvider>
  )
}

export default TransactionForm
