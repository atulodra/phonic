import { Song } from '@prisma/client';
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
    return fetcher(`/playlist/${id}`, body);
};

export const editFavSong = (body: { song: Song; action: 'Add' | 'Remove' }) => {
    return updater('/favourites', body);
};

export const newPlaylist = (body: { title: string }) => {
    return updater('/playlist', body);
};
