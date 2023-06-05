import { Box, Text, Image, Grid, GridItem, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';
import prisma from '../lib/prisma';
import { validateToken } from '../lib/auth';
import ArtistMusicLayout from '../components/artistMusicLayout';

const Music = ({ artists }) => {
    // console.log(artists);

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
            <Text fontSize="4xl" marginBottom="3rem">
                New Artists
            </Text>
            <Grid
                h="200px"
                // templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                paddingX="2rem"
                marginBottom="8rem"
            >
                {artists.slice(0, 4).map((artist: Artist) => (
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
            <Divider />
            <ArtistMusicLayout artists={artists.slice(4)} />
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

    const artists = await prisma.artist.findMany({
        where: {},
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
        },
    };
};
export default Music;
