title: Jcrop
date: 2015-11-15 15:03:01
tags: web
toc: true
---
#### 引用资源
##### css
`<link rel="stylesheet" href="jquery.Jcrop.css">`
##### JavaScript
`<script src="jquery.js"></script>`
`<script src="jquery.Jcrop.js"></script>`
##### 使用
```javascript
<img id="image" src="image.jpg">

$('#image').Jcrop();
```
##### 参数
|属性	|值	|描述|
|| :-- ||:--: ||:--: ||
|allowSelect|	true|	允许新选框|
|allowMove|	true	|允许选框移动|
|allowResize|	true|	允许选框缩放|
|aspectRatio|	1	|选框宽高比。说明：width/height|
|keySupport|	true|	支持键盘控制。按键列表：上下左右（移动选框）、Esc（取消选框）|
|dragEdges|	true|	允许拖动边框|
|boxWidth	|100|	画布宽度|
|boxHeight|	100	|画布高度|
|minSelect|	[10,10]|	选择框最小选择尺寸。说明：若选择框小于该尺寸，则自动取消选择|
|maxSize|	[10,10]|	选择框最大尺寸|
|minSize	|[10,10]|	选择框最小尺寸|
|onChange|	function(data){}|	选择框改变时的事件|
|onSelect	|function(data){}|	选择框选定时的事件|
|onDblClick	|function(data){}|	在选择框内双击时的事件|
|onRelease	|function(data){}|	取消选择框时的事件|
后面四个回调函数的参数data是一个对象，包含所选尺寸的x,y,w,h

##### API介绍
|方法|	描述|
|| :-- ||:--: ||
|getBounds()	|获取图片实际尺寸，格式为：[w, h]|
|getWidgetSize()	|获取图片显示尺寸，格式为：[w, h]|
|getScaleFactor()	|获取图片缩放的比例，格式为：[w, h]|
