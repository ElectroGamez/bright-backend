const express = require('express');
const expressListeners = require('./listeners/express.js')
const logListener = require('./listeners/logger.js')


class Bright {
    constructor(port) {
        this.expressApp = express()
        this.expressApp.cunstructorPort = port;
        expressListeners.make(this.expressApp);

        this.log = new logListener();
    }
}



module.exports = Bright;