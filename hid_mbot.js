
var HID = require('node-hid');
var device;
//TODO put inside green flag code inizialization for this and other vars
const defaultMotorsSpeed = 150;
var currentMotorsSpeed = defaultMotorsSpeed;//var devices = HID.devices();
connectDongle();
//console.log(devices);
// var currentPath = "";
// for (i=0; i < devices.length; i++) {
//   console.log(devices[i].product + devices[i].path);
//   currentPath = devices[i].path;
// }
function connectDongle() {
  try {
    device = new HID.HID("1046", "65535");
  } catch (error) {
    console.log(error);
    alert("Please attach mBot dongle and press OK\n");
    connectDongle();
  }

  try {
    //var currentColor = [0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, 255, 150, 0];
    //device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, 0, 0]);
    //device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, 0, 0]);
    //device.write(currentColor);
    setLed("white");

    device.on("data", function(data) {
      //console.log("data", data);
      //device.write([0, 7, 0xff, 0x55, 0x04, 0x60, 0x01, 0x11, 0x02]);
    });

    device.on("error", function(error) {
      console.log("error:" + error);
    });
  } catch(error) {
    //TODO implement attach/detach using try/catch on every device.write call
    alert("Please turn on your mBot and try again");
    connectDongle();
  }
}
  //console.log(device);


function setLed(value) {
  var newR = 0;var newG = 0;var newB = 0;
  //console.log(value);
  if (value === 'yellow') {
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
  try {
    device.write([0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, newR, newG, newB]);
  } catch (e) {
    //TODO implement generic errors check
    console.log(e);
  } finally {

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
  console.log("new motor speed is " + speed);
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
    device.write([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, left_low, left_high]);
    device.write([0, 9, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, right_low, right_high]);

  } catch (e) {
    alert("Please turn on your mBot and try again");
    connectDongle();
  } finally {

  }
  //ff 55 06 60 02 0a 09 ff 00 left motor
  //ff 55 06 60 02 0a 0a ff 00 right motor
  //console.log(left + ',' + right);

}
