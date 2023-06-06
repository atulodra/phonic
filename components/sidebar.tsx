import NextImage from 'next/image';
import NextLink from 'next/link';

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
    Text,
    HStack,
} from '@chakra-ui/layout';

import { Icon } from '@chakra-ui/react';

import {
    FiActivity,
    FiHome,
    FiMusic,
    FiHeart,
    // FiRadio,
    // FiPlusCircle,
} from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';

import { MdHistory } from 'react-icons/md';

import { BsMusicNoteList } from 'react-icons/bs';

import { Playlist } from '@prisma/client';
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
        name: 'Genres',
        icon: BiCategoryAlt,
        route: '/genres',
    },
];

const libraryMenu = [
    {
        name: 'Favourites',
        icon: FiHeart,
        route: '/favourites',
    },
    {
        name: 'Recently Played',
        icon: MdHistory,
        route: '/history',
    },
    {
        name: 'Recommendations',
        icon: FiActivity,
        route: '/recommendations',
    },
];

const playlistsMenu = [
    {
        name: 'Your Playlists',
        icon: BsMusicNoteList,
        route: '/playlists',
    },
];

const Sidebar = () => {
    const { playlists } = usePlaylist();
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
            <Box paddingY="15px" height="100%">
                <HStack
                    // paddingTop="20px"
                    display="flex"
                    paddingBottom="60px"
                    paddingX="20px"
                    // filter="drop-shadow(0 0 0.14rem crimson)"
                    _hover={{ filter: 'drop-shadow(0 0 0.75rem #0373a3)' }}
                >
                    <NextImage
                        src="/Asset 9 1.svg"
                        height={50}
                        width={50}
                        alt="phonic-logo"
                    />
                    <Text
                        fontFamily="Futura"
                        fontSize="36px"
                        fontWeight="Bold"
                        color="white"
                    >
                        Phonic
                    </Text>
                </HStack>
                <Box marginBottom="10px">
                    <List spacing={5}>
                        {navMenu.map((menu) => (
                            <ListItem
                                paddingX="20px"
                                fontSize="16px"
                                key={menu.name}
                            >
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
                                        _hover={{
                                            color: '#F08A6A',
                                            textShadow: '1px 1px #ff0000',
                                        }}
                                        // passHref
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
                <Text
                    fontSize="16px"
                    fontWeight="bold"
                    color="white"
                    paddingX="20px"
                    marginBottom="10px"
                    marginTop="5px"
                >
                    LIBRARY
                </Text>
                <Box marginBottom="20px">
                    <List spacing={5}>
                        {libraryMenu.map((menu) => (
                            <ListItem
                                paddingX="20px"
                                fontSize="16px"
                                key={menu.name}
                            >
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
                                        _hover={{
                                            color: '#F08A6A',
                                            textShadow: '1px 1px #ff0000',
                                        }}
                                        // passHref
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
                <Text
                    fontSize="16px"
                    fontWeight="bold"
                    color="white"
                    paddingX="20px"
                    marginBottom="10px"
                    marginTop="5px"
                >
                    PLAYLISTS
                </Text>
                <Box marginBottom="5px">
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
                            _hover={{
                                color: '#F08A6A',
                                textShadow: '1px 1px #ff0000',
                            }}
                            // passHref
                        >
                            <Icon as={playlistsMenu[0].icon} />
                            {playlistsMenu[0].name}
                        </LinkOverlay>
                    </LinkBox>
                </Box>
                <Box
                    height="27%"
                    overflowY="auto"
                    paddingY="15px"
                    width="90%"
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '&::-webkit-scrollbar-track': {
                            // width: '0.8em',
                            backgroundColor: '#fff',
                            borderRadius: '24px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#a22968',
                            borderRadius: '24px',
                        },
                    }}
                >
                    <List spacing={3}>
                        {playlists?.map((playlist: Playlist) => (
                            <ListItem
                                paddingX="20px"
                                fontSize="16px"
                                key={playlist.id}
                            >
                                <LinkBox>
                                    <NextLink
                                        href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: playlist.id },
                                        }}
                                        // passHref
                                    >
                                        <LinkOverlay
                                            marginRight="30px"
                                            display="flex"
                                            columnGap="15px"
                                            alignItems="center"
                                            // justifyContent="center"
                                            _hover={{
                                                color: '#F08A6A',
                                                textShadow: '1px 1px #ff0000',
                                            }}
                                        >
                                            {' '}
                                            {playlist.name}
                                        </LinkOverlay>
                                    </NextLink>
                                    {/* <LinkOverlay
                                        as={NextLink}
                                        // color="#D1B5B5"
                                        href={{
                                            pathname: 'playlist/[id]',
                                            query: { id: playlist.id },
                                        }}
                                        marginRight="30px"
                                        display="flex"
                                        columnGap="15px"
                                        alignItems="center"
                                        // justifyContent="center"
                                        _hover={{
                                            color: '#F08A6A',
                                            textShadow: '1px 1px #ff0000',
                                        }}
                                        // passHref
                                    >
                                        {playlist.name}
                                    </LinkOverlay> */}
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <Divider orientation="vertical" color="#783a54" />
        </Box>
    );
};

export default Sidebar;
