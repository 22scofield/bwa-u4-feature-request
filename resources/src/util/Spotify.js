const clientId = '4a97f703f775452797e0a9b8931ec078';
const redirectUri = "http://localhost:3000/";
let accessToken;

const Spotify = {
  getAccessToken(){
      if(accessToken){
        return accessToken;
      }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireToken = window.location.href.match(/expires_in=([^&]*)/);
     if(accessTokenMatch && expireToken){
       accessToken = accessTokenMatch[1];
       const expiresIn = Number(expireToken[1]);
       window.setTimeout(() => accessToken = '', expiresIn * 1000);
       window.history.pushState('Access Token', null, '/');
       return accessToken;
     } else {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
     }
  },

  search(term){
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    { headers: {Authorization: `Bearer ${accessToken}`}
  }).then(response => response.json()).then(jsonResponse => {
    if(jsonResponse.tracks){
      return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
      }));
    } else {
      return [];}
   });
  },

  savePlaylist(playlistName, trackUris){
    if(!playlistName || !trackUris){
      return;
    }
    accessToken = Spotify.getAccessToken();
    let userId;
    return fetch('https://api.spotify.com/v1/me',{ headers: {Authorization: `Bearer ${accessToken}`}})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {Authorization: `Bearer ${accessToken}`},
          method:'POST',
          body:JSON.stringify({name: playlistName})
        }).then(response => {
          if(response.ok){
            return response.json();
          } throw new Error ('Request Failed');},
        networkError=> console.log(networkError.message))
        .then(jsonResponse => {
          let playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            headers: {Authorization: `Bearer ${accessToken}`},
            method:'POST',
            body:JSON.stringify({uris: trackUris})
          }).then(response => {
            if(response.ok){
              return response.json();
            } throw new Error ('Request Failed');},
          networkError=> console.log(networkError.message))
          .then(jsonResponse => {
            playlistId = jsonResponse.id;
          })
        })
    })
  }
}

export default Spotify;
