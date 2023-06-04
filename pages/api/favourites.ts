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
            // console.log(favs);
            // console.log(favourite);

            const favSongs = favourite?.map((fav) => fav.song);

            res.json(favSongs);
        }
        if (req.method === 'POST') {
            const { song } = req.body;
            // console.log(song);
            // console.log(action);
            console.log(song);

            const favourite = await prisma.favourite.create({
                data: {
                    userId: user.id,
                    songId: song.id,
                },
            });
            res.json(favourite);
        }
        if (req.method === 'DELETE') {
            const { song } = req.body;
            const favourite = await prisma.favourite.delete({
                where: {
                    userId_songId: {
                        userId: user.id,
                        songId: song.id,
                    },
                },
            });
            res.json(favourite);
        }
    }
);
