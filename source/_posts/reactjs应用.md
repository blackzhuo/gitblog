title: reactjs应用
date: 2016-04-14 10:42:32
tags: web
toc: true
---
#### reactjs
官方文档 http://reactjs.cn/react/docs/getting-started.html
##### 引用reactjs框架
* 实时转换工具 `npm install -g react-tools` 启动命令 `jsx --watch src/ build/` （或者页面引入jsx编译工具）
* 引入fetch https://github.com/github/fetch （引入Promise）
* jsx http://reactjs.cn/react/docs/jsx-in-depth.html
```<!--more-->
##### 过程
* 通过 React.createClass 定义组件
* 组件包含的属性，方法(http://reactjs.cn/react/docs/component-specs.html)
	* render
	* getInitialState
	* getDefaultProps
	* propTypes
	* mixins
	* statics
	* displayName
* 生命周期方法(http://reactjs.cn/react/docs/component-specs.html)
	* componentWillMount
	* componentDidMount
	* componentWillReceiveProps
	* shouldComponentUpdate
	* componentWillUpdate
	* componentDidUpdate
	* componentWillUnmount
* 组件生命周期
>了解组件的生命周期很重要，这在我们哪个阶段去调用什么方法是有帮助的，下面就一起来看一下：

1. getInitialState
	* 在组件类创建的时候只调用一次，返回值是 this.state 的初始值
2. componentWillMount
	* 初始化渲染之前只调用一次，如果在这个阶段setState，更新将会通知render
3. render
	* 会根据this.props或者this.state渲染组件
4. componentDidMount
	* 在初始化渲染之后只调用一次，可以操作dom和浏览器交互，通过this.DOMNode()获取DOM节点
5. componentWillReceiveProps
	* 组件接收到新的props都会调用，初始化的时候不会调用这个方法，可以在这里面更新this.state
6. componentWillUpdate
	* 在接收到新的props或者state之前的时候调用，初始化渲染的时候不会调用，里面做更新前的准备工作，不能在里面setState
7. shouldComponentUpdate
	* 在接收到新的props或者state的时候，渲染之前调用，在初始化的时候不会调用，如果确定新的props和state不会导致组件更新，可以返回false,默认返回true
	```javascript
	shouldComponentUpdate: function(nextProps, nextState) {
	  return nextProps.id !== this.props.id;
	}
	```
	* 这个方法可以提升程序性能，一些依赖父级props，组件本身会发送请求的情况，可以判断传入props是否是更新后的，然后再去执行接下来的动作。
8. componentDidUpdate
	* 组件更新到DOM中被调用，初始化的时候不会调用，对dom的操作可以放在这里面执行
9. componentWillUnmount
	* 组件从dom中移除的时候调用，这个方法中清除一些定时操作等
