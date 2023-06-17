import { useState } from 'react';
import { Box, Center, Divider, Text } from '@chakra-ui/layout';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import {
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react';
import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import ShowArtists from '../components/showArtists';
import SongTable from '../components/songTable';
import { useFavs } from '../lib/hooks';

const Recommendations = ({
    recArtists,
    recSongs,
    myFavGenres,
    modalRestOtherUsersFavs,
    modalSongs,
}) => {
    const [viaGenre, setViaGenre] = useState(false);
    const { favSongs } = useFavs();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const uniqueFavGenres = myFavGenres.filter((x, i, a) => a.indexOf(x) === i);

    if (favSongs.length && modalRestOtherUsersFavs.length === 0) {
        setViaGenre(true);
    }

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
            <Box display="flex" justifyContent="space-between">
                <Text fontSize="4xl" color="schemeTwo.textColor">
                    For You...
                </Text>
                <Button
                    onClick={onOpen}
                    background="schemeTwo.bodyPink"
                    _hover={{ background: 'schemeTwo.bodyBlue' }}
                >
                    Details
                </Button>

                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    scrollBehavior="inside"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Recommendation Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontSize="md">
                                Genres from favourited songs:{' '}
                            </Text>
                            <ul>
                                {uniqueFavGenres.map((genre) => (
                                    <li>
                                        <Icon as={BsDot} />
                                        {genre}
                                    </li>
                                ))}
                            </ul>
                            <Center
                                border="2px"
                                borderColor="schemeTwo.bodyPink"
                                marginBottom="2rem"
                                borderRadius="0.4rem"
                                gap={3}
                                color="schemeTwo.bodyPink"
                                padding="0.6rem"
                            >
                                <Icon as={AiFillExclamationCircle} />
                                <Text fontSize="md">
                                    Artists are generated using these Genres!
                                </Text>
                            </Center>
                            <Divider colorScheme="black" marginBottom="1rem" />
                            {favSongs.length === 0 ? (
                                <>
                                    <Center
                                        border="2px"
                                        borderColor="schemeTwo.bodyPink"
                                        marginBottom="2rem"
                                        borderRadius="0.4rem"
                                        gap={3}
                                        color="schemeTwo.bodyPink"
                                        padding="0.6rem"
                                    >
                                        <Icon as={AiFillExclamationCircle} />
                                        <Text fontSize="md">
                                            You have no favourited songs! Having
                                            favourites leads to more tailored
                                            recommnendation experience
                                        </Text>
                                    </Center>
                                    <Center>
                                        Recommendations generated using{' '}
                                    </Center>
                                    <Center color="red">
                                        COMBINED HISTORY AND FAVOURITES
                                    </Center>
                                    <Center>of all users</Center>
                                </>
                            ) : null}
                            {modalRestOtherUsersFavs.length ? (
                                <Box>
                                    <Text fontSize="md">
                                        Songs from Other Users:
                                    </Text>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>User Id</Th>
                                                <Th>Songs</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {modalRestOtherUsersFavs.map(
                                                (mrouf, i) => (
                                                    <Tr
                                                        key={
                                                            Object.keys(
                                                                mrouf
                                                            )[0]
                                                        }
                                                    >
                                                        <Td>
                                                            {
                                                                Object.keys(
                                                                    mrouf
                                                                )[0]
                                                            }
                                                        </Td>

                                                        <Td>
                                                            <ul>
                                                                {Object.values(
                                                                    modalSongs[
                                                                        i
                                                                    ]
                                                                ).map((m) => (
                                                                    <li>
                                                                        {m.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {/* {Object.values(
                                                                mrouf
                                                            )} */}
                                                        </Td>
                                                    </Tr>
                                                )
                                            )}
                                        </Tbody>
                                    </Table>
                                </Box>
                            ) : null}
                            {viaGenre ? (
                                <>
                                    <Center
                                        border="2px"
                                        borderColor="schemeTwo.bodyPink"
                                        marginBottom="2rem"
                                        borderRadius="0.4rem"
                                        gap={3}
                                        color="schemeTwo.bodyPink"
                                        padding="0.6rem"
                                    >
                                        <Icon as={AiFillExclamationCircle} />
                                        <Text marginBottom="1rem">
                                            No other user has favourited at
                                            least two from your favourites!
                                        </Text>
                                    </Center>

                                    <Center>
                                        Recommendations generated using{' '}
                                    </Center>
                                    <Center color="red">GENRES</Center>
                                    <Center>
                                        of artists of current favourited songs.
                                    </Center>
                                </>
                            ) : null}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <ShowArtists artists={recArtists} title="Recommended Artists" />
            <Divider />
            <Text paddingX="2rem" marginY="3rem" fontSize="3xl">
                Songs
            </Text>
            <SongTable songs={recSongs} playlist={false} />
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
    // const totalFavs = await prisma.favourite.findMany({});

    let recSongs;
    let recArtists;
    //* Get All The Favourites of All the Users
    const users = await prisma.user.findMany({
        select: {
            id: true,
            favourite: true,
        },
    });

    //* Get Favourites of Current User
    const myFavs = await prisma.favourite.findMany({
        where: {
            userId: user.id,
        },
        select: {
            songId: true,
            song: {
                select: {
                    artist: {
                        select: {
                            genres: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });

    console.log('My Favs:\n', myFavs);

    //* Get the Favourited Song IDs of current user
    const myFavIds = myFavs.map((myFav) => myFav.songId);

    // console.log('myfavsIds:\n', myFavIds);

    //* Get Unique Artist Ids of favourited songs
    const myFavedArtistsIds = myFavs
        .map((myFav) => myFav.song.artist.id)
        .filter((x, i, a) => a.indexOf(x) === i);
    // console.log('myFavedArtistsIds:\n', myFavedArtistsIds);

    //* Get favourites of the rest of the users excluding current user, could have done it earlier
    const otherUsersFavs = users
        .filter((indiUser) => indiUser.id !== user.id)
        .map((indiUser) => indiUser.favourite);
    // console.log('OtherUsersFavs:\n', otherUsersFavs);

    //* Get an array of array of song ids of other users favourited songs
    const otherUsersFavsIds = otherUsersFavs.map((of) =>
        of.map((o) => o.songId)
    );
    // console.log('otherUsersFavsIds', otherUsersFavsIds);

    // ********************************************************/
    // const test = otherUsersFavs.map((of) => {
    //     if (of.some((o) => o.songId === myFavIds[2])) {
    //         return of;
    //     }
    // });
    // console.log('test:\n', test);
    // ********************************************************/

    //* Flatten the array of arrays to get song Ids of favourites of other users if the user has at least two songs favourited
    //* that the current user has
    const filteredIds = otherUsersFavsIds
        .filter((ofId) => ofId.filter((x) => myFavIds.includes(x)).length === 2)
        .flat(1);
    console.log('filteredIds:\n', filteredIds);

    // ! For Modal
    const modalTotalOtherUsersFavs = [];
    otherUsersFavs.forEach((fou) => {
        const re = fou.reduce((acc, { userId, songId }) => {
            acc[userId] ??= { songs: [] };
            acc[userId].songs.push(songId);
            return acc;
        }, {});
        modalTotalOtherUsersFavs.push(re);
    });
    // console.log('modalTotalOtherUsersFavs:\n');

    console.dir(modalTotalOtherUsersFavs, { depth: null });

    const modalFilteredOtherUsersFavs = modalTotalOtherUsersFavs.filter(
        (mtuf) =>
            Object.values(mtuf)[0]?.songs.filter((x) => myFavIds.includes(x))
                .length === 2
    );

    // console.log('modalFilteredOtherUsersFavs:\n');
    // console.dir(modalFilteredOtherUsersFavs, { depth: null });

    const modalRestOtherUsersFavs = modalFilteredOtherUsersFavs.filter(
        (t) =>
            (t[Object.keys(t)[0]] = Object.values(t)[0].songs.filter(
                (song) => !myFavIds.includes(song)
            ))
    );
    // console.log('modalRestOtherUsersFavs:\n');

    // console.dir(modalRestOtherUsersFavs, { depth: null });

    const modalSongs = [];

    modalRestOtherUsersFavs.forEach(async (t) => {
        const indiSongArr = await prisma.song.findMany({
            where: {
                OR: Object.values(t)[0].map((song) => ({
                    id: song,
                })),
            },
            select: {
                name: true,
            },
        });
        // console.log(indiSongArr);

        modalSongs.push(indiSongArr);
    });

    // const test = [...modalFilteredOtherUsersFavs];
    // console.log('Test:\n');
    // console.dir(test, { depth: null });
    // test.forEach(async (t) => {
    //     t[Object.keys(t)[0]] = await prisma.song.findMany({
    //         where: {
    //             OR: Object.values(t)[0].map((song) => ({
    //                 id: song,
    //             })),
    //         },
    //         select: {
    //             name: true,
    //         },
    //     });
    // });

    // console.log('Test:\n');
    // console.dir(test, { depth: null });

    // ! -------------------------------------------------------------------

    //* Get genres of artists associated with favourite songs of the current user
    const myFavGenres = myFavs.map((mf) => mf.song.artist.genres).flat(1);
    // console.log('myFavGenres:\n', myFavGenres);

    //* Get other artists that have at least one of the genre tag associated with song favourited by current user
    const artistsViaGenres = await prisma.artist.findMany({
        where: {
            OR: myFavGenres?.map((genre) => ({
                genres: {
                    has: genre,
                },
            })),
            NOT: myFavedArtistsIds.map((aid) => ({
                id: aid,
            })),
        },
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
    });

    // console.log(
    //     'arstistsViaGenre:\n',
    //     artistsViaGenres.map((a) => a.id)
    // );

    //* Get the songs of artists that have at least onf genre tag associated
    const songIdsViaGenres = artistsViaGenres
        .map((artist) => artist.songs)
        .flat(1)
        .map((song) => song.id);

    // console.log('songIdsViaGenres:\n', songIdsViaGenres);

    //* Find the common song Ids between the songs gotten by other users and songs gotten via current favourited songs' artists genre
    const commonIds = filteredIds.filter((fid) =>
        songIdsViaGenres.includes(fid)
    );
    // console.log('Common IDs:\n', commonIds);

    //* Get the songs with the help of common song Ids
    const reInforcedArtists = await prisma.song.findMany({
        where: {
            OR: commonIds.map((cid) => ({
                id: cid,
            })),
        },
        select: {
            artistId: true,
            artist: true,
        },
    });
    console.log('reInforcedArtists:\n', reInforcedArtists);

    //* Get unique artists from the list of songs
    const reInforcedArtistsIds = reInforcedArtists
        .map((a) => a.artistId)
        .filter((x, i, a) => a.indexOf(x) === i);
    console.log('reInforcedArtistsIds:\n', reInforcedArtistsIds);
    if (myFavs.length === 0) {
        const his = await prisma.history.findMany({});
        const hisSongs = his.map((h) => h.songId);
        const favs = await prisma.favourite.findMany({});
        const favsSongs = favs.map((f) => f.songId);
        const totalSongs = [...hisSongs, ...favsSongs];
        const uniqueSongs = totalSongs.filter((x, i, a) => a.indexOf(x) === i);

        recSongs = await prisma.song.findMany({
            where: {
                OR: uniqueSongs.map((sid) => ({
                    id: sid,
                })),
            },
            include: {
                artist: true,
            },
        });

        recArtists = recSongs
            .map((song) => song.artist)
            .filter((x, i, a) => a.findIndex((item) => item.id === x.id) === i);
    } else if (filteredIds.length === 0) {
        recArtists = artistsViaGenres;
        recSongs = artistsViaGenres.map((artist) => artist.songs).flat(1);
    } else {
        // * These artists to rec
        recArtists = await prisma.artist.findMany({
            where: {
                OR: reInforcedArtistsIds.map((reid) => ({
                    id: reid,
                })),
            },
            include: {
                songs: {
                    include: {
                        artist: true,
                    },
                },
            },
        });

        // * These songs to rec - take filteredId and exclude current favourited songs' Ids
        const recSongsIds = filteredIds
            .filter((x, i, a) => a.indexOf(x) === i)
            .filter((filid) => !myFavIds.includes(filid));

        recSongs = await prisma.song.findMany({
            where: {
                OR: recSongsIds.map((rsid) => ({
                    id: rsid,
                })),
            },
            include: {
                artist: true,
            },
        });
    }

    return {
        props: {
            recArtists: JSON.parse(JSON.stringify(recArtists)),
            recSongs: JSON.parse(JSON.stringify(recSongs)),
            myFavGenres: JSON.parse(JSON.stringify(myFavGenres)),
            modalRestOtherUsersFavs: JSON.parse(
                JSON.stringify(modalRestOtherUsersFavs)
            ),
            modalSongs: JSON.parse(JSON.stringify(modalSongs)),
        },
    };
};

export default Recommendations;
