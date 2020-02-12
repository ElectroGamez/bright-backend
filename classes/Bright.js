const Restify = require('./Restify.js')

class Bright {
    constructor(port) {
        this.restify = new Restify();
        this.restify.createListeners();
        this.restify.listen(port);
    }
}

module.exports = Bright;