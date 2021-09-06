//import {*} from "../js/sensorDetection.js"

//-------------------EVENTS-------------------------------------

window.addEventListener('deviceorientation', handleOrientation, true);
window.addEventListener('devicemotion', handleMotion, true);

// ----------------FUNCTIONS-------------------------------

function handleMotion(event) {
  var xAcc = event.acceleration.x;
  var yAcc = event.acceleration.y;
  var zAcc = event.acceleration.z;

  outputTextElement('xAcc', `xAcc : ${fixedNumber(xAcc)}\n`);
  outputTextElement('yAcc', `yAcc: ${fixedNumber(yAcc)}\n`);
  outputTextElement('zAcc', `zAcc: ${fixedNumber(zAcc)}\n`);
}

//-----------------------------------------------------------
function outputTextElement(name, Text) {
  //console.log('Length: ' + div.children.length);
  //console.log(div);
  // console.log('Checking if ' + name + ' exists in ' + div.children);
  //console.log(document.getElementById(name));

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
    number = number.toFixed(3);
  }
  return number;
}
