
import Ajax from './lib/xhr.js';


let $body, $btn, $quote, $ctasection, $meter;
let loading = false;

const defaultAjaxErr = 'Something went wrong. Please try again later';

const extend = (obj, src) => {
  for (let key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key]; }
  return obj;
};

const endLoading = () => {
  loading = false;
  $body.classList.remove('is-loading-quote');
  $meter.style.transform = 'scale(1, 1)';
  $meter.classList.add('is-finished');
};

//decode html chars in strings
const textDecode = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// XHR Callbacks
const onAjaxError = (err, msg=defaultAjaxErr) => {
  $quote.textContent = msg;
  endLoading();
};
const onAjaxSuccess = data => {
  const body = JSON.parse(data.response);
  if (body.type !== 'success') {
    onAjaxError(null);
    return false;
  }
  $quote.textContent = textDecode(body.value.joke);
  endLoading();
};
const onAjaxProgress = progress => {
  let percentComplete = null;
  if (progress.lengthComputable) {
    percentComplete = Math.floor(progress.loaded / progress.total);
  } else {
    percentComplete = 0.85;
  }
  $meter.style.transform = `scale(${percentComplete}, 1)`;
};


const getProgressMeter = () => {
  const $meter = document.createElement('div');
  $meter.classList.add('hs-cta--loadprogress');
  return $meter;
};


// cta button click handler
const btnClickHandler = event => {
  event.preventDefault();
  
  if (loading) return false;

  loading = true;
  $body.classList.add('is-loading-quote');
  $meter.style.transform = 'scale(0.65, 1)';

  //simulates a slower connection
  setTimeout(() => {
    const url = `http://api.icndb.com/jokes/random`;
    const req = new Ajax({ url });
    req.onEvent('progress', val => onAjaxProgress(val));
    req.onEvent('success', data => onAjaxSuccess(data));
    req.onEvent('error', err => onAjaxError(err));
  }, 150);
};


export default () => {
  $btn = document.getElementById('cta-button');

  // I do things like this to keep code less error-prone (:
  if ($btn.length === 0) return false;

  // element selections
  $body = document.body;
  $quote = $btn.previousElementSibling;
  $ctasection = document.querySelector('.hs-cta');
  $meter = getProgressMeter();
  
  // bind button click handler
  $btn.addEventListener('click', btnClickHandler);

  // append & handle visibility of progress meter
  $ctasection.appendChild($meter);
  $meter.addEventListener('transitionend', function() {
    if (this.classList.contains('is-finished')) {
      this.style.transform = 'scale(0, 1)';
      this.classList.remove('is-finished');
    }
  });
};