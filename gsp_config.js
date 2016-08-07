//
// GSPxy
// A Chrome Extension Redirecting Google's Static Files to sskaje's Proxy
//
// Extension config
//
// Author: sskaje (https://sskaje.me/)
//

var gsp_filters = {
    "urls":  [
        // google.com for recaptcha
        "*://*.google.com/*.js",
        "*://*.google.com/*.css",

        // googleapis
        "*://*.googleapis.com/*",


        // other static resources
        "*://*.googleusercontent.com/*",
        "*://*.gstatic.com/*"
    ],
    "types" : []
};

var gsp_prefix = 'p.rst.im/q/';

var gsp_always_https = true;

var gsp_domain_blacklist = /(google.com|chrome.com)$/;

