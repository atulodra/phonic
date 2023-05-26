import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import Player from './player';

const PlayerBar = () => {
    return (
        <Box height="100%" bg="#271010" padding="10px">
            <Flex align="center">
                <Center
                    padding="0.8rem"
                    color="#C4B1B1"
                    width="20%"
                    borderColor="#523333"
                    border="1px"
                    flexDirection="column"
                    // marginBottom="20px"
                >
                    <Text fontSize="20" color="white">
                        Song Name
                    </Text>
                    <Text fontSize="16">Artist Name</Text>
                </Center>
                <Box width="60%" color="white" marginX="5%">
                    <Player />
                </Box>
            </Flex>
        </Box>
    );
};

export default PlayerBar;
