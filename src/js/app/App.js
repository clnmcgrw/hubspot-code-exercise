
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
      this.setInitialActiveIndexes(media);
    });
  }

  
  setInitialActiveIndexes(media) {
    const showIndexes = [];
    media.forEach((item, index) => showIndexes.push(index));
    this.setState({ showIndexes });
  }

  //update showIndexes based on current filter settings
  setActiveIndexes() {

    this.state.media.forEach(item => {
      for (let prop in this.state.filters) {
        
      }
    });
  }

  onFilterChanged(e, filtername) {
    e.preventDefault();
    // const updated = {};
    // updated[filtername] = e.target.value;
    // this.setState({
    //   filters: Object.assign({}, this.state.filters, updated)
    // });
  }

  onSearchInput(e) {
    const updated = {}
    // this.setState({
    //   filters: Object.assign({}, this.state.filters, updated);
    // });
  }


  render() {
    const filterHandlers = {
      genre: e => this.onFilterChanged(e, 'genre'),
      year: e => this.onFilterChanged(e, 'year'),
      mediatype: e => this.onFilterChanged(e, 'mediatype'),
      searchterm: e => this.onSearchInput(e)
    };
    const outerClasses = classnames({
      'hs-section': true, 
      'hs-filterable': true,
      'hs-loading': this.state.loading
    });

    return(
      <div className={outerClasses}>
        <FilterControls media={this.state.media} handlers={filterHandlers} />
        <MediaGrid media={this.state.media} loading={this.state.loading} 
                   filtered={this.state.showIndexes} activeFilters={this.state.filters} />
      </div>
    );
  }
};

export default App;