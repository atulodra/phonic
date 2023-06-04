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
    Text,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Song } from '@prisma/client';
import { useStoreActions } from 'easy-peasy';
import { FiHeart } from 'react-icons/fi';
import { FC, useEffect, useState } from 'react';
import { formatDate, formatTime } from '../lib/formatters';
import {
    addFavSong,
    addToHistory,
    removeFavSong,
    removeSongPlaylist,
} from '../lib/mutations';
// import { useMe } from '../lib/hooks';
import { useFavs, useMe } from '../lib/hooks';

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

    const [isFav, setIsFav] = useState([]);
    const [songList, setSongList] = useState([]);
    const { favSongs, isLoading, isError } = useFavs();
    useEffect(() => {
        const favSongsId = favSongs.map((favSong: Song) => favSong.id);
        setIsFav([...favSongsId]);
        setSongList([...songs]);
    }, [favSongs, songs]);

    const handlePlay = (activeSong?: Song) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs);
        // await addToHistory({ activeSong });
    };

    const handleFav = async (song: Song) => {
        await addFavSong({ song });
        setIsFav([...isFav, song.id]);
    };
    const handleUnfav = async (song: Song) => {
        await removeFavSong(song.id);
        setIsFav([...isFav].filter((id) => id !== song.id));
    };

    const handleRemoveSong = async (song: Song) => {
        await removeSongPlaylist(id, { song });
        setSongList([...songList].filter((songL) => songL.id !== song.id));
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
                                    cursor="cursor"
                                    // onClick={() => handlePlay(song)}
                                >
                                    <Td>{i + 1}</Td>
                                    <Td onClick={() => handlePlay(song)}>
                                        {song.name}
                                    </Td>
                                    <Td>{song?.artist?.name}</Td>
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
                                        <Td
                                            onClick={() => {
                                                handleRemoveSong(song);
                                            }}
                                        >
                                            {' '}
                                            -{' '}
                                        </Td>
                                    )}
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
