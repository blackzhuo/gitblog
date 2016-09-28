title: linux常用命令
date: 2015-10-28 15:03:01
tags: linux
toc: true
---
#### 常用命令总结
##### 修改环境变量
```javascript
sudo vim ~/.bashrc 
//加入类似环境变量
export PATH=${PATH}:/home/me/mongodb/mongodb-linux-x86_64-3.0.4/bin
```
<!--more-->

##### 修改文件权限
```javascript
sudo chmod -R  777 /data/db
```
##### 软链接
```javascript
ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
```
##### scp
```javascript
scp /data/a.txt user@1.1.1.1:/home
```
##### mongod
```javascript
mongod --dbpath /data/db  --fork --logpath=/data/db/work.log
```
##### nginx
```javascript
//启动ng
sudo /usr/local/nginx/sbin/nginx
//重启
/usr/local/nginx/sbin/nginx -s reload
//配置
/usr/local/nginx/conf/nginx.conf
配置转发
upstream monitor_server {
    server 111.111.111.111:80;
        server 111.111.111.112:80;
}
 
server
{
    listen 80;
    server_name www.test.com;
    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://monitor_server;
    }
    access_log logs/www.test.com_access.log;
}
```
##### cp
```javascript
cp -Rf /home/user1/* /root/temp/
```
##### 查看进程
```javascript
ps -ef | grep node
```
##### 结束进程
```javascript
kill -9 [pid]
```
##### rsync
```javascript
rsync -av /User/* user@1.1.1.1:~/data
```
##### tail
* 从指定点开始将文件写到标准输出
* 经常使用 -f 查看日志
##### node
* 使用supervisor开启服务，不需要每次变更文件都重启
* 使用forever执行文件，可以让node脚本一直运行