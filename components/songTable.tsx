import { Box } from '@chakra-ui/layout';
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
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Song } from '@prisma/client';
import { useStoreActions } from 'easy-peasy';
import { FiHeart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { formatDate, formatTime } from '../lib/formatters';
// import { useMe } from '../lib/hooks';
import { editFavSong } from '../lib/mutations';

type Dict = { [key: number]: Boolean };

const SongTable = ({ songs, favSongs }) => {
    const playSongs = useStoreActions((store) => store.changeActiveSongs);
    const setActiveSong = useStoreActions((store) => store.changeActiveSong);

    const favourited: Dict = {};
    // console.log(favSongs);
    // console.log(Array.isArray(favSongs));

    // console.log(JSON.stringify(favSongs[0]) === JSON.stringify(songs[52]));

    // songs.forEach((song: Song) => {
    //     favSongs?.forEach((favSong) => {
    //         if (favSong.name === song.name) {
    //             favourited[song.id] = true;
    //         } else {
    //             favourited[song.id] = false;
    //         }
    //     });
    // });
    songs.forEach((song) => {
        if (song.userId === null) {
            favourited[song.id] = false;
        } else {
            favourited[song.id] = true;
        }
    });
    console.log(favourited);

    const [isFav, setIsFav] = useState(favourited);
    console.log(isFav);

    const handlePlay = (activeSong?) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs);
    };

    const handleFav = async (song) => {
        const action = 'Add';
        await editFavSong({ song, action });
        setIsFav((prevFav) => ({ ...prevFav, [song.id]: true }));
    };
    const handleUnfav = async (song) => {
        const action = 'Remove';
        await editFavSong({ song, action });
        setIsFav((prevFav) => ({ ...prevFav, [song.id]: false }));
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
                            <Th>Favourite</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {songs.map((song: Song, i) => (
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
                                <Td>{formatDate(new Date(song.createdAt))}</Td>
                                <Td>{formatTime(song.duration)}</Td>
                                <Td>
                                    {isFav[song.id] ? (
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
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default SongTable;
