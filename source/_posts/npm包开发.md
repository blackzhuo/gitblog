title: npm包开发
date: 2016-04-14 10:41:29
tags: nodejs
toc: true
---
#### 环境要求
* nodejs

#### 基本文件结构
* package.json 
	* 使用npm init生成
	* 安装依赖模块使用 npm install 模块名
* 一个主文件 index.js
* 一个lib文件夹
	* 存放源文件
<!--more-->

#### 例子
* package.json
```javascript

{
  "name": "node-tools",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

* index.js
```javascript
/*
* @Author: amos
* @Date:   2016-04-08 13:57:37
* @Last Modified by:   amos
* @Last Modified time: 2016-04-08 13:58:26
*/

'use strict';

module.exports = require(./lib/index);
```

* `lib/index.js`
```javascript
/*
 * @Author: amos
 * @Date:   2016-04-08 13:58:47
 * @Last Modified by:   amos
 * @Last Modified time: 2016-04-08 14:19:04
 */

'use strict';

var Tools = (function() {
	//==================================
	// 检测iOS版本
	function gtIOS() {
		var userAgent = window.navigator.userAgent;
		var ios = userAgent.match(/(iPad|iPhone|iPod)/s + OS / s([/d_/.] + ) / );
		return ios && ios[2] && parseInt(ios[2].replace(/_/g, '.'), 10);
	}
	//==================================

	//==================================
	// 检测支持css属性
	function isSupportCss(key, value) {
		var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
		var cssText = '';
		for (var i = 0; i < prefixTestList.length; i++) {
			cssText += key + ':' + prefixTestList[i] + value + ';';
		}
		// 创建一个dom来检查
		var div = document.createElement('div');
		var body = document.body;
		div.style.cssText = 'display:none;' + cssText;
		body.appendChild(div);
		var reg = new RegExp(value, i);
		var isSupport = reg.test(window.getComputedStyle(div)[key]);
		body.removeChild(div);
		div = null;
		return isSupport;
	}
	//==================================

	//==================================
	// 防止内容区域滚到底后引起页面整体的滚动
	var content = document.querySelector('main');
	var startY;

	content.addEventListener('touchstart', function(e) {
		startY = e.touches[0].clientY;
	});

	content.addEventListener('touchmove', function(e) {
		// 高位表示向上滚动
		// 底位表示向下滚动
		// 1容许 0禁止
		var status = '11';
		var ele = this;

		var currentY = e.touches[0].clientY;

		if (ele.scrollTop === 0) {
			// 如果内容小于容器则同时禁止上下滚动
			status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
		} else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
			// 已经滚到底部了只能向上滚动
			status = '10';
		}

		if (status != '11') {
			// 判断当前的滚动方向
			var direction = currentY - startY > 0 ? '10' : '01';
			// 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
			if (!(parseInt(status, 2) & parseInt(direction, 2))) {
				stopEvent(e);
			}
		}
	});
	//==================================


	return {
		gtIOS: gtIOS,
		isSupportCss: isSupportCss
	};
}());


module.exports = Tools;
```

#### 发布应用
	* npm发布
	* 通过require的方式引用，直接使用