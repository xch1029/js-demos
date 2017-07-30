$(window).scroll(function(){
  $('.container p').each(function(){
    var scrollTop = $(window).scrollTop(),  //滑块的上边缘的位置
        elementOffset = $(this).offset().top,
        distance = elementOffset - scrollTop,
        windowHeight = $(window).height(),
        breakPoint = windowHeight*0.9;
    if(distance>breakPoint){
      $(this).addClass('more-padding')
    }
    if(distance<breakPoint){
      $(this).removeClass('more-padding')
    }
  })
})