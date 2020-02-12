//Load/Start Backend
const Logger = require('./classes/Logger.js');
global.log = new Logger();

//Load/Start Backend
const Bright = require('./classes/Bright.js');
global.bright = new Bright(3000);
