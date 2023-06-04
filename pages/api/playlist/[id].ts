import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'POST') {
            const { id } = req.query;
            const { newTitle } = req.body;
            const playlist = await prisma.playlist.update({
                where: {
                    id: +id,
                },
                data: {
                    name: newTitle,
                },
            });
            res.json(playlist?.name);
        }

        if (req.method === 'PUT') {
            const { id } = req.query;
            const { song, mode } = req.body;
            if (mode === 'remove') {
                const updatedPlaylist = await prisma.playlist.update({
                    where: {
                        id: +id,
                    },
                    data: {
                        songs: {
                            disconnect: {
                                id: song.id,
                            },
                        },
                    },
                });
                res.json(updatedPlaylist);
            }
            if (mode === 'add') {
                const updatedPlaylist = await prisma.playlist.update({
                    where: {
                        id: +id,
                    },
                    data: {
                        songs: {
                            connect: {
                                id: song.id,
                            },
                        },
                    },
                });
                res.json(updatedPlaylist);
            }
        }
    }
);
