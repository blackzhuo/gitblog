title: javascript实现继承
date: 2015-11-03 15:03:01
tags: javascript
toc: true
---
#### 继承

* 很多语言中都有继承，javascript和其他java等语言不同，他不是一门面向对象的语言，但是他的所有的东西却又都是对象，下面就实现一个继承
```javascript
//实现一个继承
function Parent(name, age) {
	var pid = '1';
	this.name = name || 'amos';
	this.age = age || 25;
	this.showInfo = function() {
		console.log('my name is ' + this.name + ' ,i am ' + this.age);
	};
}
Parent.prototype = {
	showName: function() {
		console.log('name:' + this.name);
	},
	showAge: function() {
		console.log('age:' + this.age);
	}
}

function Child(name, age, grade) {
	var cid = '1';
	Parent.call(this, name, age);
	this.grade = grade || 100;
	this.showGrade = function() {
		console.log('grade:' + this.grade);
	};
	this.showPrivate = function() {
		if (typeof pid === 'undefined') {
			pid = 'undefined';
		}
		console.log('private:' + cid + ' ' + pid);
	}
}
Child.prototype = new Parent();
Child.prototype.info = function() {
	console.log('info:' + this.name + ' ' + this.age + ' ' + this.grade);
};

function Other(name, age, grade) {
	Child.call(this, name, age, grade);
	this.showOther = function() {
		console.log('other');
	}
}
Other.prototype = new Child();

var other = new Other('zhuo', 25, 100);
other.showOther();
other.showInfo();
other.showName();
other.showAge();
other.showGrade();
other.info();
other.showPrivate();
/*
1.不使用call 无法传参数
2.不使用扩展原型链的方式，无法继承原型链上面的方法
3.无法继承私有属性 pid
4.不能一次实现多继承
*/
```