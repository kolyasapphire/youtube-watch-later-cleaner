import { useState } from 'react'
import { VStack, Heading } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import Video from './Video'
import { ChannelType, VideoType } from '../types'

const Channel = ({ data: channel }: { data: ChannelType }) => {
  const [vids, setVids] = useState(channel.videos)

  // TODO: Delete the whole channel if last video
  const deleteVidVisually = (id: string) =>
    setVids(vids.filter((x: { id: string }) => x.id !== id))

  const totalTime =
    channel.totalVideosTime > 60 * 60
      ? Math.round(channel.totalVideosTime / 60 / 60) + ' hours'
      : Math.round(channel.totalVideosTime / 60) + ' mins'

  return (
    <VStack>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Heading size="lg">
              {channel.name}: {vids.length} vids, {totalTime}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack spacing={5}>
              {vids.map((x: VideoType) => (
                <Video
                  key={x.id}
                  data={x}
                  deleteVidVisually={deleteVidVisually}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}

export default Channel
