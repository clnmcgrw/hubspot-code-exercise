
import React from 'react';
import { capitalizedArrayItems } from '../lib/utils.js';


class MediaGrid extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {

    const renderItem = (item, index) => {
      const itemStyle = { display: this.props.filtered.indexOf(index) !== -1 ? 'block' : 'none' };
      return(
        <li className="hs-mediaitem" style={itemStyle} key={'mediaitem-'+index}>
          <figure className="hs-mediaitem--img">
              <img src={item.poster} alt={item.title} className="is-loaded" />
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
            <ul id="media-grid" className={this.props.loading ? '' : 'is-ready'}>
            {this.props.media.map((item, i) => renderItem(item, i))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default MediaGrid;