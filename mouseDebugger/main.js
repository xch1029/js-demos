/*
	1.对鼠标的监听
	2.函数式编程
	3.scrollHeight,scrollTop,offsetHeight的区别
*/
const $logger = document.querySelector('.logger');
const $mouse = document.querySelector('.mouse');

const log = (msg)=>{
	$logger.innerHTML += `&gt; ${msg}<br />`;
	$logger.scrollTop = $logger.scrollHeight;
	
	console.log($logger.scrollHeight);  //内容的总高度（可能不能完全展示）
	console.log($logger.scrollTop);  //滑块的位置，值为0：文档在第一行位置，值为scrollHeight：文档在最后一行位置
	console.log($logger.offsetHeight)  //元素高度，即元素的height
};
const press = (type)=>{
	log(`${type} mouse button pressed`);
	$mouse.classList.add(type)
};
const release = (type)=>{
	log(`${type} mouse button released`);
	$mouse.classList.remove(type)
};

document.addEventListener('mousedown',(event)=>{
	switch(event.which){
		case 1:
			press('left');
			break;
		case 2:
			press('middle');
			event.preventDefault();
			event.stopPropagation();
			return false;
			break;
		case 3:
			press('right');
			break;
		default:
			log('Unknown mouse button pressed')
	}
})

document.addEventListener('mouseup',(event)=>{
	switch (event.which){
		case 1:
			release('left')
			break;
		case 2:
			release('middle')
			break;
		case 3:
			release('right')
			break;
		default:
			log('Unknown mouse button released')
	}
})

document.addEventListener('wheel', (event) => {
	if (event.deltaY !== 0) {
		log(event.deltaY < 0 ? 'scroll wheel up' : 'scroll wheel down')
	} else if (event.deltaX !== 0) {
		log(event.deltaX < 0 ? 'scroll wheel left' : 'scroll wheel right')
	}
})

document.querySelector('.log button').addEventListener('click', function () {
	$logger.innerHTML = ''
})

document.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	e.stopPropagation()
	return false
})

log('Initializing logger....')