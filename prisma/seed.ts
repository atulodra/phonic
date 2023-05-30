import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
// import { artistsData } from './songsData'
// import { myArtistsData } from './songData2';
import { mainArtistsData } from './mainSongData';

const prisma = new PrismaClient();

const run = async () => {
    await Promise.all(
        mainArtistsData.map(async (artist) => {
            return prisma.artist.upsert({
                where: {
                    name: artist.name,
                },
                update: {},
                create: {
                    name: artist.name,
                    img: artist.img,
                    genres: artist.genres,
                    songs: {
                        create: artist.songs.map((song) => ({
                            name: song.name,
                            duration: song.duration,
                            url: song.url,
                        })),
                    },
                },
            });
        })
    );

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: 'firstuser@test.com' },
        update: {},
        create: {
            email: 'firstuser@test.com',
            password: bcrypt.hashSync('strongpassword', salt),
            firstName: 'John',
            lastName: ' Doe',
        },
    });

    const songs = await prisma.song.findMany({});
    await Promise.all(
        new Array(2).fill(1).map(async (_, i) => {
            return prisma.playlist.create({
                data: {
                    name: `Playlist #${i + 1}`,
                    user: {
                        connect: { id: user.id },
                    },
                    songs: {
                        connect: songs.map((song) => ({
                            id: song.id,
                        })),
                    },
                },
            });
        })
    );
};

run()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
