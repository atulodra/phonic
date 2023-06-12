import { Box, Text, Divider } from '@chakra-ui/react';
import prisma from '../lib/prisma';
import { useMe } from '../lib/hooks';
import UserLayout from '../components/userLayout';
import GridArtists from '../components/gridArtist';
import SongTable from '../components/songTable';

const Home = ({ artists, songs }) => {
    const { user, isLoading } = useMe();

    return (
        <UserLayout
            subtitle="profile"
            title={`${user?.firstName} ${user?.lastName}`}
            description={`${user?.playlistsCount} public playlists`}
            // image="../me2-no-bg.png"
            isLoading={isLoading}
        >
            <Divider />
            <Box
                color="white"
                paddingX="40px"
                marginTop="40px"
                marginBottom="3rem"
            >
                <Box marginBottom="40px">
                    <Text fontSize="2xl" fontWeight="bold">
                        Top artists
                    </Text>
                </Box>
                <GridArtists artists={artists.slice(0, 4)} />
                <Divider />
                <Box marginBottom="40px">
                    <Text fontSize="2xl" fontWeight="bold">
                        Top tracks
                    </Text>
                </Box>
                <SongTable songs={songs} playlist={false} />
            </Box>
        </UserLayout>
    );
};

export const getServerSideProps = async () => {
    // const artists = await prisma.artist.findMany({});
    const his = await prisma.history.findMany({});
    const hisSongs = his.map((h) => h.songId);
    const favs = await prisma.favourite.findMany({});
    const favsSongs = favs.map((f) => f.songId);
    const totalSongs = [...hisSongs, ...favsSongs];
    const uniqueSongs = totalSongs.filter((x, i, a) => a.indexOf(x) === i);
    // console.log(uniqueSongs);

    const songs = await prisma.song.findMany({
        where: {
            OR: uniqueSongs.map((sid) => ({
                id: sid,
            })),
        },
        include: {
            artist: true,
        },
    });

    const artists = songs
        .map((song) => song.artist)
        .filter((x, i, a) => a.findIndex((item) => item.id === x.id) === i);

    // const totalSongsDict = {};
    // totalSongs.forEach((song) => {
    //     totalSongsDict[song] = totalSongsDict[song]
    //         ? totalSongsDict[song] + 1
    //         : 1;
    // });
    // const mostOccurences = Object.values(totalSongsDict)
    //     .sort((a, b) => b - a)
    //     .slice(0, 5);
    // const mostOccurredIds =

    return {
        props: {
            artists: JSON.parse(JSON.stringify(artists)),
            songs: JSON.parse(JSON.stringify(songs)),
        },
    };
};

export default Home;

// export async function getStaticProps(){
//     const clientId = process.env.SPOTIFY_CLIENT_ID;
//     const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//     const accessTokenData = await fetch("https://accounts.spotify.com/api/token",
//         {
//             method: 'POST',
//             body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then(response => response.json());

//     // console.log(accessTokenData);
//     const accessToken = accessTokenData.access_token;
//     // console.log(accessToken);
//     const spotifyData = await fetch("https://api.spotify.com/v1/browse/new-releases?country=NP",
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         }).then(response => response.json());

//     console.log(spotifyData.albums.items[5]);
//     // console.log(data.albums.items[5].artists[0].external_urls);

//     const artists = await prisma.artist.findMany({})

//     return {
//         props : {
//             spotifyData: spotifyData
//         }
//     }
// }
