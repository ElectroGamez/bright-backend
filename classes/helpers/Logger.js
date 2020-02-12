class Logger {
    constructor() {}

    debug(msg, obj) {
        sendConsole("\x1b[1m[DEBUG]\x1b[0m ", msg, obj);
    }

    info(msg, obj) {
        sendConsole("\x1b[1m[INFO]\x1b[0m ", msg, obj);

    }

    error(msg, obj) {
        sendConsole("\x1b[1m\x1b[31m[ERROR]\x1b[0m ", msg, obj);

    }   
}

function sendConsole(prefix, msg, obj, suffix) {
    console.log(`${prefix || ""}${msg || ""}${suffix || ""}\x1b[0m`, obj || "");
}



module.exports = Logger;