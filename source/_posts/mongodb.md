title: mongodb
date: 2016-10-31 19:57:13
tags: linux
toc: true
---
#### 环境
* centeros

#### 下载
```bash
wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.10.tgz 
```

#### 解压
```bash
sudo tar -zxvf mongodb-linux-x86_64-3.2.10.tgz 
```

<!--more-->

#### 加入PATH
```bash
cd mongodb-linux-x86_64-3.2.10
export PATH=/home/q/mongodb-linux-x86_64-3.2.10/bin:$PATH
```

#### 创建基础文件
```bash
sudo mkdir -p data/db
sudo mkdir logs
sudo vim ./bin/mongodb.conf
```

#### 加入内容
```bash
port=27017
dbpath=/home/q/mongodb-linux-x86_64-3.2.10/data/db
logpath=/home/q/mongodb-linux-x86_64-3.2.10/logs/db.logs
logappend=true
```

#### 启动服务
```bash
sudo mongod -config /home/q/mongodb-linux-x86_64-3.2.10/bin/mongodb.conf  --fork --auth
```

#### 连接数据库
```bash
mongo
```

#### 添加用户
```bash
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
```bash
use admin
db.auth('superuser','pwd')
```

#### 添加用户
```bash
db.createUser(
   {
     user: "zhuo.wu",
     pwd: "zhuo.wu",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```

#### 查看用户
```bash
show users
```

#### 创建数据库
```bash
use testDB
```

#### 创建集合
```bash
db.test.insert({'k':'123'})
show dbs
db.test.find()
```

#### 删除集合
```bash
db.test.drop()
```

#### 删除数据库
```bash
db.dropDatabase()
```

#### 数据库备份
```bash
sudo mongodump -u=superuser -p=pwd
#mongodump -h dbhost -d dbname -o dbdirectory
```

#### 数据库恢复
```bash
sudo mongodump -u=superuser -p=pwd
#mongorestore -h dbhost -d dbname --directoryperdb dbdirectory
```

#### 定时备份数据库
* 备份目录
```bash
sudo mkdir -p /home/mongo/temp && sudo chmod -R 777 /home/mongo/temp
sudo mkdir -p /home/mongo/all && sudo chmod -R 777 /home/mongo/all
```

* 备份脚本
sudo vim /home/schedule/mongo.sh
```bash
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
```bash
sudo chmod -R 777 /home/schedule/mongo.sh
```

* 定时任务
sudo vim /etc/crontab
```bash
40 18 * * * root /home/schedule/mongo.sh
```

* 重启定时任务
```bash
sudo /etc/rc.d/init.d/crond restart
```

* 开机启动
```bash
sudo chkconfig crond on
```

* 启动服务
```bash
sudo service crond start
```


#### 关闭数据库
```bash
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
```bash
sudo rm -rf /home/q/mongodb-linux-x86_64-3.2.10/data/db/mongod.lock
sudo mongod --dbpath /home/q/mongodb-linux-x86_64-3.2.10/data/db --repair
sudo ./mongod --dbpath /home/q/mongodb-linux-x86_64-3.2.10/data/db
```

#### 推荐数据库软件
* Mac: Toad (app store)