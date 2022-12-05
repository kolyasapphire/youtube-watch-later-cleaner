import Link from 'next/link'
import { Button, HStack, VStack, StackProps } from '@chakra-ui/react'

import { Container } from './Container'

const Layout = (props: StackProps) => (
  <VStack>
    <HStack py={5}>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/settings">
        <Button>Settings</Button>
      </Link>
    </HStack>
    <Container {...props} />
  </VStack>
)

export default Layout
