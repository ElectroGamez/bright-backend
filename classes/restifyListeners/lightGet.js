let url = "/api/light"
let type = "get"

function execution(req, res, next) {
    global.bright.database.query("SELECT * FROM lights;")
        .then((result) => {
            res.send(result.rows);
            return next();
        })
        .catch((error) => {
            global.log.error("Database error, " + error);
            return next(new Error('Internal server error.'));
        });
    return next();
}

module.exports.url = url;
module.exports.type = type;
module.exports.execution = execution;