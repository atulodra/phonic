import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
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
                        // marginBottom="20px"
                    >
                        <Box marginRight="1rem">
                            <Image
                                boxSize="60px"
                                src={`/${activeSong.artist.name}.jpg`}
                                objectFit="cover"
                                border="1px solid white"
                            />
                        </Box>
                        <Box>
                            <Text fontSize="20">{activeSong.name}</Text>
                            <Text fontSize="16">{activeSong.artist.name}</Text>
                        </Box>
                    </Box>
                ) : null}
                <Box width="60%" color="white" marginX="5%">
                    {activeSong ? (
                        <Player songs={songs} activeSong={activeSong} />
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
};

export default PlayerBar;
