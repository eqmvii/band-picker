//
// SPOTIFY TEST
//

var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function () {


    console.log("% % % % % % % % % Spotify API test: % % % % % % % % % ");

    this.spotifyApi = new SpotifyWebApi({
        clientId: '34e84d93de6a4650815e5420e0361fd3',
        clientSecret: '5162cd8b5cf940f48702dffe096c2acb',
        redirectUri: 'http://www.example.com/callback' // TODO: huh?
    });

    // Retrieve an access token
    this.spotifyApi.clientCredentialsGrant().then(
        (data) => {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            this.spotifyApi.setAccessToken(data.body['access_token']);

            // spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
            //     .then(function (data) {
            //         console.log('Artist information', data.body);
            //     }, function (err) {
            //         console.error(err);
            //     });

            // Search artists whose name contains 'Love'
            // this.artistSearch('Madonna');

        },
        function (err) {
            console.log(
                'Something went wrong when retrieving an access token',
                err.message
            );
        }
    )

    this.artistSearch = function (artist, callback) {
        this.spotifyApi.searchArtists(artist)
            .then((data) => {
                // console.log('Search artists by "Slayer"', data.body);
                // console.log(data.body.artists.items[0]);
                callback(data.body.artists.items[0]);
            }, function (err) {
                console.log("spotify.artistSearch API error");
                console.error(err);
                callback(data.body.artists.items[0]);
            });

    }

}

