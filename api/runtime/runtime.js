
chrome.runtime = {};
chrome.runtime.onSuspend = {};
chrome.runtime.onSuspend.fire = fire('onSuspend');

chrome.runtime.onSuspend.addListener = function(f) {
  // Trampoline to add the Cordova pause event to the DOM.
  console.log('first-time trampoline behavior');
  document.addEventListener('pause', chrome.runtime.onSuspend.fire, false);

  chrome.runtime.onSuspend.addListener = addListener('onSuspend');
  chrome.runtime.onSuspend.addListener(f);
};
