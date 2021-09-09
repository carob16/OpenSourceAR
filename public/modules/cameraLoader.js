var video = document.getElementById('video-background');

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices

    .getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      var videoElement = document.getElementById('video-background');
      videoElement.style.display = 'none';
      console.log('Something went wrong! ' + err);
    });
}
