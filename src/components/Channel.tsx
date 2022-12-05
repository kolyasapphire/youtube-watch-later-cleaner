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
import { VideoType } from '../types'

const Channel = ({ data }) => {
  const [vids, setVids] = useState(data.videos)

  const deleteVidVisually = (id: string) =>
    setVids(vids.filter((x: { id: string }) => x.id !== id))

  return (
    <VStack>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Heading size="lg">
              {data.name} - {vids.length}
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
