var getHomepage = (function() {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  
  function insertIframe() {
    (document.body || document.documentElement).appendChild(iframe);
  }
  
  function retrieveIframeLocation(callback) {
    try { var url = iframe.contentWindow.document.URL; } catch(e) {}
    iframe.parentNode.removeChild(iframe);
    callback(url);
  }
  
  return function(callback) {
    if (typeof(window.home) === "function") {
      iframe.onload = function() {
        iframe.onload = function() {
          retrieveIframeLocation(callback);
        };
        iframe.contentWindow.home();
      }
    } else {
      iframe.src = "about:home";
      iframe.attachEvent("onload", function() {
        retrieveIframeLocation(callback);
      });
    }
    insertIframe();
  };
})();