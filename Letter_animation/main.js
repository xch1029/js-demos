let spans = document.querySelectorAll('.word span');
spans.forEach((span,idx)=>{
  span.addEventListener('click',e=>{
    // e.target.classList.add('active');
    span.classList.add('active')
  });
  span.addEventListener('animationend',e=>{
    //e.target.classList.remove('active');
    span.classList.remove('active')
  })

  //初始化
  setTimeout(()=>{
    span.classList.add('active')
  },750*(idx+1))
})