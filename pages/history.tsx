import {
    Box,
    IconButton,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
} from '@chakra-ui/react';
// import SongTable from '../components/songTable';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';

import { validateToken } from '../lib/auth';
import prisma from '../lib/prisma';
import { formatDate, formatTime } from '../lib/formatters';

const History = ({ songs }) => {
    console.log(songs);

    return <div>History!</div>;
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

    const his = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            history: {
                select: {
                    song: {
                        include: {
                            artist: true,
                        },
                    },
                },
            },
        },
    });

    const { history } = his;
    // console.log(history);
    // // console.log(favourite);

    const songs = history.map((entry) => entry.song);
    console.log(songs);

    return {
        props: {
            songs: JSON.parse(JSON.stringify(songs)),
        },
    };
};

export default History;
