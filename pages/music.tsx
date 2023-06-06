import { Box, Text, Divider } from '@chakra-ui/react';
import prisma from '../lib/prisma';
import { validateToken } from '../lib/auth';
import ArtistMusicLayout from '../components/artistMusicLayout';
import GridArtists from '../components/gridArtist';

const Music = ({ artists }) => {
    return (
        <Box
            height="100%"
            overflow="auto"
            // bgGradient = {`linear(${color} 0%, ${color} 15%, ${color} 40%, rbga(0,0,0,0.95) 75%)`}
            bgGradient="linear(to-bl, brand.1, brand.2, brand.3, brand.4)"
            // background="#686868"
            boxShadow="dark-lg"
            border="1px solid #552C3D"
            borderRadius="10px"
            padding="3em"
            backdropFilter="auto"
            backdropBlur="3xl"
            // paddingBottom="5em"
            sx={{
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    // width: '0.8em',
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#a22968',
                    borderRadius: '24px',
                },
            }}
        >
            <Text fontSize="4xl" marginBottom="3rem">
                New Artists
            </Text>
            <GridArtists artists={artists.slice(0, 4)} />
            <Divider />
            <ArtistMusicLayout artists={artists.slice(4)} />
        </Box>
    );
};
export const getServerSideProps = async ({ req }) => {
    let user;

    try {
        user = validateToken(req.cookies.PHONIC_ACCESS_TOKEN);
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }

    const artists = await prisma.artist.findMany({
        where: {},
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
        },
    };
};
export default Music;
