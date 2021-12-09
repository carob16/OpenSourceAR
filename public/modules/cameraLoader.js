if (navigator.mediaDevices.getUserMedia|| navigator.webkit.getUserMedia) {
  navigator.mediaDevices

    .getUserMedia({ video:{width:{ ideal: 1920}, height:{ideal: 1080}, facingMode: { ideal: 'environment' }} })
    .then(function (stream) {    
      video.srcObject = stream;

    })
    .catch(function (err) {
      var videoElement = document.getElementById('video-background');
      videoElement.style.display = 'none';
      console.log('Something went wrong! ' + err);
    });
}
