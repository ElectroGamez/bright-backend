const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client();
        this.client.connect()
        .then(() => {global.log.info("Database connection succesfull")})
        .catch(err => {global.log.error("Database connection failed " + err)});
    }

    //query with callback
    query(query, cb) {
        this.client.query(query, (err, res) => {
            if (err) return global.log.error(err);
            cb(res);
        })
    }

    //query with promise
    query(query) {
        return new Promise((resolve, reject) => {
            this.client.query(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

module.exports = Database;
