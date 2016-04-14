title: avalon应用
date: 2015-11-12 15:03:01
tags: web
toc: true
---
#### 介绍：
avalon是一个轻量型的MVVM框架

#### 配置：
```javascript
avalon.config({
    debug: false
});
```
为了方便调试，我们把debug模式设为true,那么avalon源码中的所有调试信息都会在控制台输出，我们把debug设为false就可以屏蔽它们。<!--more-->
#### 定义
`avalon.define()`
对html页面的处理：
```html
<body ms-controller="page_model">
...
<p>{{name}}</p>
<p>{{age}}</p>
<p>{{from}}</p>
<a href="javascript:;" ms-click="check">click</a>
</body>
```
```javascript
var vm = avalon.define({
    $id: "page_model",
    name: 'wz',
    age: 25,
    from: 'changchun'
    check: function($events){
       $events.preventDefault();
       //do something
    }
})
```
* avalon.define定义页面对应的controller
* 放在$skipArray数组里面的属性，将不会被扫描
* 单向绑定 需要在ms-*属性的值前面加::，或花括号内部的前面加::

#### 常用属性
* `ms-duplex / ms-duplex-text —text `
* `ms-visible —boolean`
* `ms-repeat —list`
* `ms-value / `
* `ms-attr-*` —对应html标签的属性
* `ms-data`
* `ms-click`
* `ms-class / ms-hover / ms-active`
* `ms-widget`
* `$watch` 属性监控
```javascript
avalon.vmodels.grid.room_checked.$watch("length", function(n) {
     $avalon.vmodels.grid.allchecked = n === $$.grid.all_room.size();
})
```
* `$unwatch` 解除监控
* `$events` 对象，avalon中这个对象替代我们之前用的 event
#### 扫描
* 把视图中的所有指令全部抽取出来，转换为一个个视图刷新函数，然后放到一个个数组中，当VM的属性变动时，就会执行这些数组的函数。数组里面的东西不定是函数，也可能是对象，但里面肯定有个视图刷新函数。
* avalon.scan，有两个可选参数，第一个是元素节点，第二个是数组，里面为一个个VM。
#### 模版
* ms-html 可以加载一段html结构
* ms-include=”template” 负值一个模版变量，用于加载一段html结构
* ms-include-src=”aaa.html” 用于加载一个资源
#### 类操作
* ms-class,
* ms-hover
* ms-active
#### 事件绑定
* ms-on-*
#### 绑定
* 显示绑定ms-visible
* 插入绑定ms-if
* 双工绑定ms-duplex
* 样式绑定ms-css
* 数据绑定ms-data
* 属性绑定ms-attr
* 循环绑定
  * `ms-repeat 用于循环数组与对象 循环当前元素`
  * `ms-each 用于循环数组 循环当前元素的内部`
  * `ms-with 用于循环对象 循环当前元素的内部`
  * `el: 默认el，也可以用ms-repeat-item，就变成了item指向当前元素。`
  * `$first: 判定是否为监控数组的第一个元素`
  * `$last: 判定是否为监控数组的最后一个元素`
  * `$index: 得到当前元素的索引值`
  * `$outer: 得到外围循环的那个元素。`
  * `$remove: 这是一个方法，用于移除此元素`
* 动画绑定ms-effect
#### 过滤器

```javascript
它只能用于{{}}插值表达式。如果不存在参数，要求直接跟|filter，如果存在参传，则要用小括号括起，参数要有逗号
* html
* uppercase
* lowercase
* truncate – 对长字符串进行截短，truncate(number, truncation), number默认为30
* camelize --驼峰化处理
* escape --对类似于HTML格式的字符串进行转义
* currency
* number
* date
* 自定义过滤器
avalon.filters.format = function(str, args, args2){
   //str为原数据，默认传入，此方法必须返回一个值
   /* 具体逻辑 */
   return ret;
}
```
#### AJAX
* 功能同jquery ajax
#### 路由
#### 加载器
#### 自定义指令
#### 显示优化
* `.ms-controller, [ms-controller]{ visibility:hidden}`

* 我们在页面使用了大量插值表达式，网速慢时，就会被用户看到，认为是乱码了。为了预防这种情况， 我们可以在样式中定义 `.ms-controller, [ms-controller]{ visibility:hidden}` 那么当元素被扫描后，它们才会安全显示出来。
