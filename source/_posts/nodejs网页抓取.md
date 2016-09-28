title: nodejs网页抓取
date: 2015-11-06 15:03:01
tags: nodejs
toc: true
---
#### cheerio
>html页面抓取使用的module,可以像jquery一样去操作

#### 读取网页源码
>使用http.request或者http.get去下载网页源码，使用cheerio去抓取我们需要的内容。
<!--more-->

#### 保存图片
>抓取到的图片地址
```javascript
var http = require("http");
var fs = require("fs");
var url = "http://123.png";
http.get(url, function(res) {
	var imgBinary = "";
	res.setEncoding("binary");
	res.on("data", function(chunk) {
		imgBinary += chunk;
	});
	res.on("end", function() {
		fs.writeFile("./logonew.png", imgBinary, "binary", function(err) {
			if (err) {
				console.log("download fail");
			}
			console.log("download success");
		});
	});
});
```