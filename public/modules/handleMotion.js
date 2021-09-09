//using the data from Accelerometer to get vel and measure travel distance
function handleMotion(event) {
  var xAcc = event.acceleration.x;
  var yAcc = event.acceleration.y;
  var zAcc = event.acceleration.z;
  var dt = event.interval;
  var xVel, yVel, zVel, xDistance, yDistance, zDistance;

  outputTextElement('dt', `dt : ${fixedNumber(dt)}\n`);

  outputTextElement('xAcc', `xAcc : ${fixedNumber(xAcc)}\n`);
  outputTextElement('yAcc', `yAcc: ${fixedNumber(yAcc)}\n`);
  outputTextElement('zAcc', `zAcc: ${fixedNumber(zAcc)}\n`);

  //Calibrating the zero-offset of the acceleration
  if (calibrationCount <= calibCount) {
    zumAccX.unshift(xAcc);
    zumAccY.unshift(yAcc);
    zumAccZ.unshift(zAcc);
    calibrationCount++;

    outputTextElement(
      'calibration',
      `Calibration started : ${calibrationCount}`
    );

    if (calibrationCount >= calibCount) {
      outputTextElement(
        'inside function',
        `inside function: ${calibrationCount}`
      );
      tmpArraySum = sumArray(zumAccX);
      zeroAccelerationX = tmpArraySum / zumAccX.length;

      tmpArraySum = sumArray(zumAccY);
      zeroAccelerationY = tmpArraySum / zumAccY.length;

      tmpArraySum = sumArray(zumAccZ);
      zeroAccelerationZ = tmpArraySum / zumAccZ.length;

      outputTextElement(
        'calibration',
        `Calibration completed : ${calibrationCount}`
      );
      outputTextElement(
        'zeroAccelerationX',
        `zeroAccelerationX : ${zeroAccelerationX}`
      );
      outputTextElement(
        'zeroAccelerationY',
        `zeroAccelerationY : ${zeroAccelerationY}`
      );
      outputTextElement(
        'zeroAccelerationZ',
        `zeroAccelerationZ : ${zeroAccelerationZ}`
      );
    }
  } else {
    //Retracting the zeroAcceleration offset
    xAcc -= zeroAccelerationX;
    yAcc -= zeroAccelerationY;
    zAcc -= zeroAccelerationZ;

    //Adding a low-pass filter of the acceleration
    // if (lowPassArrayX.length < lowPassLenght) {
    //   lowPassArrayX.unshift(xAcc);
    // } else {
    //   lowPassArrayX.pop();
    //   lowPassArrayX.unshift(xAcc);
    // }
    // if (lowPassArrayY.length < lowPassLenght) {
    //   lowPassArrayY.unshift(yAcc);
    // } else {
    //   lowPassArrayY.pop();
    //   lowPassArrayY.unshift(yAcc);
    // }
    // if (lowPassArrayZ.length < lowPassLenght) {
    //   lowPassArrayZ.unshift(zAcc);
    // } else {
    //   lowPassArrayZ.pop();
    //   lowPassArrayZ.unshift(zAcc);
    // }

    //integrating the acc to get vel
    xVel = currentVelX + (prevAccX * dt + (Math.abs(prevAccX - xAcc) / 2) * dt); // * accDirectionX;
    yVel = currentVelY + (prevAccY * dt + (Math.abs(prevAccY - yAcc) / 2) * dt); // * accDirectionY;
    zVel = currentVelZ + (prevAccZ * dt + (Math.abs(prevAccZ - zAcc) / 2) * dt); // * accDirectionZ;

    outputTextElement(
      'currentVelX',
      `currentVelX : ${fixedNumber(currentVelX)}\n`
    );
    outputTextElement('xVel', `xVel : ${fixedNumber(xVel)}\n`);
    outputTextElement('yVel', `yVel: ${fixedNumber(yVel)}\n`);
    outputTextElement('zVel', `zVel: ${fixedNumber(zVel)}\n`);

    //integrating the vel to get pos
    xDistance =
      prevPosX + (prevVelX * dt + (Math.abs(prevVelX - xVel) / 2) * dt); //*accDirectionX;
    yDistance =
      prevPosY + (prevVelY * dt + (Math.abs(prevVelY - yVel) / 2) * dt); //*accDirectionY;
    zDistance =
      prevPosZ + (prevVelZ * dt + (Math.abs(prevVelZ - zVel) / 2) * dt); //*accDirectionZ;

    //Update current velocity
    currentVelX = xVel;
    currentVelY = yVel;
    currentVelZ = zVel;

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
  }
}
