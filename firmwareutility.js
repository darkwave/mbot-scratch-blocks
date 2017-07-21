var Avrgirl = require('avrgirl-arduino');

function listBoards() {
  Avrgirl.list(function(err, ports) {
    console.log(ports);
    /*
    [ { comName: '/dev/cu.usbmodem1421',
    	   manufacturer: 'Arduino (www.arduino.cc)',
        serialNumber: '55432333038351F03170',
        pnpId: '',
        locationId: '0x14200000',
        vendorId: '0x2341',
        productId: '0x0043',
        _standardPid: '0x0043' } ]
    */
  });
}

function uploadFirmware() {
  var avrgirl = new Avrgirl({
    board: 'uno',
    debug: true
  });

  avrgirl.flash('mbot_factory_firmware.ino.standard.hex', function (error) {
    if (error) {
      console.error(error);
    } else {
      console.info('done.');
    }
  });
}
