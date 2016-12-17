var currentlyGlowingStack = null;

Blockly.JavaScript['event_whenflagclicked'] = function(block) {
  // TODO: Assemble JavaScript into code variable.

  var code = getGlowTween(block);
  return code;
};

Blockly.JavaScript['control_wait'] = function(block) {
  //var duration = Blockly.JavaScript.valueToCode(block, "DURATION", Blockly.JavaScript.ORDER_ATOMIC);
//var child = Blockly.JavaScript.statementToCode(block, 'DURATION');
//  console.log(block.inputList);
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  //console.log(block);
  //console.log(duration);
  var code = getWaitTween(duration);
  return code;
};

Blockly.JavaScript['wedo_motorclockwise'] = function(block) {
  //var duration = Blockly.JavaScript.valueToCode(block, "DURATION", Blockly.JavaScript.ORDER_ATOMIC);
//var child = Blockly.JavaScript.statementToCode(block, 'DURATION');
//  console.log(block.inputList);
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  //console.log(block);
  //console.log(duration);
  var code = getMotorsTween(1, -1, duration) + getMotorsTween(0, 0, 0.1);
  return code;
};

Blockly.JavaScript['wedo_motorcounterclockwise'] = function(block) {
  //var duration = Blockly.JavaScript.valueToCode(block, "DURATION", Blockly.JavaScript.ORDER_ATOMIC);
//var child = Blockly.JavaScript.statementToCode(block, 'DURATION');
//  console.log(block.inputList);
  var duration = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
  //console.log(block);
  //console.log(duration);
  var code = getMotorsTween(-1, 1, duration) + getMotorsTween(0, 0, 0.1);
  return code;
};

Blockly.JavaScript['wedo_motorspeed'] = function(block) {
  //var duration = Blockly.JavaScript.valueToCode(block, "DURATION", Blockly.JavaScript.ORDER_ATOMIC);
//var child = Blockly.JavaScript.statementToCode(block, 'DURATION');
//  console.log(block.inputList);
  var newSpeed = block.getChildren()[0].getFieldValue('CHOICE');
  var code = getMotorsSpeed(newSpeed);
  return code;
};


Blockly.JavaScript['dropdown_wedo_setcolor'] = function(block) {

  var value = block.getFieldValue("CHOICE");
  var code = value;
  return code;
};

//wedo_setcolor
Blockly.JavaScript['wedo_setcolor'] = function(block) {
  var value = Blockly.JavaScript.statementToCode(block, "CHOICE").trim();//, Blockly.JavaScript.ORDER_ADDITION);
  //var code = 'setLed(\'' + value + '\');' + "\n";
  var newR = 0;var newG = 0;var newB = 0;
  console.log(value);
  if (value === 'yellow') {
    newR = 255;
    newG = 100;
    newB = 0;
  } else if (value === 'mystery') {
    newR = Math.floor(Math.random() * 255);
    newG = Math.floor(Math.random() * 255);
    newB = Math.floor(Math.random() * 255);
  } else if (value === 'coral') {
    newR = 255;
    newG = 127;
    newB = 80;
  } else if (value === 'magenta') {
    newR = 255;
    newG = 0;
    newB = 255;
  }
  //tweenCounter++;
  //code = "var tween" + tweenCounter +" = new TWEEN.Tween({r: 0, g: 0, b: 0})
  //.to({ r: "+newR+", g: "+ newG + ", b: " + newB + " }, 1000).onUpdate(function() {  setLed(this.r,this.g,this.b);  }); lastTween.chain(tween" + tweenCounter +"); lastTween = tween" + tweenCounter +";";
  code = getColorTween(newR, newG, newB);
  return code;
}
var tweenCounter = 0;
function runCode() {
var code = "";
currentlyGlowingStack = null;
  for (i = 0; i < workspace.getTopBlocks().length; i++)
  if (workspace.getTopBlocks()[i].type === "event_whenflagclicked")
    code += Blockly.JavaScript.blockToCode(workspace.getTopBlocks()[i]);

  // We don't need all the workspace but only events connected blocks
  //var code = Blockly.JavaScript.workspaceToCode(workspace);
  tweenCounter = 0;
  //TODO workspace.glowBlock

  preCode = "var firstTween = new TWEEN.Tween(); var lastTween = firstTween;";
  postCode = `firstTween.start(); lastTween.onComplete(function() {
    if (currentlyGlowingStack != null)
      workspace.glowStack(currentlyGlowingStack, false);
  });`
  eval(preCode + code + postCode);

}

function getWaitTween(duration) {
  tweenCounter++;
  return `
    var tween${tweenCounter} = new TWEEN.Tween({delay:0})
      .to({delay: 1}, ${duration * 1000});
      lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
      `;

}

var motorSpeed = 255;

function getMotorsSpeed(newSpeed) {
  tweenCounter++;

  if (newSpeed === 'fast')
    newSpeed = 255;
    else if (newSpeed === 'medium')
    newSpeed = 150;
    else if (newSpeed === 'slow')
    newSpeed = 50;

  return `
    var tween${tweenCounter} = new TWEEN.Tween().to(0, 100)
      .onUpdate(function() {
        motorSpeed = ${newSpeed};
      })
      ;

      lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
  `;
}

function getMotorsTween(l, r, duration) {
  tweenCounter++;
  //l *= motorSpeed;
  //r *= motorSpeed;
  return `
    var tween${tweenCounter} = new TWEEN.Tween({l: ${l}, r: ${r}})
      .to({l: ${l}, r: ${r}}, ${duration * 1000})
      .onUpdate(function() {
        setMotors(this.l * motorSpeed, this.r * motorSpeed);
      })
      ;

      lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
  `;
}

function getColorTween(r, g, b) {
  tweenCounter++;
  return `
    var tween${tweenCounter} = new TWEEN.Tween({r: 0, g: 0, b: 0})
      .to({r: ${r}, g: ${g}, b: ${b}}, 1000)
      .onUpdate(function() {
        setLed(this.r,this.g,this.b);
      });

      lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
  `;
}

function getGlowTween(block) {
  tweenCounter++;
  return `
  var tween${tweenCounter} = new TWEEN.Tween()
  .onStart(function() {
    if (currentlyGlowingStack != null)
      workspace.glowStack(currentlyGlowingStack, false);

    currentlyGlowingStack = "${block.id}";
    workspace.glowStack("${block.id}", true);
    });
  lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
`;
}
