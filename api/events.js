var listeners = {};
function addListener(name) {
  return function(f) {
    if(!listeners[name]) {
      listeners[name] = [f];
    } else {
      listeners[name].push(f);
    }
  };
}

function fire(name) {
  return function() {
    for (var i = 0, f; f = listeners[name][i]; ++i) {
      f();
    }
  };
}

