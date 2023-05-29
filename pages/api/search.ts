import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const { q: query } = req.query;

            if (typeof query !== 'string') {
                throw new Error('Invalid Request!');
            }

            const artists = await prisma.artist.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            });

            const songs = await prisma.song.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            });
            res.status(200).json({ artists, songs });
        } catch (error) {
            res.status(500).end();
        }
    }
};

export default handler;
