export type ChannelType = {
  id: string
  name: string
  link: string
  videos: VideoType[]

  totalVideosTime: number
}

export type VideoType = {
  id: string
  setVideoId: string
  title: string
  link: string
  thumbnails: string
  length: string
  lengthSeconds: string
}
