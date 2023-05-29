import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default handler;
