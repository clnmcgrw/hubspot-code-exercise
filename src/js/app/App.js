
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
      //all available media
      media: [],
      //currently filtered indexes
      showIndexes: [],
      //currently active form filter controls
      filters: {
        genre: [],
        year: [],
        mediatype: [],
      },
      //dropdown list items
      dropdowns: [
        { name: 'Genre', items: [] },
        { name: 'Year', items: [] }
      ],
      //radio names
      radios: ['Movies', 'Books'],
      //search input value
      searchterm: false
    };

    getData().then(media => {
      media.sort(mediaAlphabetize);
      this.setState({ media, loading: false });
      this.setInitialActiveIndexes(media);
      this.setDropdownData(media);
    });
  }

  
  setInitialActiveIndexes(media) {
    const showIndexes = [];
    media.forEach((item, index) => showIndexes.push(index));
    this.setState({ showIndexes });
  }
  //update showIndexes based on current filter settings
  setActiveIndexes() {
    this.state.media.forEach((item, i) => {
      for (let prop in this.state.filters) {
        
      }
    });
  }

  setDropdownData(media) {
    const dropdowns = [];
    this.state.dropdowns.forEach((drop, i) => {
      const key = drop.name.toLowerCase().trim();
      dropdowns.push({
        name: drop.name,
        items: getFilters[key](media)
      })
    });
    this.setState({ dropdowns })
  }


  clearActiveFilters(e) {
    e.preventDefault();
    this.setState({
      searchterm: false,
      filters: { genre: [], year: [], mediatype: [] },
      showIndexes: this.state.media.map((item, i) => i)
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
    e.preventDefault();
    this.setState({ searchterm: e.target.value });
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
        <FilterControls media={this.state.media} handlers={filterHandlers} dropdowns={this.state.dropdowns}
                        radios={this.state.radios} onclear={this.clearActiveFilters} />
        <MediaGrid media={this.state.media} loading={this.state.loading} 
                   filtered={this.state.showIndexes} activeFilters={this.state.filters} />
      </div>
    );
  }
};

export default App;