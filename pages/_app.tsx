import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import PlayerLayout from '../components/playerLayout';
import { store } from '../lib/store';
import 'reset-css';

const theme = extendTheme({
    fonts: {
        body: `GT Walsheim Pro`,
    },
    colors: {
        brand: {
            1: '#0B0E16',
            2: '#441636',
            3: '#4E1F4C',
            4: '#0B0E16',
        },
        schemeTwo: {
            bodyPink: '#6B084D',
            bodyBlue: '#29235C',
            barBlueOrignal: '#243963',
            barBlueNew: '#0d1420',
            oldBarColor: '#271010',
            cardBlue: '#1A5E85',
            textColor: '#D1B5B5',
            textColor2: '#C4B1B1',
            hoverColor: '#F08A6A',
            songArtistInfoBorder: 'rgba(82, 51, 51, 0.1)',
        },
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                overflow: 'hidden',
                bgGradient:
                    'linear(to-b, schemeTwo.bodyPink, schemeTwo.bodyBlue)',
                // bgGradient: 'linear(to-tr, brand.1, brand.2, brand.3, brand.4)',
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
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider resetCSS theme={theme}>
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
    );
};
export default App;
