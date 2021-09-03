//import {*} from "../js/sensorDetection.js"

//-------------------EVENTS-------------------------------------

window.addEventListener('deviceorientation', handleOrientation, true);
window.addEventListener('devicemotion', handleMotion, true);

// ----------------FUNCTIONS-------------------------------

function handleOrientation(event) {
  var x = event.beta; // In degree in the range [-180,180)
  var y = event.gamma; // In degree in the range [-90,90)
  var z = event.alpha; // In degree in the range [-90,90)
  let scaleY = 1; //garden.clientWidth / 2 / 20;
  let scaleX = 1; //garden.clientHeight / 2 / 20;
  //scaleY = scaleY.toFixed(2);
  //scaleX = scaleX.toFixed(2);

  y = y * scaleY;
  x = x * scaleX;

  xPosRot = x;
  yPosRot = y;
  zPosRot = z;

  //updatePosition();

  x = x.toFixed(1);
  y = y.toFixed(1);
  // z = z.toFixed(1);

  //print text
  outputTextElement('xPosRot', `xPosRot : ${x}\n`);
  outputTextElement('yPosRot', `yPosRot: ${y}\n`);
  outputTextElement('zPosRot', `zPosRot: ${z}\n`);
}

function handleMotion(event) {
  var xAcc = event.acceleration.x;
  var yAcc = event.acceleration.y;
  var zAcc = event.acceleration.z;

  outputTextElement('xAcc', `xAcc : ${xAcc}\n`);
  outputTextElement('yAcc', `yAcc: ${yAcc}\n`);
  outputTextElement('zAcc', `zAcc: ${zAcc}\n`);
}

//-----------------------------------------------------------
function outputTextElement(name, Text) {
  var div = document.getElementById('output');
  //console.log('Length: ' + div.children.length);
  //console.log(div);
  // console.log('Checking if ' + name + ' exists in ' + div.children);
  //console.log(document.getElementById(name));

  if (document.getElementById(name) == null) {
    const newParagraph = document.createElement('p');
    newParagraph.id = name;

    // adding content
    newParagraph.textContent = Text;
    div.appendChild(newParagraph);
  } else {
    var oldParagraph = document.getElementById(name);
    oldParagraph.textContent = Text;
  }
}
