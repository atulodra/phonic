import { Box, Text, Image, Grid, GridItem } from '@chakra-ui/react';
import { Artist } from '@prisma/client';
import NextLink from 'next/link';

const GridArtists = ({ artists }) => {
    return (
        <Grid
            h="200px"
            // templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            autoFlow="row"
            gap={4}
            paddingX="2rem"
            marginBottom="8rem"
        >
            {artists.map((artist: Artist) => (
                <GridItem
                    key={artist.id}
                    padding="20px"
                    // boxShadow="dark-lg"
                    justifySelf="center"
                    // bgGradient="linear(to-b,schemeTwo.bodyPink, schemeTwo.bodyBlue)"
                    // bgGradient="linear(to-b,brand.2, brand.3, brand.4)"
                    // _hover={{
                    //     bgGradient:
                    //         'linear(to-b,schemeTwo.bodyPink, schemeTwo.bodyBlue)',
                    // }}
                    _hover={{
                        boxShadow: 'dark-lg',
                    }}
                >
                    <NextLink
                        href={{
                            pathname: '/artist/[id]',
                            query: { id: artist.id },
                        }}
                        // passHref
                    >
                        <Image
                            boxSize="180px"
                            objectFit="cover"
                            // boxShadow="dark-lg"
                            src={`/${artist.name}.jpg`}
                            borderRadius="100%"
                            // borderRadius={roundImage ? '100%' : '3px'}
                            // fallbackSrc="https://via.placeholder.com/150"
                            fallbackSrc="https://placekitten.com/408/287"
                        />
                        <Box marginTop="20px">
                            <Text fontSize="large">{artist.name}</Text>
                            <Text fontSize="x-small">Artist</Text>
                        </Box>
                    </NextLink>
                </GridItem>
            ))}
        </Grid>
    );
};

export default GridArtists;
