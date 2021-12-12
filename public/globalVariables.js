var video = document.getElementById('video-background');
var container = document.getElementById('container');

//-----------EnableDisable statuses------------
var enableEdgeDetection = false;
var enableThreeLoader =false;
var enableAccelerometer =false;

//-----------DeviceOrientationcontrols and handleOrientation------------
var xPosRot, yPosRot, zPosRot;
var controls, alpha, beta, gamma;

//---handleMotion.js----------------
let csvData = 'Time,xAcc,xVel,xPos' + '\n';

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

//Calibration
var zumAccX = [],
  zumAccY = [],
  zumAccZ = [];
var calibrationCount = 0,
  calibCount = 20;
let zeroAccelerationX = 0,
  zeroAccelerationY = 0,
  zeroAccelerationZ = 0,
  accelerationScale = 0.0005,
  calibrateAcceleration = true;

var removeNoise = true;

//Directions
let xDir = 0,
  yDir = 0,
  zDir = 0;

//Threshold and lowpassfilter
let lowpassFilter = true;

let lowPassAccX = 0,
lowPassAccY = 0,
lowPassAccZ = 0,
lowPassLenght = 5;
let lowPassArrayX = [],
lowPassArrayY = [],
lowPassArrayZ = [],
  tmpArraySum = 0,
  accTreshold = 0.04;

let zeroCountX = 0,
  zeroCountY = 0,
  zeroCountZ = 0,
  zeroCountLimit = 3;

let timeArray = [0, 0],
  dt = 0;

  //OpenCV
  var openCvStatus = "Loading";
  var snapshotWitdh = 40;
  var snapshotHeight = 40;

  //Corner Detection

var clickX = 50;
var clickY = 50;
var corners = [];

  