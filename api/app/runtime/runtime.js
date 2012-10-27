
chrome.app.runtime = {};
chrome.app.runtime.onLaunched = {};
chrome.app.runtime.onLaunched.addListener = addListener('onLaunched');
chrome.app.runtime.onLaunched.fire = fire('onLaunched');
