const screenwidth = screen.width;
const screenHeight = screen.height;
console.log(screenwidth,screenHeight);

function setVideoStream(){
if (navigator.mediaDevices.getUserMedia|| navigator.webkit.getUserMedia) {
  navigator.mediaDevices

    .getUserMedia({ video:{width:{min:1024, ideal:screenwidth}, height:{min:576,ideal:screenHeight}, facingMode: { ideal: 'environment' }} })
    .then(function (stream) {    
      video.srcObject = stream;

    })
    .catch(function (err) {
      var videoElement = document.getElementById('video-background');
      videoElement.style.display = 'none';
      console.log('Something went wrong! ' + err);
    });
}
}
container.width = screenwidth;
container.height = screenHeight;
var output = document.getElementById("output");
output.style.width = screenwidth + "px";
output.style.height = screenHeight +"px";