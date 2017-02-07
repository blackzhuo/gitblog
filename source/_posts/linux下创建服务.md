title: linux下创建服务
date: 2017-02-07 13:42:57
tags: linux
toc: true
---
#### 概述
我们通过在 /etc/init.d/ 目录下创建bash脚本，实现自定义服务，通过service命令，能够调用服务中的方法，通常一个服务存在 start stop restart status方法。
<!--more-->

#### 例如
test
```bash
#!/bin/bash
# chkconfig: 2345 20 81
# description: test
case "$1" in
  start)
  echo -n "starting test:"
  echo "OK"
  ;;
  stop)
  echo -n "shutdown test:"
  echo "OK"
  ;;
  status)
  echo "test instance is running..."
  ;;
  restart)
  $0 stop
  $0 start
  ;;
  *)
  echo "Usage:`basename $0` start|stop|status|restart"
esac
exit $?
```
我们在 /etc/init.d/ 下面添加 test 脚本，然后给文件权限 sudo chmod -R 755, 之后我们就能够通过 
* sudo service start 
* sudo service stop 
* sudo service restart 
* sudo service status 
* sudo service 
这些命令去调用我们的服务了

#### 加入开机启动 chkconfig
```bash
usage:   chkconfig [--list] [--type <type>] [name]
         chkconfig --add <name>
         chkconfig --del <name>
         chkconfig --override <name>
         chkconfig [--level <levels>] [--type <type>] <name> <on|off|reset|resetpriorities>
```
sudo chkconfig --add test
sudo chkconfig test on
