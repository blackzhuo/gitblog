title: NodeJs模块之http
date: 2015-10-31 15:03:01
tags: nodejs
toc: true
---
#### http
##### http.createServer是创建服务器的核心
<!--more-->
```javascript
var http = require('http');
var server = http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type':'text/plain'});
	res.end('data');
});
//另一种创建方式
var server = new http.server();
server.on('request',function(req,res){
	res.writeHeader(200,{'Content-Type':'text/plain'});
	res.end('data');
});
server.maxHeadersCount 设置最大请求数，默认是1000， 0代表无限制
server.timeout 请求超时时间

//server.on还可以可以监听的事件：
1. connection
2. close
3. checkContinue
4. connet
5. upgrade
6. clientError

server.listen(3000,function(){
   console.log('Server is start ... Listen port 3000...');
});
```
##### http.request
做为客户端向服务器发起请求
```javascript
var http = require('http');
var options = {
	method:'POST',
	hostname:'www.test.com',
	port:80,
	path:'/test',
	header:{} //路由发出req中可取到cookie user-agent信息
};
var req = http.request(options,function(res){
	res.setEncoding('utf8');
    res.on('data',function(chunk){
       console.log('data:' + chunk);
    });
    res.on('end',function(chunk){

    });
    res.write('123');
    res.end();
});
req.on('error',function(e){
   console.log(e.message);//请求过程中发生错误
});
req.write('qwe');
req.end();
req.abort(); //用于阻止请求
req.setNoDelay(0); //设置无延迟
```
##### http.get
```javascript
var http = require('http');
http.get('http://www.test.com/test',function(res){
    res.setEncoding('utf8');
    res.on('data',function(chunk){
       console.log('data:' + chunk);
    });
    res.on('end',function(chunk){

    });
    res.write('123');
    res.end();
}).on('error',function(e){
    console.log(e.message);//请求过程中发生错误
});
```