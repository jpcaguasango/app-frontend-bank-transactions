import { Account } from '@/types/account.type'
import { FormatNumber, HStack, Image, Text, VStack } from '@chakra-ui/react'

const AccountInfo = (props: Account) => {
  const { accountNumber, balance, user } = props

  const isNegativeBalance = balance < 0

  return (
    <HStack w="full" py={2} px={4} justify="space-between" align="center">
      <HStack gap={5}>
        <Image
          src={user.profilePicture}
          boxSize="40px"
          borderRadius="full"
          fit="cover"
          alt="profilePicture"
        />

        <VStack align="start">
          <Text textStyle="xs" fontWeight="bold">
            {user.fullName}
          </Text>
          <Text textStyle="xs">{accountNumber}</Text>
        </VStack>
      </HStack>

      <HStack>
        <VStack align="end">
          <Text
            color={isNegativeBalance ? 'red' : ''}
            textStyle="xs"
            fontWeight="bold"
          >
            <FormatNumber value={balance} style="currency" currency="COP" />
          </Text>
        </VStack>
      </HStack>
    </HStack>
  )
}

export default AccountInfo
