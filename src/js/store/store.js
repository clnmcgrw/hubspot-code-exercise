
import { createStore, combineReducers } from 'redux';


const initialState = {
  //page/images still loading
  loading: true
  //all available media
  media: [],
  //currently filtered indexes
  showIndexes: [],
  //active filter settings
  filters: {
    genre: [],
    year: [],
    mediatype: [],
  },
  //search field value
  searchterm: false,
  //dropdown list items
  dropdowns: [
    { name: 'Genre', items: [] },
    { name: 'Year', items: [] }
  ],
  //radio names
  radios: ['Movies', 'Books']
};



