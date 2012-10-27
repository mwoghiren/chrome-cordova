chrome.mobile.impl = {};

// Used during chrome.app.window.create to store the funciton's callback.
chrome.mobile.impl.createWindowCallback = null;
// The top window.
chrome.mobile.impl.fgWindow = null;
// The events page window.
chrome.mobile.impl.bgWindow = null;

chrome.mobile.impl.init = function(fgWindow, bgWindow) {
  chrome.mobile.impl.fgWindow = fgWindow;
  chrome.mobile.impl.bgWindow = bgWindow;
  bgWindow.chrome = chrome;
};

chrome.mobile.impl.createWindowHook = function() {
  chrome.mobile.impl.createWindowCallback();
  chrome.mobile.impl.createWindowCallback = null;
};

