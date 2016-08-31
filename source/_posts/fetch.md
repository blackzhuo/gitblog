title: fetch
date: 2016-08-31 21:17:37
tags: javascript
toc: true
---
##### 介绍
* 遵循Promise解决方案
* XMLHttpRequest的替代者

##### 使用
* 引入Promise兼容方案
* 引入fetch兼容方案（高级浏览器高版本已经支持）
* 兼容方案以及使用说明见 https://github.com/github/fetch

##### 详解
* Header
* Request
* Response

##### 示例
```javascript
html
json
Response metadata
Post form
Post Json
File Upload
Sending cookie
Receiving cookies


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  });
```