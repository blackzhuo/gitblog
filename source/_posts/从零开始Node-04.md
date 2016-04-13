title: 从零开始Node-04
date: 2015-10-15 14:33:42
tags: nodejs
toc: true
---
##### web开发
>* 使用express框架
* 版本 4.x
* 安装 sudo npm uninstall -g express
* 安装 sudo npm install -g express-generator,4.x以后的版本需要安装这个
* 初始化工程 express -e webApp 使用express -h会发现，-e是使用ejs模版
* webApp工程创建完毕，我们执行 cd webApp && sudo npm install 为工程安装相关依赖
* package.json会比以往的不同
<!--more-->
```javascript
{
    "name": "webApp",
    "version": "0.0.0",
    "private": true,
    "scripts": {
        "start": "node ./bin/www"
    },
        "dependencies": {
        "body-parser": "~1.13.1",
        "cookie-parser": "~1.3.5",
        "debug": "~2.2.0",
        "ejs": "~2.3.2",
        "express": "~4.13.0",
        "morgan": "~1.6.1",
        "serve-favicon": "~2.3.0"
    }
}
```
* 启动server npm start 会进入package.json寻找start属性
* 与以往不同的是，之前http.server启动的代码是在app.js中，而现在是在./bin/www这个文件中
* 文件结构介绍
    1 bin下面是一个www文件，启动node server的
    2 node_modules 安装依赖的模块
    3 public 静态资源，js css images
    4 routes 路由
    5 views 页面模版
    6 app.js 主文件，引擎，路径，解析器，工具，路由等相关配置
    7 `package.json` node.js标准配置文件