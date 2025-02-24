import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import theme from '../theme'
import { AppProps } from 'next/app'

import Layout from 'components/Layout'

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
