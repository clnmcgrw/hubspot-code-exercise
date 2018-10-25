import React from 'react';
import classnames from 'classnames';
import posed from 'react-pose';

import { getFilters } from '../lib/utils.js';


const DropDown = posed.div({
  closed: { opacity:0, height:0 },
  open: { opacity:1, height:'auto' }
});


class FilterControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }


  openDropdown(e, index) {
    this.setState({ 
      dropdownOpen: this.state.dropdownOpen === index ? false : index
    });
    e.stopPropagation();
  }

  stopClickPropagation(e) {
   e.stopPropagation();
  }



  componentDidMount() {
    document.body.addEventListener('click', e => {
      console.log('Body Element Click...');
      this.setState({ dropdownOpen: false });
    });
  }


  render() {
    const _onGenreChange = this.props.handlers.genre.bind(this);
    const _onSearchTermChange = this.props.handlers.searchterm.bind(this);
    const _clearFilters = this.props.onclear.bind(this);
    const dropdownClickHandler = this.openDropdown.bind(this);
    const onRadioChange = this.radioChange.bind(this);

    return(
      <div className="hs-inner">
        <div className="hs-filterable--header">
            
          <div className="hs-filterable--row">
            
            {this.props.dropdowns.map((drop, i) => 
            <div className="hs-select" key={'dropdown-'+i}>
              <span onClick={e => dropdownClickHandler(e, i)}>{drop.name}</span>
              <DropDown className="hs-select--dropdown-pose" pose={this.state.dropdownOpen === i ? 'open' : 'closed'}>
                <ul>
                {drop.items.map((item, index) =>
                  <li key={'dropdown-'+item+'-'+index}>
                    <input type="checkbox" name={drop.name} id={'dropdown-'+item+'-'+index} />
                    <label htmlFor={'dropdown-'+item+'-'+index}>{item}</label>
                  </li>)}
                </ul>
              </DropDown>
            </div>)}
            
            <div className="hs-filterable--search">
              <input id="search-input" type="text" placeholder="Search By Title" 
                     onChange={e => _onSearchTermChange(e)} />
            </div>
          </div>

          <div className="hs-filterable--row">
            {this.props.radios.map((radio, i) => 
            <div className="hs-filterable--radio" key={'mediatype-radio-'+i}>
              <input type="radio" name="mediatype" value={radio.toLowerCase()} id={radio.toLowerCase()+'-radio'}
                     onChange={} />
              <label htmlFor={radio.toLowerCase()+'-radio'}>{radio}</label>
            </div>)}

            <div className="hs-filterable--clear">
              <a id="filters-clear" href="#" onClick={e => _clearFilters(e)}>Clear filters</a>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default FilterControls;