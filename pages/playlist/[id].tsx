import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
import PagesLayout from '../../components/pagesLayout';
import { Box } from '@chakra-ui/react';
import { Song } from '@prisma/client';

const Imager = () => {
    // TODO a div to make an image from first four songs

    return (
        <Box padding="20px" display="grid">
            <div>this</div>
        </Box>
    );
};

const Playlist = ({ playlist }) => {
    return (
        <PagesLayout
            roundImage={false}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={false}
        >
            <ul>
                {playlist.songs.map((song: Song) => (
                    <li key={song.id}>{song.name}</li>
                ))}
            </ul>
            <div>This</div>
        </PagesLayout>
    );
};

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookies.PHONIC_ACCESS_TOKEN);
    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.id,
            userId: id,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });

    return {
        props: {
            playlist: JSON.parse(JSON.stringify(playlist)),
        },
    };
};
export default Playlist;
