import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            const favs = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    favourite: {
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
            const { favourite } = favs;

            const favSongs = favourite?.map((fav) => fav.song);

            res.json(favSongs);
        }
        if (req.method === 'POST') {
            const { song, action } = req.body;
            // console.log(song);
            // console.log(action);
            if (action === 'Add') {
                await prisma.favourite.create({
                    data: {
                        userId: user.id,
                        songId: song.id,
                    },
                });
                res.end();
            }
            if (action === 'Remove') {
                await prisma.favourite.delete({
                    where: {
                        userId_songId: {
                            userId: user.id,
                            songId: song.id,
                        },
                    },
                });
                res.end();
            }
        }
    }
);
