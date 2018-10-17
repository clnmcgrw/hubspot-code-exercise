import React from 'react';
import classnames from 'classnames';
import posed from 'react-pose';


class FilterControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: [false, false]
    };
  }


  getFilterData(type='genre') {
    return {
      genre(media) {
        const genres = media.map(item => item.genre);
        const flattened = genres.reduce((acc, val) => acc.concat(val), []);
        return [...new Set(flattened)];
      },
      year(media) {
        const years = media.map(item => item.year);
        return [...new Set(years)];
      }
    };
  }


  openDropdown(e, index) {

  }


  render() {
    const handlers = {
      genre: this.props.handlers.genre.bind(this)
    };
    const dropdownClickHandler = this.openDropdown.bind(this);

    return(
      <div className="hs-inner">
        <div className="hs-filterable--header">
            
          <div className="hs-filterable--row">
            <div className="hs-select">
              <span onClick={e => dropdownClickHandler(e, 0)}>Genre</span>
              <div className="hs-select--dropdown">
              
              </div>
            </div>
            <div className="hs-select">
              <span onClick={e => dropdownClickHandler(e, 1)}>Year</span>
              <div className="hs-select--dropdown">
              </div>
            </div>
            <div className="hs-filterable--search">
              <input id="search-input" type="text" />
            </div>
          </div>

          <div className="hs-filterable--row">
            <div className="hs-filterable--radio">
              <input type="radio" name="mediatype" value="movie" id="movies-radio" />
              <label htmlFor="movies-radio">Movies</label>
            </div>
            <div className="hs-filterable--radio">
              <input type="radio" name="mediatype" value="book" id="books-radio" />
              <label htmlFor="books-radio">Books</label>
            </div>
            <div className="hs-filterable--clear">
              <a id="filters-clear" href="#">Clear filters</a>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default FilterControls;