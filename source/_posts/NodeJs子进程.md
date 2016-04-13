title: NodeJs子进程
date: 2015-10-29 15:03:01
tags: nodejs
toc: true
---
##### child_process
>* NodeJs的子进程有很多和系统交互的接口，我们先看一下主要的API:
	1. child.stdin 标准输入
	2. child.stdout 标准输出
	3. child.stderr 标准错误输出
	4. child.pid 子进程PID
* 生成子进程的方法:
	1. `spawn(command,[args],[options])` 启动一个新的进程来执行command，args命令行参数
	2. `exex(command,[options],callback)` 启动一个新的进程来执行command命令，callback用于在进程结束时获取辨准输入，标准输出，以及错误信息
	3. `execFile(file,[args],[options],[callback])` 启动一个新的进程来执行可执行文件file，callback用于在进程结束时获取辨准输入，标准输出，以及错误信息
	4. fork(modulePath,[args],[options]),启动一个新的进程来执行一个javascript文件模块，创建Node子进程
* 进程间通信：
	1. 使用send方法进行发送消息，通过监听message事件来获取消息
	```javascript
	var child = require('child_process');
	var fork = child.fork;
	var ch = fork('./test.js');
	ch.on('message',function(m){
		console.log(m);
	});
	ch.send({k:'key'});
	```
	```javascript
	//test.js
	process.on('message',function(m){
		console.log(m);
	});
	process.send({k:'test'});
	```
	2. send方法同步发送消息，要避免发送数据量比较大的数据，造成性能无谓的消耗
	3. send(message,[sendHandle])
	4. send可以用来发送
		* net.Native
		* net.Server
		* net.Socket
		* dgram.Native
		* dgram.Socket
	```javascript
	var child = require('child_process');
	var fork = child.fork;
	var ch = fork('./test.js');
	var server = require('net').createServer();
	server.listen(3000,function(){
		ch.send('server',server);
	}).on('connection',function(){
		console.log('parent');
	});
	```
	```javascript
	process.on('message', function(k, v) {
	    if (k === 'server') {
	        v.on('connection', function() {
	            console.log('child');
	        });
	    }
	});
	```
* 使用子进程统计系统登录次数
```javascript
var child = require('child_process');
var exec = child.exec;
var last = exec('last | wc -l');
last.stdout.on('data', function (data) { 
	console.log(data); 
}); 
last.on('exit', function (code) { 
	console.log('子进程已关闭：' + code); 
});
```

##### Cluster实现多进程
```javascript
var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  require('os').cpus().forEach(function(){
    cluster.fork();
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
  cluster.on('listening', function(worker, address) {  
    console.log("A worker with #"+worker.id+" is now connected to " +
     address.address +
    ":" + address.port);  
  }); 
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    console.log('Worker #' + cluster.worker.id + ' make a response');
  }).listen(8000);
}
```
* 只有主线程才能调用，当有请求发起时，主线程随机分配给某个子进程