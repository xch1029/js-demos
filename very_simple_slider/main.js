let slideCount = document.querySelectorAll('#slider ul li').length;
let slideWidth = document.querySelector('#slider ul li').clientWidth;
let slideHeight = document.querySelector('#slider ul li').clientHeight;
let slideUlWidth = slideCount * slideWidth;

document.querySelector('#slider').style.width = `${slideWidth}px`;
document.querySelector('#slider').style.height = `${slideHeight}px`;

document.querySelector('#slider ul').style.width = `${slideUlWidth}px`;
document.querySelector('#slider ul').style.marginLeft = `-${slideWidth}px`;
lastToFirst();
function lastToFirst(){
    let parentNode = document.querySelector('#slider ul');
    let firstChild =document.querySelectorAll('#slider ul li:first-child')[0];
    let lastChild =document.querySelectorAll('#slider ul li:last-child')[0];
    //将最后一个移到最前面，insertBefore
    parentNode.insertBefore(lastChild,firstChild);
}
function firstToLast(){
    let parentNode = document.querySelector('#slider ul');
    let firstChild =document.querySelectorAll('#slider ul li:first-child')[0];
    //将第一个移到最后面，appendChild
    parentNode.appendChild(firstChild)
}


function moveLeft(){
    document.querySelector('#slider ul').style.left = 0;

    let progress = 0;  //动画进度
    let animation;
    function step(){
        progress += 50;  //步进50
        document.querySelector('#slider ul').style.left = `${progress}px`;
        if(progress < slideWidth){
            animation = requestAnimationFrame(step)
        }else{
            cancelAnimationFrame(animation)
            lastToFirst();
            document.querySelector('#slider ul').style.left = 0;
        }
    }
    animation = requestAnimationFrame(step);

}

function moveRight(){

    document.querySelector('#slider ul').style.left = 0;

    let progress = 0;  //动画进度
    let animation;
    function step(){
        progress += 50;  //步进50
        document.querySelector('#slider ul').style.left = `-${progress}px`;
        if(progress < slideWidth){
            animation = requestAnimationFrame(step)
        }else{
            cancelAnimationFrame(animation)
            firstToLast();
            document.querySelector('#slider ul').style.left = 0;
        }
    }
    animation = requestAnimationFrame(step);

}

document.querySelector('a.control_prev').addEventListener('click',()=>{
    moveLeft();
})

document.querySelector('a.control_next').addEventListener('click',()=>{
    moveRight();
})

//自动播放
var timer;
document.querySelector('#checkbox').addEventListener('change',e=>{
    console.log(e.target.checked);
    if(!e.target.checked){
        clearInterval(timer);
        return
    }
    if(timer){
        clearInterval(timer);
    }
    timer = setInterval(function () {
        moveRight()
    }, 1000);
})