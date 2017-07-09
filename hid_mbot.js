
var HID = require('node-hid');
var device;

//TODO put inside green flag code inizialization for this and other vars
const defaultMotorsSpeed = 150;
var distance = 400;
var lineFollower = 0;
var currentMotorsSpeed = defaultMotorsSpeed;
var lastDataReceived;

function checkConnection() {

  if (device == null) {
    document.getElementById("runBox").style.display = "none";
    document.getElementById("errorBox").style.display = "block";

    document.getElementById("connectionStatus").src = "media/connection_error.png";

    try {
      connectDongle();
    } catch (e) {
      console.log(e)
    } finally {

    }

  } else {
    document.getElementById("runBox").style.display = "block";
    document.getElementById("errorBox").style.display = "none";

    document.getElementById("connectionStatus").src = "media/connection_idle.png";
      //getDistanceSensor();
      //getLineFollowSensor();
  }
  //console.log(Date.now() - lastDataReceived);
  //
  // if (Date.now() - lastDataReceived > 1000) {
  //
  //   document.getElementById("robotStatus").src = "media/robot_error.png";
  // } else {
  //   document.getElementById("robotStatus").src = "media/robot.png";
  // }

  window.setTimeout(checkConnection, 1000);
}

function startRobotConnection() {
  checkConnection();
  updateSensors();
}

function updateSensors() {
  getLineFollowSensor();
  getDistanceSensor();
}

document.addEventListener("DOMContentLoaded", startRobotConnection);

//var devices = HID.devices();
//console.log(devices);
// var currentPath = "";
// for (i=0; i < devices.length; i++) {
//   console.log(devices[i].product + devices[i].path);
//   currentPath = devices[i].path;
// }
function connectDongle() {
  try {
    device = new HID.HID("1046", "65535");

    device.on("data", function(data) {
      if (data[3] == 0)
        return;

      var hasData = false;
      for (var i = 0; i < data.length; i++) {
        if (data[i] != 0)
        hasData = true;
      }

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
      //console.log(data[3] + ":" + num);



      //result = (( data[5] << 24 ) | ( data[6] << 16 ) | ( data[7] << 8 ) | data[8]);
      // if (hasData){
      //   console.log(response);
      // console.log("Result:" + result);
      //}
      //
      //   //  if (result > 0)
      //   //  console.log(result);
      //    //

      //}
    });

    device.on("error", function(error) {
      device = null;
    });

  } catch (error) {
    console.log(error);
    //alert("Please attach mBot dongle and press OK\n");
    //connectDongle();
    //device = null;

    throw 'Error dongle not connected';
  }

  //var currentColor = [0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, 255, 150, 0];
  //device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, 0, 0]);
  //device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, 0, 0]);
  //device.write(currentColor);




}
  //console.log(device);
// function getLightSensor() {
//   //console.log("Reading light sensor!");
//   try {
//     //ff 55 04 60 01 11 02
//     sendToRobot([0, 7 ,0xff, 0x55, 0x04, 0x60, 0x01, 0x11, 0x02]);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     //window.setTimeout(getLightSensor, 1000);
//   }
// }

function getDistanceSensor() {
  //console.log("Reading distance sensor!");
  try {
    //ff 55 04 02 01 01 03
    sendToRobot([0, 7 ,0xff, 0x55, 0x04, 0x02, 0x01, 0x1, 0x03]);
    // console.log(device.readSync());
  } catch (e) {

  } finally {
    window.setTimeout(getDistanceSensor, 200);
  }
}

function getLineFollowSensor() {
  //console.log("Reading distance sensor!");
  try {
    //ff 55 04 60 01 11 02
    sendToRobot([0, 7 ,0xff, 0x55, 0x04, 0x60, 0x01, 0x11, 0x02]);
    // console.log(device.readSync());
  } catch (e) {

  } finally {
    window.setTimeout(getLineFollowSensor, 200);
  }
}


function setLed(value) {
  var newR = 0;var newG = 0;var newB = 0;
  //console.log(value);
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
  //  device.write([0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, newR, newG, newB]);
  sendToRobot([0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, newR, newG, newB]);
}

function sendToRobot(command) {
  if (device == null) {
    stopInterpreter();
    return;
  }
  try {
    device.write(command);
  } catch (e) {
    alert("Control that your robot is turned on and retry!");
    stopInterpreter();
    console.log("Sending error: " + e);
  }
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
  try {
    sendToRobot([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, left_low, left_high]);
    sendToRobot([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, right_low, right_high]);

  } catch (e) {

    device = null;
  } finally {

  }
  //ff 55 06 60 02 0a 09 ff 00 left motor
  //ff 55 06 60 02 0a 0a ff 00 right motor
  //console.log(left + ',' + right);

}
