/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var fleegix = require('geddy-core/lib/fleegix');

var meta = new function () {
  this.registerConstructors = function (dirname, dirList) {
    var fileName, constructorName;
    var constructors = {};
    var jsPat = /\.js$/;

    // Dynamically create constructor constructors from files in constructors/
    for (var i = 0; i < dirList.length; i++) {
      fileName = dirList[i];
      // Any files ending in '.js' -- e.g., 'neil_pearts.js'
      if (jsPat.test(fileName)) {
        // Strip the '.js', e.g., 'neil_pearts'
        fileName = fileName.replace(jsPat, '');
        // Convert underscores to camelCase, e.g., 'neilPearts'
        constructorName = fleegix.string.camelize(fileName);
        // Capitalize the first letter, e.g., 'NeilPearts'
        constructorName = fleegix.string.capitalize(constructorName);
        // Registers as a constructor, e.g., constructors.NeilPearts =
        //    require('/path/to/geddy_app/<dirname>/neil_pearts').NeilPearts
        constructors[constructorName] = require(config.dirname +
            dirname + fileName)[constructorName];
      }
    }
    return constructors;
  };

}();

for (var p in meta) { this[p] = meta[p]; }
