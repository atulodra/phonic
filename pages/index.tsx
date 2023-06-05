// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '../styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

// import {Center, Text} from '@chakra-ui/layout'
import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Box,
    Text,
    Stack,
    Image,
    Center,
    Divider,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Artist } from '@prisma/client';
import prisma from '../lib/prisma';
import PagesLayout from '../components/pagesLayout';
import { useMe } from '../lib/hooks';
import UserLayout from '../components/userLayout';
import GridArtists from '../components/gridArtist';

// const Home = (props: { spotifyData: any; artists: any }) => {
const Home = (props: { artists: any }) => {
    // const { spotifyData, artists } = props;
    const { artists } = props;
    const { user, isLoading } = useMe();

    // const newAlbums = [
    //     spotifyData.albums.items[0],
    //     spotifyData.albums.items[1],
    //     spotifyData.albums.items[3],
    // ];
    // console.log(data);
    return (
        <UserLayout
            subtitle="profile"
            title={`${user?.firstName} ${user?.lastName}`}
            description={`${user?.playlistsCount} public playlists`}
            // image="../me2-no-bg.png"
            isLoading={isLoading}
        >
            <Divider />
            <Box
                color="white"
                paddingX="40px"
                marginTop="40px"
                marginBottom="3rem"
            >
                <Box marginBottom="40px">
                    <Text fontSize="2xl" fontWeight="bold">
                        Top artist this month
                    </Text>
                    {/* <Text fontSize="md">only visible to you</Text> */}
                </Box>
                <GridArtists artists={artists.slice(0, 6)} />
            </Box>
            {/* <Box>
                <Heading color="#DCD5D5">New Releases From Spotify</Heading>
                <Divider marginY="10px" />
                <Flex columnGap="20px" align="center">
                    {newAlbums.map((album) => (
                        <Card
                            as="a"
                            height="294px"
                            width="352px"
                            href={album.external_urls.spotify}
                            target="blank"
                        >
                            <CardHeader maxH="10px">
                                <Heading size="md">{album.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Center>
                                    <Image
                                        src={album.images[0].url}
                                        borderRadius="lg"
                                        width="200"
                                        height="200"
                                    />
                                </Center>
                            </CardBody>
                            <CardFooter
                                bg="black"
                                height="66"
                                display="flex"
                                flexDirection="column"
                                justify="center"
                                // align="center"
                                color="white"
                            >
                                <Box>
                                    <Text fontSize="20">
                                        {album.artists[0].name}
                                    </Text>
                                </Box>
                            </CardFooter>
                        </Card>
                    ))}
                </Flex>
            </Box> */}
        </UserLayout>
    );
};

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({});

    // const clientId = process.env.SPOTIFY_CLIENT_ID;
    // const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    // const accessTokenData = await fetch(
    //     'https://accounts.spotify.com/api/token',
    //     {
    //         method: 'POST',
    //         body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     }
    // ).then((response) => response.json());

    // const accessToken = accessTokenData.access_token;
    // const spotifyData = await fetch(
    //     'https://api.spotify.com/v1/browse/new-releases?country=NP',
    //     {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     }
    // ).then((response) => response.json());

    // console.log(spotifyData.albums.items[5]);

    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
            // spotifyData,
        },
    };
};

export default Home;

// export async function getStaticProps(){
//     const clientId = process.env.SPOTIFY_CLIENT_ID;
//     const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//     const accessTokenData = await fetch("https://accounts.spotify.com/api/token",
//         {
//             method: 'POST',
//             body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then(response => response.json());

//     // console.log(accessTokenData);
//     const accessToken = accessTokenData.access_token;
//     // console.log(accessToken);
//     const spotifyData = await fetch("https://api.spotify.com/v1/browse/new-releases?country=NP",
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         }).then(response => response.json());

//     console.log(spotifyData.albums.items[5]);
//     // console.log(data.albums.items[5].artists[0].external_urls);

//     const artists = await prisma.artist.findMany({})

//     return {
//         props : {
//             spotifyData: spotifyData
//         }
//     }
// }
