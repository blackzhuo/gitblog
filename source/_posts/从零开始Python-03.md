title: 从零开始Python-03
date: 2015-10-08 15:14:09
tags: python
toc: true
---
##### list
>数据类型的列表，有序集合，可以执行添加删除操作
<!--more-->
```python
list1 = ['1','qwe','asd1']
list1 # ['1','qwe','asd1']

list2 = [1,True,'123aS4'] #可以包含不同类型的元素
list2 # [1,True,'123aS4']

list3 = []  #空list

list2[0] # 1  按照索引访问
list[4] #报错，超出索引

list2[-1] # '123aS4' 倒序访问
list[-4] #报错，不存在
```
* append 追加到末尾
* insert(index,item) 指定位置添加元素
* pop() 删除最后一个元素
* pop(index) 删除指定位置的元素
* 替换元素 直接给特定位置元素赋值

##### 切片
>list切片，字符串切片
```python
x = [1,2,3,4,5,6]
x[:3] #取前三个 索引为0,1,2的元素
x[1:3] #从索引1开始到索引3结束，取两个元素
x[:] #取所有元素，返回还是list
x[::2] #每两个取1个
#倒序
x[-1:] #最后一个元素索引－1
```
```python
x='asdfghjkl'
x[:3]
x[1:3]
x[::2]
```

##### tuple
>有序列表，元组，与list区别是，一旦创建就不能修改
```python
tuple1 = (1,'123',True)
tuple1[1] # 1
tuple1[-1] # True

#单元素
tuple2 = (1,) #如果不加 , 括号会被当作运算符去执行
tuple2 # (1,)

tuple1 # (1,'123',True) #加不加 , 输出结果都一样

#tuple中的元素包含数组，就变成了可变的，数组的内容可变
x1 = (1,2,[3,4])
x2 = x1[2]
x[1] = 'a'
x[2] = 'b'

print x1 # (1,2,['a','b'])
```