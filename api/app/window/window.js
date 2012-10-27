chrome.app.window = {};

// The AppWindow created by chrome.app.window.create.
chrome.app.window.createdAppWindow_ = null;


function unsupportedApi(name) {
  return function() {
    console.warn('API is not supported on mobile: ' + name);
  }
}

function AppWindow() {
  this.contentWindow = chrome.mobile.impl.fgWindow;
  this.id = '';
}
AppWindow.prototype = {
  restore: unsupportedApi('AppWindow.restore'),
  moveTo: unsupportedApi('AppWindow.moveTo'),
  clearAttention: unsupportedApi('AppWindow.clearAttention'),
  minimize: unsupportedApi('AppWindow.minimize'),
  drawAttention: unsupportedApi('AppWindow.drawAttention'),
  focus: unsupportedApi('AppWindow.focus'),
  resizeTo: unsupportedApi('AppWindow.resizeTo'),
  maximize: unsupportedApi('AppWindow.maximize'),
  close: unsupportedApi('AppWindow.close')
};

chrome.app.window.create = function(filePath, options, callback) {
  if (chrome.app.window.createdAppWindow_) {
    console.log('ERROR - chrome.createWindow called multiple times. This is unsupported.');
    return;
  }
  chrome.app.window.createdAppWindow_= new AppWindow();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', filePath, true);
  var topDoc = chrome.mobile.impl.fgWindow.document;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      topDoc.open();
      var pageContent = xhr.responseText || 'Page load failed.';
      var headIndex = pageContent.indexOf('<head>');
      if (headIndex != -1) {
        chrome.mobile.impl.windowCreateCallback = callback;
        var endIndex = headIndex + '<head>'.length;
        topDoc.write(pageContent.slice(0, endIndex));
        topDoc.write('<link rel="stylesheet" type="text/css" href="chromeappstyles.css">');
        // Set up the callback to be called before the page contents loads.
        if (callback) {
          chrome.mobile.impl.createWindowCallback = callback;
          topDoc.write('<script>chrome.mobile.impl.createWindowHook()</script>');
        }
        topDoc.write(pageContent.slice(endIndex));
      } else {
        topDoc.write(pageContent);
        // Callback is called even when the URL is invalid.
        callback && callback(chrome.app.window.createdAppWindow_);
      }
      topDoc.close();
    }
  };
  xhr.send();
};

chrome.app.window.current = function() {
  return window == chrome.mobile.impl.fgWindow ? chrome.app.window.createdAppWindow_: null;
};
