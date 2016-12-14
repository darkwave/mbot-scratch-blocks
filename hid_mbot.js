
var HID = require('node-hid');
var devices = HID.devices();

//console.log(devices);
var currentPath = "";
for (i=0; i < devices.length; i++) {
  document.write(devices[i].product + devices[i].path);
  currentPath = devices[i].path;
}

var device = new HID.HID(currentPath);//"1046", "65535");
//console.log(device);
var currentColor = [0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, 255, 150, 0];
device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, 0, 0]);
device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, 0, 0]);
device.write(currentColor);
device.on("data", function(data) {
  //console.log("data", data);

  //device.write([0, 7, 0xff, 0x55, 0x04, 0x60, 0x01, 0x11, 0x02]);


});

device.on("error", function(error) {
  console.log("error:" + error);

});

function setLed(r,g,b) {
  device.write([0, 12, 0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, r, g, b]);
}


function setMotors(left, right) {
  left_low = left & 0xff;
  left_high = (left >> 8) & 0xff;

  right_low = right & 0xff;
  right_high = (right >> 8) & 0xff;
  device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x09, left_low, left_high]);
  device.write([0, 8, 0xff, 0x55, 0x06, 0x60, 0x02, 0x0a, 0x0a, right_low, right_high]);
  //ff 55 06 60 02 0a 09 ff 00 left motor
  //ff 55 06 60 02 0a 0a ff 00 right motor
  console.log([0, 8, 0xff, 0x55, 0x06, 0x02, 0x0a, 0x09, left_low, left_high]);

}
