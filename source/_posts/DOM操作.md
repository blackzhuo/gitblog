title: DOM操作
date: 2015-11-24 15:03:01
tags: javascript
toc: true
---
#### Node
##### 操作节点
* appendChild()
一个参数，要插入的节点
* insertBefore()
两个参数，要插入的节点和参照的节点
* replaceChild()
两个参数，要插入的节点和要替换的节点
* removeChild()
一个参数，要移除的节点
* cloneNode()
一个参数，布尔值，是否执行深度克隆
* normalize()
合并文本节点
<!--more-->

#### Document
##### document.getElementById
* IE7及以前的版本忽略大小写，除此之外必须严格按照大小写
* 如果不传参数返回null
* IE7及以前的版本如果表单元素name属性和某元素id相等，会返回表单元素

##### document.getElementsByTagName
* 返回标签元素的集合

##### namedItem 返回标签集合中指定name元素
* 使用中括号的方式能达到namedItem效果
* 获取所有html元素，传入`*`
```javascript
var images = document.getElementsByTagName('image');
var logo = images.namedItem('logo');
var author = images['author'];
document.getElementsByName
```
与 document.getElementsByTagName 类似

##### 特殊方法
* document.anchors返回所有带name的a元素
* document.forms返回所有form元素
* document.images返回所有img元素
* document.links返回所有带href的元素

##### 元素属性
* id 元素唯一标示
* title 附加说明
* className 元素css类
* lang 元素内容语言代码
* dir 语言方向

##### 元素方法
* getAttribute
不能获取style属性，以及类似onclick这样的事件处理属性
* setAttribute
设置属性值，接收两个参数，第一个是属性名，第二个是属性值
* removeAttribute
彻底删除属性
* attributes属性
Element类型拥有attributes属性

##### 方法
* getNamedItem(name) 返回指定属性值 (可以使用方括号访问方式)
```javascript
var id = elements.attributes.getNamedItem('id').nodeValue;
var id = elements.attributes['id'].nodeValue;
```
* removeNamedItem(name) 移除指定属性
* setNamedItem(node) 添加属性
* item(pos) 返回位于pos位置的节点

* 遍历所有属性的时候可以使用这些方法
* attributes属性,不同浏览器返回顺序不一致
* IE7及以前的版本会返回所有可能的属性，为避免这个，需要使用specified检测，未设置过的特性为false

##### 创建元素
* document.createElement()
接收一个参数，创建的标签
```javascript
var div = document.createElement('div');
div.id="top";
div.className = "m-top";
```
	* IE中支持参数传入完整的标签内容，有助于避免IE7以及以前版本的一些bug
	* 不能动态设置iframe name属性
	* 创建name相同的radio，互无联系
	* 但是，这样方式又只有IE才支持，所以，使用时需要做检测执行

##### Text文本节点
创建文本节点document.createTextNode()
```javascript
var ele = document.createElement('div');
var txt = document.createTextNode('hello');
ele.appendChild(txt);
document.body.appendChild(ele);
```

##### 规范化文本节点
* 使用normalize()方法合并文本节点

##### 分割文本节点
* splitText(pos)方法，pos是指定位置

##### 其它方法
* appendData(text)
* deleteData(offset,count)
* insertData(offset,text)
* replaceData(offset,count,text)
* substringData(offset,data)

##### DocumentFragment
* 文档片段，创建方法
	document.createDocumentFragment()
* 操作复杂dom的时候，可以使用片段操作，这样会避免页面多次页面重新渲染

##### Attr属性
* 创建属性
document.createAttribute()
```javascript
var attr = document.createAttribute('align');
attr.value = 'left';
ele.setAttribute(attr);
```

##### selector API
1. querySelector()
	* 接收css选择符，返回匹配到的第一个元素
	* document.querySelector()
	* document.body.querySelector()
2. querySelectorAll()
	* 返回NodeList,使用与querySelector()相同
