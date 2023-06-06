import {
    Box,
    IconButton,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Divider,
} from '@chakra-ui/react';
// import SongTable from '../components/songTable';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';

import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import { formatDate, formatTime } from '../lib/formatters';
import { History, Song } from '@prisma/client';
import ShowArtists from '../components/showArtists';
import SongTable from '../components/songTable';

const History = ({ songs, artists }) => {
    // console.log(songs);

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
            <Text fontSize="4xl" color="schemeTwo.textColor">
                History
            </Text>
            <ShowArtists
                artists={artists}
                title="Artists Recently Listened To"
            />
            <Divider />
            <Text paddingX="2rem" marginY="3rem" fontSize="3xl">
                Songs
            </Text>
            <SongTable songs={songs} playlist={false} />
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

    const his = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            history: {
                select: {
                    song: {
                        include: {
                            artist: true,
                        },
                    },
                },
            },
        },
    });

    const { history } = his;

    const songs = history.map((entry: History) => entry.song);
    // console.log('songs:\n', songs);

    const artists = songs
        .map((song: Song) => song.artist)
        .filter((x, i, a) => a.findIndex((item) => item.id === x.id) === i);

    // console.log('artists:\n', artists);

    return {
        props: {
            songs: JSON.parse(JSON.stringify(songs)),
            artists: JSON.parse(JSON.stringify(artists)),
        },
    };
};

export default History;
