import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { ButtonGroup, IconButton, Image, Input } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { playlistTitleUpdater } from '../lib/mutations';
import Imager from './imager';

const PagesLayout = ({
    // color,
    children,
    title,
    subtitle,
    description,
    id,
    forImager,
}) => {
    const [playlistTitle, setPlaylistTitle] = useState(title);
    const [editable, setEditable] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTitle = playlistTitle;

        if (newTitle !== title) {
            await playlistTitleUpdater(id, {
                newTitle,
            });
            // setEditable(false);
            router.reload();
        }
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
            <Flex align="end">
                {forImager.length > 0 ? (
                    <Imager artists={forImager} />
                ) : (
                    <Box padding="20px">
                        <Image
                            boxSize="160px"
                            objectFit="cover"
                            boxShadow="2xl"
                            borderRadius="3px"
                            // fallbackSrc="https://via.placeholder.com/150"
                            fallbackSrc="https://placekitten.com/408/287"
                        />
                    </Box>
                )}

                <Box padding="20px" lineHeight="40px" width="80%">
                    <Text fontSize="xs" fontWeight="bold" casing="uppercase">
                        {subtitle}
                    </Text>
                    {editable ? (
                        <form onSubmit={handleSubmit}>
                            <Input
                                placeholder="Enter New Playlist Name"
                                onChange={(e) =>
                                    setPlaylistTitle(e.target.value)
                                }
                            />
                            <ButtonGroup justifyContent="center" size="sm">
                                {/* <IconButton
                                    aria-label="Confirm New Title"
                                    icon={<FiCheckSquare />}
                                    type="submit"
                                    variant="outline"
                                    _hover={{
                                        background: '#d842e2',
                                        color: '#fff',
                                    }}
                                /> */}
                                <IconButton
                                    aria-label="Cancel New Title"
                                    icon={<MdClose />}
                                    onClick={() => setEditable(false)}
                                    variant="outline"
                                    _hover={{
                                        background: '#d842e2',
                                        color: '#fff',
                                    }}
                                />
                            </ButtonGroup>
                        </form>
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            position="sticky"
                        >
                            <Text fontSize="5xl">{title}</Text>
                            <Text
                                fontSize="x-small"
                                onClick={() => setEditable(true)}
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                alignSelf="flex-end"
                            >
                                Edit
                            </Text>
                        </Box>
                    )}
                    <Text fontSize="xs">{description}</Text>
                </Box>
            </Flex>
            <Divider />
            <Box paddingTop="30px">{children}</Box>
        </Box>
    );
};

export default PagesLayout;
