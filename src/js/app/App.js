import React from 'react';

import FilterControls from './FilterControls.js';
import MediaGrid from './MediaGrid.js';

import { mediaAlphabetize } from '../lib/utils.js';

const mediaData = require('../data/data.json').media;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      media: [],
      filters: {
        genre: [],
        year: [],
        mediatype: [],
        searchterm: false
      },
      filterlists: {
        genre: [],
        year: [],
        mediatype: []
      }
    };
    this.getMediaData().then(media => {
      this.setState({ media, loading: false });
    });
  }

  getMediaData() {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const clone = [...mediaData];
        console.log('original: ', clone);
        clone.sort(mediaAlphabetize);
        console.log('sorted: ', clone);
        resolve(clone);
      }, 1000);
    });
  }

  onFilterChanged(e, filtername) {
    console.log(e);
    e.preventDefault();
    const updated = {};
    updated[filtername] = e.target.value;
    this.setState(Object.assign({}, filters, updated));
  }


  render() {
    const filterHandlers = {
      genre: e => this.onFilterChanged(e, 'genre'),
      year: e => this.onFilterChanged(e, 'year'),
      mediatype: e => this.onFilterChanged(e, 'mediatype'),
      searchterm: e => this.onFilterChanged(e, 'searchterm')
    };

    return(
      <div className="hs-section hs-filterable">
        <FilterControls media={this.state.media} handlers={filterHandlers} />
        <MediaGrid media={this.state.media} />
      </div>
    );
  }
};

export default App;