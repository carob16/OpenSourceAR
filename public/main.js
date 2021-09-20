//import {*} from "../js/sensorDetection.js"

//-------------------EVENTS-------------------------------------

window.addEventListener('deviceorientation', handleOrientation, true);
window.addEventListener('devicemotion', handleMotion, true);

// ----------------FUNCTIONS-------------------------------

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
