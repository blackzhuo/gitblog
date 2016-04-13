title: RactiveJs应用
date: 2015-11-13 15:03:01
tags: web
toc: true
---
#### 简介
Ractive.js是一款简单却功能强大的JS库，它实现了模板，数据绑定，DOM实时更新，事件处理等多个有用的功能。

#### 应用
关联dom和模版
```javascript
//html
<div id='output'></div>
<script id='template' type='text/ractive'>
</script>

//js
var ractive = new Ractive({
	el: '#output',
	template: '#template'
});
```
#### 模版内绑定属性
```javascript
//html
<div id='output'></div>
<script id='template' type='text/ractive'>
<p>{{greeting}} {{name}}!</p>
</script>

//js
var ractive = new Ractive({
	el: '#output',
	template: '#template'，
        data: {
	    greeting: 'Hello',
	    name: 'world'
	}
});
```
#### 配置
#### 模版
#### mustache模版
#### 数据和绑定
#### 事件
#### 过度效果和动画
#### 组件
#### API
#### 插件


#### 待续
