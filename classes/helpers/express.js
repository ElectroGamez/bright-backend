function make(app) {
    app.listen(app.cunstructorPort);

    app.get('/', (req, res) => {
        res.send("works.");
        global.bright.log.debug("wowoow!");
    })
}

module.exports.make = make;
