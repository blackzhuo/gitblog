title: 从零开始Python-04
date: 2015-10-09 12:09:54
tags: python
toc: true
---
##### 控制语句
###### if
>条件判断，if条件为true就会执行分支语句
<!--more-->
```python
a = 2
if a == 2:
    print 'a:',a

#四个空格缩进，具有相同缩进的代码就是一个代码块，退出缩进需要添加一行回车
```
###### if else
>if True执行if代码块，否则执行else代码块
```python
a = 2
if a == 2:
    print 'a 1:',a

else:
    print 'a 2:',a
    

a = 2
if not a == 2:
    print 'a 1:',a

else:
    print 'a 2:',a
```

###### if elif else
>if elif条件判断，符合执行，否则执行else
```python
a = 2
if a == 1:
    print 'a 1:',a

elif a == 2:
    print 'a 2:',a

else:
    print 'a 3:',a
```

###### for
>list和tuple可以使用for循环，读取每个值
```python
x = ['a','b','c']
for i in x:
    print i
```

###### while
>根据表达式判断是否结束
```python
count = 100
index = 0
while index < count:
    print index
    index = index + 1
```

###### break
>退出循环
```python
all = 0
x = 1
while True:
    all = all + x
    x = x + 1
    if x > 55:
        break

print all
```

###### continue
>跳过本次循环，继续执行下一次循环
```python
all = [11,22,33,44,55,66,77,88,99]
sum
for x in all:
    if x < 50:
        continue

    sum = sum + x
```

###### 嵌套循环
>循环内部添加循环
```python
for x in [1,2,3,4,5]:
    for y in [6,7,8,9,10]:
        print x+y
```