// import { useMe } from "../lib/hooks"
import NextLink from 'next/link';
import {
    Box,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
} from '@chakra-ui/react';
import { FiPlusCircle } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import { Playlist } from '@prisma/client';
import { useState, useRef } from 'react';
import { newPlaylist, deletePlaylist } from '../lib/mutations';
import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';

const Playlists = ({ playlists }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pagePlaylists, setPagePlayLists] = useState([...playlists]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await newPlaylist({ title });
        setPagePlayLists((prevList) => [
            ...prevList,
            {
                id:
                    prevList.length > 0
                        ? prevList[prevList.length - 1].id + 1
                        : 1,
                name: title,
                songs: [],
            },
        ]);
        setIsLoading(false);
    };

    const handlePlaylistDelete = async (plid: number) => {
        console.log(plid);
        await deletePlaylist(plid);
        setPagePlayLists((prevList) =>
            [...prevList].filter((pl) => pl.id !== plid)
        );
    };

    return (
        <Box
            height="100%"
            overflow="auto"
            // bgGradient = {`linear(${color} 0%, ${color} 15%, ${color} 40%, rbga(0,0,0,0.95) 75%)`}
            bgGradient="linear(to-bl, brand.1, brand.2, brand.3, brand.4)"
            // background="#686868"
            boxShadow="dark-lg"
            border="1px solid #552C3D"
            borderRadius="10px"
            padding="3em"
            backdropFilter="auto"
            backdropBlur="3xl"
            // paddingBottom="5em"
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
            <Button
                leftIcon={<FiPlusCircle />}
                colorScheme="schemeTwo.textColor"
                variant="outline"
                onClick={onOpen}
                // border="none"
                _hover={{
                    background: 'white',
                    color: '#e905c3',
                }}
            >
                Create Playlist
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new Playlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit}>
                            <Input
                                ref={initialRef}
                                placeholder="Playlist Name"
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                marginBottom="5rem"
                            />
                            <Button
                                colorScheme="pink"
                                mr={3}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </form>
                    </ModalBody>
                    {/*
                    <ModalFooter></ModalFooter> */}
                </ModalContent>
            </Modal>
            <Box bg="transparent" ref={finalRef}>
                <Box padding="10px" marginBottom="20px">
                    <Table variant="unstyled" color="schemeTwo.textColor">
                        <Thead
                            borderBottom="1px solid"
                            borderColor="rgba(255,255,255,0.2)"
                        >
                            <Tr>
                                <Th>#</Th>
                                <Th>Title</Th>
                                <Th>Songs</Th>
                                <Th />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pagePlaylists?.map((playlist, i) => (
                                <Tr
                                    sx={{
                                        transition: 'all .3s',
                                        '&:hover': {
                                            bg: 'rgba(255,255,255,0.1)',
                                        },
                                    }}
                                    key={playlist.id}
                                    cursor="cursor"
                                >
                                    <Td>{i + 1}</Td>
                                    <NextLink
                                        href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: playlist.id },
                                        }}
                                        // passHref
                                    >
                                        <Td>{playlist.name}</Td>
                                    </NextLink>
                                    <Td>
                                        {playlist.songs?.length > 0
                                            ? playlist.songs?.length
                                            : 0}
                                    </Td>
                                    <Td>
                                        {' '}
                                        <Icon
                                            as={MdDeleteSweep}
                                            boxSize={5}
                                            _hover={{
                                                color: '#f70773',
                                            }}
                                            onClick={() =>
                                                handlePlaylistDelete(
                                                    playlist.id
                                                )
                                            }
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
};

export default Playlists;

export const getServerSideProps = async ({ req }) => {
    let user;

    try {
        user = validateToken(req.cookies.PHONIC_ACCESS_TOKEN);
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: user.id,
        },
        include: {
            songs: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
    return {
        props: {
            playlists: JSON.parse(JSON.stringify(playlists)),
        },
    };
};
