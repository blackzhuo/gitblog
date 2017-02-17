title: 从零开始Node-02
date: 2015-10-13 13:30:14
tags: nodejs
toc: true
---
##### 异步式I/O
Node.js采用单线程事件驱动的异步式 I/O,控制流很大程度上依靠事件和回调函数。
<!--more-->
```javascript
//异步执行
var fs = require('fs');
fs.readFile('1.txt', 'utf-8', function(err, data) {
if (err) { 
    console.error(err);
} else { 
    console.log(data);
} });
console.log('end.');
//先输出 end 在输出data的内容


//同步执行
var fs = require('fs');
var data = fs.readFileSync('1.txt', 'utf-8'); console.log(data);
console.log('end.');
//先输出data的内容，再输出end
```

##### 事件编程
Node.js的异步 I/O 操作完成后，会发送一个事件到事件队列，下面介绍一下EventEmitter
```javascript
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('event_test', function() { console.log('event_test...');
});
setTimeout(function() { event.emit('event_test');
}, 3000);
//3秒后输出 event_test...
```
Node.js 程序由事件循环开始,到事件循环结束,所有的逻辑都是事件的回调函数,所以 Node.js 始终在事件循环中,程序入口就是 事件循环第一个事件的回调函数，事件循环会检测事件队列中是否有位处理的事件，直到循环结束。
```

##### 模块
Node.js 的模块和包机制的实现参照了 CommonJS 的标准
Node.js 中文件和模块是一一对应的，一个Node.js就是一个模块，var http = require('http') http就是一个模块，require后获取这个模块
一个例子创建，并且引用一个模块
```javascript
//声明一个模块
var age;
exports.setAge = function(age) { age = age;
};
exports.myAge = function() { console.log("i'm " + age);
};

//调用
var thisModule = require('./module'); //上面的文件名
thisModule.setAge('12'); 
thisModule.myAge(); //输出 i'm 12
```
在Node.js中，如果require两次一个模块，那么也只是一次，并且后实例化的对象会覆盖掉之前的
```javascript
var thisModule1 = require('./module'); //上面的文件名
thisModule.setAge('11'); 

var thisModule2 = require('./module'); //上面的文件名
thisModule.setAge('12'); 
thisModule.myAge(); //输出 i'm 12
//thisModule1 thisModule2指向同一个实例，后看的覆盖了前面的
```
* 把对象封装到模块中
```javascript
function Test() { 
    var age;
    this.setAge = function(age) {
        age = age;
￼    };
    this.myAge = function() { 
        console.log("i'm " + age);
    };
};
module.exports = Test;

//调用
var test = require('./test');
test = new Hello(); 
test.setAge(12);
test.myAge();
```

##### 包
依照 CommonJS 规范实现包机制，使用npm对包进行管理
Node.js包是一个目录，必须含有package.json,文件中是包的一些具体内容，配置信息等
CommonJS规范:
package.json必须在包顶层目录下，
二进制文件在bin下
javascript文件在lib下
文档在doc下
单元测试在test下
* 包通常是一些模块的集合，制作一个简单的包
```javascript
//pkg/index.js
exports.hello = function(){
    console.log('hello node.js');
}

//loadpackage.js
var pkg = require('./pkg');
pkg.hello();
//会输出 hello node.js

//package.json
{
    "main" : "./lib/app.js"
}
//重命名index.js 为app.js，放在lib下，同样方式调用这个包，同样生效
```
Node.js 调用包时,先检查 package.json 文件的 main 字段,将其作为包的接口模块,如果 package.json 或 main 字段不存在,会尝试找 index.js 或 index.node 作 为包的接口。
package.json中包含下面这几项
name 包名称
description 描述
version 版本
keywords 关键字
maintainers 维护者数组，每个元素要包含 name、email (可选)、web (可选)字段。
contributors 贡献者数组，格式同上
bugs 提交bug地址
licenses 许可证数组，每个元素包含 type(许可证名称) url(链接到许可证地址)
repositories 仓库托管地址 包含 type,url,path(可选，相对于仓库地址)
dependencies 包的依赖数组，包名称，版本好组成

##### Node.js 包管理器
npm
1.获取一个包 npm [install/i] [package_name] -g（区分本地模式和全局模式，添加-g的为全局模式）
2.全局链接 npm link，windows不支持
3.发布，可以使用npm init创建一个符合标准的package.json,npm adduser获取一个维护包的账号，npm publish就发布出去了，下次修改后，修改package.json中的version再执行npm publish
4.取消发布 npm unpublish

##### 调试
1.Node.js支持单步调试，node debug 后面加需要调试的js文件，就会启动调试工具，暂时不做详细介绍
2.远程调试
3.Eclipse调试
4.node-inspector调试