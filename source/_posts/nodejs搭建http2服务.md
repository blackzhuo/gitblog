title: nodejs搭建http2服务
keywords: nodejs,http2
description: nodejs搭建http2服务
tags: nodejs
toc: true
date: 2017-03-19 11:02:18
---
http经历了1.0/1.1/2.0的过程，在http1.0的时代如果客户端和服务端要建立一个长链接，需要通过keep-alive来告知服务器需要建立一个长链接。而http1.1默认就支持了长链接，可以用长链接发多个请求，http1.1支持数据的chunk方式的传输，可以分块对内容进行传输。http2.0支持多路复用，可以同一个链接并发处理多个请求。

<!--more-->

##### nodejs
使用http2的npm包来实现服务器开发，先创建一个新的文件夹，在文件夹下面执行 npm init，会创建package.json文件，然后执行 npm install http2 --save，安装好http2模块，创建app.js文件：
```javascript
const fs = require('fs');
const http2 = require('http2');
const options = {
  key: fs.readFileSync('/home/cert/server.key'),
  cert: fs.readFileSync('/home/cert/server.crt')
};

require('http2').createServer(options, (request, response) => {
  response.end('Hello world!');
}).listen(8181);
console.log('server start listen port 8181.');
```
使用pm2管理nodejs程序，npm install pm2 -g 全局安装pm2模块，使用 pm2 start app.js 启动服务。
在浏览器中访问 xxx.xxx.xxx.xxx:8181 页面输出 Hello world 内容，打开浏览器控制台输入 chrome.loadTimes()
```javascript
{
	"requestTime": 1489892055.336,
	"startLoadTime": 1489892055.336,
	"commitLoadTime": 1489892055.711,
	"finishDocumentLoadTime": 1489892055.728,
	"finishLoadTime": 1489892055.764,
	"firstPaintTime": 1489892055.764,
	"firstPaintAfterLoadTime": 0,
	"navigationType": "Reload",
	"wasFetchedViaSpdy": true,
	"wasNpnNegotiated": true,
	"npnNegotiatedProtocol": "h2",
	"wasAlternateProtocolAvailable": false,
	"connectionInfo": "h2"
}
```
connectionInfo: "h2" 表示已经是http2的协议。

##### nginx
使用nginx代理nodejs服务器，因为http2要求必须是https协议，所以我们先创建证书，可以在 [便宜SSL](https://www.pianyissl.com/) 这个网站申请免费的证书，前提是需要我们有一个域名，并且有对域名的绝对控制权，还需要一个企业域名邮箱，来接收处理证书的邮件。企业邮箱使用个人域名解析，可以在阿里云购买域名和企业邮箱。
```javascript
upstream  http2s{
     server 127.0.0.1:8181;
}
server {
        listen 443 ssl http2 default_server;
        server_name  xuerlove.com;
        charset utf8;
        ssl on;
        ssl_certificate             /etc/nginx/cert/server.pem;
        ssl_certificate_key         /etc/nginx/cert/server.key;
        ssl_session_timeout         5m;
        ssl_protocols               SSLv3 TLSv1;
        ssl_ciphers                 ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
        ssl_prefer_server_ciphers   on;
        proxy_set_header  Host  $host;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        location / {
                proxy_pass https://http2s;
        }
}
```

以上使用到的证书都是在 [便宜SSL](https://www.pianyissl.com/) 这个网站生成的。

##### 验证
浏览器访问 https://xuerlove.com，验证证书的正确性以及http2服务。










