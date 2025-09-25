import { FormatNumber, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { Transaction } from '@/types/transaction.type'
import { PiShuffleBold } from 'react-icons/pi'
import dayjs from 'dayjs'

const TransactionInfo = (props: Transaction) => {
  const { date, destinationAccount, originAccount, amount } = props

  return (
    <HStack w="full" py={2} px={4} justify="space-between" align="center">
      <HStack w="1/3" gap={5}>
        <Image
          src={originAccount?.user?.profilePicture ?? '/images/not-found.png'}
          boxSize="30px"
          borderRadius="full"
          fit="cover"
          alt="originUser"
        />

        <VStack align="start">
          <Text textStyle="xs" fontWeight="bold">
            {originAccount?.user?.fullName ?? ''}
          </Text>
          <Text textStyle="xs">{originAccount?.accountNumber ?? ''}</Text>
        </VStack>
      </HStack>

      <VStack w="1/3">
        <Text textStyle="2xs">{dayjs(date).format('YYYY-MM-DD HH:mm')}</Text>

        <PiShuffleBold />

        <Text textStyle="xs" fontWeight="bold">
          <FormatNumber value={amount} style="currency" currency="COP" />
        </Text>
      </VStack>

      <HStack w="1/3" justify="end" gap={5}>
        <VStack align="end">
          <Text textStyle="xs" fontWeight="bold">
            {destinationAccount?.user?.fullName ?? ''}
          </Text>
          <Text textStyle="xs">{destinationAccount?.accountNumber ?? ''}</Text>
        </VStack>

        <Image
          src={
            destinationAccount?.user?.profilePicture ?? '/images/not-found.png'
          }
          boxSize="30px"
          borderRadius="full"
          fit="cover"
          alt="destinationUser"
        />
      </HStack>
    </HStack>
  )
}

export default TransactionInfo
