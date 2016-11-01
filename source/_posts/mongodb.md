title: mongodb
date: 2016-10-31 19:57:13
tags: linux
toc: true
---
#### 环境
* centeros

#### 下载
```javascript
wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz
```

#### 解压
```javascript
sudo tar -zxvf mongodb-linux-x86_64-3.2.10.tgz 
```

<!--more-->
#### 加入PATH
```javascript
cd mongodb-linux-x86_64-3.2.10
export PATH=/home/q/mongodb-linux-x86_64-3.2.10/bin:$PATH
```

#### 创建基础文件
```javascript
sudo mkdir -p data/db
sudo mkdir logs
sudo vim ./bin/mongodb.conf

#加入内容
port=27017
dbpath=/home/q/mongodb-linux-x86_64-3.2.10/data/db
logpath=/home/q/mongodb-linux-x86_64-3.2.10/logs/db.logs
logappend=true
```

#### 启动服务
```javascript
sudo mongod -config /home/q/mongodb-linux-x86_64-3.2.10/bin/mongodb.conf  --fork --auth
```

#### 连接数据库
```javascript
mongo
```

#### 添加用户
```javascript
use admin
db.createUser(
  {
    user:"superuser",
    pwd:"pwd",
    roles:["root"]
  }
)
```

#### 认证
```javascript
use admin
db.auth('superuser','pwd')
```

#### 添加用户
```javascript
db.createUser(
   {
     user: "zhuo.wu",
     pwd: "zhuo.wu",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```

#### 查看用户
```javascript
show users
```

#### 创建数据库
```javascript
use testDB
```

#### 创建集合
```javascript
db.test.insert({'k':'123'})
show dbs
db.test.find()
```

#### 删除集合
```javascript
db.test.drop()
```

#### 删除数据库
```javascript
db.dropDatabase()
```

#### 数据库备份
```javascript
sudo mongodump -u=superuser -p=pwd
#mongodump -h dbhost -d dbname -o dbdirectory
```

#### 数据库恢复
```javascript
sudo mongodump -u=superuser -p=pwd
#mongorestore -h dbhost -d dbname --directoryperdb dbdirectory
```

#### 定时备份数据库
* 备份目录
```javascript
sudo mkdir -p /home/mongo/temp && sudo chmod -R 777 /home/mongo/temp
sudo mkdir -p /home/mongo/all && sudo chmod -R 777 /home/mongo/all
```

* 备份脚本
sudo vim /home/schedule/mongo.sh
```javascript
#!/bin/sh
user=superuser
passwprd=pwd
deldays=2
backdate=`date +%Y-%m-%d`
backname="mg_$backdate.tar.gz"
mongodump=/home/q/mongodb-linux-x86_64-3.2.10/bin/mongodump
temp=/home/mongo/temp
all=/home/mongo/all
cd $temp
rm -rf $temp/*
mkdir -p $temp/$backdate
$mongodump -u $user -p $passwprd -o $temp/$backdate
tar -zcvf $all/$backname $temp/$backdate
find $all/ -mtime +$deldays -delete
```

* 修改权限
```javascript
sudo chmod -R 777 /home/schedule/mongo.sh
```

* 定时任务
sudo vim /etc/crontab
```javascript
40 18 * * * root /home/schedule/mongo.sh
```

* 重启定时任务
```javascript
sudo /etc/rc.d/init.d/crond restart
```

* 开机启动
```javascript
sudo chkconfig crond on
```

* 启动服务
```javascript
sudo service crond start
```


#### 关闭数据库
```javascript
use admin
db.auth('superuser','pwd')
db.shutdownServer()
#or
db.adminCommand({shutdown : 1, force : true})
#or
db.shutdownServer({force : true})
```

#### 常见问题
* 数据库非正常关闭lock
```javascript
sudo rm -rf /home/q/mongodb-linux-x86_64-3.2.10/data/db/mongod.lock
sudo mongod --dbpath /home/q/mongodb-linux-x86_64-3.2.10/data/db --repair
sudo ./mongod --dbpath /home/q/mongodb-linux-x86_64-3.2.10/data/db
```

#### 推荐数据库软件
* Mac: Toad (app store)