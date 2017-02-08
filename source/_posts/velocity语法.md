title: velocity语法
date: 2015-10-19 14:50:38
tags: web
toc: true
---
##### velocity
基本语法包括
```javascript
#set, #if, #else, #end, #foreach, #end, #iinclude, #parse, #macro
```

###### 注释
```javascript
##单行注释
#* 多行注释 *#
#** 文档格式 存储诸如文档作者、版本信息 *#
```

<!--more-->

###### 引入本地文件
`#inclede` `#parse`都是用来引入本地文件的
区别：
* `#parse只能引入单个文件，#include可以引入多个文件，用 , 分隔`
* `#parse引入的文件还会被引擎解析，#include引入的文件不会被引擎解析`
* `#parse引入的文件和父文件之间变量都是共享的`

###### 变量
变量声明 `#set($title="title name")`
velocity是弱类型的
* `${title}` `$title`都可以使用，但是提倡`${title}`这种用法，在拼接字符串的时候，不会出现歧义，但是引用属性的时候要使用 `$title`这种
* 变量可以赋以下类型的值：变量引用，字面字符串，属性引用，方法引用，字面数字，数组列表
* 如果值为null，不会被赋值，还保留原来的值
* 未定义的变量当字符串处理
* `$user.getName()` 等于 `$user.Name`
```javascript
#set( $name = "tom" )
#set( $age = "11" )
$name is $age.
#set($all = "$size$name" )

##数学特性
#set( $test = 5 )
#set( $count = $test + 3 )

##带花括号的属性,方法调用方式，属性,方法需要在花括号之内：
${cookie.name}
${request.getCookies()}

##赋值符号左边的变量名不能加感叹号
```
###### 数组访问
>范围操作赋 `[1..10]`
```javascript
#foreach( $i in [1..5] )
    $i
#end
```
###### 对象访问
>访问方法如下
```javascript
#set($obj = {"qwe":"123", "asd":"456"})
$obj.get("key")

#foreach(#ele in $obj)
    $ele　
#end

##$ele只取到了value
##如何取到对象的key呢，可以使用entrySet()或keySet()方法。

#foreach($ele in $!obj.entrySet())
    $!ele.key : $!ele.value
#end

#foreach($ele in $obj.keySet())
    $ele : $obj.get($ele)
#end
```

###### 循环
* `#foreach`
```javascript
#foreach($ele in $arrs)
    $velocityCount is $ele
#end
##循环计数变量$velocityCount,默认从1开始，可以在velocity.properties 文件中设为从0或者1开始
```
* `#break语句`
可用于中断 #foreach() 循环。

###### 条件语句
>用法
```javascript
#if( $age < 10 )
    
#elseif( $age == 10 )
    
#else
    
#end
```

###### 逻辑操作
`< > == != && || !`这么多运算符

###### 宏
>定义
```javascript
#macro(test)
<div></div><div></div>
#end
```
带参数的
```javascript
#macro(test $person)
<div>$person.name</div><div>$person.age</div>
#end

test($pers)
```
###### stop
>停止模板引擎，通常在Debug时使用

###### 转义
>如果变量定义了，两个 `\` 只输出一个 `\`，如果未定义，则输出所有
```javascript
#set($name="qwe") ##定义
$name ## qwe
\$name ## $name
\\$name ## \qwe
\\\$name ## \\$name
##未定义
$name ## $name
\$name ## \$name
\\$name ## \\$name
\\\$name ## \\\$name
```

###### 内置对象
`$request`
`$response`
`$session`
```javascript
#foreach($cookie in $request.getCookies())
    $cookie.name : $cookie.value
#end

#set($name = $!request.getParameter('name'))
```

###### `evaluate()`
>动态执行一串字符串的值：
`#evaluate('display #if(true)show#end')`

###### `define()`
>`#define`指令自定义标签
```javascript
#define($hello)
    Hello ${who}!
#end
#set($who = "world")
$hello
## 显示 "Hello world!"
```
不需要解析执行的
```javascript
#[[
#define()
$name
]]#
```

###### 注意
* velocity语法中都是使用双引号，不能使用单引号，变量将以字符串输出
* velocity会把变量，属性和方法都输出成字符串
* velocity可以调用在java中定义的方法
* 输出值的时候我们通常在$后面加上`!` 例如 `$!email`，这样的好处就行，当email没有值的时候，会输出空，否则就会输出`$email`了，这不是我们想要的
* `$2.50`这样的值是不会出错的，因为velocity变量都是以大小写字符开始的
* 可以调用java操作string的方法例如 substring，toLowerCase,toUpperCasse等
* 取数组长度 `$array.size()`
* 取数组某一项 `$array.get(0)`
* null逻辑判断
使用 `#ifnull()` 或 `#ifnotnull()`,要使用这个特性必须在velocity.properties文件中加入：
```javascript
userdirective = org.apache.velocity.tools.generic.directive.Ifnull
userdirective = org.apache.velocity.tools.generic.directive.Ifnotnull
```
使用null工具判断`#if($null.isNull($foo))`
空的逻辑判断 `#if (! $foo)` 判断`$foo`为空，判断非空为 `#if ($foo)`