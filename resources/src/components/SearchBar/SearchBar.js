import React from 'react';
import './SearchBar.css';
import TrackList from '../TrackList/TrackList';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onTermChange={this.handleTermChange}
          onChange={
            event => {
              this.setState({
                query: event.target.value
              })
            }
          }
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.search()
            }
          }} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
