import { Box, Button, GridItem, Image, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Artist } from '@prisma/client';
import SongTable from './songTable';

const ArtistMusicLayout = ({ artists }) => {
    return (
        <Box width="auto">
            {artists.map((artist: Artist) => (
                <Box
                    width="auto"
                    padding="1.5em"
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)"
                    gap={50}
                    _hover={{
                        boxShadow: 'dark-lg',
                    }}
                >
                    <GridItem
                        colSpan={1}
                        justifySelf="start"
                        alignSelf="center"
                    >
                        <NextLink
                            href={{
                                pathname: '/artist/[id]',
                                query: { id: artist.id },
                            }}
                            key={artist.id}
                            // passHref
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
                                alignItems="center"
                                gap={3}
                            >
                                <Image
                                    boxSize="180px"
                                    objectFit="cover"
                                    src={`/${artist.name}.jpg`}
                                    borderRadius="100%"
                                />
                                <Text
                                    color="schemeTwo.textColor"
                                    fontSize="2xl"
                                >
                                    {artist.name}
                                </Text>
                            </Box>
                        </NextLink>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <SongTable
                            songs={artist.songs.slice(0, 4)}
                            playlist={false}
                        />
                        <NextLink
                            href={{
                                pathname: '/artist/[id]',
                                query: { id: artist.id },
                            }}
                            key={artist.id}
                            // passHref
                        >
                            <Button
                                background="schemeTwo.bodyPink"
                                _hover={{
                                    background: 'schemeTwo.bodyBlue',
                                }}
                            >
                                See More..
                            </Button>
                        </NextLink>
                    </GridItem>
                    <Spacer />
                </Box>
            ))}
        </Box>
    );
};

export default ArtistMusicLayout;
