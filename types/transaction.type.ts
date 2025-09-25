import { Account } from '@/types/account.type'

export type Transaction = {
  id: string
  date: string
  type: 'TRANSFER'
  amount: number
  originAccount: Account
  destinationAccount: Account
  description?: string
}

export type TransactionPayload = {
  originAccountNumber: string
  destinationAccountNumber: string
  amount: number
}
