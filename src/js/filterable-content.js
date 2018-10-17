
import $ from 'jquery';
import Isotope from 'isotope-layout';
const mediaData = require('./data/data.json');

// will hold selected filters
const activeFilters = {
  genre: [],
  year: [],
  mediatype: []
};
let filterReady = false;
let iso = null;


// mock an async function, because that would likely be the real-world scenario
const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mediaData.media);
    }, 1500);
  });
};  


// template helper functions
const getChecklistDropdown = (list, name) => {
  list.sort((a,b) => a.localeCompare(b));
  let html = `<ul>`;
  list.forEach((item, i) => {
    html += `<li class="hs-chklistitem" data-mediatype="${item.type}">
              <input type="checkbox" name="${name}" value="${item}" id="${item}-chkbx-${i}">
              <label for="${item}-chkbx-${i}">${item}</label>
            </li>`;
  });
  html += `</ul>`;
  return html;
};
const capitalizedArrayItems = (items, result='') => {
  items.forEach((item, i) => {
    const firstLetter = item.charAt(0);
    result += item.replace(firstLetter, firstLetter.toUpperCase());
    if ((i + 1) < items.length) result += ', ';
  });
  return result;
};
const getMediaItem = (info) => {
  return `<li class="hs-mediaitem" data-genre="${info.genre.join(', ')}" data-year="${info.year}" data-mediatype="${info.type}">
            <figure class="hs-mediaitem--img">
              <img data-src="${info.poster}" alt="${info.title} Movie Poster">
            </figure>
            <div class="hs-mediaitem--info">
              <h3>${info.title} <span>(${info.year})</span></h3>
              <p><span>Genres:</span> ${capitalizedArrayItems(info.genre)}</p>
            </div>
         </li>`;
};
const getMessageHtml = (msg='There are no matching results.', link='View All') => {
  return `<div class="hs-mediagrid--msg">
            <div class="hs-mediagrid--msg-content">
              <p>${msg}</p>
              <a href="#all">${link}</a>
            </div>
          </div>`;
};
const getMediaGrid = (media, html=``) => {
  media.forEach(item => html += getMediaItem(item));
  html += getMessageHtml();
  return html;
};
const getLoadingHtml = () => {
  return  `<div>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>`;
};



// get arrays of all available genres & years
const getFilters = {
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


// will run every time a filter input changes
const runFilterCallback = () => {
  const filter = function(item) {
    const $this = $(item);
    let matches = [];
    let totalActive = 0;
    for (let prop in activeFilters) {
      const cats = $this.data(prop).toString();
      activeFilters[prop].forEach(filteritem => {
        totalActive += 1;
        if (cats.includes(filteritem)) {
          matches.push(filteritem);
        }
      });
    }
    return matches.length === totalActive;
  };
  iso.arrange({ filter, sortBy: 'mediaTitle' });
};

// runs every time user stops searching
const runSearchCallback = term => {
  const searchTerm = term.toLowerCase();
  const filter = item => {
    const $this = $(item);
    let matchAgainst = $this.find('h3').text().toLowerCase();
    for (let prop in activeFilters) {
      matchAgainst += $this.data('prop');
    }
    return matchAgainst.includes(searchTerm);
  };
  iso.arrange({ filter, sortBy: 'mediaTitle' });
};

//clears all filters
const clearActiveFilters = (e, $input) => {
  e.preventDefault();
  $('input[type="radio"]:checked, input[type="checkbox"]:checked').prop('checked', false);
  $input.val('');
  //let user see checkboxes uncheck before dropdown closes
  setTimeout(() => $(document).trigger('click'), 300);
  //resets stored values
  for (let prop in activeFilters) activeFilters[prop] = [];
  //show all grid items
  iso.arrange({filter: '*'});
  e.stopPropagation();
};


// alphabetize sort
// ignores first words "The" & "A"
const mediaAlphabetize = (prev, next) => {
  const ignoredWords = /The|A/;
  const a = prev.title.replace(ignoredWords, '').toLowerCase().trim();
  const b = next.title.replace(ignoredWords, '').toLowerCase().trim();
  return a.localeCompare(b);
};


//toggles dropdown open state
const selectClickHandler = (e, $select) => {
  e.preventDefault();
  //don't open if grid isn't ready
  if (!filterReady) return false;
  //close other open dropdowns
  $select.siblings('.is-open').removeClass('is-open');
  if ($select.hasClass('is-open')) {
    $select.removeClass('is-open');
  } else {
    $select.addClass('is-open');
  }
  e.stopPropagation();
};


//checkbox event handler
const onCheckboxChange = (e, $grid) => {
  const $this = $(e.target);
  const value = $this.attr('value');
  const name = $this.attr('name');
  const inputType = $this.attr('type');

  if ($this.is(':checked')) {
    if (inputType === 'radio') {
      activeFilters[name] = [];
    }
    activeFilters[name].push(value);
  } else {
    const itemIndex = activeFilters[name].indexOf(value);
    if (itemIndex !== -1) {
      activeFilters[name].splice(itemIndex, 1);
    }
  }
  $grid.removeClass('is-empty');
  runFilterCallback();
};


// search input handler
let timeout = null;
const onSearchInput = (e, $input, $grid) => {
  $grid.removeClass('is-empty');
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    const term = $input.val();
    runSearchCallback(term);
  }, 500);
};


// load and fade in images, & dispatch event when all images are loaded
const loadImage = (index, image, $grid, max) => {
  const $this = $(image);
  const dispatchReady = () => {
    if ((index + 1) ===  max) {
      $grid.trigger('itemsready');
    }
  };
  const load = () => {
    $this.addClass('is-loaded');
    dispatchReady();
  };
  const error = () => {
    $this.addClass('is-error');
    dispatchReady();
  };
  $(image).on({ load, error }).attr({src: $this.data('src')});
};


// append dropdown templates & bind dropdown click handlers
const doDropdownSetup = (item, data) => {
  const $this = $(item);
  const $span = $this.children('span');
  const $dropdown = $this.find('.hs-select--dropdown');
  const listName = $span.text().toLowerCase();
  const filterList = getFilters[listName](data);
  const dropdownHtml = getChecklistDropdown(filterList, listName);

  $span.on('click', e => selectClickHandler(e, $this));
  $dropdown.on('click', e => e.stopPropagation()).html(dropdownHtml);
};


// runs when all grid images are ready
const onMediaGridReady = ($grid) => {
  // isotope grid for filtering
  iso = new Isotope($grid[0], {
    itemSelector: '.hs-mediaitem',
    getSortData: {
      mediaTitle: function(el) {
        const text = $(el).find('h3').text().toLowerCase();
        return text.replace(/the|a/, '').trim();
      }
    },
    sortBy: 'mediaTitle',
    hiddenStyle: { 
      opacity: 0, 
      transform: 'scale(0.8)' 
    },
    visibleStyle: { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
    transitionDuration: 300
  });
  iso.on('arrangeComplete', filtered => {
    if (filtered.length === 0) {
      $grid.addClass('is-empty');
    }
  });

  $grid.addClass('is-ready');
  filterReady = true;
  setTimeout(() => iso.layout(), 200);
};


const dataFail = ($el, err) => {

};


const initialize = data => {
  const $selects = $('.hs-select');
  const $searchInput = $('#search-input');
  const $mediagrid = $('#media-grid');
  const $clearBtn = $('#filters-clear');
  const $typeFilters = $('input[name="mediatype"]');

  //re-order media
  //data.sort(mediaAlphabetize);

  // fill grid and bind to img onload
  $mediagrid.html(getMediaGrid(data))
    .on('itemsready', () => onMediaGridReady($mediagrid))
    .find('img[data-src]')
    .each((i, item) => loadImage(i, item, $mediagrid, data.length));

  // build dropdowns & bind handlers
  $selects.each((i, item) => doDropdownSetup(item, data));

  // bind handlers for checkboxes in dropdowns & radio inputs
  $selects.find('input[type="checkbox"]').on('change', e => onCheckboxChange(e, $mediagrid));
  $typeFilters.on('change', e => onCheckboxChange(e, $mediagrid));

  //search input handler
  $searchInput.on('input', e => onSearchInput(e, $searchInput, $mediagrid));

  // clear out all enabled filters
  $clearBtn.add($mediagrid.find('.hs-mediagrid--msg a'))
           .on('click', e => clearActiveFilters(e, $searchInput));

  // allows clickout close for dropdowns
  $(document).on('click', () => $('.hs-select.is-open').removeClass('is-open'));
};


export default () => getData().then(initialize).catch(dataFail);