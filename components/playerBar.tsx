import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useStoreState } from 'easy-peasy';
import { Song } from '@prisma/client';
import Player from './player';

const PlayerBar = () => {
    const songs = useStoreState((state: any) => state.activeSongs);
    const activeSong = useStoreState((state: any) => state.activeSong);
    // console.log(activeSong.artist.img);

    return (
        <Box height="100%" bg="schemeTwo.barBlueNew" padding="10px">
            <Flex align="center">
                {activeSong ? (
                    <Box
                        padding="0.8rem"
                        color="schemeTwo.textColor"
                        width="20%"
                        borderColor="schemeTwo.songArtistInfoBorder"
                        border="1px"
                        display="flex"
                        flexDirection="row"
                        borderRadius="0.2rem"
                        gap="0.8rem"
                        // position="relative"
                        // marginBottom="20px"
                    >
                        <Box
                            marginRight="1rem"
                            justifySelf="flex-start"
                            // bottom="8px"
                            // position="absolute"
                        >
                            <NextLink
                                href={{
                                    pathname: '/artist/[id]',
                                    query: { id: activeSong.artist.id },
                                }}
                                // passHref
                            >
                                <Image
                                    boxSize="60px"
                                    src={`/${activeSong.artist.name}.jpg`}
                                    objectFit="cover"
                                    border="1px solid white"
                                />
                            </NextLink>
                        </Box>
                        <Box
                            justifySelf="flex-end"
                            overflow="hidden"
                            // marginLeft="5rem"
                        >
                            <Box
                                overflow="hidden"
                                wordBreak="break-all"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                            >
                                <Text fontSize="18">{activeSong.name}</Text>
                            </Box>
                            <NextLink
                                href={{
                                    pathname: '/artist/[id]',
                                    query: { id: activeSong.artist.id },
                                }}
                                // passHref
                            >
                                <Text fontSize="14">
                                    {activeSong.artist.name}
                                </Text>
                            </NextLink>
                        </Box>
                    </Box>
                ) : null}
                <Box width="80%" color="white" marginX="5%">
                    {activeSong ? (
                        <Player songs={songs} activeSong={activeSong} />
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
};

export default PlayerBar;
