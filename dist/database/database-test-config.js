'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PORT = process.env.DB_PORT_TEST || 27017;
var HOST = process.env.DB_HOST_TEST || 'localhost';
var TEST_DB = process.env.DB_TEST || 'test';
var USER = process.env.DB_USER;
var PASSWORD = process.env.DB_PASSWORD;
var RETRY_COUNT = process.env.RETRY_COUNT || 10;

var DatabaseTestConfig = function () {
    function DatabaseTestConfig() {
        _classCallCheck(this, DatabaseTestConfig);
    }

    _createClass(DatabaseTestConfig, [{
        key: 'connect',
        value: function connect(callback, tries) {
            if (!tries) {
                tries = 0;
            }
            if (tries < RETRY_COUNT) {
                _mongoose2.default.connect(this.getDBUrl(), function (err) {
                    if (err) {
                        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
                        tries++;
                        setTimeout(function () {
                            new DatabaseTestConfig().connect(callback, tries);
                        }, 5000);
                    } else {
                        return clearDB(callback);
                    }
                });
            } else {
                callback({
                    type: 'Connection timeout',
                    message: 'Failed connecting to database ' + TEST_DB
                });
            }
        }
    }, {
        key: 'getDBUrl',
        value: function getDBUrl() {
            var url = 'mongodb://';
            if (USER && PASSWORD) {
                url += USER;
                url += ':' + PASSWORD;
                url += '@';
            }
            url += HOST;
            url += ':';
            url += PORT;
            url += '/';
            url += TEST_DB;
            console.log('mongo:' + url);
            return url;
        }
    }, {
        key: 'disconnect',
        value: function disconnect(done) {
            _mongoose2.default.disconnect();
            return done();
        }
    }]);

    return DatabaseTestConfig;
}();

exports.default = DatabaseTestConfig;


function clearDB(done) {

    for (var i in _mongoose2.default.connection.collections) {
        if (_mongoose2.default.connection.collections[i] && _mongoose2.default.connection.collections[i].drop) {
            _mongoose2.default.connection.collections[i].drop(function (err) {
                console.log('collection dropped');
            });
        }
    }
    return done();
}