import { useState } from 'react'
import {
  HStack,
  VStack,
  Button,
  Image,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import { useDelete } from 'fetchers'
import { useLocalStorage } from 'hooks'

const Video = ({ data, deleteVidVisually }) => {
  const [cookie] = useLocalStorage('cookie', '')
  const [body] = useLocalStorage('body', '')
  const [hash] = useLocalStorage('hash', '')
  const secrets = { cookie, body, hash }

  const [isFailed, setIsFailed] = useState(false)

  const { mutateAsync } = useDelete(secrets, data.setVideoId)

  const remove = async () => {
    try {
      await mutateAsync()
      deleteVidVisually(data.id)
    } catch (error) {
      console.error(error)
      setIsFailed(true)
    }
  }

  return (
    <HStack spacing={10}>
      <Image src={data.thumbnails[data.thumbnails.length - 1].url} />
      <VStack>
        <Heading size="sm" w="400px" textAlign="center">
          {data.title}
        </Heading>
        <Text>{data.length}</Text>
        <HStack>
          <Link isExternal href={data.link}>
            <Button>YT</Button>
          </Link>
          <Button color="red" onClick={() => remove()}>
            {!isFailed ? 'Delete' : 'Failed to Delete'}
          </Button>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default Video
