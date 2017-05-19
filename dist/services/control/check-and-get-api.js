'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restler = require('restler');

var _restler2 = _interopRequireDefault(_restler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PROXY_HOST = process.env.PROXY_HOST;
var PROXY_PORT = process.env.PROXY_PORT;

var CheckAndGetApi = function CheckAndGetApi(url, callback) {
    _classCallCheck(this, CheckAndGetApi);

    var API_SERVICE_RETRY_COUNT = process.env.API_SERVICE_RETRY_COUNT || 20;
    var API_SERVICE_RETRY_TIMEOUT = process.env.API_SERVICE_RETRY_TIMEOUT || 50000;
    console.log('Connecting to ', url);
    var retry = 0;
    _restler2.default.get(url, {
        timeout: API_SERVICE_RETRY_TIMEOUT,
        proxy: {
            host: PROXY_HOST,
            port: PROXY_PORT
        }
    }).on('success', function (data) {
        callback(undefined, data);
    }).on('error', function (reason) {
        if (retry === API_SERVICE_RETRY_COUNT) {
            callback(reason);
        }
        retry++;
        this.retry(API_SERVICE_RETRY_TIMEOUT);
    }).on('fail', function (reason) {
        if (retry === API_SERVICE_RETRY_COUNT) {
            callback(reason);
        }
        retry++;
        this.retry(API_SERVICE_RETRY_TIMEOUT);
    }).on('timeout', function (reason) {
        if (retry === API_SERVICE_RETRY_COUNT) {
            callback(reason);
        }
        retry++;
        this.retry(API_SERVICE_RETRY_TIMEOUT);
    });
};

exports.default = CheckAndGetApi;