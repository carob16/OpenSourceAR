function handleOrientation(event) {
  if(event.beta == null){    
  outputTextElement('sensorstatus-magno','sensorstatus-magno: Cannot read sensor. Please allow this page to use motionsensors in your website-settings'); 
  }else{outputTextElement('sensorstatus-magno','sensorstatus-magno: Reading');
  var x = event.beta; // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  var z = event.alpha; // In degree in the range [-90,90]
  let DegToRad = Math.PI / 180;

  //print text
  outputTextElement('xPosRot', `xPosRot : ${fixedNumber(x)}\n`);
  outputTextElement('yPosRot', `yPosRot: ${fixedNumber(y)}\n`);
  outputTextElement('zPosRot', `zPosRot: ${fixedNumber(z)}\n`);

  y = y * DegToRad;
  x = x * DegToRad;
  z = z * DegToRad;

  xPosRot = x;
  yPosRot = y;
  zPosRot = z;
}}
