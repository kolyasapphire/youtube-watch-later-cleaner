import { Text, Button, VStack } from '@chakra-ui/react'

import { useContent } from 'fetchers'
import { useLocalStorage } from 'hooks'

import Channel from 'components/Channel'
import { YT } from '../constants'

import type { ChannelType } from '../types'

const Index = () => {
  const [key] = useLocalStorage('key', '')
  const [cookie] = useLocalStorage('cookie', '')
  const [body] = useLocalStorage('body', '')
  const [hash] = useLocalStorage('hash', '')
  const [pageId] = useLocalStorage('pageId', '')
  const secrets = { key, cookie, body, hash, pageId }

  const Content = useContent(secrets)

  if (Content.isLoading) return <Text>Loading...</Text>
  if (Content.isError) return <Text>Error</Text>
  if (!Content.data)
    return <Button onClick={() => Content.mutate()}>Load</Button>

  const channels = {} as ChannelType[]

  for (const rawItem of Content.data) {
    // weird continuation item
    if (!rawItem?.playlistVideoRenderer) {
      continue
    }

    const item = rawItem.playlistVideoRenderer
    const title = item.title.runs[0].text
    const videoId = item.videoId
    const setVideoId = item.setVideoId
    const link = YT + '/watch?v=' + videoId
    const thumbnails = item.thumbnail.thumbnails
    const length = item.lengthText.simpleText
    const lengthSeconds = item.lengthSeconds

    const channel = item.shortBylineText.runs[0]
    const channelName = channel.text
    const channelId = channel.navigationEndpoint.browseEndpoint.browseId
    const channelLink =
      YT + channel.navigationEndpoint.browseEndpoint.canonicalBaseUrl

    if (!channels.hasOwnProperty(channelName)) {
      channels[channelName] = {
        id: channelId,
        name: channelName,
        link: channelLink,
        videos: [],
        totalVideosTime: 0,
      }
    }

    channels[channelName].videos.push({
      id: videoId,
      setVideoId,
      title,
      link,
      thumbnails,
      length,
      lengthSeconds,
    })

    channels[channelName].totalVideosTime += parseInt(lengthSeconds)
  }

  // Whitelist
  ;[].forEach((x) => delete channels[x])

  const withSortedChannels = Object.values(channels).sort(
    (a, b) => b.totalVideosTime - a.totalVideosTime
  )

  const withSortedVideos = withSortedChannels.map((x) => ({
    ...x,
    videos: x.videos.sort(
      (a, b) => parseInt(b.lengthSeconds) - parseInt(a.lengthSeconds)
    ),
  }))

  const withSingles = withSortedVideos.reduce(
    (acc, x) => {
      if (x.videos.length === 1) {
        acc.singles.push(x.videos[0])
      } else {
        acc.not.push(x)
      }
      return acc
    },
    { singles: [], not: [] }
  )

  const singlesTime = withSingles.singles.reduce((acc, item) => acc + parseInt(item.lengthSeconds), 0)


  const final = [
    ...withSingles.not,
    { id: 'singles', name: 'Singles', videos: withSingles.singles, totalVideosTime: singlesTime },
  ]

  return (
    <VStack spacing={10}>
      {final.map((x) => (
        <Channel key={x.id} data={x} />
      ))}
    </VStack>
  )
}

export default Index
