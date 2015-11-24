title: html5文件上传
date: 2015-10-04 19:20:11
tags: javascript
toc: true
---
#### File
>* 背景
我们之前在浏览器端操作文件，一般都是通过flash,silverlight或者ActiveX插件，这些实现都是依赖第三方插件，不够独立也伴随着升级带来的不稳定，也不够通用，使用了这些技术后也很难进行跨平台、跨浏览器、跨设备等情况下实现统一的表现。
之前图片上传方式，1、form提交。2、flash上传。3、插件上传。
* form上传无法取消，没有上传进度，flash上传，非IE浏览器无法传递cookie，插件上传的问题就是跨浏览器上传。
* HTML5的File API可以很轻松的使用JS来控制文件的读取、写入等一系列的操作。
<!--more-->
##### js对象
* FileList
File对象的集合,file标签设置multiple，就支持多文件上传
`<input type="file" multiple="multiple" name="file" id="js_file" />`
* Blob
原始数据对象
使用slice方法可以读取原始数据中的某块数据
属性：size（数据的大小），type（数据的MIME类型）
* File
继承自Blob对象,指向一个具体的文件
属性：name（文件名), lastModifiedDate（最后修改时间)
* FileReader
读取文件数据
* URL scheme

##### FileReader
* 三个方法
	* readAsBinaryString(Blob blob);传入一个Blob对象，读取数据的结果作为二进制字符串的形式放到FileReader的result属性中。
	* readAsText(Blob blob, optional DOMString encoding);第一个参数传入Blog对象，第二个参数传入编码格式，异步将数据读取成功后放到result属性中，读取的内容是普通的文本字符串。
	* readAsDataURL(Blob blob);传入一个Blob对象，读取内容可以做为URL属性，图片返回结果可以赋值给img的src。
* 六个事件
	* Onloadstart 文件读取开始时触发。
	* Progress 读取进行中定时触发。事件参数中会含有已读取总数据量。
	* Abort 当读取被中止时触发。
	* Error 当读取出错时触发。
	* Load 当读取成功完成时触发。
	* Loadend 当读取完成时，无论成功或者失败都会触发。

##### 拖拽上传
>拖拽简介
拖拽源和拖拽目标：
* 拖拽源：设置draggable属性为true标识该对象可作为拖拽源。然后监听源对象的dragstart事件，在事件处理函数里设置DataTransfer。在DataTransfer里可以设置拖拽数据的类型和值。比如是纯文本的值，可以设置类型为”text/plain”，url则把类型设置为”text/uri-list”。这样，目标对象就可以根据期望的类型来选择数据了。
* 拖拽目标：一个拖拽目标必须监听3个事件。
	* dragenter：目标对象通过响应这个事件来确定是否接收拖拽。如果接收则需要取消这个事件，停止事件继续传播。
	* dragover：通过响应这个事件来显示拖拽的提示效果。
	* drop：目标对象通过响应这个事件来处理拖拽数据。在drop事件中可以获取DataTransfer对象，取出要上传的数据。
