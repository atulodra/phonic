import { Box, Flex, Text } from '@chakra-ui/layout';
import Player from './player';

const PlayerBar = () => {
    return (
        <Box height="100px" width="100vw" bg="#271010" padding="10px">
            <Flex align="center">
                <Box
                    padding="20px"
                    color="#C4B1B1"
                    width="20%"
                    borderColor="#523333"
                    border="1px"
                >
                    <Text fontSize="20" color="white">
                        Song Name
                    </Text>
                    <Text fontSize="16">Artist Name</Text>
                </Box>
                <Box width="60%" color="white" marginX="5%">
                    <Player />
                </Box>
            </Flex>
        </Box>
    );
};

export default PlayerBar;
