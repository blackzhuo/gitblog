title: 从零开始Python-02
date: 2015-10-07 11:10:30
tags: python
toc: true
---
##### print语句
输出语句
```python
print 'hello world'
print 'hello','world'
print 100
print 100+200
```
<!--more-->

##### 注释
使用#开头
```python
print 'how' #这是个注释
```

##### 变量
大小写英文，数字和_的组合，而且不能用数字开头
```python
a=1
a_123='qwe'
```

##### 变量类型不固定的动态语言
```python
a='ABC'
b=a
a='XYZ'
print b  #'ABC'
```

##### 定义字符串
```python
‘’ “” \ 转义，后面的字符不做解析
'I\'m a jser.\"OK\"'
raw字符串，在字符串前面加r,里面的字符不做转义
‘’’里面放多行字符串’’’，前面也可以加r
```

##### Unicode字符串
```python
u'中文'
u'''中文'''
ur'''中文 "韩文"各种显示'''
保存文件的时候，可以在第一行添加 ‘# -- coding: utf-8 --‘ 告诉解析起，用utf-8编码读取
```

##### 整数和浮点数
四则运算，整数的运算永远是精确的，浮点数的计算可能不是精确的，计算机二进制处理，在除法运算中 / 取模，% 取余。
```python
11/4 #2
11.0/4 #2.75
```

##### 布尔类型
* and两个都是True,计算结果为True
* or 一个为True结果就是True,两个都是False结果为False
* not True变成False,False变成True
* python把0 空字符串’’ 和None看成False,其他数值和非空字符串都看成True.

##### 短路计算
* 计算a and b的时候，如果a是False，根据与运算法则，整个结果都是False，则返回False，如果a为True，则返回b
* 计算a or b的时候，如果a是True，返回True，因此返回a，如果a为False，则返回b