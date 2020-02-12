const restify = require('restify');

class Restify {
    constructor(port) {
        this.server = restifySetup();
    }

    createListeners() {
        this.server.get('/api/light', function (req, res, next) {
            //tmp, for testing
            global.bright.database.query("CREATE TABLE test(name VARCHAR(32), pet VARCHAR(32);", res => {
                console.log(res);
            })

            global.bright.database.query("INSERT INTO test(name, pet) VALUES('testperson', 'dog');", res => {
                console.log(res);
            })

            global.bright.database.query("SELECT * FROM test;", res => {
                console.log(res);
            })

            res.send(req.params);
            return next();
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

    if (!server) throw new Error('Could not load server');
    return server;
}

module.exports = Restify;