
import React from 'react';

import ClassNames from 'classnames';
import posed from 'react-pose';

import { capitalizedArrayItems } from '../lib/utils.js';



class MediaGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: [],
      allReady: false
    };
  }

  imgLoadedHandler(e, index) {
    this.setState({ loaded: [...this.state.loaded, index] });

    if (this.allImagesLoaded()) {
      this.setState({ allReady: true });
    }
  }

  allImagesLoaded() {
    return this.state.loaded.length === this.props.media.length;
  }
  
  render() {
    const onImgLoaded = this.imgLoadedHandler.bind(this);
    const gridClasses = ClassNames({
      'is-ready': this.allImagesLoaded()
    });

    const renderItem = (item, index) => {
      const itemStyle = { display: this.props.filtered.indexOf(index) !== -1 ? 'block' : 'none' };
      return(
        <li className="hs-mediaitem" style={itemStyle} key={'mediaitem-'+index}>
          <figure className="hs-mediaitem--img">
              <img src={item.poster} alt={item.title} className={this.state.loaded.indexOf(index) === -1 ? '' : 'is-loaded'} 
                   onLoad={e => onImgLoaded(e, index)} />
            </figure>
            <div className="hs-mediaitem--info">
              <h3>{item.title} <span>({item.year})</span></h3>
              <p><span>Genres:</span> {capitalizedArrayItems(item.genre)}</p>
            </div>
        </li>
      );
    };

    return(
      <div className="hs-inner">
        <div className="hs-filterable--list hs-reactlist">
          <div className="hs-filterable--row">
            <ul id="media-grid" className={gridClasses}>
            {this.props.media.map((item, i) => renderItem(item, i))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default MediaGrid;