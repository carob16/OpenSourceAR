var edgeDetectionCanvasDiv = document.getElementById('output'); 
//edgeDetectionCanvasDiv.addEventListener('mousemove', function getMousePosition(e){console.log(e.clientX, e.clientY);}, true);
edgeDetectionCanvasDiv.addEventListener('click', function (e){
  clickX = e.clientX;
  clickY = e.clientY;

  if(corners.length<=3){

    var object ={};
    object.x =clickX;
    object.y =clickY;
    object.id = "snapshot_"+corners.length;

    var snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.id = "snapshot_"+corners.length;
    snapshotCanvas.style.position = "fixed";
    snapshotCanvas.style.border = "red 1px";
    snapshotCanvas.width = snapshotWitdh ;
    snapshotCanvas.height = snapshotHeight ;
    snapshotCanvas.style.left = clickX-snapshotWitdh/2 + "px";
    snapshotCanvas.style.top = clickY-snapshotHeight/2 + "px";
    // smallCanvas.style.overflow = "hidden";
    document.body.appendChild(snapshotCanvas);
    corners.push(object);
    }
});
// document.getElementById("slider_1").addEventListener("change", "onSliderChange()");
// document.getElementById("slider_2").addEventListener("change", "onSliderChange()");
// document.getElementById("slider_3").addEventListener("change", "onSliderChange()");

// ----------------FUNCTIONS-------------------------------

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

//-------------------EVENTS-------------------------------------
//DeviceOrientationEvent
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
  outputTextElement('sensorstatus-gyro','sensorstatus-gyro: Eventlistener created');
}else{
  outputTextElement('sensorstatus-gyro','Cannot read DeviceOrientation-data. Please check your sensor-permissions in settings before reloading the page');
}
//DeviceMotionEvent
if(window.DeviceMotionEvent){
  window.addEventListener('devicemotion', handleMotion, true);
  outputTextElement('sensorstatus-acc','sensorstatus-acc: Eventlistener created');

}else{
  outputTextElement('sensorstatus-acc','Cannot read DeviceMotion-data. Please check your sensor-permissions in settings before reloading the page');
}
