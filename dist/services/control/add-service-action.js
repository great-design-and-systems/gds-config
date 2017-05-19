'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setDefaultProtocol = require('./set-default-protocol');

var _setDefaultProtocol2 = _interopRequireDefault(_setDefaultProtocol);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _restler = require('restler');

var _restler2 = _interopRequireDefault(_restler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PROXY_HOST = process.env.PROXY_HOST;
var PROXY_PORT = process.env.PROXY_PORT;

var AddServiceAction = function AddServiceAction(links, callback) {
    _classCallCheck(this, AddServiceAction);

    try {
        _lodash2.default.forEach(links, function (link) {
            link.execute = action;
        });
        callback(undefined, links);
    } catch (error) {
        callback(error);
    }
};

exports.default = AddServiceAction;


function action(options, callback) {
    var link = this;
    var url = void 0;
    new _setDefaultProtocol2.default(link.url, function (err, httpUrl) {
        url = httpUrl;
    });
    if (options instanceof Function) {
        callback = options;
        options = undefined;
    }
    if (!options) {
        options = {};
    }
    if (!options.timeout) {
        options.timeout = process.env.CALL_TIMEOUT || 20000;
    }
    console.log('options', options);

    var method = 'get';
    if (link.method === 'POST') {
        method = 'post';
    } else if (link.method === 'PUT') {
        method = 'put';
    } else if (link.method === 'DELETE') {
        method = 'del';
    }
    if (options && options.params) {
        _lodash2.default.forEach(options.params, function (value, key) {
            url = url.replace(':' + key, value);
        });
    }
    console.log('request made: ' + url);
    if (options.multipart) {
        var file = _restler2.default.file(options.data.path, options.data.originalFilename, options.data.size, null, options.data.type);
        _lodash2.default.set(options, 'data', {});
        _lodash2.default.set(options.data, options.multipartField, file);
        console.log('data converted to rest file', options);
    }
    if (PROXY_HOST && PROXY_PORT) {
        options.proxy = {
            host: PROXY_HOST,
            port: PROXY_PORT
        };
    }
    _lodash2.default.get(_restler2.default, method)(url, options).on('success', function (result, response) {
        console.log('request success: ' + url);
        callback(undefined, {
            data: result,
            response: response
        });
        if (options.multipart) {
            _fs2.default.unlink(_lodash2.default.get(options.data, options.multipartField).path);
        }
    }).on('error', function (reason, response) {
        console.error('ERROR: ' + url, reason);
        callback(reason, response);
    }).on('fail', function (reason, response) {
        console.error('FAIL: ' + url, reason);
        callback(reason, response);
    }).on('timeout', function (reason, response) {
        console.error('TIMEOUT: ' + link.url, reason);
        callback(reason, response);
    });
}