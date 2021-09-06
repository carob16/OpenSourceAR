var video = document.getElementById('video-background');

if (navigator.mediaDevices.getUserMedia) {
  console.log(navigator.mediaDevices.getSupportedConstraints());
  navigator.mediaDevices

    .getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log('Something went wrong! ' + err);
    });
}
