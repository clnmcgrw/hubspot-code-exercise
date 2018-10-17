
// A Little HTTP Plugin ----------------------//

// - in real world projects, I would reach for an ajax library that's already being loaded (like maybe jQuery), 
// or a way more robust library like Axios, or even use Fetch API before doing this.  
// But I wanted to show an example of how I would handle parts of a codebase that need to be highly portable. 

const defaults = {
  url: 'http://api.icndb.com/jokes/random?exclude=[explicit]', // keep it clean
  method: 'GET'
};

const extend = (obj, src) => {
  for (let key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key]; }
  return obj;
};


export default class {
  constructor(options) {
    this.s = extend(defaults, options);
    this.xhr = new XMLHttpRequest();
    this.xhr.open(this.s.method, this.s.url, true);
    this.xhr.onload = () => this.onLoad();
    this.xhr.onprogress = value => this.onProgress(value);
    this.xhr.send();
    this.queue = {
      progress: [],
      success: [],
      error: []
    };
  }
  setHeaders(headers) {
    for (let key in headers) {
      this.xhr.setRequestHeader(key, headers[key]);
    }
  }
  onLoad() {
    const isOk = this.xhr.status >= 200 && this.xhr.status < 300;
    const queue = isOk ? this.queue.success : this.queue.error;
    queue.forEach(cb => cb(this.xhr));
  }
  onProgress(value) {
    this.queue.progress.forEach(cb => cb(value));
  }

  //this method is used to add callbacks
  //event names should match this.queue keys
  onEvent(event, callback) {
    this.queue[event].push(callback);
  }
};