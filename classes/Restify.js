const restify = require('restify');
const fs = require("fs");

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

class Restify {
    constructor(port) {
        this.server = restifySetup();
    }

    loadListeners() {
        fs.readdir("./classes/restifyListeners/", (err, files) => {
            if (err) throw new Error("Failed to load restify listeners." + err);
            files.forEach(file => {
                let tmpItem = require(`./restifyListeners/${file}`);
                this.server[tmpItem.type](tmpItem.url, tmpItem.execution);
                tmpItem = null;
            });
        });
    }

    listen(port) {
        this.server.listen(port || 3000, () => {
            global.log.info('Restify server listening on port ' + this.server.url);
        });
    }
}

//Dont want this is class because its not needed outsite of this class. Would use more memory?
function restifySetup() {
    let server = restify.createServer({
        name: 'Bright Backend',
        version: '1.0.0'
    });

    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());

    if (!server) throw new Error('Could not create restify server');
    return server;
}

module.exports = Restify;