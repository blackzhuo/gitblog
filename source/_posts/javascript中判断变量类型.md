title: javascript中判断变量类型
date: 2015-10-22 15:03:01
tags: javascript
toc: true
---
##### 数据类型
>* 原始类型
	数字
	字符串
	布尔值
* 对象类型
* 特殊原始值
	null
	undefined
	把它们归纳成5种基本类型和1种复杂数据类型
* 基本类型
	Undefined
	Null
	Boolean
	Number
	String
* 复杂数据类型
	Object(Array,Function,Date,RegExp等)
<!--more-->

##### 检测数据类型
* typeof
>我们来写个例子，看看typeOf检测变量类型，每种类型都返回什么结果
```javascript
var number = 1,
    string = 'asd',
    boolean = true,
    array = [1,2,3],
    json = {"a":1};
    func = function foo(){console.log('function');},
    isundefined = undefined,
    isnull = null,
    date = new Date(),
    reg = new RegExp('.*'),
    error = new Error();
console.log(typeof number,typeof string,typeof boolean,typeof array,typeof json,typeof func,typeof isundefined,typeof isnull,typeof date,typeof reg,typeof error);

//返回结果
//number string boolean object object function undefined object object object object
//number string boolean function undefined都可以判断，但是其他对象类型都返回的object，这样我们就不能清晰的判断部分类型是什么
//接着往下看
```
* instanceof
>instanceof方法要求我们明确变量的类型，结果返回true false
```javascript
var number = 1,
string = 'asd',
boolean = true,
array = [1,2,3],
json = {"a":1};
func = function foo(){console.log('function');},
isundefined = undefined,
isnull = null,
date = new Date(),
reg = new RegExp('.*'),
error = new Error();
console.log(number instanceof Number,string instanceof String,boolean instanceof Boolean,array instanceof Array,json instanceof Object,func instanceof Function,isundefined instanceof Object,isnull instanceof Object,date instanceof Date,reg instanceof RegExp,error instanceof Error);

//返回结果
//false false false true true true false false true true true
//number string boolean使用字面量的方式没有检测出类型
//如果我们使用对象的方式创建时可以的 new Number(1); new String('asd'); new Boolean(true);这样
//还有一点就是null undefined类型也是Object
//接着往下看
```
* constructor
>constructor是对象原型上的属性，指向构造函数
```javascript
var number = 1,
string = 'asd',
boolean = true,
array = [1,2,3],
json = {"a":1};
func = function foo(){console.log('function');},
isundefined = undefined,
isnull = null,
date = new Date(),
reg = new RegExp('.*'),
error = new Error();
console.log(number.constructor === Number,string.constructor === String,boolean.constructor === Boolean,array.constructor === Array,json.constructor === Object,func.constructor === Function,date.constructor ===  Date,reg.constructor === RegExp,error.constructor === Error);
//输出结果
//true true true true true true true true true
不能判断undefined null
```
* Object.prototype.toString.call
>输出字符串，字符串里有一个数组，第一个参数是Object，第二个参数是变量的类型
```javascript
var number = 1,
string = 'asd',
boolean = true,
array = [1,2,3],
json = {"a":1};
func = function foo(){console.log('function');},
isundefined = undefined,
isnull = null,
date = new Date(),
reg = new RegExp('.*'),
error = new Error();
console.log(Object.prototype.toString.call(number),Object.prototype.toString.call( string),Object.prototype.toString.call( boolean),Object.prototype.toString.call( array),Object.prototype.toString.call( json),Object.prototype.toString.call( func),Object.prototype.toString.call( isundefined),Object.prototype.toString.call( isnull),Object.prototype.toString.call( date),Object.prototype.toString.call( reg),Object.prototype.toString.call( error));
//输出结果
//[object Number] [object String] [object Boolean] [object Array] [object Object] [object Function] [object Undefined] [object Null] [object Date] [object RegExp] [object Error]
```
* jquery中`$.type`
>jquery封装的判断类型的方法，依赖jquery
```javascript
var number = 1,
string = 'asd',
boolean = true,
array = [1,2,3],
json = {"a":1};
func = function foo(){console.log('function');},
isundefined = undefined,
isnull = null,
date = new Date(),
reg = new RegExp('.*'),
error = new Error();
console.log($.type(number),$.type( string),$.type( boolean),$.type( array),$.type( json),$.type( func),$.type( isundefined),$.type( isnull),$.type( date),$.type( reg),$.type( error));
//输出结果
//number string boolean array object function undefined null date regexp error
```

##### 总结
1.Object.prototype.toString.call和$.type判断的比较精准，返回结果比较像
2.object和function不能用typeof判断，其他类型可以

