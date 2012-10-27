// The added mobile check lets this work in desktop Chrome.
if (this.chrome && this.chrome.mobile) {
  throw Error('WARNING - chrome apis doubly included.');
}

chrome = {};
chrome.app = {};
chrome.mobile = {};

