import { Divider } from '@chakra-ui/layout';
import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
import ArtistLayout from '../../components/artistLayout';
import SongTable from '../../components/songTable';
import ShowArtists from '../../components/showArtists';

const Artist = ({ artist, relatedArtists }) => {
    console.log(`Artist ${artist.id}`);

    // console.log(artist);
    // const { favSongs } = useFavs();
    // console.log(artist.genres);
    // console.log(relatedArtists);
    // const title = 'Related Artists';

    return (
        <>
            {' '}
            <ArtistLayout
                image={`/${artist.name}.jpg`}
                title={`${artist.name}`}
                genres={artist.genres}
            >
                <SongTable songs={artist.songs} playlist={false} />
                <Divider />
                <ShowArtists artists={relatedArtists} title="Related Artists" />
            </ArtistLayout>
        </>
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

    const artist = await prisma.artist.findUnique({
        where: {
            id: +query.id,
        },
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
    });

    const genres = artist?.genres;
    const relatedArtists = await prisma.artist.findMany({
        where: {
            OR: genres?.map((genre) => ({
                genres: {
                    has: genre,
                },
            })),
            NOT: {
                id: artist?.id,
            },
        },
        include: {
            songs: {
                include: {
                    artist: true,
                },
            },
        },
    });

    return {
        props: {
            artist: JSON.parse(JSON.stringify(artist)),
            relatedArtists: JSON.parse(JSON.stringify(relatedArtists)),
        },
    };
};
export default Artist;
