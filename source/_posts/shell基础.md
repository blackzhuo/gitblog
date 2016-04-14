title: shell基础
date: 2015-11-23 15:03:01
tags: linux
toc: true
---
#### shell分类
* Bourne Shell（/usr/bin/sh或/bin/sh）
* Bourne Again Shell（/bin/bash）
* C Shell（/usr/bin/csh）
* K Shell（/usr/bin/ksh）
* Shell for Root（/sbin/sh）
* eg.
<!--more-->
##### `#!`
>`#!`告诉系统其后路径所指定的程序即是解释此脚本文件的Shell程序。
* 执行
	* `./test.sh`使用想对路径
	* sh test.sh
* 变量
	* 直接使用变量名 `test="123"`

* 变量名和等号之间不能有空格
* 首个字符必须为字母（a-z，A-Z）。
* 中间不能有空格，可以使用下划线（_）。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）。

##### 使用语句给变量赋值
* for file inls /etc``

##### 使用变量
>在变量名前添加美元符号 `$`
`$test`或者`${test}`

##### 字符串
* 单引号
	* 不能使用变量
	* 不能出现单引号，不能使用转译字符
* 双引号
	* 可以使用变量
	* 可以使用转译字符

##### 拼接字符串
* 不需要使用 `+` 符号
```javascript
name="zhuo"
say="hi "$name" !"
says = "hi ${name} !"
echo say says
```
##### 字符串长度
```javascript
string="tetetete"
echo ${#string}
```
##### 截取字符串
```javascript
string="tetetete"
echo ${string:2:4}
```
##### 查找字符串
```javascript
string="asdfsdf werfvsd"
echo `expr index "$string" is`
```
##### 数组
创建数组以及访问数组
```javascript
arr=(1,2,3,4,5)
#或者
arr[0]=1
arr[1]=2
arr[2]=3
#访问
echo ${arr[0]}
#访问所有元素
echo ${arr[@]}
```
##### 数组长度
```javascript
len=${#arr[@]}
```
或者
```javascript
len=${$arr[*]}
```
数组单个元素长度
```javascript
len=${$arr[n]}
```
##### 注释
* 不支持多行注释，单行注释使用#
* 开发过程中，为方便注释，可以把需要注释的代码放在一个函数中
##### echo
输出字符串
echo string
```javascriot
echo "test"
echo test
echo "\"test\""
```
##### read
输入字符
read name
```javascript
#!/bin/sh
read name
echo "${name}"
```
##### 显示
`-e`开启转义
换行
```javascript
echo -e "test!\n" # \n换行
echo "ok"
```
##### 不换行
```javascript
echo -e "test!\c" # \c不换行
echo "ok"
```
##### 输出到文件
`echo "test" > test.txt`
##### 原格式输出
使用单引号，不进行转义
##### 显示执行结果
`echo `data``

##### test命令
检测某个条件是否成立
	* 数值测试
	```javascript
	-eq	等于则为真
	-ne	不等于则为真
	-gt	大于则为真
	-ge	大于等于则为真
	-lt	小于则为真
	-le	小于等于则为真
	```
	```javascript
	x=read
	y=read
	if test $[x] -eq $[y]
	then
		echo "ok"
	elif test $x -gt $y
		echo "gt"
	else
		echo "bad"
	fi
	```
	* 字符串测试
	```javascript
	=	等于则为真
	!=	不相等则为真
	-z 字符串	字符串长度伪则为真
	-n 字符串	字符串长度不伪则为真
	```
	```javascript
	x=read
	y=read
	if test $x -eq $y
	then
		echo "ok"
	elif test $x -gt $y
		echo "gt"
	else
		echo "bad"
	fi
	```
##### 文件测试
```javascript
-e 文件名	如果文件存在则为真
-r 文件名	如果文件存在且可读则为真
-w 文件名	如果文件存在且可写则为真
-x 文件名	如果文件存在且可执行则为真
-s 文件名	如果文件存在且至少有一个字符则为真
-d 文件名	如果文件存在且为目录则为真
-f 文件名	如果文件存在且为普通文件则为真
-c 文件名	如果文件存在且为字符型特殊文件则为真
-b 文件名	如果文件存在且为块特殊文件则为真
```
```javascript
if test -e ./blog
then 
	echo 'file exists'
else
	echo 'file does not exists'
fi
```javascript
`Shell还提供了 与( -a )、或( -o )、非( ! ) 三个逻辑操作符用于将测试条件连接起来，优先级：”!” “-a” “-o”`
##### 流程控制
* if else
```javascript
x=read
y=read
if test $x -eq $y
then
	echo "ok"
elif test $x -gt $y
	echo "gt"
else
	echo "bad"
fi
```
##### for
```javascript
for it in 1 2 3 4 5 6 7 8
do
	echo $it
done
```
##### while
条件为真则执行
```javascript
count=1
while(($count<10))
do
	echo $count
	let "count++"
done
```
##### until
直到条件为真停止,用法与while相同
```javascript
count=100
until(($count<=10))
do
	echo $count
	let "count--"
done
```
##### case
```javascript
echo '请输入1-3的数字:'
read num
case $num in
	1) echo '你输入了1'
	;;
	2) echo '你输入了2'
	;;
	3) echo '你输入了3'
	;;
	*) echo '你没有输入1到3的数字'
	;;
esac
```
##### break
跳出所有循环
##### continue
结束当前循环，继续执行下一次循环
##### 函数
* 定义方式,不需要带参数
* function fun()
* fun()
	* 参数返回，使用return
	* 函数调用，直接使用函数名，不需要加括号，带有参数直接在后面列出，用空格间隔
	* 函数返回值在调用函数后，可以通过$?使用
	* 函数中的参数，可以使用$n来表示，n>10的时候，使用${n}
	* 特殊参数
		* `$#` 传递到脚本的参数个数
		* `$*` 以一个单字符串显示所有向脚本传递的参数
		* `$$` 脚本运行的当前进程ID号
		* `$!` 后台运行的最后一个进程的ID号
		* `$@` 与$*相同，但是使用时加引号，并在引号中返回每个参数。
		* `$-` 显示Shell使用的当前选项，与set命令功能相同。
		* `$?` 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。
