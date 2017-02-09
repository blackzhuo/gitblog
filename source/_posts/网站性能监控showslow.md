title: 网站性能监控showslow
keywords: 网站性能监控showslow,性能监控,showslow
description: 网站性能监控showslow
tags: web
toc: true
date: 2017-02-09 14:33:53
---
今天，性能是一个我们常谈的话题，网站性能的重要性不言而喻。
[showslow](https://github.com/sergeychernyshev/showslow/wiki)是一个github上开源的，能够帮助我们监控网站性能的工具。我们可以使用yslow和pagespeed等工具生成分析结果并以图表的方式展现出来。从而全面了解我们网站有哪些方面需要改进。

<!--more-->

#### 环境
* 安装PHP环境
* 安装apache服务器
* 安装mysql数据库

#### phantomjs
[安装phantomjs](http://phantomjs.org/download.html)

#### yslowjs
[yslowjs](http://yslow.org/phantomjs/)
通过yslow分析页面，上报到showslow
```bash
#phantomjs yslow.js http://www.test.com/ --info grade  -b http://127.0.0.1:8088/php/webapp/beacon/yslow/
```

#### phantomas
使用phantomas可以收集网络性能指标
安装: npm install --global phantomas
通过phantomas生成har
```bash
phantomas http://www.test.com/ --engine webkit --har test
```
读取har文件内容，通过接口 http://127.0.0.1:8088/php/webapp/beacon/har/?url=http://www.test.com/ 上传到showslow平台

#### pagespeed
[申请apiKey](https://code.google.com/apis/console/#access)
通过pagespeed分析页面，上报到showslow
```bash
curl http://127.0.0.1:8088/php/webapp/beacon/pagespeed/?api\&u=http://www.test.com/
```

#### HARViewer安装
[HARViewer](https://github.com/janodvarko/harviewer/archive/master.zip)能够帮助我们
* [下载HARViewer](https://github.com/janodvarko/harviewer/archive/master.zip)
* 把解压的文件copy到showslow webapp目录下即可

#### showslow安装
* [下载showslow](https://github.com/sergeychernyshev/showslow/releases)
* 把解压文件夹放到apache www目录下即可

```bash
#unzip showslow
#cd showslow
#cp config.sample.php config.php
#vim config.php

// 配置数据库
$db = 'showslow';
$user = 'xxx';
$pass = 'xxx';
$host = 'localhost';
$port = 3306;

// pagespeed测试key
$pageSpeedOnlineAPIKey = 'xxx';

// 配置har存储
$enableHARBeacon = true;

// 配置harview目录
$HARViewerBase = '/php/webapp/harviewer/webapp';

#vim global.php

// 在页面中配置需要监控测试的页面
$enableMyURLs = true;

#make
```

这样我们就能在页面添加要监控的网站了

#### 使用
可以编写脚本，每天定时去执行检测，获取所有监控的url，然后分别去执行上述的那些方法，进行检测和上报的showslow

