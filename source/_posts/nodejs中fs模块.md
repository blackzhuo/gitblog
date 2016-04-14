title: nodejs中fs模块
date: 2015-11-05 15:03:01
tags: nodejs
toc: true
---
#### 文件操作模块File System
* 使用的时候只需要 `var fs = require(‘fs’);`
#### 常用方法
##### rename
* `fs.rename(oldPath, newPath, callback)`
传入原路径，新路径，回调方法，回调中主要用来检测err异常信息
```javascript
var fs = require('fs');
fs.rename('jq-1.7.1.js','src/jq-1.7.2.js', function(err){
 if(err){
    console.log('rename error');
    throw err;
 }
 console.log('rename success');
})
//新路径中src必须存在，否则会报异常
```
<!--more-->
##### chmod
* `fs.chmod(path, mode, callback)`
修改文件权限，传入文件路径，权限类型，回调函数。
```javascript
var fs = require('fs');
fs.chmod('jq-1.7.2.js',0777,function(err){
if(err){
    console.log('chmod error');
    throw err;
 }
 console.log('chmod success');
})
```
##### stat
* `fs.stat(path, callback)`
获取文件信息，传入文件路径，回调函数，回调中两个参数，异常以及文件信息数组
```javascript
var fs = require('fs');
fs.stat('jq-1.7.2.js', function(err, stats){
 if(err){
  console.log('stat error');
  throw err;
 }else{
  console.log('stat success');
  console.log(stats);
 }
})
stats.isFile() —— 如果是个标准文件，而不是目录，socket，符号链接或者设备返回true
stats.isDiretory() —— 如果是目录则返回tue
stats.isBlockDevice() —— 如果是块设备则返回true
stats.isChracterDevice() —— 如果是字符设备返回true
stats.isSymbolickLink() —— 如果是文件链接返回true
stats.isFifo() —— 如果是个FIFO返回true
stats.isSocket() —— 如果是个socket返回true
```
##### realpath
* `fs.realpath(path, cache, callback)`
获取真实路径
传入参数有文件路径，文件路径中关键字的映射路径，回调，回调中包含异常err以及resolvedPath真实地址
```javascript
var cache = {'/www':'/home/q/www'};
fs.realpath('/www/project', cache, function (err, resolvedPath) {
  if (err) {
    console.log('realpath error');
    throw err;
  }
  console.log('realpath success');
  console.log(resolvedPath);
});
```
##### rmdir
* `fs.rmdir(path, callback)`
删除目录，path要删除的目录，callback回调err
```javascript
var fs = require('fs');
fs.rmdir('src', function(err){
 if(err){
  console.log('rmdir err');
  throw err;
 }

  console.log("rmdir success");
});
```
##### mkdir
* `fs.mkdir(path, mode, callback)`
创建目录，path要创建的目录，mode文件权限，callback回调err
```javascript
var fs = require('fs');
fs.mkdir('src', 0777, function(err){
 if(err){
  console.log('mkdir err');
  throw err;
 }

  console.log("mkdir success");
});
```
##### readdir
* fs.readdir(path, callback)
读取目录中内容，path要读取的路径，callback回调，err files,files参数保存了目录中所有文件名的数组
```javascript
var fs = require('fs');
fs.readdir('src', function(err,files){
 if(err){
  console.log('readdir err');
  throw err;
 }
  console.log("readdir success");
  console.log(files);
});
```
##### open
* `fs.open(path, flags, mode, callback)`
打开文件，处理文件之前，需要打开文件
文件路径，打开方式(r，r+，w，w+，a或者a+)，回调函数 err fd
```javascript
var fs = require('fs');
fs.open('/src/test', 'r', function(err, fd) {
    if(err){
        console.log('open err');
        throw err;
    }
    console.log(fd);
});
```
##### close
* `fs.close(fd, callback)`
任何读写操作之后都要关闭文件
```javascript
var fs = require('fs');
fs.open('/src/test', 'r', function(err, fd) {
    if(err){
        console.log('open err');
        throw err;
    }
    console.log(fd);
    fs.close(fd,function(err){
        throw err;
    });
});
```
##### write
* `fs.write(fd, buffer, offset, length, position, callback)`
将buffer写入文件
fd文件描述符,buffer缓冲区,offset-buffer写入的偏移量, length指定文件写入字节数长度, position指定文件写入的起始位置，callback（err, bytesWritten, buffer）bytesWritten指定多少字节数将被写入到文件 ,buffer返回缓冲区对象
```javascript
var fs = require('fs');
fs.open('src/test.js', 'a', function(err, fd) {
	if (err) {
		console.log('open err');
		throw err;
	}
	var buf = new Buffer(8);
	fs.write(fd, buf, 0, 8, 0, function(err, bytesWritten, buffer) {
		if (err) {
			console.log('write err');
			throw err;
		}
		console.log(bytesWritten);
		console.log(buffer);

		fs.close(fd, function(err) {
			if (err) {
				console.log('close err');
				throw err;
			}
			console.log('close');
		})
	})
});
```
##### write
* `fs.write(fd, data, position, encoding, callback)`
将data写入文件
fd文件描述符,data写入数据，encoding文件编码，callback(err, written, string) written指定多少字符数将被写入到文件，string返回的Buffer
```javascript
var fs = require('fs');
fs.open('src/test.js', 'a', function(err, fd) {
	if (err) {
		console.log('open err');
		throw err;
	}
	var data = 'test';
	fs.write(fd, data, 0, 'utf-8', function(err, written, string) {
		if (err) {
			console.log('write err');
			throw err;
		}
		console.log(written);
		console.log(string);

		fs.close(fd, function(err) {
			if (err) {
				console.log('close err');
				throw err;
			}
			console.log('close');
		})
	})
})
```
##### read
* `fs.read(fd, buffer, offset, length, position, callback)`
根据指定的文件描述符fd来读取文件数据并写入buffer指向的缓冲区对象
fd 文件描述符，buffer缓冲区，数据将被写入，offset，buffer写入偏移量，length文件指定读取长度，position指定文件读取开始位置，传null表示开始位置，callback回调函数，err，bytesRead读的字节数, buffer缓冲区对象
```javascript
var fs = require('fs');
fs.open('/src/test', 'r', function(err, fd) {
    if(err){
        console.log('open err');
        throw err;
    }
    var buf = new Buffer(8); 
    fs.read(fd, buf, 0, 8, null, function(err,bytesRead,buffer){ 
      if(err){ 
       console.log('read err'); 
       throw err;
       return; 
      } 
      console.log('bytesRead' +bytesRead); 
      console.log(buffer); 
      fs.close(fd,function(err){
        throw err;
      });
     }) 
});
```
##### readFile
* `fs.readFile(filename, options, callback)`
以异步的方式读取文件内容。
filename 文件路径，option对象，包含 encoding，编码格式，该项是可选的，callback err data
```javascript
var fs = require('fs'); 
fs.readFile('src/test.txt','utf-8', function(err,data){ 
 if(err){ 
  console.log('readFile err');
  throw err; 
 }
  console.log(data);
})
```
##### writeFile
* `fs.writeFile(filename, data, options, callback)`
以异步的方式写入文件，文件已存在将被覆盖。
filename文件名称，data将要写入的内容，可以使字符串或buffer数据。
option数组对象，包含：encoding mode flag
callback回调err。
```javascript
fs.writeFile('src/test.txt', 'test', function (err) {
  if (err) {
     console.log('write err');
     throw err;
  }
  console.log('writeFile success');
});
```
##### appendFile
* `fs.appendFile(filename, data, options, callback)`
以异步的方式将data插入到文件里，文件不存在会创建一个新文件
参数解释同上
```javascript
fs.appendFile('src/test.txt', 'test', function (err) {
  if (err) {
     console.log('write err');
     throw err;
  }
  console.log('writeFile success');
});
```
##### exists
* `fs.exists(path, callback)`
检测某个路径下是否存在文件
path文件路径，callback回调exists true false
```javascript 
var fs = require('fs'); 
fs.exists('/src/test', function (exists) { 
	if(exists){ 
		console.log('exists'); 
	}else{ 
		console.log('not exists');
	} 
});
```
##### 所有方法都有对应的同步操作方式，方法名后面加上Sync,参数中没有callback