import { useMutation } from '@tanstack/react-query'

import { YT } from './constants'

const baseHeaders = {
  Accept: '*/*',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
  'X-Youtube-Client-Version': '2.20221202.01.00',
  'X-Youtube-Client-Name': '1',
  'X-Origin': 'https://www.youtube.com',
  'X-Goog-AuthUser': '0',
  'X-Youtube-Bootstrap-Logged-In': 'true',
}

type Secrets = {
  key: string
  cookie: string
  body: string
  hash: string
}

type CustomBody = {
  url: string
  options: {
    body: any
    headers: { [key: string]: string }
  }
}

const fetchBackend = async (body: CustomBody) => {
  const req = await fetch('/api/proxy', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return await req.json()
}

const infiniteFetcher = async (secrets: Secrets) => {
  let data = []
  let continuation = null

  do {
    const rawData = await dataFetch(secrets, continuation)

    const newData = !continuation
      ? rawData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
          .content.sectionListRenderer.contents[0].itemSectionRenderer
          .contents[0].playlistVideoListRenderer.contents
      : rawData.onResponseReceivedActions[0].appendContinuationItemsAction
          .continuationItems

    data = [...data, ...newData]

    if (
      newData[100]?.continuationItemRenderer.continuationEndpoint
        .continuationCommand.token
    ) {
      continuation =
        newData[100].continuationItemRenderer.continuationEndpoint
          .continuationCommand.token
    } else {
      break
    }
  } while (true)
  return data
}

const dataFetch = async (secrets: Secrets, continuation: string | null) => {
  const proxyBody = JSON.parse(secrets.body)

  if (continuation) {
    proxyBody.continuation = continuation
  }

  const body = {
    url: `${YT}/youtubei/v1/browse?key=${secrets.key}&prettyPrint=false`,
    options: {
      method: 'POST',
      body: proxyBody,
      headers: {
        ...baseHeaders,
        Authorization: `SAPISIDHASH ${secrets.hash}`,
        Cookie: secrets.cookie,
      },
    },
  }
  return await fetchBackend(body)
}

const deleteFetch = async (secrets: Secrets, setVideoId: string) => {
  const proxyBody = JSON.parse(secrets.body)

  proxyBody.actions = [{ setVideoId, action: 'ACTION_REMOVE_VIDEO' }]
  proxyBody.playlistId = 'WL'

  const body = {
    url: `${YT}/youtubei/v1/browse/edit_playlist?key=${secrets.key}&prettyPrint=false`,
    options: {
      method: 'POST',
      body: proxyBody,
      headers: {
        ...baseHeaders,
        Authorization: `SAPISIDHASH ${secrets.hash}`,
        Cookie: secrets.cookie,
      },
    },
  }

  return await fetchBackend(body)
}

export const useContent = (secrets: Secrets) =>
  useMutation(() => infiniteFetcher(secrets))

export const useDelete = (secrets: Secrets, id: string) =>
  useMutation(() => deleteFetch(secrets, id))
