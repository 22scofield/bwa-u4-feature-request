import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'New Playlist' };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onChangeName(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.state.name} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
