import { Song } from '@prisma/client';
import { Box } from '@chakra-ui/react';
import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
import PagesLayout from '../../components/pagesLayout';
import SongTable from '../../components/songTable';
import { useFavs } from '../../lib/hooks';

// const Imager = () => {
//     // TODO a div to make an image from first four songs, move this to pageslayout

//     return (
//         <Box padding="20px" display="grid">
//             <div>this</div>
//         </Box>
//     );
// };

const Playlist = ({ playlist }) => {
    const { favSongs } = useFavs();
    return (
        <PagesLayout
            roundImage={false}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={false}
            id={playlist.id}
        >
            <SongTable songs={playlist.songs} favSongs={favSongs} />
        </PagesLayout>
    );
};

export const getServerSideProps = async ({ query, req }) => {
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

    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.id,
            userId: user.id,
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
