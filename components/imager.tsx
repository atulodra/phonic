import { Box, Image } from '@chakra-ui/react';

const Imager = ({ artists }) => {
    console.log(artists);

    return (
        <Box
            padding="20px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            boxSize="140px"
        >
            {artists?.map((artist) => (
                <Image
                    boxSize="50px"
                    src={`/${artist.name}.jpg`}
                    objectFit="cover"
                    border="1px solid white"
                    key={artist.id}
                />
            ))}
        </Box>
    );
};

export default Imager;
