//
// GSPxy
// Extension script
//
// Author: sskaje (https://sskaje.me/)
//

var gsp_proxy_url = function(url)
{
    return (gsp_always_https ? 'https' : url.substr(0, url.indexOf('://'))) + '://' + gsp_prefix + url.substr(url.indexOf('://') + 3);
}

var get_url_host = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
};

var GSP_Open_Tab_Hosts = {};

chrome.tabs.onCreated.addListener(function(tab){
    if (typeof tab.id != 'undefined') {
        GSP_Open_Tab_Hosts[tab.id] = get_url_host(tab.url);
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    GSP_Open_Tab_Hosts[tabId] = get_url_host(tab.url);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    delete GSP_Open_Tab_Hosts[tabId];
});

chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
        // http & https only
        if (info.url.indexOf('http') !== 0) {
            console.log("GSP Url scheme not accepted: " + info.url);
            return {cancel: false};
        }

        var tabid = parseInt(info.tabId);
        if (tabid > 0 && typeof GSP_Open_Tab_Hosts[tabid] != 'undefined') {
            if (GSP_Open_Tab_Hosts[tabid].match(gsp_domain_blacklist)) {
                // do not proxy request if current page is google's
                console.log("GSP blacklist matched host=" + GSP_Open_Tab_Hosts[tabid]);
                return {cancel: false};
            }
        }


        return {redirectUrl: gsp_proxy_url(info.url)};
    },
    // filters
    gsp_filters,
    // extraInfoSpec
    ['blocking']
);
