import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            try {
                const history = await prisma.user.findUnique({
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
                res.json(history);
            } catch (error) {
                console.log(error);

                res.status(500).end();
            }
        }

        if (req.method === 'POST') {
            try {
                const { activeSong } = req.body;
                // console.log(activeSong);

                const history = await prisma.history.upsert({
                    where: {
                        userId_songId: {
                            userId: user.id,
                            songId: activeSong.id,
                        },
                    },
                    update: {},
                    create: {
                        userId: user.id,
                        songId: activeSong.id,
                    },
                });
                // console.log(history);

                res.json(history);
            } catch (error) {
                console.log(error);
                res.status(500).end();
            }
        }
    }
);
