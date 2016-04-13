title: BigPipe
date: 2015-11-09 15:03:01
tags: web
toc: true
---
#### BigPipe
>1. BigPipe就是把网页分解成多个模块，然后通过服务器和浏览器建立管道链接，分别对各个模块进行输出，最后完成一个完整的页面。
2. 传统方式的页面渲染大致分为两类，一种是使用动态语言jsp，asp.net等进行完整页面的渲染以及交互，另一种是服务端负责渲染最基本的页面结构，或者说是页面上静态的结构，然后由javascript负责渲染页面动态的部分，以及各种交互的部分。
	* 第一种方式在服务器进行完整的计算渲染后，一次性传输到浏览器端，过程可能会比较长。
	* 第二种方式页面渲染速度比较快，但是到了客户端后，可能会发出很多网络数据请求，数据请求的过程对性能的影响也是比较大的。
	那么使用bigpipe的好处就突显出来了。
	* 首先各个请求都是异步的，互不影响的，当一个请求返回结果后，服务器端就可以继续完成数据处理以及dom元素渲染，然后输出到浏览器端，浏览器端接收到结果后直接渲染页面某一模块。
	* 其次，浏览器在整个页面阶段只发出了一个请求，那就是页面请求，页面渲染结束期间，这个请求是不会中断的。
	虽然上面叙述了一些bigpipe的好处，但是有没有发现，由于请求接口的过程是异步的，那么返回时间也是不固定的，就会出现页面渲染并不是按照我们预想的顺序。这时候我们又想出了一个办法，在页面初始阶段返回页面基本骨架，然后各个请求返回结果后，渲染到固定模块内，保证页面不会乱。而bigpipe初始阶段返回不闭合的html，等所有传输结束后返回页面闭合标签，整个过程结束。
3. http1.1 支持持续的连接，这样就可以发出多个请求，并且接收多个请求。还可以发送流水请求，在一个请求未返回结果的时候就继续发生第二个请求。

#### nodejs实现
1. 核心就是http.requert()
2. html页面访问直接请求nodejs渲染的页面。
3. 当请求到达nodejs时，nodejs返回一个不闭合html框架。
4. nodejs发出多个请求，每个请求都是一个页面的模块部分。
5. 分别接收到各个请求结果后，处理数据，渲染模版，取到html，返回一个script标签，里面调用客户端脚本，在指定div内写这段html。这段代码就是最简单的`document.getElementById('#id').innerHTML=html;。`
6. 所有请求返回结果后，nodejs返回页面闭合标签。
7. 其他的页面效果，特效，交互交给javascript。

#### 简单实现

```javascript

var http = require('http');
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<!Doctype html><html lang=\"en\"><head><title>bigpipe</title>");
	response.write("<script type=\"text/javascript\">function load(id,html) { var ele=document.getElementById(id); ele.innerHTML = html;}</script>");
	response.write("</head><body><div id=\"top\"></div>");

	var url = 'http://test.com/a.json';
	var requestHeaders = request.headers;

	var options = {
	    url: url,
	    method: "POST",
	    headers: {
	        "user-agent": requestHeaders["user-agent"],
	        "cookie": requestHeaders["cookie"]
	    },
	    timeout: 6000
	};

	var post = http.request(options);
	post.addListener('response', function(res) {
		res.addListener('data', function(data) {
			var html = dealHtml(data);
			response.write('<script>load('top','+html+')</script>');
		});
		res.addListener('end', function() {
			response.end();
		});
	});
	post.end();
	response.write("</body></html>");

}).listen(8998);
```