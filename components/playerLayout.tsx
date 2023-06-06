import { Box } from '@chakra-ui/layout';
// import { Skeleton } from '@chakra-ui/react';
import Sidebar from './sidebar';
import PlayerBar from './playerBar';
import NavBar from './navBar';

const PlayerLayout = ({ children }: any) => {
    return (
        <Box height="100vh" overflow="auto" display='flex'>
            <Box>
                <Sidebar />
            </Box>
            <Box  marginLeft='10px' marginRight="10px" flex='1'>
                <Box height="calc(100vh - 200px)" color="white">
                <NavBar />
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
