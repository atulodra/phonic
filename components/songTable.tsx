import NextLink from 'next/link';
import { Box, Center } from '@chakra-ui/layout';
import {
    Table,
    Tr,
    Td,
    Tbody,
    Thead,
    IconButton,
    Th,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineMinus } from 'react-icons/ai';
import { MdOutlinePlaylistAdd } from 'react-icons/md';

import { Playlist, Song } from '@prisma/client';
import { useStoreActions } from 'easy-peasy';
import { FiHeart } from 'react-icons/fi';
import { FC, useEffect, useState } from 'react';
import { formatDate, formatTime } from '../lib/formatters';
import {
    addFavSong,
    addToHistory,
    removeFavSong,
    playlistSongEdit,
} from '../lib/mutations';
// import { useMe } from '../lib/hooks';
import { useFavs, usePlaylist } from '../lib/hooks';

// type Dict = { [key: number]: Boolean };

const SongTable: FC<{ songs: Song[]; playlist: Boolean; id?: Number }> = ({
    songs,
    playlist,
    id,
}) => {
    const playSongs = useStoreActions((store) => store.changeActiveSongs);
    const setActiveSong = useStoreActions((store) => store.changeActiveSong);
    // const favourited: Dict = {};
    // console.log(`songs: ${JSON.stringify(songs, null, 2)}`);
    // console.log(songs);
    // console.log(Array.isArray(favSongs));

    // const { user } = useMe();
    // console.log(user);

    // console.log(favSongs);
    // console.log(Array.isArray(favSongs));

    // console.log(JSON.stringify(favSongs[0]) === JSON.stringify(songs[52]));
    // console.log(songs);

    // songs.forEach((song: Song) => {
    //     favSongs?.forEach((favSong) => {
    //         if (favSong.name === song.name) {
    //             favourited[song.id] = true;
    //         } else {
    //             favourited[song.id] = false;
    //         }
    //     });
    // });

    // if (songs.length > 0) {
    //     songs?.forEach((song) => {
    //         if (song.userId === user?.id) {
    //             favourited[song.id] = true;
    //         } else {
    //             favourited[song.id] = false;
    //         }
    //     });
    // }
    // console.log(favourited);
    const { playlists } = usePlaylist();

    const [isFav, setIsFav] = useState([]);
    const [songList, setSongList] = useState([]);
    const { favSongs } = useFavs();
    useEffect(() => {
        const favSongsId = favSongs.map((favSong: Song) => favSong.id);
        setIsFav([...favSongsId]);
        setSongList([...songs]);
    }, [favSongs, songs]);

    const handlePlay = async (activeSong?: Song) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs);
        if (activeSong !== undefined) {
            await addToHistory({ activeSong });
        }
    };

    const handleFav = async (song: Song) => {
        await addFavSong({ song });
        setIsFav([...isFav, song.id]);
    };
    const handleUnfav = async (song: Song) => {
        await removeFavSong(song.id);
        setIsFav([...isFav].filter((favid) => favid !== song.id));
    };

    const handleRemoveSong = async (song: Song) => {
        const mode = 'remove';
        await playlistSongEdit(id, { song, mode });
        setSongList([...songList].filter((songL) => songL.id !== song.id));
    };

    const handleAddSong = async (song: Song, plid: number) => {
        const mode = 'add';
        await playlistSongEdit(plid, { song, mode });
    };
    return (
        <Box bg="transparent">
            <Box padding="10px" marginBottom="20px">
                <Box marginBottom="20px">
                    <IconButton
                        icon={<BsFillPlayFill fontSize="30px" />}
                        colorScheme="green"
                        aria-label="play"
                        size="lg"
                        isRound
                        onClick={songs.length > 0 ? () => handlePlay() : null}
                    />
                </Box>
                {songList.length > 0 ? (
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
                                {playlist && <Th />}
                                <Th />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {songList.map((song: Song, i) => (
                                <Tr
                                    sx={{
                                        transition: 'all .3s',
                                        '&:hover': {
                                            bg: 'rgba(255,255,255,0.1)',
                                        },
                                    }}
                                    key={song.id}
                                    // onClick={() => handlePlay(song)}
                                >
                                    <Td>{i + 1}</Td>

                                    <Td
                                        cursor="pointer"
                                        onClick={() => handlePlay(song)}
                                    >
                                        {song.name}
                                    </Td>
                                    <Td>
                                        <NextLink
                                            href={{
                                                pathname: '/artist/[id]',
                                                query: { id: song.artistId },
                                            }}
                                            // passHref
                                        >
                                            {song?.artist?.name}
                                        </NextLink>
                                    </Td>
                                    <Td>
                                        {formatDate(new Date(song.createdAt))}
                                    </Td>
                                    <Td>{formatTime(song.duration)}</Td>
                                    <Td>
                                        {isFav.includes(song.id) ? (
                                            <Icon
                                                as={FiHeart}
                                                fill="#ec327a"
                                                outline="none"
                                                sx={{
                                                    transition: 'all .3s',
                                                    '&:hover': {
                                                        bg: 'rgba(255,255,255,0.1)',
                                                        fill: 'none',
                                                    },
                                                }}
                                                onClick={() => {
                                                    handleUnfav(song);
                                                }}
                                            />
                                        ) : (
                                            <Icon
                                                as={FiHeart}
                                                outline="none"
                                                sx={{
                                                    transition: 'all .3s',
                                                    '&:hover': {
                                                        bg: 'rgba(255,255,255,0.1)',
                                                        fill: '#ec327a',
                                                    },
                                                }}
                                                onClick={() => {
                                                    handleFav(song);
                                                }}
                                            />
                                        )}
                                    </Td>
                                    {playlist && (
                                        <Td>
                                            <Icon
                                                as={AiOutlineMinus}
                                                _hover={{
                                                    color: '#f70773',
                                                }}
                                                onClick={() => {
                                                    handleRemoveSong(song);
                                                }}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                icon={<MdOutlinePlaylistAdd />}
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
                                                {playlist ? (
                                                    <>
                                                        {playlists
                                                            .filter(
                                                                (
                                                                    pl: Playlist
                                                                ) =>
                                                                    pl.id !== id
                                                            )
                                                            .map(
                                                                (
                                                                    pl: Playlist
                                                                ) => (
                                                                    <MenuItem
                                                                        bg="schemeTwo.bodyPink"
                                                                        _hover={{
                                                                            bg: '#7c1847',
                                                                        }}
                                                                        key={
                                                                            pl.id
                                                                        }
                                                                        onClick={() => {
                                                                            handleAddSong(
                                                                                song,
                                                                                pl.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            pl.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {playlists.map(
                                                            (pl: Playlist) => (
                                                                <MenuItem
                                                                    key={pl.id}
                                                                    bg="schemeTwo.bodyPink"
                                                                    _hover={{
                                                                        bg: '#7c1847',
                                                                    }}
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
                                                    </>
                                                )}
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <Center
                        marginTop="3rem"
                        fontSize="3xl"
                        color="schemeTwo.textColor"
                    >
                        Empty Playlist
                    </Center>
                )}
            </Box>
        </Box>
    );
};

export default SongTable;
