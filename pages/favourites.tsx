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
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
} from '@chakra-ui/react';
// import SongTable from '../components/songTable';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineEllipsis } from 'react-icons/ai';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

import { Playlist, Song } from '@prisma/client';
import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import { formatDate, formatTime } from '../lib/formatters';
import { usePlaylist } from '../lib/hooks';
import { addToHistory, playlistSongEdit } from '../lib/mutations';

const Favourites = ({ songs }) => {
    // console.log(songs);
    // const { favourite } = favs;
    // console.log(favourite[0].song.artist.name);

    // console.log(Array.isArray(favs));
    // const { favourites } = favs;
    // console.log(favs);
    // console.log(favourites);

    const playSongs = useStoreActions((store) => store.changeActiveSongs);
    const setActiveSong = useStoreActions((store) => store.changeActiveSong);

    const { playlists } = usePlaylist();

    const handlePlay = async (activeSong?: Song) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs);
        if (activeSong !== undefined) {
            await addToHistory({ activeSong });
        }
    };

    const handleAddSong = async (song: Song, plid: number) => {
        const mode = 'add';
        await playlistSongEdit(plid, { song, mode });
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
                                <Th />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {songs?.map((song: Song, i) => (
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
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                icon={<MdOutlinePlaylistAdd />}
                                                boxSize={10}
                                                variant="outline"
                                                border="none"
                                                _hover={{
                                                    background: 'none',
                                                }}
                                                _focus={{
                                                    bg: 'schemeTwo.bodyPink',
                                                }}
                                            />
                                            <MenuList
                                                bg="schemeTwo.bodyPink"
                                                boxSize="15rem"
                                                overflowY="scroll"
                                                overflowX="auto"
                                                sx={{
                                                    '&::-webkit-scrollbar': {
                                                        width: '0.1em',
                                                    },
                                                    '&::-webkit-scrollbar-track':
                                                        {
                                                            // width: '0.8em',
                                                            backgroundColor:
                                                                '#fff',
                                                            borderRadius:
                                                                '24px',
                                                        },
                                                    '&::-webkit-scrollbar-thumb':
                                                        {
                                                            background:
                                                                '#a22968',
                                                            borderRadius:
                                                                '24px',
                                                        },
                                                }}
                                            >
                                                {playlists.map(
                                                    (pl: Playlist) => (
                                                        <MenuItem
                                                            bg="schemeTwo.bodyPink"
                                                            _hover={{
                                                                bg: '#7c1847',
                                                            }}
                                                            key={pl.id}
                                                            onClick={() => {
                                                                handleAddSong(
                                                                    song,
                                                                    pl.id
                                                                );
                                                            }}
                                                        >
                                                            {pl.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </MenuList>
                                        </Menu>
                                    </Td>
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
            favourite: {
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
    // console.log(favs);

    const { favourite } = favs;
    // console.log(favourite);

    const songs = favourite.map((fav) => fav.song);
    // console.log(songs);

    return {
        props: {
            songs: JSON.parse(JSON.stringify(songs)),
        },
    };
};

export default Favourites;
