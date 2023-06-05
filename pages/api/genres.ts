import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            const { genre } = req.body;
            const artists = await prisma.artist.findMany({
                where: {
                    genres: {
                        has: genre,
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
            res.json(artists);
        }
    }
);
