// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '../styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

// import {Center, Text} from '@chakra-ui/layout'
import { Heading, Card, CardHeader, CardBody, CardFooter, Flex, Box, Text, Stack, Image, Center, Divider } from '@chakra-ui/react'

const Home = (props) => {
    const { data } = props;

    const newAlbums = [data.albums.items[0], data.albums.items[1], data.albums.items[3]];
    console.log(data);
    return (
        <Box>
            <Heading color="#DCD5D5">
                New Releases From Spotify
            </Heading>
            <Divider marginY="10px"/>
            <Flex columnGap="20px" align="center">
                {newAlbums.map(album => (
                    <Card as="a" height="294px" width="352px" href={album.external_urls.spotify} target='blank'>
                        <CardHeader maxH="10px">
                            <Heading size="md">{album.name}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Center>
                                <Image
                                    src={album.images[0].url}
                                    borderRadius='lg'
                                    width="200"
                                    height="200"
                                />
                            </Center>
                        </CardBody>
                        <CardFooter bg="black" height="66" display="flex" flexDirection="column" justify="center" align="center" color="white">
                                <Box>
                                    <Text fontSize="20">{album.artists[0].name}</Text>
                                </Box>
                                {/* <Box>
                                    <Text fontSize="16">Song</Text>
                                </Box> */}
                        </CardFooter>
                    </Card>
                ))}
            </Flex>
        </Box>

    )
}

export default Home

export async function getStaticProps(){
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const accessTokenData = await fetch("https://accounts.spotify.com/api/token",
        {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json());

    // console.log(accessTokenData);
    const accessToken = accessTokenData.access_token;
    // console.log(accessToken);
    const data = await fetch("https://api.spotify.com/v1/browse/new-releases?country=NP",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json());

    // console.log(data.albums.items[5]);
    // console.log(data.albums.items[5].artists[0].external_urls);

    return {
        props : {
            data: data
        }
    }
}