title: 使用nproxy实现本地代理
date: 2015-11-22 15:03:01
tags: web
toc: true
---

#### 安装
##### 先安装Node.js
##### 安装nproxy
```javascript
sudo npm install -g nproxy
```javascript
##### nproxy介绍
```javascript
Options:
    -h, --help               output usage information
    -V, --version            output the version number
    -l, --list [list]        Specify the replace rule file
    -p, --port [port]        Specify the port
    -t, --timeout [timeout]  Specify the request timeout(5 seconds by default)
    -d, --debug              Enable debug mode
    -n, --networks           Display network interface list
```
##### 开启代理端口
```javascript
nproxy -l replace_rule.js -p 8188
```
使用本地replace_rule.js转换规则，监听本地8188端口

##### replace_rule.js
```javascript
module.exports = [
    {
        pattern:'http://test.test.com/pro/(.*)',
        responder:"http://127.0.0.1/pro/$1"
    }
];
```
##### 浏览器怎么做
* 安装代理插件，一大堆
* 配置代理 127.0.0.1 端口8188
* 可以设置自动转换规则，即：哪些网站使用这个代理