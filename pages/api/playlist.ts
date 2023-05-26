import { NextApiRequest } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(async (req, res: NextApiRequest, user) => {
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            name: 'asc',
        },
    });

    res.json(playlists);
});
