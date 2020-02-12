function make(app) {
    app.listen(app.cunstructorPort);

    app.get('/', (req, res) => {
        res.send("works.");
        global.bright.log.error("wowoow!");
    })
}

module.exports.make = make;
