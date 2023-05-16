import NextImage  from 'next/image'
import NextLink from 'next/link'
import {
    Box,
    List,
    ListItem,
    // ListIcon,
    Divider,
    // Center,
    LinkBox,
    LinkOverlay,
    // Stack,
    Text
} from '@chakra-ui/layout'

import {Icon} from '@chakra-ui/react'


import {
    FiActivity,
    FiHome,
    FiMusic,
    FiHeart,
    FiRadio,
    FiPlusCircle
} from 'react-icons/fi'

import { usePlaylist } from '../lib/hooks';

const navMenu = [
    {
      name: 'Home',
      icon: FiHome,
      route: '/',
    },
    {
      name: 'Music',
      icon: FiMusic,
      route: '/music',
    },
    {
      name: 'Podcast',
      icon: FiRadio,
      route: '/podcast',
    },
]

const libraryMenu = [
    {
      name: 'Favourites',
      icon: FiHeart,
      route: '/favourites',
    },
    {
      name: 'Recently Played',
      icon: FiActivity,
      route: '/recently-played',
    },
]

const playlistsMenu = [
    {
        name: 'Create Playlist',
        icon: FiPlusCircle,
        route: '/playlists',
    }
]

// const playlists = new Array(30).fill(1).map((_, i)=>`Playlist ${i+1}`);

const Sidebar = () => {
    const { playlists } = usePlaylist()
    return (
        <Box
            width="100%"
            height="calc(100vh - 100px)"
            // bg="black"
            color="#D1B5B5"
            paddingX="5px"
            display="flex"
            flexDirection="row"
        >
            <Box paddingY="20px" height="100%">
                <Box
                    // paddingTop="20px"
                    display="flex"
                    paddingBottom="60px"
                    paddingX="20px"
                    _hover={{filter : 'drop-shadow(0 0 0.75rem #0373a3)'}}
                >
                    {/* <NextImage src="/Artboard 1.png" height={30} width={60} alt="phonic-logo"/> */}
                    <Text
                    fontFamily="Corbel"
                    fontSize='50px'
                    fontWeight="Bold"
                    color='white'
                    filter="drop-shadow(0 0 0.75rem crimson)"
                >
                    phonic
                </Text>
                </Box>
                <Box marginBottom="10px">
                    <List spacing={5}>
                        {navMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                <LinkBox>
                                        <LinkOverlay
                                            as={NextLink}
                                            // color="#D1B5B5"
                                            href={menu.route}
                                            marginRight="30px"
                                            display="flex"
                                            columnGap="15px"
                                            alignItems="center"
                                            // justifyContent="center"
                                            _hover={{color: "#F08A6A", textShadow:'1px 1px #ff0000'}}
                                            passHref
                                        >
                                            <Icon as={menu.icon} />
                                            {menu.name}
                                        </LinkOverlay>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* <Divider color="gray.800" /> */}
                <Text fontSize='16px' fontWeight="bold"  color='white' paddingX="20px" marginBottom="10px" marginTop="5px">
                    LIBRARY
                </Text>
                <Box marginBottom="20px">
                    <List spacing={5}>
                        {libraryMenu.map(menu => (
                            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                            <LinkBox>
                                {/* <NextLink href={menu.route} passHref> */}
                                    <LinkOverlay
                                        as={NextLink}
                                        // color="#D1B5B5"
                                        href={menu.route}
                                        marginRight="30px"
                                        display="flex"
                                        columnGap="15px"
                                        alignItems="center"
                                        // justifyContent="center"
                                        _hover={{color: "#F08A6A", textShadow:'1px 1px #ff0000'}}
                                        passHref
                                    >
                                        <Icon as={menu.icon} />
                                        {menu.name}
                                    </LinkOverlay>
                                {/* </NextLink> */}
                            </LinkBox>
                        </ListItem>
                        ))}
                    </List>
                </Box>
                {/* <Divider color="gray.800" /> */}
                <Text fontSize='16px' fontWeight="bold"  color='white' paddingX="20px" marginBottom="10px" marginTop="5px">
                    PLAYLISTS
                </Text>
                <Box marginBottom="5px" >
                    <LinkBox paddingX="20px" fontSize="16px">
                        <LinkOverlay
                            as={NextLink}
                            // color="#D1B5B5"
                            href={playlistsMenu[0].route}
                            marginRight="30px"
                            display="flex"
                            columnGap="15px"
                            alignItems="center"
                            // justifyContent="center"
                            _hover={{color: "#F08A6A", textShadow:'1px 1px #ff0000'}}
                            passHref
                        >
                            <Icon as={playlistsMenu[0].icon}/>
                            {playlistsMenu[0].name}
                        </LinkOverlay>
                    </LinkBox>
                </Box>
                <Box he ight="25%" overflowY="auto" paddingY="20px" width="90%">
                    <List spacing={3}>
                        {playlists.map(playlist=>(
                            <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
                                    <LinkBox>
                                            <LinkOverlay
                                                as={NextLink}
                                                // color="#D1B5B5"
                                                href="/"
                                                marginRight="30px"
                                                display="flex"
                                                columnGap="15px"
                                                alignItems="center"
                                                // justifyContent="center"
                                                _hover={{color: "#F08A6A", textShadow:'1px 1px #ff0000'}}
                                                passHref
                                            >
                                                {playlist.name}
                                            </LinkOverlay>
                                    </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <Divider orientation='vertical' color="#552C3D"/>
        </Box>
    )
}

export default Sidebar;