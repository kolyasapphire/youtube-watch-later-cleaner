import { useState, Fragment } from 'react'
import {
  HStack,
  VStack,
  Button,
  Image,
  Heading,
  Link,
  Text,
  Box
} from '@chakra-ui/react'

import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { useDelete, useDescription } from 'fetchers'
import { useLocalStorage } from 'hooks'

const Video = ({ data, deleteVidVisually }) => {
  const [cookie] = useLocalStorage('cookie', '')
  const [body] = useLocalStorage('body', '')
  const [hash] = useLocalStorage('hash', '')
  const [openaiKey] = useLocalStorage('openaiKey', '')
  const secrets = { cookie, body, hash, openaiKey }

  const [isFailed, setIsFailed] = useState(false)

  const { mutateAsync } = useDelete(secrets, data.setVideoId)

  const { mutate: mutateDescription, data: descriptionData, error, isLoading } = useDescription(secrets, data.link)

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
      <Box h={169} w={300}>
        <LiteYouTubeEmbed id={data.id} title={data.title} />
      </Box>
      <VStack>
        <Heading size="sm" w="400px" textAlign="center">
          {data.title}
        </Heading>
        <Text>{data.length}</Text>
        {!descriptionData && (<Button color={error ? 'red' : null} onClick={() => mutateDescription()}>{isLoading ? 'Loading...' : error ? (error as Error).message : 'Summary'}</Button>)}
        {descriptionData && (<Box maxH={200} maxW={500} overflowY='scroll'>{descriptionData.split("\n").map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}</Box>)}
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
