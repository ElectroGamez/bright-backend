const express = require('express');
const expressListeners = require('./helpers/express.js')

class Bright {
    constructor(port) {
        this.expressApp = express()
        this.expressApp.cunstructorPort = port;
        expressListeners.make(this.expressApp);

    }
}

module.exports = Bright;