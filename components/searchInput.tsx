import { Box, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchInput = () => {
    const search = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        search ? search.get('q') : ''
    );
    const router = useRouter();
    const onSearch = (e) => {
        e.preventDefault();
        const encodedSearchQuery = encodeURI(searchQuery || '');
        router.push(`/search?q=${encodedSearchQuery}`);

        // router.push({
        //     pathname: '/search',
        //     query: { q: searchQuery },
        // });
        // console.log(encodedSearchQuery);
    };

    return (
        <Box width="80%">
            <form onSubmit={onSearch}>
                <Input
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    background="schemeTwo.searchBg"
                    borderColor="schemeTwo.textColor"
                    color="schemeTwo.searchText"
                    variant="outline"
                    placeholder="Search"
                    type="search"
                    _hover={{
                        borderColor: '#fff',
                    }}
                    _focus={{
                        borderColor: '#ec0dbc',
                    }}
                />
            </form>
        </Box>
    );
};

export default SearchInput;
