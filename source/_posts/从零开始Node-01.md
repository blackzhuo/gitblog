title: 从零开始Node-01
date: 2015-10-13 13:27:04
tags: nodejs
toc: true
---
* 安装node,不同系统安装方法不同，到官网上下载并安装
* 安装node包管理器 curl http://npmjs.org/install.sh | sh
* 安装node多版本管理器 npm install -g n
* 安装supervisor npm install -g supervisor 修改代码后不需要手动重启服务器
* 一个简单的HTTP服务器
<!--more-->
```javascript
var http = require('http');
http.createServer(function(req, res) { res.writeHead(200, {'Content-Type': 'text/html'}); res.write('<h1>This Server</h1>');
    res.end('<p>Hello Node.js</p>');
}).listen(8888);
console.log("HTTP server is start...port: 8888.");
```