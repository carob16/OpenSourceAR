var video = document.getElementById('video-background');

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true, facingMode: 'environment' })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log('Something went wrong! ' + err);
    });
}
