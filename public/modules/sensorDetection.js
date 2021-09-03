function handleOrientation(event) {
  var x = event.beta; // In degree in the range [-180,180)
  var y = event.gamma; // In degree in the range [-90,90)
  var z = event.alpha; // In degree in the range [-90,90)
  let scaleY = garden.clientWidth / 2 / 20;
  let scaleX = garden.clientHeight / 2 / 20;
  scaleY = scaleY.toFixed(2);
  scaleX = scaleX.toFixed(2);

  y = y * scaleY;
  x = x * scaleX;

  xPosRot = x;
  yPosRot = y;
  zPosRot = z;

  updatePosition();

  x = x.toFixed(1);
  y = y.toFixed(1);
  z = z.toFixed(1);

  //print text
  output.textContent += `xPosRot : ${x}\n`;
  output.textContent += `yPosRot: ${y}\n`;
  output.textContent += `zPosRot: ${z}\n`;
}

//export { alpha, beta, gamma };
