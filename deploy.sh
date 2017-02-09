#!/bin/sh

# 编译部署
hexo clean
hexo g
hexo d

# 百度seo推送
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=www.xuerlove.com&token=qYDK8jfBtWRoSXDs"

echo "blog deploy complete."