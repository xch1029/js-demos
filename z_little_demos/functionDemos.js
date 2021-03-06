//收集的是自己在codevars上的练习，重难点收集
//1.对数组里的奇数排序，偶数位置不变
function sortArray(array) {
  const odd = array.filter((x) => x % 2).sort((a,b) => a - b);
  return array.map((x) => x % 2 ? odd.shift() : x);
}

//2.返回字符串中的元音的（a,e,i,o,u）个数
function getCount(str){
  return (str.match(/[aeiou]/ig||[])).length;
}

//3.传入小时，返回时分秒
function time(h){
  return [Math.floor(time),Math.floor(time*60%60),Math.floor(time*3600%60)]
}
//4.大数据相加
function sumString(a,b){
  var res = '',c = 0;
  a = a.split('');
  b = b.split('');
  while(a.length || b.length || c){
    c += ~~a.pop() + ~~b.pop();
    res = c % 10 + res;
    c = c > 9;
  }
  return res.replace(/^0+/,'');
}
