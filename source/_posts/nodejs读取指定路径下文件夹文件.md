title: nodejs读取指定路径下文件夹文件
date: 2015-11-07 15:03:01
tags: nodejs
toc: true
---
#### 扫描文件以及文件夹
```javascript
function scanFolder(path){
    var files = [],
        folders = [],
        walk = function(path, files, folders){
            files = fs.readdirSync(path);
            files.forEach(function(item) {  
                var curPath = path + '/' + item,
                    stats = fs.statSync(curPath);

                if (stats.isDirectory()) {  
                    walk(curPath, files, folders); 
                    folders.push(curPath); 
                } else {  
                    files.push(curPath); 
                }  
            });  
        };  

    walk(path, files, folders);

    console.log('扫描' + path +'成功');

    return {
        'files': files,
        'folders': folders
    }
}
```<!--more-->
#### 获取每个文件大小
```javascript
var filesList = [];
states = fs.statSync(path+'/'+file); 
if(!states.isDirectory()){ 
   var fileObj = new Object();
   fileObj.size = states.size;//文件大小(字节)
   fileObj.name = file;//文件名
   fileObj.path = path+'/'+file; //绝对路径
   filesList.push(fileObj);
 }
```