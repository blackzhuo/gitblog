title: javascript中变量作用域
date: 2015-10-21 15:03:01
tags: javascript
toc: true
---
##### 变量做用域
<!--more-->
```javascript
// *******
//--理解变量做用域
var x = 1;

function foo() {
    console.log(1);
}
foo();
console.log(x);
//结果
//1
//1
//正常输出全局变量x
//--

var x = 1;

function foo() {
    var x = 2;
    console.log(x);
}
foo();
console.log(x);
//2
//1
//foo中输出的是局部变量的值
//外面输出的是全局变量的x
//--

x = 1;

function foo() {
    x = 2;
    console.log(x);
    y = 3;
    console.log(y);
}
foo();
console.log(x);
console.log(y);
//2
//3
//2
//3
//foo内重新赋值了全局变量x,并且定义全局变量y
//--

var x = 1;

function foo() {
    console.log(x);
    var x = 2;
}
foo();
console.log(x);
//结果
//undefined
//1
//变量声明 函数声明，都有一个提升的过程
// var x = 1分解
// var x; 会提升到作用域最顶部
// x = 1;
//上面的定义相当于
var x = 1;

function foo() {
    var x;
    console.log(x);
    x = 2;
}
foo();
console.log(x);
```
##### 没有块级做用域
```javascript
//--没有块级做用域, if for等块无法划分作用域
function foo(num) {
    var x = 0;
    if (num > 5) {
        var j = 10;
        for (var i = 0; i < num; i++) {
            j += i;
        }
        console.log(x);
    }
    console.log(j);
}
foo(10);
```
##### 作用域链
```javascript
// *******
// 作用域链
// 1.当javascaript执行的时候，都会创建一个对应的执行环境，执行环境中存在着函数的调用对象，
// 2.函数执行环境包括了调用对象，调用对象的属性就是函数的局部变量，每个函数就在这样的执行环境执行，函数外部的代码就在全局变量的执行环境
// 3.javascript执行环境中，存在着作用域链，是由对象组成的列表或者链
// 4.在解析一个变量的时候，会现在它最近的执行环境中查找，如果找不到就向上查找，如果最后都没找到就返回undefined
var x = 10;
function foo(){
    console.log(x);
}
//现在foo作用域内寻找，如果找不到就向上寻找
```