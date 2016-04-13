title: javascript数组排序
date: 2015-10-30 15:03:01
tags: javascript
toc: true
---
##### 自己写逻辑代码进行处理
>* 遍历数组，做必要的类型转换
* 选择一种排序方式，快排，冒泡，选择等等完成排序

##### 使用sort方法
* sort方法默认生序排序，不会做数据类型转换，按照ascii字母顺序排序
* sort方法会改变数组本身，不会生成新数组
* 自定义规则排序，给sort传处理函数
```javascript
var arr = ['2','7','6','11','18','8','9'];
arr.sort(function(x,y){
	fx = parseInt(x,10);
	fy = parseInt(y,10);
	return fx>fy?1:-1;
});
//["2", "6", "7", "8", "9", "11", "18"]
```
* 比较对象，可以写一个函数对对象进行比较
```javascript
var compare = function(key){
    return function(x, y){
        var fx, fy;
        if (typeof x === "object" && typeof y === "object" && x && y) {
            fx = x[key];
            fy = y[key];
            if (fx === fy) {
                return 0;
            }
            if (typeof fx === typeof fy) {
                return fx > fy ? 1 : -1;
            }
            return typeof fx > typeof fy ? 1 : -1;
        }
        else {
            throw ("error..");
        }
    }
}
```
* 扩展，如果第一个指定的建相同，按照第二个进行排序
```javascript
var compare = function(key,handler){
    return function(x, y){
        var fx, fy;
        if (typeof x === "object" && typeof y === "object" && x && y) {
            fx = x[key];
            fy = y[key];
            if (fx === fy) {
                return typeof handler === 'function' ? handler(x,y):0;
            }
            if (typeof fx === typeof fy) {
                return fx > fy ? 1 : -1;
            }
            return typeof fx > typeof fy ? 1 : -1;
        }
        else {
            throw ("error..");
        }
    }
}
```