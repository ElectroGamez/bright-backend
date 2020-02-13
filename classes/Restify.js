const restify = require('restify');

class Restify {
    constructor(port) {
        this.server = restifySetup();
    }

    createListeners() {
        this.server.get('/api/light', function (req, res, next) {
            //tmp, for testing
            global.bright.database.query("SELECT * FROM lights;")
            .then((result) => {
                res.send(result.rows);
                return next();
            })
            .catch((error) => {
                global.log.error("Database error, " + error);
                return next(new Error('Internal server error.'));
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

    if (!server) throw new Error('Could not load server');
    return server;
}

module.exports = Restify;