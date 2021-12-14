//using the data from Accelerometer to get vel and measure travel distance
function handleMotion(event) {
  if(!enableAccelerometer){return;}else{

  if(event.acceleration.x == null){    
    outputTextElement('sensorstatus-acc',
    'sensorstatus-acc: cannot read sensor. Please allow this page to use "Motionsensors" in your website-settings');
    }else{
  outputTextElement('sensorstatus-acc','sensorstatus-acc: Reading');
  var xAcc = event.acceleration.x;
  var yAcc = event.acceleration.y;
  var zAcc = event.acceleration.z;

  //var dt = event.interval;
  var xVel, yVel, zVel, xDistance, yDistance, zDistance;

  //Calibrating the zero-offset of the acceleration
  if (calibrationCount <= calibCount + 1 && calibrateAcceleration) {
    zumAccX.unshift(xAcc);
    zumAccY.unshift(yAcc);
    zumAccZ.unshift(zAcc);
    calibrationCount++;

    // finding the "zeroAcceleration"
    if (calibrationCount >= calibCount ) {
      tmpArraySum = sumArray(zumAccX);
      zeroAccelerationX = tmpArraySum / zumAccX.length;

      tmpArraySum = sumArray(zumAccY);
      zeroAccelerationY = tmpArraySum / zumAccY.length;

      tmpArraySum = sumArray(zumAccZ);
      zeroAccelerationZ = tmpArraySum / zumAccZ.length;
    }
  } else {
    let t = new Date();

    if (timeArray.length >= 2) {
      timeArray.pop();
    }
    timeArray.unshift(t.getTime());

    //----------------------------------------------------
    //---------FLOATING CALIB----------------------------
    //---------------------------------------------------

    let dt = timeArray[0] - timeArray[1];
    dt= dt/1000;

    //Retracting the zeroAcceleration offset
    xAcc -= zeroAccelerationX;
    yAcc -= zeroAccelerationY;
    zAcc -= zeroAccelerationZ;

    //Adding a low-pass filter of the acceleration
    if(lowpassFilter==true){
    if (lowPassArrayX.length < lowPassLenght) {
      lowPassArrayX.unshift(xAcc);
    } else {
      lowPassArrayX.pop();
      lowPassArrayX.unshift(xAcc);
    }
    if (lowPassArrayY.length < lowPassLenght) {
      lowPassArrayY.unshift(yAcc);
    } else {
      lowPassArrayY.pop();
      lowPassArrayY.unshift(yAcc);
    }
    if (lowPassArrayZ.length < lowPassLenght) {
      lowPassArrayZ.unshift(zAcc);
    } else {
      lowPassArrayZ.pop();
      lowPassArrayZ.unshift(zAcc);
    }

    //finding the mean value of the last measurements stored in lowPassArray
    tmpArraySum = sumArray(lowPassArrayX);
    xAcc = tmpArraySum / lowPassArrayX.length;

    tmpArraySum = sumArray(lowPassArrayY);
    yAcc = tmpArraySum / lowPassArrayY.length;

    tmpArraySum = sumArray(lowPassArrayZ);
    zAcc = tmpArraySum / lowPassArrayZ.length;
  }

    //discard all accceleration data that is between a low threshold - noise
    if(removeNoise){
    if (Math.abs(xAcc) <= accTreshold) {
      xAcc = 0;
    }
    if (Math.abs(yAcc) <= accTreshold) {
      yAcc = 0;
    }
    if (Math.abs(zAcc) <= accTreshold) {
      zAcc = 0;
    }
}
    //Discarding all accelerations that is noise/drift
  if(ZeroCountFilter){
    if (xAcc == prevAccX) {
      zeroCountX++;
      if (zeroCountX >= zeroCountLimit) {
        xAcc = 0;
      }
    } else {
      zeroCountX = 0;
    }
  }
    //set direction from the acceleration

    if (xAcc == 0) {
      xDir = 0;
    } else if(xAcc<0){
      xDir = -1;
    }else{
      xDir = 1;
    }
    if (yAcc == 0) {
      yDir = 0;
    } else if(yAcc<0){
      yDir = -1;
    }else{
    yDir = 1;
  }
    if (zAcc == 0) {
      zDir = 0;
    } else if(zAcc<0){
      zDir = -1;
    }else{
      zDir = 1;
    }
    


    //Set velocity to zero if acceleration is zero for a period of time
  if(ZeroCountFilter){
    if (xAcc == 0) {
      zeroCountX++;

      if (zeroCountX >= zeroCountLimit) {
        xVel = 0;
        prevVelX = 0;
      }
    } else {
      zeroCountX = 0;
    }
    if (yAcc == 0) {
      zeroCountY++;

      if (zeroCountY >= zeroCountLimit) {
        yVel = 0;
        prevVelY = 0;
      }
    } else {
      zeroCountY = 0;
    }
    if (zAcc == 0) {
      zeroCountZ++;

      if (zeroCountZ >= zeroCountLimit) {
        zVel = 0;
        prevVelZ = 0;
      }
    } else {
      zeroCountZ = 0;
    }
  }
    
    //integrating the acc to get vel
    xVel =
      prevVelX + prevAccX * dt + (Math.abs(xAcc - prevAccX) / 2) * dt * xDir;
    yVel =
      prevVelY + prevAccY * dt + (Math.abs(yAcc - prevAccY) / 2) * dt * yDir;
    zVel =
      prevVelZ + prevAccZ * dt + (Math.abs(zAcc - prevAccZ) / 2) * dt * zDir;

    //Check direction of current velocity

    if (xVel == 0) {
      xDir = 0;
    } else if(xVel<0){
      xDir = -1;
    }else{ xDir = 1;}

    if (yVel == 0) {
      yDir = 0;
    } else if(yVel<0){
      yDir = -1;
    }else{ yDir = 1;}

    if (zVel == 0) {
      zDir = 0;
    } else if(zVel<0){
      zDir = -1;
    }else{zDir=1};

    //integrating the vel to get pos
    xDistance =
      prevPosX + prevVelX * dt + (Math.abs(xVel - prevVelX) / 2) * dt * xDir;
    yDistance =
      prevPosY + prevVelY * dt + (Math.abs(yVel - prevVelY) / 2) * dt * yDir;
    zDistance =
      prevPosZ + prevVelZ * dt + (Math.abs(zVel - prevVelZ) / 2) * dt * zDir;


    //Storing data to the csvData[]
    let tmpData = [dt, xAcc,xVel,xDistance];
    csvData += tmpData.join(',');
    csvData += '\n';

    //store prev acceleration
    prevAccX = xAcc;
    prevAccY = yAcc;
    prevAccZ = zAcc;

    //store prev velocity
    prevVelX = xVel;
    prevVelY = yVel;
    prevVelZ = zVel;

    //store prev velocity
    prevPosX = xDistance;
    prevPosY = yDistance;
    prevPosZ = zDistance;

    outputTextElement('xDistance', `xDistance : ${fixedNumber(xDistance)}`);
    outputTextElement('yDistance', `yDistance: ${fixedNumber(yDistance)}`);
    outputTextElement('zDistance', `zDistance: ${fixedNumber(zDistance)}`);

    outputTextElement('xAcc', `xAcc : ${fixedNumber(xAcc)}`);
    outputTextElement('yAcc', `yAcc: ${fixedNumber(yAcc)}`);
    outputTextElement('zAcc', `zAcc: ${fixedNumber(zAcc)}`);

  }
}}}

function sumArray(arr) {
  let arraySum = 0;
  for (let i of arr) {
    arraySum += i;
  }
  return arraySum;
}
