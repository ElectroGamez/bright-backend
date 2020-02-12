const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client();

        async () => {
            this.client.connect();
        }
    }

    query(query, cb) {

        this.client.query(query, (err, res) => {
            if (err) return global.log.error(err);
            cb(res);
        })
    }
}

module.exports = Database;
