import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            const playlists = await prisma.playlist.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    name: 'asc',
                },
            });
            res.json(playlists);
        }
        if (req.method === 'POST') {
            const { title } = req.body;
            console.log(title);
            const newPlaylist = await prisma.playlist.create({
                data: {
                    userId: user.id,
                    name: title,
                },
            });
            res.json(newPlaylist);
        }
    }
);
