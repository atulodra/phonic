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
} from '@chakra-ui/react';
// import SongTable from '../components/songTable';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';

import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import { formatDate, formatTime } from '../lib/formatters';

const Favourites = ({ favs }) => {
    console.log(Array.isArray(favs));
    const { favourites } = favs;
    console.log(favs);
    console.log(favourites);

    const playSongs = useStoreActions((store) => store.changeActiveSongs);
    const setActiveSong = useStoreActions((store) => store.changeActiveSong);

    const handlePlay = (activeSong?) => {
        setActiveSong(activeSong || favourites[0]);
        playSongs(favourites);
    };

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
            <Text fontSize="5xl">Favourites</Text>
            <Box bg="transparent">
                <Box padding="10px" marginBottom="20px">
                    <Box marginBottom="20px">
                        <IconButton
                            icon={<BsFillPlayFill fontSize="30px" />}
                            colorScheme="green"
                            aria-label="play"
                            size="lg"
                            isRound
                            onClick={() => handlePlay()}
                        />
                    </Box>
                    <Table variant="unstyled" color="schemeTwo.textColor">
                        <Thead
                            borderBottom="1px solid"
                            borderColor="rgba(255,255,255,0.2)"
                        >
                            <Tr>
                                <Th>#</Th>
                                <Th>Title</Th>
                                <Th>Arist</Th>
                                <Th>Date Added</Th>
                                <Th>
                                    <AiOutlineClockCircle />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {favourites?.map((song, i) => (
                                <Tr
                                    sx={{
                                        transition: 'all .3s',
                                        '&:hover': {
                                            bg: 'rgba(255,255,255,0.1)',
                                        },
                                    }}
                                    key={song.id}
                                    cursor="cursor"
                                    // onClick={() => handlePlay(song)}
                                >
                                    <Td>{i + 1}</Td>
                                    <Td onClick={() => handlePlay(song)}>
                                        {song.name}
                                    </Td>
                                    <Td>{song.artist.name}</Td>
                                    <Td>
                                        {formatDate(new Date(song.createdAt))}
                                    </Td>
                                    <Td>{formatTime(song.duration)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
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

    const favs = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            favourites: {
                include: {
                    artist: true,
                },
            },
        },
    });
    console.log(favs);

    return {
        props: {
            favs: JSON.parse(JSON.stringify(favs)),
        },
    };
};

export default Favourites;
