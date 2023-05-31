import { Flex, Box, Text, Divider } from '@chakra-ui/layout';
import NextLink from 'next/link';
import {
    Image,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
} from '@chakra-ui/react';

const ArtistLayout = ({ children, image, title, genres, description }) => {
    console.log(genres);

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
            <Flex align="start">
                <Box padding="20px">
                    <Image
                        boxSize="160px"
                        objectFit="cover"
                        boxShadow="2xl"
                        src={image}
                        // borderRadius="100%"
                        // borderRadius={roundImage ? '100%' : '3px'}
                        // fallbackSrc="https://via.placeholder.com/150"
                        fallbackSrc="https://placekitten.com/408/287"
                    />
                </Box>
                <Box padding="20px" lineHeight="40px" width="80%">
                    <Text fontSize="xs" fontWeight="bold" casing="uppercase">
                        Artist
                    </Text>
                    <Text fontSize="5xl">{title}</Text>
                    <Text fontSize="xs">{description}</Text>
                    <HStack spacing={4} marginTop="1.8rem">
                        {genres?.map((genre: string) => (
                            <NextLink
                                href={{
                                    pathname: '/genre/[id]',
                                    query: { id: genre },
                                }}
                                // passHref
                            >
                                <Tag
                                    size="md"
                                    key={genre}
                                    variant="solid"
                                    colorScheme="pink"
                                >
                                    {genre}
                                </Tag>
                            </NextLink>
                        ))}
                    </HStack>
                </Box>
            </Flex>
            <Box paddingTop="30px">{children}</Box>
        </Box>
    );
};
export default ArtistLayout;
