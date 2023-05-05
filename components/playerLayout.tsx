import { Box } from '@chakra-ui/layout'
import Sidebar from './sidebar'
import PlayerBar from './playerBar'


const PlayerLayout = ({children} : any)=>{
    return (
        <Box width="100vw" height="100vh">
            <Box position="absolute" top="0" width="236px" left="0">
                <Sidebar />
            </Box>
            <Box position="absolute" marginLeft="250px" marginTop="108px" marginRight="50px">
                {children}
            </Box>
            <Box position="absolute" left="0" bottom="0">
                <PlayerBar />
            </Box>
        </Box>
    )
}
export default PlayerLayout;