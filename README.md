# GSPxy

A Google Chrome extension to proxy static files hosted by Google.


Author: sskaje ([http://sskaje.me/](http://sskaje.me/))


## Notice & Warnings

If you can access Google, this extension is useless to you.

如果你能访问Google，这个扩展对你无用。

**DO NOT TRUST ME NOR OTHER THIRD-PARTY PROXY APP/EXTENSION/SERVER...**



## Install / 安装

### Install from Chrome Web Store
Download from [Chrome Web Store](https://chrome.google.com/webstore/detail/gspxy/ocjlgkdfecjkedmjnjblcgapenfhobkb/).

### Install from Source
If you cannot access Chrome Web Store, download/clone source code in this project, make sure 'Developer Mode' is checked in [Chrome Extension Config](chrome://extensions) and then choose 'Load Unpacked Extension'.

如果你无法访问Chrome Web Store，请下载或者clone本项目，在[Chrome 扩展程序](chrome://extensions)里勾选‘开发者模式’，然后点击‘加载已解压的扩展程序’。


## Configure / 配置

暂时不支持界面配置管理。
请开发者模式下修改 gsp_config.js

```
// 所有需要走代理的请求
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

// 目标web代理，自己有服务器的可以考虑自己搭建，但是自己都有服务器了就犯不着用这个插件了
var gsp_prefix = 'p.rst.im/q/';

// 设为true安全一些
var gsp_always_https = true;

// 下述规则的网站不启用代理
var gsp_domain_blacklist = /(google.com|chrome.com)$/;

```



## More
### About Server

https://sskaje.me/2016/08/web-static-resource-proxy/

### More
[Read more](https://sskaje.me/gspxy/)

