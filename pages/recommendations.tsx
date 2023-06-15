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
} from '@chakra-ui/react';
import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import ShowArtists from '../components/showArtists';
import SongTable from '../components/songTable';
import { useFavs } from '../lib/hooks';

const Recommendations = ({ recArtists, recSongs, myFavGenres }) => {
    const { favSongs } = useFavs();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const uniqueFavGenres = myFavGenres.filter((x, i, a) => a.indexOf(x) === i);
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
                            {favSongs.length === 0 ? (
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
                                        Having favourites leads to more tailored
                                        recommnedation experience
                                    </Text>
                                </Center>
                            ) : (
                                <Box>
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
                                </Box>
                            )}
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

    console.log('myfavsIds:\n', myFavIds);

    //* Get Unique Artist Ids of favourited songs
    const myFavedArtistsIds = myFavs
        .map((myFav) => myFav.song.artist.id)
        .filter((x, i, a) => a.indexOf(x) === i);
    console.log('myFavedArtistsIds:\n', myFavedArtistsIds);

    //* For Modal
    const otherUsers = users.filter((users) => users.id !== user.id);
    console.log('Other Users:\n', otherUsers);

    //* Get favourites of the rest of the users excluding current user, could have done it earlier
    const otherUsersFavs = users
        .filter((indiUser) => indiUser.id !== user.id)
        .map((indiUser) => indiUser.favourite);
    console.log('OtherUsersFavs:\n', otherUsersFavs);

    //* Get an array of array of song ids of other users favourited songs
    const otherUsersFavsIds = otherUsersFavs.map((of) =>
        of.map((o) => o.songId)
    );
    console.log('otherUsersFavsIds', otherUsersFavsIds);

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

    //* Get genres of artists associated with favourite songs of the current user
    const myFavGenres = myFavs.map((mf) => mf.song.artist.genres).flat(1);
    console.log('myFavGenres:\n', myFavGenres);

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

    console.log('songIdsViaGenres:\n', songIdsViaGenres);

    //* Find the common song Ids between the songs gotten by other users and songs gotten via current favourited songs' artists genre
    const commonIds = filteredIds.filter((fid) =>
        songIdsViaGenres.includes(fid)
    );
    console.log('Common IDs:\n', commonIds);

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
        },
    };
};

export default Recommendations;
