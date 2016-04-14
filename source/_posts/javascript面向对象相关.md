title: javascript面向对象相关
date: 2015-11-21 15:03:01
tags: javascript
toc: true
---
#### 判断属性属于实力对象还是原型
```javascript
function check(name,obj){
	return !(obj.hasOwnProperty) && (name in obj)
}
```

<!--more-->

#### for in循环
>for in循环能够返回对象所有可枚举属性，无论实例中的，还是原型中的。即便是实例中重写了原型中不可枚举的属性，也会访问到。但是在IE8及以下存在bug,这样的属性不会被返回

####继承
```javascript
function object(o){
	function F(){};
	F.prototype = o;
	return new F();
}
function inheritPrototype(subType,superType){
	var prototype = object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}
function SuperType(name){
	this.name = name;
	this.color = ["red","blue"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge = function(){
	alert(this.age);
};
```
>只调用了一次SuperType的构造函数，并且避免了在SubType.prototype上面创建不必要的属性，同时原型链还能保持不变。

#### 单例模式
```javascript
var singleton = function(){
	var private = 0;
	function privateFunc(){
		return false;
	}
	return {
		public:true,
		publicFunc:function(){
			private++;
			return privateFunc();
		}
	}
}();
```