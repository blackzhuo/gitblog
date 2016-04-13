title: Dom元素尺寸相关
date: 2015-10-05 21:11:49
tags: javascript
toc: true
---
##### 元素距左侧偏移量
```javascript
function getElementLeft(element){
	var leftval = element.offsetLeft;
	var current = element.offsetParent;
	while(current !== null){
		leftVal += current.offsetLeft;
		current = current.offsetParent;
   }
	return leftVal;
}
```
<!--more-->
##### 元素距上方偏移量
```javascript
function getElementTop(element){
	var topVal = element.offsetTop;
	var current = element.offsetParent;
	while(current !== null){
	topVal += current.offsetTop;
	current = current.offsetParent;	
  }
  return topVal;
}
```
#####浏览器视口大小
```javascript
function getViewport(){
	if(document.compatMode === 'BackCompat'){
	  return {
	   width:document.body.clientWidth,
	   height:document.body.clientHeight 
   }
  }else{
     return {
	  width:document.documentElement.clientWidth,
 height:document.documentElement.clientHeight  
  }
  }
}
```
##### 滚动大小
* scrollHeight 没有滚动情况元素内容总高度
* scrollWidth 没有滚动情况下元素内容总宽度
* scrollLeft 隐藏在元素区域左侧像素
* scrollTop 隐藏在元素区域上方的像素

通过 scrollHeight/clientHeight  和 scrollWidth/clientWidth中最大值可以获取到文档宽高

##### getBoundingClientRect() 
>返回四个属性 left top right bottom

实现
```javascript
function getBoundingClientRect(element){
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
	if(element.getBoundingClientRect){
		if(typeof arguments.callee.offset != 'number'){
			var temp = document.createElement('div');
			temp.style.cssText = 'position:absolute;left:0;top:0;';
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;

		return {
			left:rect.left + offset,
			right:rect.right + offset,
			top:rect.top+offset + offset,
			bottom:rect.bottom + offset
		};
	} else {
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);

		return {
			left:actualLeft - scrollLeft,
			right:actualLeft + element.offsetWidth - scrollLeft,
			top:actualTop - scrollTop,
			bottom:actualTop + element.offsetHeight - scrollTop
		};
	}
}
```