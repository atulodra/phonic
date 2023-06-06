import { NextApiRequest, NextApiResponse } from 'next';
import { Favourite, User } from '@prisma/client';
import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';

export default validateRoute(
    async (req: NextApiRequest, res: NextApiResponse, user) => {
        if (req.method === 'GET') {
            //* Get All The Favourites of All the Users
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    favourite: true,
                },
            });

            //* Get Favourites of Current User
            const myFavs = await prisma.favourite.findMany({
                where: {
                    userId: user.id,
                },
                select: {
                    songId: true,
                    song: {
                        select: {
                            artist: {
                                select: {
                                    genres: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });

            //* Get the Favourited Song IDs of current user
            const myFavIds = myFavs.map((myFav: Favourite) => myFav.songId);
            // console.log('myfavsIds:\n', myFavIds);

            //* Get Unique Artist Ids of favourited songs
            const myFavedArtistsIds = myFavs
                .map((myFav: Favourite) => myFav.song.artist.id)
                .filter((x, i, a) => a.indexOf(x) === i);
            // console.log('myFavedArtistsIds:\n', myFavedArtistsIds);

            //* Get favourites of the rest of the users excluding current user, could have done it earlier
            const otherUsersFavs = users
                .filter((indiUser: User) => indiUser.id !== user.id)
                .map((indiUser: User) => indiUser.favourite);
            // console.log('OtherUsersFavs:\n', otherUsersFavs);

            //* Get an array of array of song ids of other users favourited songs
            const otherUsersFavsIds = otherUsersFavs.map((of) =>
                of.map((o) => o.songId)
            );
            // console.log('otherUsersFavsIds', otherUsersFavsIds);

            // ********************************************************/
            // const test = otherUsersFavs.map((of) => {
            //     if (of.some((o) => o.songId === myFavIds[2])) {
            //         return of;
            //     }
            // });
            // console.log('test:\n', test);
            // ********************************************************/

            //* Flatten the array of arrays to get song Ids of favourites of other users if the user has at least two songs favourited
            //* that the current user has
            const filteredIds = otherUsersFavsIds
                .filter(
                    (ofId) =>
                        ofId.filter((x) => myFavIds.includes(x)).length === 2
                )
                .flat(1);
            // console.log('filteredIds:\n', filteredIds);

            //* Get genres of artists associated with favourite songs of the current user
            const myFavGenres = myFavs
                .map((mf) => mf.song.artist.genres)
                .flat(1);
            // console.log('myFavGenres:\n', myFavGenres);

            //* Get other artists that have at least one of the genre tag associated with song favourited by current user
            const artistsViaGenres = await prisma.artist.findMany({
                where: {
                    OR: myFavGenres?.map((genre) => ({
                        genres: {
                            has: genre,
                        },
                    })),
                    NOT: myFavedArtistsIds.map((aid) => ({
                        id: aid,
                    })),
                },
                include: {
                    songs: {
                        include: {
                            artist: true,
                        },
                    },
                },
            });

            // console.log(
            //     'arstistsViaGenre:\n',
            //     artistsViaGenres.map((a) => a.id)
            // );

            //* Get the songs of artists that have at least onf genre tag associated
            const songIdsViaGenres = artistsViaGenres
                .map((artist) => artist.songs)
                .flat(1)
                .map((song) => song.id);

            // console.log('songIdsViaGenres:\n', songIdsViaGenres);

            //* Find the common song Ids between the songs gotten by other users and songs gotten via curren favourited songs' artists genre
            const commonIds = filteredIds.filter((fid) =>
                songIdsViaGenres.includes(fid)
            );
            // console.log('Common IDs:\n', commonIds);

            //* Get the songs with the help of common song Ids
            const reInforcedArtists = await prisma.song.findMany({
                where: {
                    OR: commonIds.map((cid) => ({
                        id: cid,
                    })),
                },
                select: {
                    artistId: true,
                    artist: true,
                },
            });
            // console.log('reInforcedArtists:\n', reInforcedArtists);

            //* Get unique artists from the list of songs
            const reInforcedArtistsIds = reInforcedArtists
                .map((a) => a.artistId)
                .filter((x, i, a) => a.indexOf(x) === i);
            // console.log('reInforcedArtistsIds:\n', reInforcedArtistsIds);

            // * These artists to rec
            const recArtists = await prisma.artist.findMany({
                where: {
                    OR: reInforcedArtistsIds.map((reid) => ({
                        id: reid,
                    })),
                },
                include: {
                    songs: {
                        include: {
                            artist: true,
                        },
                    },
                },
            });
            // console.log(recArtists);

            // * These songs to rec - take filteredId and exclude current favourited songs' Ids
            const recSongsIds = filteredIds
                .filter((x, i, a) => a.indexOf(x) === i)
                .filter((filid) => !myFavIds.includes(filid));

            const recSongs = await prisma.song.findMany({
                where: {
                    OR: recSongsIds.map((rsid) => ({
                        id: rsid,
                    })),
                },
                include: {
                    artist: true,
                },
            });
            res.status(200).json({ recArtists, recSongs });
        }
    }
);
