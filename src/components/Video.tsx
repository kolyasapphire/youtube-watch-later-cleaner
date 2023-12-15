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
  const [key] = useLocalStorage('key', '')
  const [cookie] = useLocalStorage('cookie', '')
  const [body] = useLocalStorage('body', '')
  const [hash] = useLocalStorage('hash', '')
  const secrets = { key, cookie, body, hash }

  const { mutateAsync } = useDelete(secrets, data.setVideoId)

  const remove = async () => {
    await mutateAsync()
    deleteVidVisually(data.id)
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
            Delete
          </Button>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default Video
