var currentlyGlowingStack = null;

Blockly.JavaScript['event_whenflagclicked'] = function(block) {
  var code = "currentMotorsSpeed = 150;\n";
  return code;
};
//var repeated = 0;

Blockly.JavaScript['control_repeat'] = function(block) {
      var value = parseFloat(block.getChildren()[0].getFieldValue('NUM'));
      var substack = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
      var code = 'for (var i = 0; i < ' + value + '; i++)'+"\n"+'{'+"\n\t"+substack+"\n"+'}'+"\n";
      return code;
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
var tweenCounter = 0;

function stepCode(highlighting) {
  if (highlighting) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
  }
  else
    Blockly.JavaScript.STATEMENT_PREFIX = null;


  var code = "";
  for (i = 0; i < workspace.getTopBlocks().length; i++)
  if (workspace.getTopBlocks()[i].type === "event_whenflagclicked")
    code += Blockly.JavaScript.blockToCode(workspace.getTopBlocks()[i]);

  //Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);
  var intrepreterAvailable = false;
  try {
    myInterpreter = new Interpreter(code, initApi);
    intrepreterAvailable = true;
  } catch (e) {
    console.log("You are using eval() function consider using Interpreter\nhttps://developers.google.com/blockly/guides/app-integration/running-javascript#js_interpreter");
  } finally {
    if (intrepreterAvailable) {
      nextStep();
    } else {
      eval(code);
    }
  }
  workspace.highlightBlock(null);

  //workspace.highlightBlock(null);
}
/*
function runCode() {
var code = "";
repeated = 0;
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
  //console.log(code);

}

function getWaitTween(duration) {
  tweenCounter++;
  return `
    var tween${tweenCounter} = new TWEEN.Tween({delay:0})
      .to({delay: 1}, ${duration * 1000});
      lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
      `;

}

// var motorSpeed = 255;
//
// function getMotorsSpeed(newSpeed) {
//   tweenCounter++;
//
//   if (newSpeed === 'fast')
//     newSpeed = 255;
//     else if (newSpeed === 'medium')
//     newSpeed = 150;
//     else if (newSpeed === 'slow')
//     newSpeed = 100;
//
//   return `
//     var tween${tweenCounter} = new TWEEN.Tween().to(0, 100)
//       .onUpdate(function() {
//         motorSpeed = ${newSpeed};
//       })
//       ;
//
//       lastTween.chain(tween${tweenCounter}); lastTween = tween${tweenCounter};
//   `;
// }

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
  console.log("color tween " + tweenCounter);
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
*/
