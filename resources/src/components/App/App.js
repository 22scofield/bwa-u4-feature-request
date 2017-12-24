import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My new playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(!this.state.playlistTracks.includes(track))
       {
         tracks.push(track);
         this.setState({playlistTracks: tracks});
       }
     }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    if(this.state.playlistTracks.includes(track)){
      tracks.splice(tracks.indexOf(track),1);
      this.setState({playlistTracks:  tracks});
    }
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track=> track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUris);
      this.setState({
        searchResults: [],
        playlistName: 'New Playlist',
        playlistTracks: []
      });

  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onChangeName={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onAdd={this.addTrack}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
