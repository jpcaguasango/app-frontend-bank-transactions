import { User } from '@/types/user.type'

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT' | 'LOAN'

export type Account = {
  accountNumber: string
  type: AccountType
  balance: number
  currency: string
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED'
  user: User
}
