
var HID = require('node-hid');
var device;

//TODO put inside green flag code inizialization for this and other vars
const defaultMotorsSpeed = 150;
var distance = 400;
var lineFollower = 0;
var currentMotorsSpeed = defaultMotorsSpeed;
var lastDataReceived;

var dongleConnected = false;

function checkHIDConnected() {
  var foundDongle = undefined;
  var devices = HID.devices();
  devices.forEach(function (hid) {
     if (hid.vendorId == '1046' && hid.productId == '65535') {
       foundDongle = hid.path;
     }
  });
  return foundDongle;
}

function checkConnection() {

  dongleConnected = checkHIDConnected();

  if (!dongleConnected || paused) {
    document.getElementById("runBox").style.display = "none";
    document.getElementById("errorBox").style.display = "block";

    document.getElementById("connectionStatus").src = "media/connection_error.png";

  } else {
    document.getElementById("runBox").style.display = "block";
    document.getElementById("errorBox").style.display = "none";

    document.getElementById("connectionStatus").src = "media/connection_idle.png";

  }

  if (dongleConnected && (device == null || device.path != dongleConnected))
      connectDongle(dongleConnected);


  window.setTimeout(checkConnection, 200);
}

function startRobotConnection() {
  checkConnection();

  window.setTimeout(updateSensors, 1000);
}

function updateSensors() {
  getLineFollowSensor();
  getDistanceSensor();
  setTimeout(updateSensors, 10);
}

document.addEventListener("DOMContentLoaded", startRobotConnection);

function readSensorsData(data) {

  if (data[3] == 0)
    return;

  paused = false;

  var reading =  [data[5], data[6], data[7], data[8]];

  // Create a buffer
  var buf = new ArrayBuffer(4);
  // Create a data view of it
  var view = new DataView(buf);

  // set bytes
  reading.forEach(function (b, i) {
    view.setUint8(i, b);
  });

  // Read the bits as a float; note that by doing this, we're implicitly
  // converting it from a 32-bit float into JavaScript's native 64-bit double
  var num = view.getFloat32(0, true);
  // Done
  if (data[3] == 2) {
    distance = num;
  } else if (data[3] == 96) {
    lineFollower = num;
  }
  if (distance < 7) {
    //Trigger short distance event
    console.log("short");
    //TODO remove interpreter control from here
    stepCode(true, true);
  }

}


function connectDongle(path) {
  try {
    device = new HID.HID(path);
    device.path = path;
    console.log(device.path);

    device.on("data", readSensorsData);

    device.on("error", function(error) {
      //device = null;
      console.log("Dongle unplugged?\n" + error)
    });

  } catch (error) {
    console.log(error);
  }
}
var paused = false;
function sendToRobot(command, asking) {
   if (paused)
     return;
  try {
    device.write(command);
  } catch (e) {
    paused = true;
    //alert("Control that your robot is turned on and retry!");
    stopInterpreter();
    if (asking)
      console.log("Receiving error: " + e);
    else
      console.log("Sending error: " + e);
  }
}

function getDistanceSensor() {
  sendToRobot([0, 7 ,0xff, 0x55, 0x04, 0x02, 0x01, 0x1, 0x03], true);
}

function getLineFollowSensor() {
  //ff 55 04 60 01 11 02
  sendToRobot([0, 7 ,0xff, 0x55, 0x04, 0x60, 0x01, 0x11, 0x02], true);
}


function setLed(value) {
  var newR = 0;var newG = 0;var newB = 0;
  if (value === 'black') {
    newR = 0;
    newG = 0;
    newB = 0;
  } else if (value === 'yellow') {
    newR = 255;
    newG = 255;
    newB = 0;
  } else if (value === 'orange') {
    newR = 255;
    newG = 100;
    newB = 0;
  } else if (value === 'purple') {
    newR = 128;
    newG = 0;
    newB = 128;
  } else if (value === 'blue') {
    newR = 0;
    newG = 0;
    newB = 255;
  } else if (value === 'green') {
    newR = 0;
    newG = 255;
    newB = 0;
  } else if (value === 'white') {
    newR = 255;
    newG = 255;
    newB = 255;
  } else if (value === 'coral') {
    newR = 255;
    newG = 30;
    newB = 100;
  } else if (value === 'magenta') {
    newR = 255;
    newG = 0;
    newB = 255;
  } else if (value === 'mystery') {
    newR = Math.floor(Math.random() * 255);
    newG = Math.floor(Math.random() * 255);
    newB = Math.floor(Math.random() * 255);
  }
  sendToRobot([0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, newR, newG, newB]);
}


function setMotorsSpeed(speed) {
  var newSpeed = 150;
  if (speed === 'fast')
    newSpeed = 255;
    else if (speed === 'medium')
    newSpeed = 150;
    else if (speed === 'slow')
    newSpeed = 100;

  currentMotorsSpeed = newSpeed;
}


function setMotors(left, right) {
  right *= -1;

  left *= currentMotorsSpeed;
  right *= currentMotorsSpeed;

  left_low = left & 0xff;
  left_high = (left >> 8) & 0xff;

  right_low = right & 0xff;
  right_high = (right >> 8) & 0xff;
  //ff 55 06 60 02 0a 09 ff 00 left motor
  //ff 55 06 60 02 0a 0a ff 00 right motor
  sendToRobot([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, left_low, left_high]);
  sendToRobot([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, right_low, right_high]);

}
