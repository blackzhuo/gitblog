title: nodejs利用session做登录控制
date: 2016-11-02 20:53:28
tags: nodejs
toc: true
---
#### background

&nbsp; &nbsp;&nbsp;&nbsp;登录的场景在我们日常应用中有很多，登录的实现过程大家都很清楚，无非就是拿着用户名密去数据库中查询，如果查到了就表示这个人是系统用户，可以登录并且使用系统。那么当用户访问系统页面的时候，我们怎么判断他是不是登录过了呢，这个时候就引出了session。
&nbsp; &nbsp;&nbsp;&nbsp;session翻译成会话，session的生命周期和浏览器的生命周期一致，session从创建的一刻起开始生效，浏览器关闭session销毁。session是客户端与服务器之间保持状态的解决方案。这种会话的匹配是通过cookie来实现的。

<!--more-->

#### express-session

&nbsp; &nbsp;&nbsp;&nbsp;express-session是基于express框架的专门处理session的中间件，安装 `sudo npm install express-session --save` , session的解析过程需要用到cookieParser, 安装 `sudo npm install cookieParser --save` , 我们在使用的时候，只需要把express-session加入到中间件中，这样所有的路由就都能使用它了，我们可以在req.session中设置和读取session的值。

##### 应用

改造上一节中的例子，这里只介绍一些增加项
app.js (引用session，加入中间件)
```javascript
...
var session = require('express-session');
var cookieParser = require('cookie-parser');
...
...
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  name: 'user',
  cookie: { maxAge: 80000 },
  secret: 'wz'
}));
...
...

```

routes/index.js (路由中检查登录session是否存在)
```javascript
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login.page');
  }
}
router.get('/index.page',restrict, function(req, res){
  res.send('success');
});
router.get('/login.page', function(req, res){
  res.send('login');
});
router.get('/login', function(req, res, next){
    login(req, res, next);
});
router.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/login.page');
  });
});
```

main/login.js (只增加了注释部分的代码)
```javascript
function queryData(req, res, next,query) {
    var query = query ? JSON.parse(query) : {};
    pageModule.find(query).exec(function(err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8"
        });
        if(err){
            result = JSON.stringify(dbError);
            res.end(result);
        }
        if(data && data.length){
            //只增加了登录成功后，创建一个session的过程
            req.session.user = data[0].username;
            dbSuccess.data = data;
            result = JSON.stringify(dbSuccess);
            res.end(result);
        }else{
            result = JSON.stringify(dbError);
            res.end(result);
        }
    });
}
```

#### 测试过程
```javascript
1. http://127.0.0.1:3000/index.page
2. http://127.0.0.1:3000/login?type=find
3. http://127.0.0.1:3000/index.page
```
分别输入三个url，观察现象，第一个url输入的时候，因为不存在session,所以会跳转到登录页面，
第二个url为模拟登录过程，创建了一个session，第三个url访问主页，此时存在session,所以可以看到首页内容。

#### express-session常用参数
* cookie Object类型，设置cookie的一些属性
* domain cookie作用域
* expires cookie失效时间
* httpOnly 禁止客户端访问
* maxAge 实效时长
* path cookie路径
* name 这是session id的值
* resave 允许重新设置session
* saveUninitialized 是否session可以修改
* secret cookie密钥
* store session存储方式 mongodb等

#### express-session常用方法
* Session.regenerate() 创建session
* Session.destroy() 销毁session
* Session.reload() 重载session
* Session.save() 保存session