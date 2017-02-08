#!/bin/sh

hexo clean
hexo g
hexo d

curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=www.xuerlove.com&token=qYDK8jfBtWRoSXDs"
