title: 从零开始Node-03
date: 2015-10-14 13:34:43
tags: nodejs
toc: true
---
##### Node.js API
###### 全局对象
>在javascript中，window是全局对象
在Node.js中，global是全局对象。
<!--more-->
满足全局变量的条件：
* 最外层定义的变量
* 全局对象的属性
* 隐式定义的变量
全局变量过多定义过于随意会带来全局变量污染的问题，为了避免全局变量污染，在定义变量的时候使用var

###### process
Node.js的进程对象
* Event: ‘exit’
>process退出时会出发
* Event: ‘uncaughtException’
>process发生异常时触发
* process自定义事件
```javascript
process.on('test',function(data)){
    console.log(data);
    process.exit(0);
}
process.emmit('test','emmit test');
```
* process.stdin
>标准输入流
```javascript
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) { 
    process.stdout.write('data：' + data.toString());
});
```
* process.stdout
>标准输出流,比console.log()更底层
```javascript
process.stdout.write(‘data’)
```
* process.argv
>命令行参数数组
```javascript
console.log(process.argv); //存储为 test.js

//执行
node test.js 1 "asd" age=12
```
* process.nextTick(callback)
>为事件循环设置一项任务，在下次事件循环调用响应时调用callback
```javascript
function deal(args,callback){
    doit(args);
    process.nextTick(callback);
}
deal(function(){
    dome();
});

//如果doit 和 dome都是很耗时的函数，这样把耗时的操作拆分成两个事件，减少了每个事件执行时间，提高了事件响应速度。

//比setTimeout(fn,times)效率更高
```
* process.pid、process.title、process.arch、process.platform
>进程id，进程名字，进程架构(系统架构，X86)，进程平台(操作系统)
* process.execPath
>返回当前node.js进程的启动命令路径
* process.memorUsage()
>进程的内存使用情况
* process.kill(pid, signal=’SIGTERM’)
>发出一个kill信号给指定pid
* process.exit(code=0)
>kill当前进程，退出本进程
…

###### console
* console.log()
>向标准输出流打印字符并以换行符结
```javascript
console.log(123); //123
console.log('d% world',hello); //hello world
```
* console.error()
>向标准错误流输出
* console.trace()
> 向标准错误流输出当前调用栈
* console.info()
> 如果只有一个参数，输出这个参数的字符串形式
如果有多个参数，格式输出
如果没有参数，只打印一个换行符
* console.warn()
>输出警告
* console.dir(obj)
>将obj作为参数传递给util.inspect并执行，将返回的结果打印到stdout
* console.time(label)
>统计操作执行的时间
* console.timeEnd(label)
>统计操作执行的时间
```javascript
console.time('start');
var count=0;
for(var i=0;i<9999;i++)
{
    count+=i;
}
console.log('sum='+sum);
console.timeEnd('end');
```
* console.assert()
>计算结果为真返回true

##### util
>提供常用函数的集合
* util.inherits
>是一个实现对象间实现继承的函数
```javascript
var util = require('util');
function parent(){
    this.name = 'parent';
    this.age = 55;
    this.do = function(){
        console.log('1:' + this.name);
    };

}
parent.prototype.show = function(){
    console.log('2:' + this.name);
};

function child(){
    this.name = 'child';
}

util.inherits(child,parent);

var testParent = new Parent();
testParent.show(); //2:parent
testParent.do(); //1:parent


var testChild = new child(); 
testchild.show(); //2:child

//仅仅继承了在原型中定义的函数，而构造函数内部的属性没有继承。
```
* util.inspect
>将任意对象转换成字符串的方法，通常用在调试和错误输出的时候
1.接收至少一个对象，要转换的对象
2.showHidden，可选，true 输出更多隐藏信息
3.depth 最大递归层数，默认为2，null表示不限层数
4.color 如果为true，输出将会带颜色
5.注意：并不是简单的以字符串输出，即便定义了toString也不会调用
* util.isArray()
>如果给定的参数 “object” 是一个数组返回true，否则返回false。
* util.isRegExp()
>如果给定的参数 “object” 是一个正则表达式返回true，否则返回false。
* util.isDate()
>如果给定的参数 “object” 是一个日期返回true，否则返回false。
* util.isError()
>如果给定的参数 “object” 是一个错误对象返回true，否则返回false。
* util.format()
>返回一个格式化后的字符串
```javascript
// %s - String.
// %d - Number (both integer and float).
// %j - JSON.
// %% - single percent sign ('%'). This does not consume an argument.
util.format(1, 2, 3); //1 2 3
util.format('%s:%s', 'asd', 'qwe'); //asd:qwe
```
* util.debug()
```javascript
require('util').debug('debug');
```
##### event
>events模块不仅用于用户代码与Node.js下层事件循环的交互，还几乎被所有模块依赖。
events.EventEmitter,事件发射与事件监听器功能的封装
```javascript
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('test_event', function(param) { console.log('1-', param);
});
emitter.on('test_event', function(param) { console.log('2-', param);
});
emitter.emit('test_event', 123);

// 1-123 
// 2-123
```
* EventEmitter.on(event, listener)
>注册一个监听器，接收事件名和回调函数
* EventEmitter.emit(event, [arg1], [arg2], […])
>接收事件名，传递参数
* EventEmitter.once(event, listener)
>注册一个单次的监听器，触发一次后就解除
* EventEmitter.removeListener(event, listener)
>解除指定的监听器
* EventEmitter.removeAllListeners([event])
>解除所有监听器
* emitter.listeners(event)
>返回值接收到event所有注册监听的集合
* emitter.setMaxListeners(n)
>给EventEmitter设置最大监听数,默认是10个
* error事件
>error触发时,EventEmitter如果没有响应的监听器,Node.js 会把它当作异常,退出程序并打印调用栈。我们一般要为会发射 error 事件的对象设置监听器,避免遇到错误后整个程序崩溃
```javascript
var events = require('events');
var emitter = new events.EventEmitter();
emitter.emit('error');
```
* 继承EventEmitter
>只要是支持事件响应的核心模块都是 EventEmitter 的子类

##### fs
>文件操作模块，提供了文件的读取、写入、更名、删除、遍历目录、链接等

* fs.readFile
>异步读取
fs.readFile(filename,[encoding],[callback(err,data)])
```javascript
var fs = require('fs');
fs.readFile('data.txt', 'utf-8', function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
```
* fs.readFileSync
>同步读取
fs.readFileSync(filename, [encoding])
* fs.open
>fs.open(path, flags, [mode], [callback(err, fd)])
1.path文件路径
2.flags
* r 读取模式
* r+ 读写模式
* w 写入模式，不存在创建
* w+ 读写模式，不存在创建
* a 追加模式，不存在创建
* a+ 读取追加模式打开，不存在创建
3.mode 创建文件时指定的文件权限
* fs.read
> `fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])`
```javascript
var fs = require('fs');
fs.open('data.txt', 'r', function(err, fd) { 
    if (err) {
        console.error(err);
        return; 
    }
    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function(err, bytes, buffer) {
        if (err) {  
            console.error(err); 
            return;
        }
        console.log('data: ' + bytes);
        console.log(buffer);
    })
});
```

##### HTTP服务器
```javascript
var http = require('http');
http.createServer(function(req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write('<h1>Hello</h1>');
    res.end('<p>Hello World</p>');
}).listen(3000);
console.log("server is start...port 3000.");
```
* http.Server
>http模块中的HTTP服务器对象
http.Server的事件
1.request 客户端请求到来时触发
2.connection TCP连接建立时触发
3.close 服务器关闭时触发
4.checkContinue
5.upgrade
6.clientError
```javascript
var http = require('http');
var server = new http.Server(); 
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write('<h1>Hello</h1>');
    res.end('<p>Hello World</p>');
}); 
server.listen(3000);
console.log("server is start...port 3000.");
```
* http.ServerRequest
>http.ServerRequest提供了三个事件控制请求体传输
1.data 请求体数据到来时，事件触发
2.end 请求体传输结束时触发
3.close 请求结束时触发，用户强制终止了传输也会触发
属性
1.complete
2.httpVersion
3.method
4.url
5.headers
6.trailers
7.connection
7.socket
8.client
获取GET请求内容
```javascript
var http = require('http'); 
var url = require('url'); 
var util = require('util');
http.createServer(function(req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);

//请求 http://127.0.0.1:3000/text/id=123&key=qwe
```
获取POST请求内容
```javascript
var http = require('http');
var querystring = require('querystring'); 
var util = require('util');
http.createServer(function(req, res) { 
    var post = '';
    req.on('data', function(chunk) { 
        post += chunk;
    });
    req.on('end', function() {
        post = querystring.parse(post); res.end(util.inspect(post));
    });
}).listen(3000);
```
* http.ServerResponse
response.writeHead(statusCode, [headers]) 向请求的客户端发送相应头
response.write(data, [encoding]) 向请求的客户端发送响应内容
response.end([data], [encoding]) 响应结束，告知客户端所有发送已经完成

##### HTTP客户端
* http.request(options, callback)
>option 常用的参数
host 请求网站的域名或者IP地址
port 请求网站的端口，默认80
method 请求方法，默认是GET
path 请求的相对于根的路径
headers 一个关联的数组对象，为请求头的内容
callback 传递一个参数，为http.ClientResponse的实例
tp.request 返回一个http.ClientRequest的实例

* http.get(options, callback)
>更加简便的方法用于处 理GET请求
函数
write
end
request.abort()，终止正在发送的请求
request.setTimeout(timeout, [callback]) 设置请求超时时间，请求超时以后,callback 将会被调用
request.setNoDelay([noDelay])
request.setSocketKeepAlive([enable], [initialDelay])

* http.ClientRequest
>它表示一个正在处理的请求，其头部已经进入请求队列

* http.ClientResponse
>事件
data 数据到达，传递参数chunk，表示接收到的数据
end 传输结束
close 连接结束
属性
statusCode HTTP状态码
httpVersion HTTP协议版本
headers HTTP请求头
trailers HTTP请求尾
函数
response.setEncoding([encoding])，设置默认编码
response.pause()，暂停接收数据和发送事件，方便实现下载功能
response.resume()，从暂停状态恢复
