title: 从零开始Python-05
date: 2015-10-10 11:12:24
tags: python
toc: true
---
##### dict
>键值对 字典
```python
x = {'a':1,'b':2}
len(x) #集合大小
print x['a'] # 1
```
<!--more-->
* key value形式，通过key查找
* 通过key去访问value，如果key不存在就报错，为了避免报错，可以先判断
```python
if 'a' in x:
    print x['a']
```
* 使用get方法，在key不存在的时候返回None
```python
print x.get('a') # 1
```
* 查找速度快，但是消耗内存大，list占用内存小，查找速度慢
* key不能重复
* 存储没有顺序
* key不可变
* 增加一个元素,如果key已经存在则覆盖值
```python
x['c'] = 3
```
* 遍历for in
```python
for i in x:
    print i
    print x[i]
```

##### set

* 建立一组key,key永远不会重复，无序的，元素不能改变
```python
x = set(['a','b','c','c'])

print x # set(['a','c','b'])

#访问
'a' in x # True
```
* 使用for in遍历
* 更新set,add()添加，如果已经存在不会报错，remove()移除，如果不存在报错