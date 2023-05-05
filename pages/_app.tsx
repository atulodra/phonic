import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import PlayerLayout from '../components/playerLayout'
import { store } from '../lib/store'

const theme = extendTheme({
    fonts: {
        body: `GT Walsheim Pro`,
    },
    colors: {
        gray: {
            100: '#F5f5f5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        brand: {
            1: '#0B0E16',
            2: '#441636',
            3: '#4E1F4C',
            4: '#0B0E16',
        }
    },
    styles: {
        global: {
          // styles for the `body`
          body: {
            bgGradient: 'linear(to-tl, brand.1, brand.2, brand.3, brand.4)',
          },
        },
    },
    components: {
        Button: {
        variants: {
            link: {
            ':focus': {
                outline: 'none',
                boxShadow: 'none',
            },
            },
        },
        },
    },
})

const App = ({ Component, pageProps } : AppProps ) => {
  return (
    <ChakraProvider theme={theme}>
        <StoreProvider store={store}>
            {Component.authPage ? (
                <Component {...pageProps} />
            ) : (
                <PlayerLayout>
                    <Component {...pageProps} />
                </PlayerLayout>
            )}
        </StoreProvider>
    </ChakraProvider>
  )
}
export default App