
import React from 'react';
import FilterControls from './FilterControls.js';
import MediaGrid from './MediaGrid.js';

import classnames from 'classnames';
import { mediaAlphabetize, getFilters, getData } from '../lib/utils.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      media: [],
      showIndexes: [],
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
    getData().then(media => {
      this.setState({ media, loading: false });
    });
  }

  
  setInitialActiveIndexes(media) {
    const showIndexes = [];
    media.forEach((item, index) => showIndexes.push(index));
    this.setState({ showIndexes });
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
    const outerClasses = classnames({
      'hs-section': true, 
      'hs-filterable': true,
      'hs-loading': this.state.loading
    });

    return(
      <div className={outerClasses}>
        <FilterControls media={this.state.media} handlers={filterHandlers} />
        <MediaGrid media={this.state.media} loading={this.state.loading} filtered={this.state.showIndexes} />
      </div>
    );
  }
};

export default App;