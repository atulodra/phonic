import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Icon, Image, Tag } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ShowArtists = ({ artists, title }) => {
    return (
        <Box>
            <Text paddingX="2rem" marginTop="1rem" fontSize="3xl">
                {title}
            </Text>
            <Box
                display="grid"
                gridAutoFlow="column"
                gridAutoColumns="21%"
                marginTop="0.5rem"
                padding="2rem"
                gap="1rem"
                overflowX="auto"
                overscrollBehaviorX="contain"
                scrollSnapType="inline mandatory"
                sx={{
                    '&::-webkit-scrollbar': {
                        height: '0.2rem',
                        width: '0.2rem',
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
                {artists?.map((artist) => (
                    <NextLink
                        href={{
                            pathname: '/artist/[id]',
                            query: { id: artist.id },
                        }}
                        key={artist.id}
                        // passHref
                    >
                        <Flex
                            padding="1rem"
                            direction="column"
                            justify="center"
                            align="center"
                            gap="0.8rem"
                            scrollSnapAlign="start"
                        >
                            <Image
                                boxSize="200px"
                                objectFit="cover"
                                src={`/${artist.name}.jpg`}
                                borderRadius="100%"
                            />
                            <Text color="schemeTwo.textColor">
                                {artist.name}
                            </Text>
                            {/* <HStack spacing={4} marginTop="1.8rem">
                                    {artist.genres?.map((genre: string) => (
                                        <Tag
                                        size="md"
                                        key={genre}
                                            variant="solid"
                                            colorScheme="pink"
                                        >
                                            {genre}
                                            </Tag>
                                            ))}
                                        </HStack> */}
                        </Flex>
                    </NextLink>
                ))}
            </Box>
        </Box>
    );
};

export default ShowArtists;
