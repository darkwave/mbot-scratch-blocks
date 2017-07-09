/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview mbot blocks for Scratch (Horizontal)
 * @author dw@mondonerd.com <Massimo Avvisati>
 */
'use strict';

goog.provide('Blockly.Blocks.mbot');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['dropdown_mbot_setcolor'] = {
  /**
   * Block for set color drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu([
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_mystery.svg',
              value: 'mystery', width: 48, height: 48, alt: 'Mystery'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_yellow.svg',
              value: 'yellow', width: 48, height: 48, alt: 'Yellow'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_orange.svg',
            value: 'orange', width: 48, height: 48, alt: 'Orange'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_coral.svg',
            value: 'coral', width: 48, height: 48, alt: 'Coral'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_magenta.svg',
            value: 'magenta', width: 48, height: 48, alt: 'Magenta'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_purple.svg',
            value: 'purple', width: 48, height: 48, alt: 'Purple'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_blue.svg',
            value: 'blue', width: 48, height: 48, alt: 'Blue'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_green.svg',
            value: 'green', width: 48, height: 48, alt: 'Green'},
          {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/set-led_white.svg',
              value: 'white', width: 48, height: 48, alt: 'White'}
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.looks.primary,
      Blockly.Colours.looks.secondary,
      Blockly.Colours.looks.tertiary
    );
  }
};

Blockly.Blocks['mbot_setcolor'] = {
  /**
   * Block to set color of LED
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_setcolor",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/set-led_blue.svg",
          "width": 40,
          "height": 40,
          "alt": "Set LED Color"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};

Blockly.Blocks['mbot_nocolor'] = {
  /**
   * Block to set color of LED
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_nocolor",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/no-color.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn off LED"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": Blockly.Colours.looks.primary,
      "colourSecondary": Blockly.Colours.looks.secondary,
      "colourTertiary": Blockly.Colours.looks.tertiary
    });
  }
};


Blockly.Blocks['mbot_motorforward'] = {
  /**
   * Block to go forward.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_motorforward",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_motor-forward.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['mbot_motorbackward'] = {
  /**
   * Block to go forward.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_motorbackward",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_motor-backward.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};


Blockly.Blocks['mbot_motorclockwise'] = {
  /**
   * Block to spin motor clockwise.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_motorclockwise",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_motor-clockwise.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['mbot_motorcounterclockwise'] = {
  /**
   * Block to spin motor counter-clockwise.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_motorcounterclockwise",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_motor-counterclockwise.svg",
          "width": 40,
          "height": 40,
          "alt": "Turn motor counter-clockwise"
        },
        {
          "type": "input_value",
          "name": "DURATION",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['dropdown_mbot_motorspeed'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu([
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/mbot_motor-speed_slow.svg',
              value: 'slow', width: 48, height: 48, alt: 'Slow'},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/mbot_motor-speed_med.svg',
              value: 'medium', width: 48, height: 48, alt: 'Medium'},
            {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/mbot_motor-speed_fast.svg',
              value: 'fast', width: 48, height: 48, alt: 'Fast'}
        ]), 'CHOICE');
    this.setOutput(true);
    this.setColour(Blockly.Colours.motion.primary,
      Blockly.Colours.motion.secondary,
      Blockly.Colours.motion.tertiary
    );
  }
};

Blockly.Blocks['mbot_motorspeed'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_motorspeed",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_motor-speed_fast.svg",
          "width": 40,
          "height": 40,
          "alt": "Motor Speed"
        },
        {
          "type": "input_value",
          "name": "CHOICE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.motion,
      "colour": Blockly.Colours.motion.primary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary
    });
  }
};

Blockly.Blocks['mbot_whendistanceclose'] = {
  /**
   * TODO implement this
   * Block for when distance sensor is close.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "mbot_whendistanceclose",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/mbot_when-distance_close.svg",
          "width": 40,
          "height": 40,
          "alt": "When distance close"
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "category": Blockly.Categories.event,
      "colour": Blockly.Colours.event.primary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary
    });
  }
};
