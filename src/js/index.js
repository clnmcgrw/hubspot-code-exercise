import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App.js';

// code exercise modules
import CtaModule from './cta.js';
import FilterableContent from './filterable-content.js';

const modules = [CtaModule, FilterableContent];
const approot = document.getElementById('react-root');
const initialize = () => modules.forEach(module => module());

if (approot) {
  // react version
  ReactDOM.render(<App/>, approot);
} else {
  
  // not really needed if the script is @ very end of the HTML doc
  // but, if its possible this will be moved around or up the page its a good idea
  document.addEventListener('DOMContentLoaded', initialize);
}
