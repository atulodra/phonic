import { useSearchParams } from 'next/navigation';
import { Box, Divider, Text } from '@chakra-ui/layout';
import { useFavs, useResults } from '../lib/hooks';
import { Artist, Song } from '@prisma/client';
import ShowArtists from '../components/showArtists';
import SongTable from '../components/songTable';
import { Skeleton, SkeletonCircle } from '@chakra-ui/react';

const SearchPage = () => {
    console.log('Search');

    const search = useSearchParams();
    const searchQuery = search ? search.get('q')?.trim() : null;

    const encodedSearchQuery = encodeURI(searchQuery || '');

    const { results, isLoading } = useResults(`?q=${encodedSearchQuery}`);

    console.log(results?.artists);

    const { favSongs } = useFavs();

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
            <Text fontSize="4xl">Search Page</Text>
            <Divider />
            <Skeleton isLoaded={!isLoading}>
                {results?.artists.length > 0 ? (
                    <ShowArtists artists={results?.artists} title="" />
                ) : (
                    <Box paddingX="2rem" marginTop="1rem" fontSize="4xl">
                        <Text>Artists</Text>
                        <Text
                            color="schemeTwo.textColor"
                            fontSize="2xl"
                            marginY="2rem"
                        >
                            No Search Results Found
                        </Text>
                    </Box>
                )}
            </Skeleton>
            <Divider />
            <Skeleton isLoaded={!isLoading}>
                <Box paddingX="2rem" marginTop="1rem">
                    <Text fontSize="4xl">Songs</Text>
                    {results?.songs.length > 0 ? (
                        <SongTable songs={results?.songs} favSongs={favSongs} />
                    ) : (
                        <Text
                            color="schemeTwo.textColor"
                            fontSize="2xl"
                            marginY="2rem"
                        >
                            No Search Results Found
                        </Text>
                    )}
                </Box>
            </Skeleton>

            {/* <Box padding="1.8rem">
                <SongTable songs={results?.songs} favSongs={favSongs} />
            </Box> */}
        </Box>
    );
};

export default SearchPage;
