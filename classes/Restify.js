const restify = require('restify');
const fs = require("fs");

class Restify {
    constructor(port) {
        this.port = port;
        this.server = restifySetup();
        this.reloading = false;
    }

    loadListeners() {
        fs.readdir("./classes/restifyListeners/", (err, files) => {
            if (err) throw new Error("Failed to load restify listeners." + err);
            files.forEach(file => {
                let tmpItem = require(`./restifyListeners/${file}`);
                this.server[tmpItem.type](tmpItem.url, tmpItem.execution);
                delete require.cache[require.resolve(`./restifyListeners/${file}`)];
            });
        });
    }

    reload() {
        if (!this.reloading) {
            this.reloading = true;
            global.log.info("Restify reload started");
            this.server.close(cb => {
                delete this.server;
                this.server = restifySetup();
                this.loadListeners();
                this.listen();
                global.log.info("Restify reload finished");
                this.reloading = false;
            });
        } else global.log.error("Restify reload already started");
    }

    listen() {
        this.server.listen(this.port || 3000, () => {
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