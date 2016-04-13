title: javascript数组的深度拷贝
date: 2015-10-27 15:03:01
tags: javascript
toc: true
---
##### 方法一 slice方法
```javascript
var arr = ["One","Two","Three"];
var arrtoo = arr.slice(0);
```
##### 方法二 concat方法
```javascript
var arr = ["One","Two","Three"];
var arrtooo = arr.concat();
```
##### 方法三
通过函数遍历赋值