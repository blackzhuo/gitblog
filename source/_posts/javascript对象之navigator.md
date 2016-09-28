title: javascript对象之navigator
date: 2015-10-18 14:49:20
tags: javascript
toc: true
---
##### 概述
>navigator对象保存的是浏览器的信息，兼容所有浏览器，只读
支持的属性
<!--more-->
* appCodeName 浏览器代码名
* appName 浏览器名称
* appVersion 浏览器平台版本信息
* browserLanguage 浏览器使用的语言 仅支持IE
* cookieEnabled 浏览器是否开启cookie支持
* cpuClass 浏览器所在系统的CPU登记 仅支持IE
* onLine 是否处于脱机模式 仅支持IE
* platform 浏览器所在的操作系统平台
* systemLanguage 浏览器所在操作系统使用的语言 仅支持IE
* userAgent 浏览器用于HTTP请求的用户代理头的值
* userLanguage 浏览器所在操作系统的自然语言设置 仅支持IE

我们经常使用的就是userAgent
1.通过这个可以做touch上对app的唤醒，因为不同平台app唤醒方式有差别，可以使用userAgent做区分处理
2.pc端可以通过userAgent判断浏览器版本，做兼容处理方案
3.userAgent可以识别设备