title: 从零开始Python-07
date: 2015-10-12 09:12:10
tags: python
toc: true
---
##### 迭代
>使用for in迭代
```python
x=['asd','zxc','123']
for i in x:
    print i
```
<!--more-->

##### 迭代索引
```python
x=['asd','zxc','123']
for k,v in x:
    print k,'-',v
```
##### 迭代dict value
>values方法,把dict转换成value的list
```python
x = {'a':1,'b':2}
print x.values()
```
* itervalues方法,不转换，迭代过程中依次取dict的value
```python
x = {'a':1,'b':2}
print x.itervalues()
```

##### 迭代dict key value
```python
x = {'a':1,'b':2}
for k,v in x.items():
    print k,'-',v
```
* items，iteritems类似，把dict转换成 tuple的list

##### 生成列表
>range
```python
range(1,100) #[1,2,3,...,100]

[a+a for a in range(1,100)] # 1-100，每个数自身相加 [2,4,6,...,200]
```
##### 复杂表达式
```python
x = ['a':1,'b':2]
tmpl=['<div>%s</div><div>%s</div>' (k,v) for k,v in x.iteritems()]
```

##### 条件过滤
```python
[a+a for a in range(1,100) if x > 50 ] # 1-100，每个数自身相加 [2,4,6,...,200]
```

##### 多层表达式
```python
[x+y for x in 'asd' for y in '123'] # ['a1','s2','d3']

x=[]
for i in 'asd':
    for j in '123':
        x.append(i+j)
```
