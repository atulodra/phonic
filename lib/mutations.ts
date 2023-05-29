import fetcher from './fetcher';
import updater from './updater';

export const auth = (
    mode: 'signin' | 'signup',
    body: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }
) => {
    return fetcher(`/${mode}`, body);
};

export const playlistTitleUpdater = (
    id: number,
    body: {
        newTitle: string;
    }
) => {
    return updater(`/playlist/${id}`, body);
};
