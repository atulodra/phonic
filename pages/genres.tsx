import prisma from '../lib/prisma';
import NextLink from 'next/link';
import { validateToken } from '../lib/auth';
import ArtistMusicLayout from '../components/artistMusicLayout';
import { Box, Divider, Tag } from '@chakra-ui/react';
import { Artist, Song } from '@prisma/client';
import ShowArtists from '../components/showArtists';
import GridArtists from '../components/gridArtist';
import SongTable from '../components/songTable';

const Genres = ({ artists, genres, songs }) => {
    // console.log(artists);
    console.log(songs);

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
            {genres.map((genre) => (
                <Box marginBottom="3rem">
                    <NextLink
                        href={{
                            pathname: '/genre/[id]',
                            query: { id: genre },
                        }}
                        // passHref
                    >
                        <Tag
                            size="lg"
                            // key={genre}
                            variant="solid"
                            colorScheme="pink"
                            marginBottom="2rem"
                        >
                            {genre}
                        </Tag>
                    </NextLink>
                    <Divider marginBottom="2rem" />
                    {/* <ArtistMusicLayout
                        artists={artists
                            .filter((artist: Artist) =>
                                artist.genres.includes(genre)
                            )
                            .slice(0, 2)}
                    /> */}
                    <GridArtists
                        artists={artists
                            .filter((artist: Artist) =>
                                artist.genres.includes(genre)
                            )
                            .slice(0, 4)}
                    />
                    <SongTable
                        songs={songs
                            .filter((song: Song) =>
                                song.artist.genres.includes(genre)
                            )
                            .slice(0, 5)}
                        playlist={false}
                    />
                </Box>
            ))}
        </Box>
    );
};

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
    });
    const songs = await prisma.song.findMany({
        include: {
            artist: {
                include: {
                    songs: true,
                },
            },
        },
    });
    const genres = artists
        .map((artist) => artist.genres)
        .flat(1)
        .filter((x, i, a) => a.indexOf(x) === i);
    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
            genres: JSON.parse(JSON.stringify(genres)),
            songs: JSON.parse(JSON.stringify(songs)),
        },
    };
};
export default Genres;
