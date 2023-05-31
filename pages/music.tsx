import prisma from '../lib/prisma';
import { validateToken } from '../lib/auth';

const Music = ({ artists }) => {
    console.log(artists);

    return <div>Music Page!!</div>;
};
export const getServerSideProps = async ({ req }) => {
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

    const artists = await prisma.artist.findMany({
        where: {},
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
            artists: JSON.parse(JSON.stringify(artists)),
        },
    };
};
export default Music;
