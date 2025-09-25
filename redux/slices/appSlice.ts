import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Transaction, TransactionPayload } from '@/types/transaction.type'
import { Account } from '@/types/account.type'
import { mockAccounts } from '@/mocks/accounts.mock'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

type AppState = {
  accounts: Account[]
  transactions: Transaction[]
}

const initialState: AppState = {
  accounts: mockAccounts,
  transactions: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionPayload>) => {
      const originAccount = state.accounts.find(
        (account) =>
          account.accountNumber === action.payload.originAccountNumber
      )

      const destinationAccount = state.accounts.find(
        (account) =>
          account.accountNumber === action.payload.destinationAccountNumber
      )

      if (originAccount && destinationAccount) {
        originAccount.balance -= Number(action.payload.amount)
        destinationAccount.balance += Number(action.payload.amount)

        const transaction: Transaction = {
          id: uuidv4(),
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          type: 'TRANSFER',
          originAccount,
          destinationAccount,
          amount: action.payload.amount,
        }

        state.transactions.push(transaction)
      }
    },
  },
})

export const { addTransaction } = appSlice.actions
export default appSlice.reducer
