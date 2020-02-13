const Restify = require('./Restify.js');
const Database = require('./Database.js');

class Bright {
    constructor(port) {
        this.restify = new Restify(port);
        this.restify.loadListeners();
        this.restify.listen();

        this.database = new Database();
    }
}

module.exports = Bright;