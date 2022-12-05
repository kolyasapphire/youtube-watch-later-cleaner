import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, options } = JSON.parse(req.body)

  options.body = JSON.stringify(options.body)

  const request = await fetch(url, options)

  if (!request.ok) {
    console.error(await request.text())
    res.status(500).send('oops')
    return
  }

  const response = await request.json()

  res.setHeader(
    'Content-Type',
    request.headers.get('Content-Type') ?? 'application/json'
  )
  res.status(request.status).json(response)
}
