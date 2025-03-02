import { NextApiRequest, NextApiResponse } from 'next'

import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body

  const transcript = await YoutubeTranscript.fetchTranscript(url)

  const lines = transcript.map(x => x.text)

  res.setHeader('Content-Type', 'application/json')
  res.json(lines)
}
