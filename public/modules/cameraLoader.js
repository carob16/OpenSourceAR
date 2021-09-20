if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices

    .getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
    .then(function (stream) {
      video.srcObject = stream;
      video.style.filter = 'grayscale(100%)';
    })
    .catch(function (err) {
      var videoElement = document.getElementById('video-background');
      videoElement.style.display = 'none';
      console.log('Something went wrong! ' + err);
    });
}
