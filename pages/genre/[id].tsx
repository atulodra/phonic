import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
import ArtistMusicLayout from '../../components/artistMusicLayout';
import { Box, Divider, Tag } from '@chakra-ui/react';

const Genre = ({ artists, genre }) => {
    console.log(`Genre ${genre}`);

    // console.log(artists);

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
            <Tag
                size="lg"
                // key={genre}
                variant="solid"
                colorScheme="pink"
                marginBottom="4rem"
            >
                {genre}
            </Tag>
            <Divider />
            <ArtistMusicLayout artists={artists} />
        </Box>
    );
};
export const getServerSideProps = async ({ query, req }) => {
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
    const genre = query.id;
    const artists = await prisma.artist.findMany({
        where: {
            genres: {
                has: query.id,
            },
        },
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
    });

    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
            genre,
        },
    };
};
export default Genre;
