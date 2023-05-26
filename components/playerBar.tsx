import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
import Player from './player';

const PlayerBar = () => {
    const songs = useStoreState((state: any) => state.activeSongs);
    const activeSong = useStoreState((state: any) => state.activeSong);

    return (
        <Box height="100%" bg="schemeTwo.barBlueNew" padding="10px">
            <Flex align="center">
                {activeSong ? (
                    <Center
                        padding="0.8rem"
                        color="schemeTwo.textColor"
                        width="20%"
                        borderColor="schemeTwo.songArtistInfoBorder"
                        border="1px"
                        flexDirection="column"
                        borderRadius="0.2rem"
                        // marginBottom="20px"
                    >
                        <Text fontSize="20">{activeSong.name}</Text>
                        <Text fontSize="16">{activeSong.artist.name}</Text>
                    </Center>
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
