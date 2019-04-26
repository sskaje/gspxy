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

### 自建服务器 (nginx)

```
root@localhost:~# cat /etc/nginx/sites-available/p.rst.im 
proxy_cache_path /dev/shm/nscache keys_zone=p_rst_im_cache:10m;

server {
	listen 80;
	listen 443 ssl http2;

	ssl_certificate      /etc/nginx/cert/rst.im/server.crt;
	ssl_certificate_key  /etc/nginx/cert/rst.im/server.key;

        include snippets/require-default-https.conf;


	root /var/www/p.rst.im/;
	index index.html index.htm index.php;
	include snippets/cloudflare-realip.conf;

	server_name p.rst.im *.p.rst.im;
	gzip on;
	gzip_types text/css application/x-javascript text/x-component text/richtext image/svg+xml text/plain text/xsd text/xsl text/xml image/x-icon application/javascript text/javascript;

	access_log /var/log/nginx/p.rst.im-access.log proxy_full;
	error_log /var/log/nginx/p.rst.im-error.log;

	proxy_ssl_server_name on;
	proxy_ssl_session_reuse on;
	proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	proxy_ssl_ciphers   HIGH:!aNULL:!MD5;

	location ~ ^/q/(?<p_domain>[a-z0-9A-Z\.\-]+)/(?<p_ext>.+)$ {
		rewrite ^/q/([a-z0-9A-Z\.\-]+)/(.+)$ /$2 break;
		proxy_pass https://$p_domain:443;
		proxy_set_header Host $p_domain;

		proxy_set_header CF-Connecting-IP "";
		proxy_set_header CF-IPCountry "";
		proxy_set_header CF-Visitor "";
		proxy_set_header CF-RAY "";
		proxy_set_header X-Forwarded-For "";
		proxy_set_header X-Forwarded-Proto "";

		proxy_buffer_size 64k;
		proxy_buffers   32 32k;
		proxy_busy_buffers_size 128k;

		proxy_cache_key "$proxy_host$uri$is_args$args";
		proxy_cache p_rst_im_cache;
		proxy_cache_valid 200 302 10m;

		add_header X-Cache-Status $upstream_cache_status;

	}
}
```


## More
### About Server

https://sskaje.me/2016/08/web-static-resource-proxy/

### More
[Read more](https://sskaje.me/gspxy/)

