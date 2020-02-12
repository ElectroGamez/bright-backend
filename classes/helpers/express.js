function make(app) {
    app.listen(app.cunstructorPort);
    global.log.debug(`Express server is listening on port ${app.cunstructorPort}`);

    app.get('/', (req, res) => {
        res.send("works.");
    })
}

module.exports.make = make;
