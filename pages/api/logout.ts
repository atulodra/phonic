import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('PHONIC_ACCESS_TOKEN', '', {
            maxAge: -1,
            path: '/',
        })
    );
    res.redirect('/signin');
};
