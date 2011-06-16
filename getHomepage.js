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
    // Opera will redirect the parent page to the homepage when window.home() is executed
    if (typeof(window.home) === "function" && !window.opera) { 
      iframe.onload = function() {
        iframe.onload = function() {
          retrieveIframeLocation(callback);
        };
        iframe.contentWindow.home();
      }
    } else {
      iframe.src = "about:home";
      if (iframe.addEventListener) {
        iframe.addEventListener("load", function() {
          retrieveIframeLocation(callback);
        }, false);
      } else if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          retrieveIframeLocation(callback);
        });
      }
    }
    insertIframe();
  };
})();