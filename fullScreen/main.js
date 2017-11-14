var gallery = document.querySelector('#gallery')
function launchFullScreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  }
  else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  }
  else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
  else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
  let pic = el.querySelector("img").src,
    filename = pic.substring(pic.lastIndexOf('/')+1).split(".")[0];
  el.querySelector("img").src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/" + filename +"-large.jpg";
  gallery.classList.add("full");
}

function cancelFullScreen(el) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  let pic = el.querySelector("img").src,
    filename = pic.substring(pic.lastIndexOf('/')+1).split("-large")[0];
  el.querySelector("img").src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/" + filename +".png";
  gallery.classList.remove("full");
}

let bod = document.body;
if (bod.requestFullscreen || bod.mozRequestFullScreen || bod.webkitRequestFullscreen || bod.msRequestFullscreen) {
  // browser supports Fullscreen API
  gallery.classList.add("fs");
}

gallery.addEventListener("click", function(e) {
  if (gallery.classList.contains("fs")) {
    if (gallery.classList.contains("full")) {
      cancelFullScreen(e.target);
    } else {
      launchFullScreen(e.target);
    }
  }
})
