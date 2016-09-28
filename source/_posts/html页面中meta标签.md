title: html页面中meta标签
date: 2015-11-11 15:03:01
tags: web
toc: true
---
#### 介绍
>meta标签提供的数据不会展示页页面当中，但是对于机器来说，这些内容确是重要的，它会告诉机器怎么展示页面，还可以设置搜索引擎对页面的抓取。

##### 属性
|属性  |	 值  | 描述|
| :--------| :--: | :--:|
|http-equiv|	content-type / expire / refresh / set-cookie|	把content属性关联到HTTP头部|
|name	|author / description / keywords / generator / revised / others|	把 content 属性关联到一个名称|
|content	|text	|定义用于 content 属性值的格式|
<!--more-->

##### SEO相关
* name=”keywords” 网页内容关键字
* name=”description” 网页内容描述
* name=”robots” 搜索引擎索引方式
	none 搜索引擎将忽略此网页，等价于noindex，nofollow。
	noindex 搜索引擎不索引此网页。
	nofollow 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
	all 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
	index 搜索引擎索引此网页。
	follow 搜索引擎继续通过此网页的链接索引搜索其它的网页。
* http-equiv=”refresh” 页面重定向和刷新,content内的数字代表时间，多少秒后刷新。如果加url,则会重定向到指定网页
	`<meta http-equiv="refresh" content="0;url=http://www.baidu.com" />`
* name=”author” 作者
* 针对谷歌GOOGLEBOT使用robots
	`<meta name="googlebot" content="noindex, nofollow" />`
* 针对百度baiduspider使用robots
	`<meta name="baiduspider" content="noarchive" />`

##### 移动设备
* viewport 优化移动页面显示
	*  4.7-5寸设备的viewport宽设为360px；
	*  5.5寸设备设为400px；
	*  iphone6设为375px；
	*  ipone6 plus设为414px。
* 属性
	* width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）
	* height：高度（数值 / device-height）（范围从223 到10,000）
	* initial-scale：初始的缩放比例 （范围从>0 到10）
	* minimum-scale：允许用户缩放到的最小比例
	* maximum-scale：允许用户缩放到的最大比例
	* user-scalable：用户是否可以手动缩 (no,yes)
	* minimal-ui：可以在页面加载时最小化上下状态栏。（已弃用）
	* 如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。
* 应用
	* WebApp全屏
	`<meta name="apple-mobile-web-app-capable" content="yes" />`
	* 隐藏状态栏/设置状态栏颜色
	`<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
	* 添加到主屏后的标题
	`<meta name="apple-mobile-web-app-title" content="标题">`
	* 忽略数字自动识别为电话号码
	`<meta name="format-detection" content="telephone=no" />`
	* 忽略识别邮箱
	`<meta content="email=no" name="format-detection" />`
	* 添加智能 App 广告条 Smart App Banne
	`<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">`
* 其他
```javascript
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
```

#### 网页应用
* 编码
	`<meta charset='utf-8' />`
* 浏览器优先选择
	```javascript
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=8" >
	```
* 内核控制：控制浏览器使用哪种内核渲染
	`<meta name="renderer" content="webkit">`
	可选值：webkit，ie-comp，ie-stand
* 禁止本地缓存
	`<meta http-equiv="Pragma" content="no-cache">`
* Windows 8 tile
* 适配：PC-手机页面的对应
	`<meta name="mobile-agent" content="format=html5; url=url">`
	[wml|xhtml|html5]根据手机页面的协议语言，选择其中一种；
	url=”url” 后者代表当前PC页所对应的手机页URL，两者必须是一一对应关系。
* 转码申明 （避免转码使用如下）
	`<meta http-equiv="Cache-Control" content="no-siteapp" />`
