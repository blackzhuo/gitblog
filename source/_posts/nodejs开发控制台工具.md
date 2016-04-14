title: nodejs开发控制台工具
date: 2016-04-14 10:41:56
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


#### 例子：
* package.json
```javascript
{
  "name": "node-translate",
  "version": "1.0.0",
  "description": "translate",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "trans": "./index.js"
  },
  "author": "wisdom",
  "license": "ISC",
  "dependencies": {
    "color": "^0.11.1",
    "colors": "^1.1.2",
    "commander": "^2.9.0",
    "request": "^2.70.0"
  }
}
```
* index.js
```javascript
#! /usr/bin/env node

/*
 * @Author: wisdom
 * @Date:   2016-04-07 15:47:33
 * @Last Modified by:   wisdom
 * @Last Modified time: 2016-04-07 17:56:40
 */

'use strict';

var request = require('request');
var colors = require('colors');

var program = require('commander');
program.version('0.0.1').parse(process.argv);

(function() {

	var param = process.argv[2];

	var word = param ? param : '';

	if (!word) {
		console.log('请输入要查询的单词'.underline.red);
		return false;
	}

	console.log('');
	console.log('要翻译的单词 : '.green + ' : ' + word.underline.red);
	console.log('');

	var option = {
		from: 'zh',
		to: 'en',
		query: encodeURIComponent(word)
	};

	if (/^[A-Za-z ]+$/.test(word.trim())) {
		option.from = 'en';
		option.to = 'zh';
	}

	var url = 'http://test.com'; // 这里换成了假url

	var paramArray = [];
	for (var item in option) {
		var pStr = item + '=' + option[item];
		paramArray.push(pStr);
	}

	url += '?' + paramArray.join('&');

	request(url, function(error, response, data) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(data);
			if (data && data.result) {
				console.log('翻译结果 : '.green + data.result.dst.underline.red || '没有查询到结果'.underline.red);
			} else {
				console.log('没有查询到结果'.underline.red);
			}
			console.log('');
		}
	});
}());
```
#### 链接到全局
npm link

#### 自行发布

#### request
request模块让http请求变的简单,https://www.npmjs.com/package/request

#### colors
终端着色colors插件,https://www.npmjs.com/package/colors

#### program
nodejs命令行参数处理模块commander,https://www.npmjs.com/package/commander
