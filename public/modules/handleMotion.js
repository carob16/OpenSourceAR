//using the data from Accelerometer to get vel and measure travel distance
function handleMotion(event) {
  var xAcc = event.acceleration.x;
  var yAcc = event.acceleration.y;
  var zAcc = event.acceleration.z;
  //var dt = event.interval;
  var xVel, yVel, zVel, xDistance, yDistance, zDistance;

  // outputTextElement('dt', `dt : ${fixedNumber(dt)}\n`);

  //Calibrating the zero-offset of the acceleration
  if (calibrationCount <= calibCount + 1 && calibrateAcceleration == 1) {
    zumAccX.unshift(xAcc);
    zumAccY.unshift(yAcc);
    zumAccZ.unshift(zAcc);
    calibrationCount++;

    outputTextElement(
      'calibration',
      `Calibration started - calibrationCount: ${calibrationCount}, zumAccX: ${zumAccX.length}`
    );
    // finding the "zeroAcceleration"
    if (calibrationCount >= calibCount) {
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
    let t = new Date();

    if (timeArray.length >= 2) {
      timeArray.pop();
    }
    timeArray.unshift(t.getTime());

    //----------------------------------------------------
    //---------FLOATING CALIB----------------------------
    //---------------------------------------------------

    let dt = timeArray[0] - timeArray[1];

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

    //Discarding all accelerations that is noise/drift
    if (xAcc == prevAccX) {
      zeroCuntX++;
      if (zeroCuntX >= zeroCountLimit) {
        xAcc = 0;
      }
    } else {
      zeroCuntX = 0;
    }

    //set direction from the acceleration

    if (xAcc >= 0) {
      xDir = 1;
      outputTextElement('xDir', `xDir: ${xDir}`);
    } else {
      xDir = -1;
      outputTextElement('xDir', `xDir: ${xDir}`);
    }
    if (yAcc >= 0) {
      yDir = 1;
      outputTextElement('yDir', `yDir: ${yDir}`);
    } else {
      yDir = -1;
      outputTextElement('yDir', `yDir: ${yDir}`);
    }
    if (zAcc >= 0) {
      zDir = 1;
      outputTextElement('zDir', `zDir: ${zDir}`);
    } else {
      zDir = -1;
      outputTextElement('zDir', `zDir: ${zDir}`);
    }

    //integrating the acc to get vel
    xVel =
      prevVelX + prevAccX * dt + (Math.abs(xAcc - prevAccX) / 2) * dt * xDir;
    yVel =
      prevVelY + prevAccY * dt + (Math.abs(yAcc - prevAccY) / 2) * dt * yDir;
    zVel =
      prevVelZ + prevAccZ * dt + (Math.abs(zAcc - prevAccZ) / 2) * dt * zDir;

    //Set velocity to zero if acceleration is zero for a period of time
    if (xAcc == 0) {
      zeroCountX++;

      if (zeroCountX >= zeroCountLimit) {
        xVel = 0;
        prevVelX = 0;
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
        prevVelY = 0;
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
        prevVelZ = 0;
        outputTextElement(
          'zeroCountZ',
          `zVel is set to zero due to count limit`
        );
      }
    } else {
      zeroCountZ = 0;
      outputTextElement('zeroCountZ', ' ');
    }

    //Check direction of current velocity

    if (xVel >= 0) {
      xDir = 1;
    } else {
      xDir = -1;
    }
    if (yVel >= 0) {
      yDir = 1;
    } else {
      yDir = -1;
    }
    if (zVel >= 0) {
      zDir = 1;
    } else {
      zDir = -1;
    }

    //integrating the vel to get pos
    xDistance =
      prevPosX + prevVelX * dt + (Math.abs(xVel - prevVelX) / 2) * dt * xDir;
    yDistance =
      prevPosY + prevVelY * dt + (Math.abs(yVel - prevVelY) / 2) * dt * yDir;
    zDistance =
      prevPosZ + prevVelZ * dt + (Math.abs(zVel - prevVelZ) / 2) * dt * zDir;

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

    //scaling to get readable numbers

    xDistance *= accelerationScale;
    yDistance *= accelerationScale;
    zDistance *= accelerationScale;

    outputTextElement('xDistance', `xDistance : ${fixedNumber(xDistance)}`);
    outputTextElement('yDistance', `yDistance: ${fixedNumber(yDistance)}`);
    outputTextElement('zDistance', `zDistance: ${fixedNumber(zDistance)}`);

    outputTextElement('xVel', `xVel : ${fixedNumber(xVel)}`);
    outputTextElement('yVel', `yVel: ${fixedNumber(yVel)}`);
    outputTextElement('zVel', `zVel: ${fixedNumber(zVel)}`);

    outputTextElement('xAcc', `xAcc : ${fixedNumber(xAcc)}`);
    outputTextElement('yAcc', `yAcc: ${fixedNumber(yAcc)}`);
    outputTextElement('zAcc', `zAcc: ${fixedNumber(zAcc)}`);

    //Storing data to the csvData[]
    let tmpData = [dt, xAcc];
    csvData += tmpData.join(',');
    csvData += '\n';
  }
}

function sumArray(arr) {
  let arraySum = 0;
  for (let i of arr) {
    arraySum += i;
  }
  return arraySum;
}
