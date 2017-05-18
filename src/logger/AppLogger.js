export default class AppLogger {
    constructor(message) {
        this.message = message;
    }
    info() {
        log(global.gdsLogger ? global.gdsLogger.logInfo : undefined, this.message);
    }

    error() {
        log(global.gdsLogger ? global.gdsLogger.logError : undefined, this.message);
    }

    warn() {
        log(global.gdsLogger ? global.gdsLogger.logWarn : undefined, this.message);
    }

    debug() {
        log(global.gdsLogger ? global.gdsLogger.logDebug : undefined, this.message);
    }
}

function log(logger, message) {
    if (logger) {
        logger(message);
    } else {
        console.log(message); //default logger here
    }
}