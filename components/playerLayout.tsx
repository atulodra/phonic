import { Box } from '@chakra-ui/layout'
import Sidebar from './sidebar'
import PlayerBar from './playerBar'


const PlayerLayout = ({children} : any)=>{
    return (
        <Box width="100vw" height="100vh" overflow="auto">
            <Box position="absolute" top="0" width="236px" left="0">
                <Sidebar />
            </Box>
            <Box marginLeft="236px" marginTop="100px" marginRight="20px">
                    <Box
                        height="calc(100vh - 200px)"
                        color="white"
                    >
                        {children}
                    </Box>
            </Box>
            <Box position="absolute" left="0" bottom="0">
                <PlayerBar />
            </Box>
        </Box>
    )
}
export default PlayerLayout;