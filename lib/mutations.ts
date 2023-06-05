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

export const addFavSong = (body: { song: Song }) => {
    return updater('/favourites', 'POST', body);
};
export const removeFavSong = (id: number) => {
    return updater(`/favourites/${id}`, 'DELETE');
};

export const newPlaylist = (body: { title: string }) => {
    return updater('/playlist', 'POST', body);
};

export const addToHistory = (body: { song: Song }) => {
    return updater('/history', 'POST', body);
};

export const playlistSongEdit = (
    id: number,
    body: { song: Song; mode: 'add' | 'remove' }
) => {
    return updater(`/playlist/${id}`, 'PUT', body);
};

export const deletePlaylist = (id: number) => {
    return updater(`/playlist/${id}`, 'DELETE');
};
