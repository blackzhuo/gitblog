title: javascript变量提升与函数声明
date: 2015-11-04 15:03:01
tags: javascript
toc: true
---
#### 变量提升
* 我们在声明变量的时候，这个变量声明会在当前作用域内提升到最前面去声明

#### 函数声明
* 函数声明有两种方式，一种就是使用function，另一种就是匿名函数赋值给一个变量
<!--more-->
##### 基于以上两点，有个问题就出来了，函数声明和函数调用顺序，会有什么影响么,看个例子
```javascript
//函数声明
var test3 = function() {
	console.log('test3');
};
test3();
test1();
test2();

function test1() {
	console.log('test1');
}
var test2 = function() {
	console.log('test2');
};
/*
function声明函数和var声明函数，没有本质上的区别，调用方法都一样，但是存在一个声明和调用顺序的问题
1.我们知道变量声明过程，var a = 123;分解 var a;被提到最前面，到了赋值体的时候才会 a = 123; a才有值
function test(){console.log('test')} 这个函数声明会被提到前面去声明，所以我们发现，function声明的，在作用域允许范围内都是可用的
而var 声明的函数，只有在声明的后面才能调用
*/
```