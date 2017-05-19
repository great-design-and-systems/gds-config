'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _addServiceAction = require('./add-service-action');

var _addServiceAction2 = _interopRequireDefault(_addServiceAction);

var _checkAndGetApi = require('./check-and-get-api');

var _checkAndGetApi2 = _interopRequireDefault(_checkAndGetApi);

var _batchflow = require('batchflow');

var _batchflow2 = _interopRequireDefault(_batchflow);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProcessPorts = function ProcessPorts(servicePorts, restServices, callback) {
    _classCallCheck(this, ProcessPorts);

    (0, _batchflow2.default)(servicePorts).sequential().each(function (field, port, next) {
        var serviceName = getServiceName(port);
        console.log('Connecting to ' + serviceName + ':' + port.value);
        new _checkAndGetApi2.default(port.value, function (apiErr, api) {
            if (apiErr) {
                console.log('failed connecting to ' + serviceName + ': ' + port.value);
                callback(apiErr);
            } else {
                _lodash2.default.set(restServices, serviceName, api);
                console.log('Connected to ' + serviceName + ': ' + port.value);
                new _addServiceAction2.default(api.links, function (errLink, result) {
                    if (errLink) {
                        console.error(errLink);
                        callback(errLink);
                    } else {
                        next();
                    }
                });
            }
        });
    }).end(function () {
        callback(undefined, restServices);
    });
};

exports.default = ProcessPorts;


function getServiceName(port) {
    return _changeCase2.default.camelCase(port.key.toLowerCase());
}