title: javascript脚本执行对页面加载的影响
date: 2015-10-24 15:03:01
tags: javascript
toc: true
---
#### javascript加载会对页面加载产生什么影响呢？
##### 我们在代码中添加几种脚本
>* header中行内 无defer async，async，defer这三种
* header中外部 无defer async，async，defer这三种
* body中同上面，并且body中增加动态添加脚本，动态添加分为两类，直接在脚本中append，另一种是ajax异步去apped.
脚本中都执行了一段计算的代码，执行起来耗时几秒
<!--more-->

##### 执行结果分析
>* safri:
	async defer分析同上一篇wiki说明，以后不再说这个
	header中任何脚本执行都会阻塞DOMContentLoaded
	body内只有async的外部脚本不会阻塞DOMContentLoaded
	所有脚本都会阻塞loaded
* firefox:
	应该说所有脚本都阻塞了DOMContentLoaded，因为body dy script这个动态添加的脚本是在ready后添加执行的，ready之后添加的脚本会阻塞loaded执行
* chrome:
	和safri表现相同
* IE7:
	脚本执行阻塞了document ready,也阻塞了loaded
* IE8:
	动态脚本不会阻塞document ready, loaded
* IE9:
	脚本加载阻塞DOMContentLoaded，也阻塞了loaded

##### 动态加载的外部脚本
* 不是动态添加的脚本，都会阻塞页DOMContentLoaded，在document ready后添加，会阻塞loaded，在window.onload后添加，是不会阻塞页面加载的

##### 分析
* 我们打开浏览器 chrome或者firefox,发现对于js脚本http请求之间还会有一段间隔时间，那么这个时间是怎么回事呢，我们发现它是脚本的执行时间，浏览器是单线程执行的，那么它无疑会阻塞我们的页面加载
* 虽然不同的浏览器都可以并行的下载多个脚本（chrome 2个 firefox 4个，增加静态资源服务器还可以翻倍，ie8以上版本，js可以和图片一样并行加载），但是脚本的执行必须都是单线程的，这是浏览器限制。而且有的时候并行下载数量增加，并不一定会给性能带来好处，反而会影响页面性能，阻塞页面加载，雅虎工程师给出的建议是，2个是最佳的。
* 我们发现无论脚本在什么时间段去创建都会阻塞window.onload。
* 那么我们把脚本分成两类，一类是页面UI操作相关的，需要先执行。另一类是逻辑相关的我们把它们放在window.onload后，再去动态的添加脚本，也就是动态的创建script标签，去添加到页面上（动态添加这个脚本的好处还有，脚本可以跨域），那么就不会阻塞页面加载了,还有一种方式，使用setTimeout去加载动态的脚本，也可以达到无阻塞效果。
* 动态加载带来了一个问题，它打破了常规执行的顺序执行，那么有依赖的代码怎么办，可能就会报一些undefined的错误了，解决办法还是有的，可以监听脚本的onload，ie下的onreadystatechange事件，再去执行有依赖的代码，或者是添加一个轮询方法，检测到变量存在的时候再去执行有依赖的代码。
* 对于这些问题，requireJS 或者 seaJS都做好了依赖处理，并且脚本也都是动态的添加的，即解决了脚本阻塞的问题也解决了代码依赖的问题。
* 至于动态的脚本放在header还是body中，这都无所谓了，因为阻塞的过程已经过去了，添加到哪里都不会产生影响。

##### 无阻塞脚本的解决方案
1. XHR Eval
通过XHR动态读取脚本，使用Eval让它生效，但是现在已经不推荐使用Eval了，这个我们就不多分析了
2. XHR Injection
```javascript
var xhrObj = new XMLHttpRequest();
xhrObj.onreadystatechange = function(){
    if(xhrObj.readyState == 4){
        var scriptElem = document.createElement("script");
        document.getElementsByTagName("head")[0].appendChild(scriptElem);
        scriptElem.text = xhrObj.responseText;
    }
};
xhrObj.open("GET", "deal.js", true);
xhrObj.send("");
```
* Script in Iframe
	iframe中创建script标签，不建议使用iframe，并且脚本不能跨域，不推荐使用，了解一下就行
* Script DOM Element
```javascript
var scriptElem = document.createElement("script");
scriptElem.src = "http://domain.com/deal.js";
document.getElementByTagName("head")[0].appendChild(scriptElem);
```
* Script Defer
	deler的兼容性并不好，而且defer只会延迟执行脚本，但是最终还是会在DOMContentLoaded之前执行的
* document.write Script Tag
```javascript
document.write("<script type='text/javascript' src='deal.js'></script>");
```
只有在IE下能实现并行下载,了解就行
动态的创建script的dom节点是最好的解决方案

##### 动态脚本加载时机
>动态脚本，动态创建script到底在什么时候加是最好的呢？
如果放在onload之后，我们知道在DOMContentLoaded之后到onload之间，会有图片，iframe等资源加载时间，它们阻塞了window.onload,那么js对页面的交互时间也被推迟了，这不是我们想要了
所以我们把它放在DOMContentLoaded之后,DOMContentLoaded兼容解决方案，看前面的知识