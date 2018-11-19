(function() {
    'use strict';
    // transmitting url received from the background page to the page
    chrome.runtime.onMessage.addListener(function(msg) {
        window.postMessage({type: 'NavigationBlocked', url: msg.url}, '*');
    });
})();