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