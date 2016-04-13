title: nodejs调用phantom
date: 2015-11-08 15:03:01
tags: nodejs
toc: true
---
#### phantomjs
>phantomjs能够截图，查看网页请求信息，对页面进行dom操作等等
利用phantomjs能够做很多事，例如通过截图对比查看页面是否疵了，网络请求监测网页性能，dom抓取等等

#### 安装
* centos
```javascript
sudo yum install gcc gcc-c++ make git openssl-devel freetype-devel fontconfig-devel 
git clone git://github.com/ariya/phantomjs.git 
cd phantomjs 
git checkout 1.9 
./build.sh
```

#### 截图
```javascript
//snapshot.js
var page = require('webpage').create();
page.viewportSize = { width: 320, height: 640 };
page.open('http://www.test.com', function (status) {
    if (status !== 'success') {
        console.log('err!');
    } else {
        page.render('1.png');
    }
    phantom.exit();
});
```

#### dom抓取
```javascript
var page = require('webpage').create();
fname = system.args[1];
page.open("http://www.test.com", function () {
    if (status !== 'success') {
        console.log('err!');
        phantom.exit(1);
        return;
    }
    var html;
    page.evaluate(function () {
        document.querySelector('#kw').value = 'javascript';
        document.querySelector('#su').click();
        html = document.querySelector('.content_left').innerHTML;
    });
    //fs.write('/user/test.html',html,'w');
    phantom.exit();
});
```

#### nodejs调用phantomjs
需要调用的地方，开一个子线程去做
```javascript
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var Exec = spawn('phantomjs', '/home/user/test.js');


Exec.stdout.on('data', function(data) {
	console.log('Exec stdout : ' + data);
});

Exec.stderr.on('data', function(data) {
	console.log('Exec stderr : ' + data);
});

Exec.on('close', function(data) {
	console.log('exec close : ' + data);
});
```