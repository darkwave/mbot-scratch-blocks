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

'use strict';

goog.provide('Blockly.Blocks.defaultToolbox');

goog.require('Blockly.Blocks');

/**
 * @fileoverview Provide a default toolbox XML.
 */

Blockly.Blocks.defaultToolbox = '<xml id="toolbox-categories" style="display: none">' +
    '<category name="Events" colour="#ffee00" secondaryColour="#ffcc00">' +
        '<block id="green" type="event_whenflagclicked"></block>' +
        '<block type="mbot_whendistanceclose"></block>' +
        // '<block type="event_whenbroadcastreceived">' +
        // '<value name="CHOICE">' +
        // '<shadow type="dropdown_whenbroadcast">' +
        // '<field name="CHOICE">blue</field>' +
        // '</shadow>' +
        // '</value>' +
        // '</block>' +
        // '<block type="event_broadcast">' +
        // '<value name="CHOICE">' +
        // '<shadow type="dropdown_broadcast">' +
        // '<field name="CHOICE">blue</field>' +
        // '</shadow>' +
        // '</value>' +
        // '</block>' +
    '</category>' +
    '<category name="Control" colour="#ffcc00" secondaryColour="#ff9900">' +
        '<block type="control_forever"></block>' +
        '<block type="control_repeat">' +
        '<value name="TIMES">' +
        '<shadow type="math_whole_number">' +
        '<field name="NUM">4</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="control_stop"></block>' +
        '<block type="control_restart"></block>' +
        '<block type="control_wait">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
    '</category>' +
    '<category name="Looks" colour="#9966FF" secondaryColour="#855CD6">' +
        '<block type="mbot_setcolor">' +
        '<value name="CHOICE">' +
        '<shadow type="dropdown_mbot_setcolor">' +
        '<field name="CHOICE">mystery</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="mbot_nocolor"></block>'+
    '</category>'+
    '<category name="Motion" colour="#4C97FF" secondaryColour="#4280D7">' +
        '<block type="mbot_motorforward">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="mbot_motorbackward">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="mbot_motorclockwise">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="mbot_motorcounterclockwise">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="mbot_motorstop"></block>'+
        '<block type="mbot_motorspeed">' +
        '<value name="CHOICE">' +
        '<shadow type="dropdown_mbot_motorspeed">' +
        '<field name="CHOICE">fast</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<!--block type="mbot_whentilt">' +
        '<value name="CHOICE">' +
        '<shadow type="dropdown_mbot_whentilt">' +
        '<field name="CHOICE">forward</field>' +
        '</shadow>' +
        '</value>' +
        '</block-->' +
        '</category>' +
        '</xml>' +
        '<xml id="toolbox-simple" style="display: none">' +
        '<block type="event_whenflagclicked"></block>' +
        '<block type="event_whenbroadcastreceived">' +
        '<value name="CHOICE">' +
        '<shadow type="dropdown_whenbroadcast">' +
        '<field name="CHOICE">blue</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="event_broadcast">' +
        '<value name="CHOICE">' +
        '<shadow type="dropdown_broadcast">' +
        '<field name="CHOICE">blue</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="control_forever"></block>' +
        '<block type="control_repeat">' +
        '<value name="TIMES">' +
        '<shadow type="math_whole_number">' +
        '<field name="NUM">4</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
        '<block type="control_stop"></block>' +
        '<block type="control_wait">' +
        '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
        '<field name="NUM">1</field>' +
        '</shadow>' +
        '</value>' +
        '</block>' +
    '</xml>';
