title: javascript对象的深度拷贝
date: 2015-10-26 15:03:01
tags: javascript
toc: true
---
* 浅度复制：对于含有引用类型字段的对象来说，进行浅度复制意味着复制的对象和源对象存在这相同的引用。如果源对象的引用变量的值发生改变，那么被复制的对象的成员值也会发生变化。
* 深度复制：复制的对象和源对象是独立的。<!--more-->
* javascript中没有拷贝对象的方法，而js中传递引用数据基本都是传址方式。这就会遇到很多麻烦。比如：
```javascript
var o = {
    name: "张三",
    age: 15
}
var a = o;
a.age = 35;
console.log(o.age); // 35
console.log(a == o); // true
```
源数据被修改了，可实际需求不是这样的。

#### JS中深度拷贝对象的方法
##### 方法1
```javascript
function clone(src) {
    function mixin(dest, source, copyFunc) {
        var name, s, i, empty = {};
        for(name in source){
            s = source[name];
            if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                dest[name] = copyFunc ? copyFunc(s) : s;
            }
        }
        return dest;
    }
    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
        return src;
    }
    if(src.nodeType && "cloneNode" in src){
        return src.cloneNode(true);
    }
    if(src instanceof Date){
        return new Date(src.getTime());
    }
    if(src instanceof RegExp){
        return new RegExp(src);
    }

    var r, i, l;
    if(src instanceof Array){
        r = [];
        for(i = 0, l = src.length; i < l; ++i){
            if(i in src){
                r.push(clone(src[i]));
            }
        }
    } else {
        r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);
}

var o = {
    name: "张三",
    age: 15
}
var a = clone(o);
console.log(a == o); // false，此时a是对象o的一个副本
```
##### 方法2
```javascript
var a={name:'yy',age:26};
var b=new Object();
b.name=a.name;
b.age=a.age;
```
##### 方法3
```javascript
var deepCopy= function(source) { 
var result={};
for (var key in source) {
      result[key] = typeof source[key]===’object’? deepCoyp(source[key]): source[key];
   } 
   return result; 
}
```
##### 方法4
使用jquery的extend
