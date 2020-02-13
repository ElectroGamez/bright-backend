//Load/Start Logger
const Logger = require('./classes/Logger.js');
global.log = new Logger({level: 3}); // Show debug messages

//Load/Start Backend
const Bright = require('./classes/Bright.js');
global.bright = new Bright();