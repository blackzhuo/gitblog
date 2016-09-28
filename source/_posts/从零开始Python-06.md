title: 从零开始Python-06
date: 2015-10-11 21:11:24
tags: python
toc: true
---
##### 函数
###### 内置函数
> 可以引用math包，里面有很多数学函数
<!--more-->
`import math`
* abs(x)
```python
abs(-1)
abs(11)
```
* cmp(x,y)
```python
cmp(1,2) #-1
cmp(1,-1) #1
cmp(1,1) #0
```
* int(x)
```python
int('111') #111
int('1.11') #1
```
* str(x)
```python
str(111) #'111'
```

###### 编写函数
>使用def语句
```python
def myFuc(a):
    return a+'...ok'
```
如果没有返回结果，函数也会返回None,return None可以简写为return

###### 返回多个值
```python
def myFuc(x,y):
    xx = x+1
    yy = y+1
    return xx,yy

a,b = myFuc(1,2) #2,3
```
实际返回的是一个tuple,由于是()包着的，所以从语法上讲可以省略括号,多个变量可以同时接收一个tuple,按照对应的位置赋值

###### 递归函数
>自身调用自身的函数
```python
def myFuc(x):
    if x==1:
        return 1

return x * myFuc(x-1)
```
###### 默认参数
```python
def myFuc(x,y=2):
    return x*y
```

###### 可变参数
```python
def muFuc(*args):
    sum = 0
    for x in args:
        sum = sum+x
    
    return sum

#args 看成tuple
```