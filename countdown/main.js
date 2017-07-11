/*
// 方法一：setInterval
let countDown = new Date('dec 6 2017 00:00:00').getTime();  //一共多少秒
let x = setInterval(function () {
    let now = new Date().getTime(),
        distance = countDown - now,
        days = Math.floor(distance/(1000*60*60*24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('bday').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}`;

    if(distance<0){
        clearInterval(x);
        document.getElementById('bday').innerHTML = 'It is my birthday'
    }
},1000)
*/

//方法二：requestAnimationFrame（推荐）
let countDown = new Date('dec 6 2017 00:00:00').getTime();
let raf;
function frame() {
    let now = new Date().getTime(),
        distance = countDown - now,
        days = Math.floor(distance/(1000*60*60*24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('bday').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}`;

    if(distance<0){
        document.getElementById('bday').innerHTML = 'It is my birthday'
        cancelAnimationFrame(raf);
        return
        //时间到，cancelAnimationFrame,再return
    }
    raf = requestAnimationFrame(frame)
}
frame();