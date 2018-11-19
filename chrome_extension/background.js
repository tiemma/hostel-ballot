(function() {
    'use strict';

    // keep track of all the opened tab
    let tabs = {};

    // Get all existing tabs
    chrome.tabs.query({}, function(results) {
        results.forEach(function(tab) {
            tabs[tab.id] = tab;
        });
    });

    // Create tab event listeners
    function onUpdatedListener(tabId, changeInfo, tab) {
        tabs[tab.id] = tab;
    }

    function onRemovedListener(tabId) {
        delete tabs[tabId];
    }

    /**
     * if the request url differ from the current tab url block it
     * @param details
     * @return {{redirectUrl: string}}
     */
    function onBeforeRequestListener(details) {

        if (_compareUrls(details.url)){
            return {redirectUrl: 'javascript:void(0)'};
        }

        return {redirectUrl: details.url};
        //
    }

    // Subscribe to tab events to track opened tabs
    chrome.tabs.onUpdated.addListener(onUpdatedListener);
    chrome.tabs.onRemoved.addListener(onRemovedListener);

    chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, {
        urls: ['<all_urls>'],
        // types: ['main_frame', 'sub_frame'], // only watching for "frame" type request
        types: [], // only watching for "frame" type request
    }, ['blocking']);

    /**
     * compare 2 urls based on there href form WITHOUT the hash part
     * @param {string} url
     * @return {boolean}
     * @private
     */
    function _compareUrls(url) {
        let rejectedExtensions = ["css", "woff", "woff2", "svg", "js", "png", "jpeg", "jpg"];
        return rejectedExtensions.indexOf(get_url_extension(url)) !== -1;
    }


    /**
     * Get's the url of the extension
     * @param {string} url
     * @return {string}
     * @private
     */
    function get_url_extension( url ) {
        return url.split(/\#|\?/)[0].split('.').pop().trim();
    }

})();