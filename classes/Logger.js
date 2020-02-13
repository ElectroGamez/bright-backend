class Logger {
    constructor(options) {
        this.level = options.level || 2; // Info and lower
    }

    debug(msg, obj) {
        if (this.level >= 3) this.sendConsole("\x1b[1m[DEBUG]\x1b[0m ", msg, obj);
    }

    info(msg, obj) {
        if (this.level >= 2) this.sendConsole("\x1b[1m[INFO]\x1b[0m ", msg, obj);
    }

    error(msg, obj) {
        if (this.level >= 1) this.sendConsole("\x1b[1m\x1b[31m[ERROR]\x1b[0m ", msg, obj);
    }
    
    sendConsole(prefix, msg, obj, suffix) {
        console.log(`${prefix || ""}${msg || ""}${suffix || ""}\x1b[0m`, obj || "");
    }
}

module.exports = Logger;