import { useSearchParams } from 'next/navigation';
import { Box, Text } from '@chakra-ui/layout';
import { useResults } from '../lib/hooks';
import { Artist, Song } from '@prisma/client';

const SearchPage = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;

    const encodedSearchQuery = encodeURI(searchQuery || '');

    const { results } = useResults(`?q=${encodedSearchQuery}`);

    console.log(results?.artists);

    return (
        <Box>
            <div>SEARCH PAGE</div>
            <Text>Artist</Text>
            <ul>
                {results?.artists?.map((artist: Artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
            <hr />
            <Text>Songs</Text>
            <ul>
                {results?.songs?.map((song: Song) => (
                    <li key={song.id}>{song.name}</li>
                ))}
            </ul>
        </Box>
    );
};

export default SearchPage;
