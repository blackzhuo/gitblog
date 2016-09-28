title: NodeJs搭建Http服务器
date: 2015-11-01 15:03:01
tags: nodejs
toc: true
---
#### 介绍
* 我们之前用过IIS,Apache等服务器，都是做一些配置，然后启动服务，指定端口等等就在本地开启了一个服务器。
* 现在我们使用nodejs,一步一步实现一个Http服务器，我们主要用到的是http模块，还会使用fs文件操作，url,path模块用作辅助文件读取。
* 实现
<!--more-->
```javascript
//file_types.js
exports.file_types = {
	"html": "text/html",
	"js": "text/javascript",
  	"css": "text/css",
  	"json": "application/json",
  	"xml": "text/xml",
 	"txt": "text/plain",
  	"gif": "image/gif",
  	"jpeg": "image/jpeg",
  	"jpg": "image/jpeg",
  	"ico": "image/x-icon",
  	"png": "image/png"
};
```
```javascript
var http = require('http');
var fs=require('fs');
var url=require('url');
var path=require('path');
var file_types=require('./file_types').file_types;

var listen_port = '8998';
var server = new http.Server();
server.listen(listen_port);
console.log("Server is start ... port: " + listen_port + "...");

server.on('request',function(req,res){
    var pathname = url.parse(req.url).pathname;
    var realPath = path.join("assets", pathname);
    var extname = path.extname(realPath);
    extname = extname ? extname.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write(pathname + " is not found");
            res.end();
        } else {
            fs.readFile(realPath, function (err, content) {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(err);
                } else {
                    var contentType = file_types[extname] || "text/plain";
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.write(content);
                    res.end();
                }
            });
        }
    });
});
```
* 我们创建了文件的映射规则，对于不用类型的文件，输出不用的文件头，找不到文件返回404,读取错误返回500
