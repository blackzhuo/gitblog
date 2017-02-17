title: 从零开始Node-04
date: 2015-10-16 12:23:42
tags: nodejs
toc: true
---
##### nodejs连接mongodb

###### 操作系统
OS X

###### 安装
```javascript
brew update
brew install mongodb
brew install node
sudo npm install -g express
```
<!--more-->

###### 安装路径
mongo安装在 `/usr/local/bin/mongo` 这个路径
数据库文件在 `/data/db/` 这个路径

###### 操作mongo
* 执行mongod
服务默认使用 host：127.0.0.1 port：27017
* 执行mongo
```javascript
show dbs 查询已有数据库
use databaseTest 创建databaseTest数据库
db.createCollection('test') 创建表
show collections 查看表
db.test.save({name:"qwe"}) 插入数据
db.test.find() 查找数据
db.test.find({name:"qwe"})
db.remove({name:"qwe"}) 删除数据
db.test.ensureIndex({"name":1}) 创建索引
db.test.getIndexes() 查看索引
db.test.dropIndex({"username":1}) 删除索引
db.test.ensureIndex({"name":1, "age":-1})
数字1表示name键的索引按升序存储，-1表示age键的索引按照降序方式存储。
db.test.ensureIndex({"id":1},{"unique":true}) 创建唯一索引，插入重复的值将会报错
如果字段被添加了索引，有可能在插入数据的时候报索引重复的错误，这时候先检查表创建的索引，如果不需要请手动删除索引
```

###### mongo 配置文件：待补充

###### 连接
express 4.x版本有些改动
* 初始化程序 express -e test 创建test工程
* 进入package.json 增加
```javascript
"connect-mongo": "*",
"mongodb": "*"
```
* 执行sudo npm install
* 根目录创建settings.js 存放数据库配置基本信息
```javascript
module.exports = {
    cookieSecret: 'webApp',
    db: 'webApp',
    host: '127.0.0.1',
    port: 27017
};
```
* 创建models文件夹，增加db.js
```javascript
var settings = require('../settings');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port, {
    auto_reconnect: true
}), {
    safe: true
});
```
* 在models文件夹下 创建实体类info.js
```javascript
var mongodb = require('./db');
function Info(info) {
    this.info = info.info;
}
module.exports = Info;
Info.prototype.save = function save(callback) {
    var info = {
        id: (new Date()).getTime(),
        info: this.info
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('infoTable', function(err, collection) {
            if (err) {
                console.log(err);
                mongodb.close();
                return callback(err);
            }
            console.log(info);
            collection.insert(info, {
                safe: true
            }, function(err, info) {
                if (info) {
                    console.log('ok');
                } else {
                    console.log(err);
                    mongodb.close();
                    callback(err, info);
                }
            });
        });
    });
};
Info.prototype.get = function get(userinfo, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        db.collection('infoTable', function(err, collection) {
            if (err) {
                console.log(err);
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                info: userinfo
            }, function(err, info) {
                mongodb.close();
                if (info) {
                    var info = new Info(info);
                    console.log(info);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};
```
* 在routes文件夹下添加 post.js
```javascript
var express = require('express');
var router = express.Router();
var Info = require('../models/info.js')

router.post('/', function(req, res, next) {
    var newInfo = new info({
        name: req.body.Info || 'test'
    });
    newInfo.save(function(err) {
        if (!err) {
            console.log('success');
            res.redirect('/');
        }
        console.log('error',err);
        return res.redirect('/');
    });
});

module.exports = router;
```
* 最后一步，在app.js中添加路由
```javascript
...
var post = require('./routes/post');
...
...
app.use('/post', post);
```