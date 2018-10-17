
// code exercise modules
import CtaModule from './cta.js';
import FilterableContent from './filterable-content.js';


const modules = [CtaModule, FilterableContent],
      initialize = () => modules.forEach(module => module.call());

// not really needed if the script is @ very end of the HTML doc
// but, if its possible this will be ported or moved up the page its a good idea
document.addEventListener('DOMContentLoaded', initialize);