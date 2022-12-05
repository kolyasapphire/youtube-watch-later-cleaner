import { useState } from 'react'

import { Text, Button, Textarea, VStack, Heading } from '@chakra-ui/react'

import { useLocalStorage } from 'hooks'

const Index = () => {
  const [storedKey, setStoredKey] = useLocalStorage('key', '')
  const [storedCookie, setStoredCookie] = useLocalStorage('cookie', '')
  const [storedBody, setStoredBody] = useLocalStorage('body', '')
  const [storedHash, setStoredHash] = useLocalStorage('hash', '')

  const [key, setKey] = useState(storedKey)
  const [cookie, setCookie] = useState(storedCookie)
  const [body, setBody] = useState(storedBody)
  const [hash, setHash] = useState(storedHash)

  const save = () => {
    setStoredKey(key)
    setStoredCookie(cookie)
    setStoredBody(body)
    setStoredHash(hash)
  }

  return (
    <VStack spacing={3}>
      <VStack>
        <Heading size="md">Key</Heading>
        <Text>Token in request url.</Text>
        <Textarea value={key} onChange={(x) => setKey(x.target.value)} />
      </VStack>
      <VStack>
        <Heading size="md">Cookie</Heading>
        <Text>The whole thing.</Text>
        <Textarea value={cookie} onChange={(x) => setCookie(x.target.value)} />
      </VStack>
      <VStack>
        <Heading size="md">Body</Heading>
        <Text>
          Whole body of the request to
          https://www.youtube.com/youtubei/v1/browse for the request when going
          from any page to watch later page.
        </Text>
        <Textarea value={body} onChange={(x) => setBody(x.target.value)} />
      </VStack>
      <VStack>
        <Heading size="md">SAPISIDHASH</Heading>
        <Text>Authorization header.</Text>
        <Textarea value={hash} onChange={(x) => setHash(x.target.value)} />
      </VStack>
      <Button onClick={() => save()}>Save</Button>
    </VStack>
  )
}

export default Index
