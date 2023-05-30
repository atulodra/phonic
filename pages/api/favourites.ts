import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            const favSongs = await prisma.song.findMany({
                where: {
                    userId: user.id,
                },
            });
            res.json(favSongs);
        }
        if (req.method === 'POST') {
            const { song } = req.body;
            console.log(song);
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    favourites: {
                        connect: {
                            id: song.id,
                        },
                    },
                },
            });
            res.end();
        }
    }
);
