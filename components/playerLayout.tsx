import { Box } from '@chakra-ui/layout';
import Sidebar from './sidebar';
import PlayerBar from './playerBar';
import NavBar from './navBar';

const PlayerLayout = ({ children }: any) => {
    return (
        <Box height="100vh" overflow="auto">
            <Box position="absolute" top="0" width="236px" left="0">
                <Sidebar />
            </Box>
            <Box
                position="absolute"
                right="0"
                top="0"
                // marginLeft="236px"
                height="100px"
                width="calc(100vw - 236px)"
                // paddingTop="20px"
            >
                <NavBar />
            </Box>
            <Box marginLeft="240px" marginTop="100px" marginRight="10px">
                <Box height="calc(100vh - 200px)" color="white">
                    {children}
                </Box>
            </Box>
            <Box
                position="absolute"
                left="0"
                bottom="0"
                width="100%"
                height="100px"
            >
                <PlayerBar />
            </Box>
        </Box>
    );
};
export default PlayerLayout;
