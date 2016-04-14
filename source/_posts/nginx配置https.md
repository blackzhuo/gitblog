title: nginx配置https
date: 2015-11-21 15:03:01
tags: web
toc: true
---
#### 安装
##### 系统：centos
* wget下载
* tar 解压
* sudo ./configure —with-http_rewrite_module —with-pcre=../pcre-8.36 —with-* http_stub_status_module —with-http_ssl_module —with-http_realip_module 安装这些模块，如果安装失败，请wget下载缺失的包，解压安装后，再重新执行，等号后面添加模块路径
* sudo make
* sudo make install
<!--more-->
##### 配置转发
```javascript
upstream  test{
     server **.**.**.**:****;
}

server {
        listen **.**.**.**:8888;
        server_name test.test.com;
        charset utf8;
        gzip                    off;
        gzip_http_version       1.1;
        gzip_buffers            256 64k;
        gzip_comp_level         5;
        gzip_min_length         1000;
        gzip_types              application/x-javascript text/javascript text/plain text/xml text/css image/jpeg image/jpg image/png image/gif application/x-shockwave-flash image/x-icon;

    
         proxy_set_header  Host  $host;
         proxy_set_header  X-Real-IP  $remote_addr;
         proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;


        location ~ /test/ {
                proxy_pass http://test;
        }
}
```

##### 支持https
```javascript
upstream  test{
     server **.**.**.**:****;
}

server {
        listen **.**.**.**:443 ssl;
        server_name test.test.com;
        charset utf8;
        gzip                    off;
        gzip_http_version       1.1;
        gzip_buffers            256 64k;
        gzip_comp_level         5;
        gzip_min_length         1000;
        gzip_types              application/x-javascript text/javascript text/plain text/xml text/css image/jpeg image/jpg image/png image/gif application/x-shockwave-flash image/x-icon;

        ssl on;
        ssl_certificate             /home/q/nginx/conf/server.crt;
        ssl_certificate_key         /home/q/nginx/conf/server.key;
        ssl_session_timeout         5m;
        ssl_protocols               SSLv3 TLSv1;
        ssl_ciphers                 ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
        ssl_prefer_server_ciphers   on;

         proxy_set_header  Host  $host;
         proxy_set_header  X-Real-IP  $remote_addr;
         proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;


        location ~ /test/ {
                proxy_pass http://test;
        }
}
```
##### 证书
* 两种方式
	* 生成证书
		```javascript
		#cd /home/q/nginx/conf
		#openssl genrsa -des3 -out server.key 1024
		#openssl req -new -key server.key -out server.csr
		#openssl rsa -in server.key -out server_nopwd.key
		#openssl x509 -req -days 365 -in server.csr -signkey server_nopwd.key -out server.crt
		```
		中途需要输入密码，自己设定即可
	* copy
		直接copy别的机器上面已经存在的证书

##### 浏览器
* 方法一：如果提示安全提示，点击高级》继续浏览
* 方法二：把生成的server.crt文件导入到系统的证书管理器就行了，具体方法：不介绍了