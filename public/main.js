// ----------------FUNCTIONS-------------------------------

function enableDisableEdgeDetection(element){
  enableEdgeDetection = element.checked;
   
}
function enableDisableThreeLoader(element){
  enableThreeLoader = element.checked;
}
function enableDisableAccelerometer(element){
  enableAccelerometer = element.checked;
}
function enableDisableMagnetometer(element){
  enableMagnetometer= element.checked;
}

// For printing data in functions for testing on smartphone
function outputTextElement(name, Text) {

  if (document.getElementById(name) == null) {
    const newParagraph = document.createElement('p');
    newParagraph.id = name;

    // adding content
    newParagraph.textContent = Text;
    var div = document.getElementById('output');
    div.appendChild(newParagraph);
  } else {
    var oldParagraph = document.getElementById(name);
    oldParagraph.textContent = Text;
  }
}

// formatting numbers to fixed format before printing
function fixedNumber(number) {
  if (number != null) {
    number = number.toFixed(4);
  }
  return number;
}

//Downloading CSV-file
function downloadCSV(filename) {
  let csvFile;
  let downloadLink;

  csvFile = new Blob([csvData], { type: 'text/csv' });

  downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
  downloadLink.target = '_blank';
  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);

  downloadLink.click();
}


function toggleFullscreen() {
  const btn = document.getElementById("fullscreenBtn");
  if (document.fullscreenElement) {
    document.exitFullscreen()
      .then(() => {btn.innerHTML="Full screen";})
      .catch((err) => console.error(err))
  } else {
    document.documentElement.requestFullscreen();
    btn.innerHTML="Exit Full screen";
  }
}
//-------------------EVENTS-------------------------------------

//DeviceOrientationEvent
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
  outputTextElement('sensorstatus-magno','sensorstatus-magno: Eventlistener created');
}else{
  outputTextElement('sensorstatus-magno','Cannot read orientation data. Please check your sensor-permissions in settings before reloading the page');
}
//DeviceMotionEvent
if(window.DeviceMotionEvent){
  window.addEventListener('devicemotion', handleMotion, true);
  outputTextElement('sensorstatus-acc','sensorstatus-acc: Eventlistener created');

}else{
  outputTextElement('sensorstatus-acc','Cannot read acceleration-data. Please check your sensor-permissions in settings before reloading the page');
}

//----------------------------------------------------------------------
setVideoStream();

