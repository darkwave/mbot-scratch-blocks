var myInterpreter;
var waitStep = 0;
var glowingId = null;
function highlightBlock(id) {
  if (glowingId != null)
    workspace.glowBlock(glowingId, false);
  glowingId = id;
  workspace.glowBlock(id, true);
}

function wait(ms) {
  waitStep = ms;
}

/*
  Define your API for the Interpreter
  https://developers.google.com/blockly/guides/app-integration/running-javascript#js_interpreter
*/

function initApi(interpreter, scope) {
  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for "wait" blocks.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(wait(id));
  };
  interpreter.setProperty(scope, 'wait',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the alert() block.
  wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  wrapper = function(msg) {
    msg = msg ? msg.toString() : '';
    return interpreter.createPrimitive(prompt(msg));
  };
  interpreter.setProperty(scope, 'prompt',
      interpreter.createNativeFunction(wrapper));

      // Add an API function for the prompt() block.
      wrapper = function(colorName) {
        colorName = colorName ? colorName.toString() : '';
        return interpreter.createPrimitive(setLed(colorName));
      };
      interpreter.setProperty(scope, 'setLed',
          interpreter.createNativeFunction(wrapper));

}

function nextStep() {

  try {
    if (myInterpreter.step()) {
      window.setTimeout(nextStep, waitStep);
      waitStep = 0;
    } else {
      if (glowingId != null)
      workspace.glowBlock(glowingId, false);
    }
  } catch (e) {
    console.log(e);
  } finally {

  }


}
