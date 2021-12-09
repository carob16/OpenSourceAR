//import {*} from "../js/sensorDetection.js"

//-------------------EVENTS-------------------------------------
// var cornerMat = new cv.Mat();
let accelerometer = null;
let gyroscope = null;

try{
//window.addEventListener('deviceorientation', handleOrientation, true);
//window.addEventListener('devicemotion', handleMotion, true);
accelerometer = new Accelerometer({ referenceFrame: 'device' });
gyroscope = new Gyroscope();
    accelerometer.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
          outputTextElement('sensorstatus-acc','Please check your sensor-permissions in settings before reloading the page');
            // Branch to code for requesting permission.
        } else if (event.error.name === 'NotReadableError' ) {
            console.log('Cannot connect to the accelerometer.');
            outputTextElement('sensorstatus-acc','Cannot connect to the accelerometer.');
        }
    });
    gyroscope.addEventListener('error', event => {
      // Handle runtime errors.
      if (event.error.name === 'NotAllowedError') {
        outputTextElement('sensorstatus-gyro','Please check your sensor-permissions in settings before reloading the page');
      } else if (event.error.name === 'NotReadableError' ) {
          console.log('Cannot connect to the gyroscope sensor.');
          outputTextElement('sensorstatus-gyro','Cannot connect to the gyroscope.');
      }
  });

    accelerometer.addEventListener('reading', handleMotion, true);
   gyroscope.addEventListener('reading', handleOrientation, true);
    accelerometer.start();
    gyroscope.start();
}catch(error){
  if (error.name === 'SecurityError') {
    // See the note above about feature policy.
    console.log('Sensor construction was blocked by a feature policy.');
} else if (error.name === 'ReferenceError') {
    console.log('Sensor is not supported by the User Agent.');
} else {
    throw error;
}
}

var edgeDetectionCanvasDiv = document.getElementById('output'); 
//edgeDetectionCanvasDiv.addEventListener('mousemove', function getMousePosition(e){console.log(e.clientX, e.clientY);}, true);
edgeDetectionCanvasDiv.addEventListener('click', function getSquarePosition(e){
  detectCorner(e.clientX, e.clientY);}, true);
// document.getElementById("slider_1").addEventListener("change", "onSliderChange()");
// document.getElementById("slider_2").addEventListener("change", "onSliderChange()");
// document.getElementById("slider_3").addEventListener("change", "onSliderChange()");

// ----------------FUNCTIONS-------------------------------

function detectCorner(eX,eY){
clickX = eX;
clickY = eY;
//edgeDetection();
  
}


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

function fixedNumber(number) {
  if (number != null) {
    number = number.toFixed(4);
  }
  return number;
}

function downloadCSV(filename) {
  console.log('buttin clicked');
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

