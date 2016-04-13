title: javascript跳出循环
date: 2015-10-17 14:46:49
tags: javascript
toc: true
---
##### break
>for， while， switch的case分支，使用 break 跳出当前循环；<!--more-->
```javascript
for(var i = 0;i<10;i++){
    for(var j = 0;j<10;j++){
        if(j>5){
            break;
        }
        console.log(i+''+j); 
    }
}

var sum = 0;
while(1){
    sum++;
    if(sum>10){
        break;
    }
}

switch(1){
    case 1:
        console.log(1);
        break;
    default:
        console.log('default');
}
```
##### 跳出for多重循环
```javascript
loop_i:
for(i=0; i<10; i++){
    loop_j:
    for(j=0; j<10; j++){
        if(j>5){break;}
        if(i===5){break loop_j;}
        if(i===8){break loop_i;}
        console.log('loop:'+i+''+j);
    }
}
console.log('end:'+i+''+j);
continue
```
##### 结束当前循环，继续下一次循环
```javascript
for(var i = 0;i<10;i++){
    for(var j = 0;j<10;j++){
        if(j === 5){
            continue;
        }
        console.log(i+''+j); 
    }
}
```
##### return
>跳出数组forEach循环,跳出jquery each循环(return只能出现在函数里面)
```javascript
var arr = [1,2,3,4,5,6];
arr.forEach(function(item,index){
    if(index > 3){
        return false;
    }
    console.log(item);
});

var arr = [1,2,3,4,5,6];
$.each(arr,function(k,v){
    if(k > 3){
        return false;
    }
    console.log(v);
});
```