import { Song } from '@prisma/client';
import { Box, Text } from '@chakra-ui/react';
import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
import PagesLayout from '../../components/pagesLayout';
import SongTable from '../../components/songTable';
import { useFavs } from '../../lib/hooks';

const Playlist = ({ playlist, artists }) => {
    const { favSongs } = useFavs();
    // console.log(favSongs);

    // console.log(artists);

    return (
        <PagesLayout
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            id={playlist.id}
            forImager={artists}
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
    const artistsId = playlist.songs
        .map((song) => song.artistId)
        .filter((x, i, a) => a.indexOf(x) === i)
        .slice(0, 4);

    const artists = await prisma.artist.findMany({
        where: {
            OR: artistsId.map((id) => ({
                id,
            })),
        },
    });
    // console.log(artists);

    return {
        props: {
            playlist: JSON.parse(JSON.stringify(playlist)),
            artists: JSON.parse(JSON.stringify(artists)),
        },
    };
};
export default Playlist;
