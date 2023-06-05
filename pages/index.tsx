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
                <Grid
                    h="200px"
                    // templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={4}
                    paddingX="2rem"
                >
                    {artists.slice(0, 6).map((artist: Artist) => (
                        <GridItem
                            padding="20px"
                            // boxShadow="dark-lg"
                            justifySelf="center"
                            // bgGradient="linear(to-b,schemeTwo.bodyPink, schemeTwo.bodyBlue)"
                            // bgGradient="linear(to-b,brand.2, brand.3, brand.4)"
                            // _hover={{
                            //     bgGradient:
                            //         'linear(to-b,schemeTwo.bodyPink, schemeTwo.bodyBlue)',
                            // }}
                            _hover={{
                                boxShadow: 'dark-lg',
                            }}
                        >
                            <NextLink
                                href={{
                                    pathname: '/artist/[id]',
                                    query: { id: artist.id },
                                }}
                                // passHref
                            >
                                <Image
                                    boxSize="180px"
                                    objectFit="cover"
                                    // boxShadow="dark-lg"
                                    src={`/${artist.name}.jpg`}
                                    borderRadius="100%"
                                    // borderRadius={roundImage ? '100%' : '3px'}
                                    // fallbackSrc="https://via.placeholder.com/150"
                                    fallbackSrc="https://placekitten.com/408/287"
                                />
                                <Box marginTop="20px">
                                    <Text fontSize="large">{artist.name}</Text>
                                    <Text fontSize="x-small">Artist</Text>
                                </Box>
                                {/* </Flex> */}
                            </NextLink>
                        </GridItem>
                    ))}
                </Grid>
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
