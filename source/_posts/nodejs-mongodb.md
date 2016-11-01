title: nodejs+mongodb
date: 2016-10-31 20:53:27
tags: nodejs
toc: true
---
这篇文章中，我们使用nodejs搭建简易服务器，然后开发一个登录过程中使用的增删改查接口，数据库使用mongoDB,操作数据库模块选用mongoose。

#### 创建nodejs工程
>npm init 
>创建package.json文件

```json
{
  "name": "nodeblog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0",
    "mongoose": "^4.6.5",
    "url": "^0.11.0"
  }
}
```
>dependencies中显示的是安装的依赖包，下面有安装过程，先不用考虑

#### 使用express
>sudo npm install express --save
>快速构建web应用模块 资料: http://www.expressjs.com.cn/4x/api.html

#### app.js
```javascript
var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('hello world');
});
app.listen(3000);
console.log('nodejs server start, listen port 3000');
```
>浏览器打开 http://127.0.0.1:3000/ 页面显示 hello world

#### 使用mongoose
>sudo npm install mongoose --save
>数据库操作模块

#### 安装其他模块
>sudo npm install url --save
>辅助解析url参数

#### nodejs操作数据库
>app.js 程序主文件
```javascript
var express = require('express');
var app = express();
var routes = require('./routes/index');
app.use('/', routes);
app.listen(3000);
console.log('nodejs server start, listen port 3000');
```

>routes/index.js 路由文件
```javascript
var express = require('express');
var router = express.Router();
var login = require('../main/login');
router.get(['/login'], function(req, res, next) {
    login(req, res, next);
});
module.exports = router;
```

>main/config.js 数据库配置文件
```javascript
var config = {
	dbHost: '127.0.0.1',
	dbPort: '27017',
	dbAdmin: 'superuser',
	dbPassword: 'pwd'
};
module.exports = config;
```

>main/loginSchema.js 数据库表结构
```javascript
var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema({
	username: String,
	userpassword: String
});
module.exports = loginSchema;
```

>main/login.js 登录增删改查逻辑文件
```javascript
var url = require('url'),
    mongoose = require('mongoose'),
    loginSchema = require('./loginSchema'),
    config = require('./config');
var opt = {
        user: config.dbAdmin,
        pass: config.dbPassword,
        auth: {
            authdb: 'admin'
        }
    },
    db = mongoose.createConnection(config.dbHost, 'userinfo', config.dbPort, opt),
    pageModule = db.model("user", loginSchema);
var result,
    dbSuccess = {
    	ret:true,
    	data:{}
    }, 
    dbError = {
    	ret:false,
    	data:'fail'
    };
/**
 *  存储数据
 */
function saveData(req, res, next, pageData) {
    var pageDataModule = new pageModule(JSON.parse(pageData));
    pageDataModule.save(function(err) {
        res.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8"
        });
        if(err){
            result = JSON.stringify(dbError);
            res.end(result);
        }
        dbSuccess.data = '操作成功';
        result = JSON.stringify(dbSuccess);
        res.end(result);
    });
}
/**
 *  删除数据
 */
function deleteData(req, res, next,query) {
    var query = query ? JSON.parse(query) : {};
    pageModule.remove(query).exec(function(err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8"
        });
        if(err){
            result = JSON.stringify(dbError);
            res.end(result);
        }
        dbSuccess.data = '操作成功';
        result = JSON.stringify(dbSuccess);
        res.end(result);
    });
}
/**
 *  更新数据
 */
function updateData(req, res, next,query, pageData) {
    var query = query ? JSON.parse(query) : {};
    pageData = JSON.parse(pageData);
    pageModule.findOneAndUpdate(query, pageData).exec(function(err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8"
        });
        if(err){
            result = JSON.stringify(dbError);
            res.end(result);
        }
        dbSuccess.data = '操作成功';
        result = JSON.stringify(dbSuccess);
        res.end(result);
    });
}
/**
 *  查询数据
 */
function queryData(req, res, next,query) {
    var query = query ? JSON.parse(query) : {};
    pageModule.find(query).exec(function(err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8"
        });
        if(err){
            result = JSON.stringify(dbError);
            res.end(result);
        }
        if(data && data.length){
            dbSuccess.data = data;
            result = JSON.stringify(dbSuccess);
            res.end(result);
        }else{
            result = JSON.stringify(dbError);
            res.end(result);
        }
    });
}
/**
 *  增删改查入口
 */
function login(req, res, next){
	var queryObj = url.parse(decodeURIComponent(req.url), true).query,
	    type = queryObj.type,
	    query = queryObj.query,
	    pageData = queryObj.pageData;
	switch(type){
		case 'add':
			saveData(req, res, next,pageData);
			break;
		case 'delete':
			deleteData(req, res, next,query);
			break;
		case 'update':
			updateData(req, res, next,query, pageData)
			break;
		case 'find':
			queryData(req, res, next,query)
			break;
		default:
			break;
	}
}
module.exports = login;
```

#### 测试url
1.http://127.0.0.1:3000/login?type=add&pageData={"username":"wz","userpassword":"wz"}
2.http://127.0.0.1:3000/login?type=find
3.http://127.0.0.1:3000/login?type=update&query={"username":"wz"}&pageData={"username":"ww","userpassword":"wz"}
4.http://127.0.0.1:3000/login?type=delete&query={"username":"ww"}
>提供的测试url分别做了：1 向数据库中插入一条数据，2 在数据库中查找users表中所有数据，3 修改第一步中添加的数据，4 删除第三步中修改的数据。都以json格式返回给客户端。