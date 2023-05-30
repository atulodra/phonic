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
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            });
            res.json(favSongs);
        }
        if (req.method === 'POST') {
            const { song, action } = req.body;
            console.log(song);
            console.log(action);
            if (action === 'Add') {
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
            if (action === 'Remove') {
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        favourites: {
                            disconnect: {
                                id: song.id,
                            },
                        },
                    },
                });
                res.end();
            }
        }
    }
);
