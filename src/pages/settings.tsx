import { useState } from 'react'

import { Text, Button, Textarea, VStack, Heading } from '@chakra-ui/react'

import { useLocalStorage } from 'hooks'

const Index = () => {
  const [storedCookie, setStoredCookie] = useLocalStorage('cookie', '')
  const [storedBody, setStoredBody] = useLocalStorage('body', '')
  const [storedHash, setStoredHash] = useLocalStorage('hash', '')
  const [storedOpenaiKey, setStoredOpenaiKey] = useLocalStorage('openaiKey', '')


  const [cookie, setCookie] = useState(storedCookie)
  const [body, setBody] = useState(storedBody)
  const [hash, setHash] = useState(storedHash)
  const [openaiKey, setOpenaiKey] = useState(storedOpenaiKey)

  const save = () => {
    setStoredCookie(cookie)
    setStoredBody(body)
    setStoredHash(hash)
    setStoredOpenaiKey(openaiKey)
  }

  return (
    <VStack spacing={3}>
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
        <Text>Inside the authorization header.</Text>
        <Textarea value={hash} onChange={(x) => setHash(x.target.value)} />
      </VStack>
      <VStack>
        <Heading size="md">Cookie</Heading>
        <Text>The whole thing.</Text>
        <Textarea value={cookie} onChange={(x) => setCookie(x.target.value)} />
      </VStack>
      <VStack>
        <Heading size="md">OpenAI Key</Heading>
        <Text>API key from OpenAI.</Text>
        <Textarea value={openaiKey} onChange={(x) => setOpenaiKey(x.target.value)} />
      </VStack>
      <Button onClick={() => save()}>Save</Button>
    </VStack>
  )
}

export default Index
