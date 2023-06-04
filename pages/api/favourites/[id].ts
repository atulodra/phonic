import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'DELETE') {
            const { id } = req.query;
            const favourite = await prisma.favourite.delete({
                where: {
                    userId_songId: {
                        userId: user.id,
                        songId: +id,
                    },
                },
            });
            res.json(favourite);
        }
    }
);
