"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppLogger = function () {
    function AppLogger(message) {
        _classCallCheck(this, AppLogger);

        this.message = message;
    }

    _createClass(AppLogger, [{
        key: "info",
        value: function info() {
            log(global.gdsLogger ? global.gdsLogger.logInfo : undefined, this.message);
        }
    }, {
        key: "error",
        value: function error() {
            log(global.gdsLogger ? global.gdsLogger.logError : undefined, this.message);
        }
    }, {
        key: "warn",
        value: function warn() {
            log(global.gdsLogger ? global.gdsLogger.logWarn : undefined, this.message);
        }
    }, {
        key: "debug",
        value: function debug() {
            log(global.gdsLogger ? global.gdsLogger.logDebug : undefined, this.message);
        }
    }]);

    return AppLogger;
}();

exports.default = AppLogger;


function log(logger, message) {
    if (logger) {
        logger(message);
    } else {
        console.log(message); //default logger here
    }
}