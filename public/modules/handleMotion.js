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
  if (calibrationCount <= calibCount + 1) {
    zumAccX.unshift(xAcc);
    zumAccY.unshift(yAcc);
    zumAccZ.unshift(zAcc);
    calibrationCount++;

    outputTextElement(
      'calibration',
      `Calibration started - calibrationCount: ${calibrationCount}, zumAccX: ${zumAccX.length}`
    );
    //calibCount
    if (zumAccX.length == calibCount) {
      tmpArraySum = sumArray(zumAccX);
      zeroAccelerationX = tmpArraySum / zumAccX.length;

      tmpArraySum = sumArray(zumAccY);
      zeroAccelerationY = tmpArraySum / zumAccY.length;

      tmpArraySum = sumArray(zumAccZ);
      zeroAccelerationZ = tmpArraySum / zumAccZ.length;

      outputTextElement(
        'calibrationCompleted',
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
    // finding the "zeroAcceleration"

    //Retracting the zeroAcceleration offset
    xAcc -= zeroAccelerationX;
    yAcc -= zeroAccelerationY;
    zAcc -= zeroAccelerationZ;

    //Adding a low-pass filter of the acceleration
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

    //discard all accceleration data that is between a low threshold - noise
    if (Math.abs(xAcc) <= accTreshold) {
      xAcc = 0;
    }
    if (Math.abs(yAcc) <= accTreshold) {
      yAcc = 0;
    }
    if (Math.abs(zAcc) <= accTreshold) {
      zAcc = 0;
    }

    //set direction from the velocity

    if (currentVelX >= 0) {
      accDirectionX = 1;
      outputTextElement('accDirectionX', `accDirectionX: ${accDirectionX}`);
    } else if (currentVelX < 0) {
      accDirectionX = -1;
      outputTextElement('accDirectionX', `accDirectionX: ${accDirectionX}`);
    }
    if (currentVelY >= 0) {
      accDirectionY = 1;
      outputTextElement('accDirectionY', `accDirectionY: ${accDirectionY}`);
    } else if (currentVelY < 0) {
      accDirectionY = -1;
      outputTextElement('accDirectionY', `accDirectionY: ${accDirectionY}`);
    }
    if (currentVelZ >= 0) {
      accDirectionZ = 1;
      outputTextElement('accDirectionZ', `accDirectionZ: ${accDirectionZ}`);
    } else if (currentVelZ < 0) {
      accDirectionZ = -1;
      outputTextElement('accDirectionZ', `accDirectionZ: ${accDirectionZ}`);
    }

    //integrating the acc to get vel
    xVel =
      currentVelX +
      (prevAccX * dt + (Math.abs(prevAccX - xAcc) / 2) * dt) * accDirectionX;
    yVel =
      currentVelY +
      (prevAccY * dt + (Math.abs(prevAccY - yAcc) / 2) * dt) * accDirectionY;
    zVel =
      currentVelZ +
      (prevAccZ * dt + (Math.abs(prevAccZ - zAcc) / 2) * dt) * accDirectionZ;

    outputTextElement(
      'currentVelX',
      `currentVelX : ${fixedNumber(currentVelX)}\n`
    );
    outputTextElement('xVel', `xVel : ${fixedNumber(xVel)}`);
    outputTextElement('yVel', `yVel: ${fixedNumber(yVel)}`);
    outputTextElement('zVel', `zVel: ${fixedNumber(zVel)}`);

    //Set velocity to zero if acceleration is zero for a period of time
    if (xAcc == 0) {
      zeroCountX++;

      if (zeroCountX >= zeroCountLimit) {
        xVel = 0;
        outputTextElement(
          'zeroCountX',
          `xVel is set to zero due to count limit`
        );
      }
    } else {
      zeroCountX = 0;
      outputTextElement('zeroCountX', ' ');
    }
    if (yAcc == 0) {
      zeroCountY++;

      if (zeroCountY >= zeroCountLimit) {
        yVel = 0;
        outputTextElement(
          'zeroCountY',
          `yVel is set to zero due to count limit`
        );
      }
    } else {
      zeroCountY = 0;
      outputTextElement('zeroCountY', ' ');
    }
    if (zAcc == 0) {
      zeroCountZ++;

      if (zeroCountZ >= zeroCountLimit) {
        zVel = 0;
        outputTextElement(
          'zeroCountZ',
          `zVel is set to zero due to count limit`
        );
      }
    } else {
      zeroCountZ = 0;
      outputTextElement('zeroCountZ', ' ');
    }

    //integrating the vel to get pos
    xDistance =
      prevPosX +
      (prevVelX * dt + (Math.abs(prevVelX - xVel) / 2) * dt) * accDirectionX;
    yDistance =
      prevPosY +
      (prevVelY * dt + (Math.abs(prevVelY - yVel) / 2) * dt) * accDirectionY;
    zDistance =
      prevPosZ +
      (prevVelZ * dt + (Math.abs(prevVelZ - zVel) / 2) * dt) * accDirectionZ;

    outputTextElement('xDistance', `xDistance : ${fixedNumber(xDistance)}`);
    outputTextElement('yDistance', `yDistance: ${fixedNumber(yDistance)}`);
    outputTextElement('zDistance', `zDistance: ${fixedNumber(zDistance)}`);

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

function sumArray(arr) {
  let arraySum = 0;
  for (let i of arr) {
    arraySum += i;
  }
  return arraySum;
}
