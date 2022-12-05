import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const theme = extendTheme({ config })

export default theme
