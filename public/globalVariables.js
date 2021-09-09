//-----------DeviceOrientationcontrols and handleOrientation------------
var xPosRot, yPosRot, zPosRot;
var controls, alpha, beta, gamma;

//---handleMotion.js----------------
var xAcc, yAcc, zAcc;
var currentVelX = 0,
  currentVelY = 0,
  currentVelZ = 0;
var prevAccX = 0,
  prevAccY = 0,
  prevAccZ = 0,
  prevVelX = 0,
  prevVelY = 0,
  prevVelZ = 0,
  prevPosX = 0,
  prevPosY = 0,
  prevPosZ = 0;

var zumAccX = [],
  zumAccY = [],
  zumAccZ = [];
var calibrationCount = 0,
  calibCount = 20;
let zeroAccelerationX = 0,
  zeroAccelerationY = 0,
  zeroAccelerationZ = 0;
