Blockly.JavaScript['event_whenflagclicked'] = function(block) {
  var code = "currentMotorsSpeed = 150;\n";
  return code;
};

Blockly.JavaScript['mbot_whendistanceclose'] = function(block) {

  var code = "//......\n";
  return code;
};
//var repeated = 0;

Blockly.JavaScript['control_repeat'] = function(block) {
      var value = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
      var substack = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
      var code = 'for (var i = 0; i < ' + value + '; i++)'+"\n"+'{'+"\n\t"+substack+"\n"+'}'+"\n";
      return code;
};

Blockly.JavaScript['control_forever'] = function(block) {
      //var value = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
      var substack = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
      var code = 'while (true)'+"\n"+'{'+"\n\t"+substack+"\n"+'}'+"\n";
      return code;
};



Blockly.JavaScript['control_stop'] = function(block) {
  var code = "stopInterpreter();\n";return code;
};

Blockly.JavaScript['control_wait'] = function(block) {
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  var code = "wait(" + duration + ");\n";return code;
};

Blockly.JavaScript['mbot_motorclockwise'] = function(block) {
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  var code = "setMotors(-1, 1);\nwait("+duration+");\nsetMotors(0, 0);\n";
  return code;
};

Blockly.JavaScript['mbot_motorforward'] = function(block) {
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  var code = "setMotors(-1, -1);\nwait("+duration+");\nsetMotors(0, 0);\n";
  return code;
};

Blockly.JavaScript['mbot_motorbackward'] = function(block) {
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  var code = "setMotors(1, 1);\nwait("+duration+");\nsetMotors(0, 0);\n";
  return code;
};

Blockly.JavaScript['mbot_motorcounterclockwise'] = function(block) {
    var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
    var code = "setMotors(1, -1);\nwait("+duration+");\nsetMotors(0, 0);\n";
    return code;
};

Blockly.JavaScript['mbot_motorstop'] = function(block) {
    var code = "setMotors(0, 0);\n";
    return code;
};

Blockly.JavaScript['mbot_motorspeed'] = function(block) {
  var newSpeed = block.getChildren()[0].getFieldValue('CHOICE');
  var code = "setMotorsSpeed(\""+newSpeed+"\");\n";
  return code;
};


Blockly.JavaScript['dropdown_mbot_setcolor'] = function(block) {

  var value = block.getFieldValue("CHOICE");
  var code = value;
  return code;
};

//mbot_setcolor
Blockly.JavaScript['mbot_setcolor'] = function(block) {
  var value = Blockly.JavaScript.statementToCode(block, "CHOICE").trim();//, Blockly.JavaScript.ORDER_ADDITION);
  //workaround to avoid syntax error injected by highlightBlock
  var pos = value.lastIndexOf("\n");

  code = "setLed(\""+value.slice(pos + 1).trim()+"\");\n";
  return code;
}

Blockly.JavaScript['control_restart'] = function(block) {
  code = "restart();\n";
  return code;
}

Blockly.JavaScript['mbot_nocolor'] = function(block) {
  code = "setLed(\"black\");\n";
  return code;
}

var eventTriggered = false;

function stepCode(highlighting, triggered) {

  if (eventTriggered && triggered)
  return;

  eventTriggered = triggered;
  //
  // if (highlighting) {
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  // } else {
  //   Blockly.JavaScript.STATEMENT_PREFIX = null;
  // }


  var code = "";
  var distanceFunction = "";

  for (i = 0; i < workspace.getTopBlocks().length; i++) {
    if (workspace.getTopBlocks()[i].type === "event_whenflagclicked")
      code += Blockly.JavaScript.blockToCode(workspace.getTopBlocks()[i]);
    else if (workspace.getTopBlocks()[i].type === "mbot_whendistanceclose")
      distanceFunction += Blockly.JavaScript.blockToCode(workspace.getTopBlocks()[i]);
  }

  if (eventTriggered && distanceFunction.length > 0) {
    code = distanceFunction;
  }




  myInterpreter = new Interpreter(code, initApi);
  resetTimeout();
  nextStep();

  workspace.highlightBlock(null);

}
