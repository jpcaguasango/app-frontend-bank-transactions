import { Account } from '@/types/account.type'
import { Box, Heading } from '@chakra-ui/react'
import AccountInfo from '@/components/accounts/AccountInfo'
import useColor from '@/hooks/useColor'
import { useTranslation } from 'react-i18next'

type AccountSectionProps = {
  accounts: Account[]
}

const AccountSection = ({ accounts }: AccountSectionProps) => {
  // Hooks
  const { t } = useTranslation('common')
  const { bg } = useColor()

  return (
    <Box
      bg={bg}
      display="flex"
      flexDirection="column"
      borderRadius="2xl"
      shadow="xl"
      gap={5}
      p={5}
    >
      <Heading size="md">
        {t('accounts')} ({accounts.length})
      </Heading>

      <Box
        h={{ base: 'full', lg: '73vh' }}
        display="flex"
        flexDirection="column"
        gap={5}
        overflowY="auto"
      >
        {accounts.map((account, index) => (
          <AccountInfo {...account} key={index} />
        ))}
      </Box>
    </Box>
  )
}

export default AccountSection
