import React from 'react';


class FilterControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="hs-inner">
        <div className="hs-filterable--header">
            
          <div className="hs-filterable--row">
            <div className="hs-select">
              <span>Genre</span>
              <div className="hs-select--dropdown">
              </div>
            </div>
            <div className="hs-select">
              <span>Year</span>
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
              <a id="filters-clear">Clear filters</a>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default FilterControls;