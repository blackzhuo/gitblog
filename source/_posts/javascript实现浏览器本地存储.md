title: javascript实现浏览器本地存储
date: 2015-10-02 19:08:17
tags: javascript
toc: true
---
#### 高级浏览器
##### localStorage
一旦存储，除非手动删除，否则永远存储在浏览器本地。

* 优点：容量大，最大可支持5M
* 缺点：IE8以下的版本不支持，安全性也差，不适合保存敏感数据。
* 隐私模式下localStorage，只能读取，不能写入，使用前需要检测是否支持，检测代码：
<!--more-->
```javascript
function isSupport(){
    var storage = window.localStorage;
    if(!storage){
        return false;
    }
    var key = 'jason';
    try{
        storage.setItem(key, 'jason');
        storage.removeItem(key);
        return false;
    }catch (error){
        return true;
    }
}
```
* localStorage对象可以将数据永久保存在客户端。
	* 存储：localStorage.setItem(key,value)
		* 如果key存在时，更新value
	* 获取：localStorage.getItem(key)
		* 如果key不存在返回null
	* 删除：localStorage.removeItem(key)
		* 一旦删除，key对应的数据将会全部删除
	* 全部清除：localStorage.clear()
	* 某些时候使用removeItem逐个删除太麻烦，可以使用clear,执行的后果是会清除所有localStorage对象保存的数据
	* 遍历localStorage存储的key
		* `.length` 数据总量，例：localStorage.length
		* `.key(index)` 获取key，例：var key=localStorage.key(index);
* 存储JSON格式数据
	* `JSON.stringify(data)` 将一个对象转换成JSON格式的数据串,返回转换后的串
	* `JSON.parse(data)` 将数据解析成对象，返回解析后的对象

##### IE低版本浏览器（IE8以下的版本）
* ActiveXObject
ActiveXObject 对象为 Microsoft 扩展，仅在 Internet Explorer 中受支持。
ActiveXObject(“htmlfile”)创建的文档是一个完美的HTML文档，它拥有document.title,document.body等HTML DOM专有的属性，还能运行javascript。全局变量this就是我们要找的全局对象，它还拥有我们想要的一切，Array，Boolean，String，Date，Object等等。

* userData
UserData是微软为IE专门在系统中开辟的一块存储空间
正常情况下，这个文件夹在个人文件夹下 `Application Data\Microsoft\Internet Explorer\UserData`
线上使用时，单个文件的大小限制是128KB，一个域名下总共可以保存1024KB的文件，文件个数应该没有限制。在受限站点里这两个值分别是64KB和640KB，所以如果考虑到各种情况的话，单个文件最好能控制64KB以下,xml格式的文件

* 低版本就是使用UserData进行存储，数据存储在硬盘上
```javascript
//javascript
o = document.createElement('input');
o.type = "hidden";
o.addBehavior ("#default#userData");
//UserData.o.style.behavior = "url('#default#userData')" ;
//上面的语句也是一样的作用
document.body.appendChild(o);
<!--html-->
//说白了UserData就是样式里的一个Behavior，所以这样写也是一样的：
<input type=hidden class= storeuserData />
<style>
.storeuserData {behavior:url(#default#userData);}
</style>
```
* UserData对象有以下的属性和方法：

| 属性 |	 描述 |
| :-------- | :--:|
| expires |	设置或读取文件过期时间 |
| XMLDocument |	读取文件的XML DOM |

| 方法 |	 描述 |
| :-------- | :--:|
| getAttribute	| 读取指定属性的值 |
| load	| 打开文件 |
| removeAttribute | 删除指定的属性 |
| save	| 保存文件 |
| setAttribute	| 为指定属性赋值 |

* UserData文件实际上就是一个XML文件，通过文件名->属性的方式保存字符串，如以下一段代码：
```javascript
o.setAttribute("code", "hello world!");
o.save("baidu");
```
* 执行后，UserData文件夹中会生成一个baidu[1].xml文件，其中的内容是：
	* `<ROOTSTUB code="hello,world!"/>`
* 在一个文件中可以有多个属性，也就是可以存储多种不同的数据。

##### 兼容所有浏览器
store.js就是使用上述两种方式进行兼容使用，从而达到兼容所有浏览器的本地存储
