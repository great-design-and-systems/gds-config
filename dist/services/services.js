'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Services = exports.ServicesConfig = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addServiceAction = require('./control/add-service-action');

var _addServiceAction2 = _interopRequireDefault(_addServiceAction);

var _checkAndGetApi = require('./control/check-and-get-api');

var _checkAndGetApi2 = _interopRequireDefault(_checkAndGetApi);

var _processPorts = require('./control/process-ports');

var _processPorts2 = _interopRequireDefault(_processPorts);

var _setDefaultProtocol = require('./control/set-default-protocol');

var _setDefaultProtocol2 = _interopRequireDefault(_setDefaultProtocol);

var _batchflow = require('batchflow');

var _batchflow2 = _interopRequireDefault(_batchflow);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServicesConfig = exports.ServicesConfig = function () {
    function ServicesConfig() {
        _classCallCheck(this, ServicesConfig);

        this.servicesPorts = [];
        this.restServices = {};
    }

    _createClass(ServicesConfig, [{
        key: 'initServices',
        value: function initServices(callback) {
            var _this = this;

            _lodash2.default.forEach(process.env, function (value, key) {
                if (key.match(/SERVICE_PORT$/g) && !key.match(/.*_ENV_.*_SERVICE_PORT$/g)) {
                    (function () {
                        console.log('matches', key);
                        var port = {};
                        _lodash2.default.set(port, 'key', key);
                        new _setDefaultProtocol2.default(value, function (err, httpLink) {
                            _lodash2.default.set(port, 'value', httpLink);
                        });
                        _this.servicesPorts.push(port);
                    })();
                }
            });
            new _processPorts2.default(this.servicesPorts, this.restServices, function (err, services) {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    global.gdsServices = services;
                    callback();
                }
            });
        }
    }, {
        key: 'initService',
        value: function initService(servicePort, callback) {
            try {
                new _setDefaultProtocol2.default(servicePort, function (errPort, httpLink) {
                    if (errPort) {
                        throw new Error('Failed setting default port for ' + servicePort);
                    }
                    new _checkAndGetApi2.default(httpLink, function (errApi, api) {
                        if (errApi) {
                            throw new Error('Failed getting service api for ' + servicePort);
                        } else {
                            new _addServiceAction2.default(api.links, function (errorLinks) {
                                if (errorLinks) {
                                    throw new Error('Failed setting executable links for ' + servicePort);
                                } else {
                                    callback(undefined, api);
                                }
                            });
                        }
                    });
                });
            } catch (err) {
                callback(err);
            }
        }
    }, {
        key: 'initApi',
        value: function initApi(apiPort, callback) {
            try {
                new _setDefaultProtocol2.default(apiPort, function (errPort, httpLink) {
                    if (errPort) {
                        throw new Error('Failed setting default port for ' + apiPort);
                    }
                    new _checkAndGetApi2.default(httpLink, function (errApi, api) {
                        try {
                            if (errApi) {
                                throw new Error('Failed getting service api for ' + apiPort);
                            } else {
                                (0, _batchflow2.default)(api).sequential().each(function (field, port, next) {
                                    try {
                                        new _addServiceAction2.default(port.links, function (errorLinks) {
                                            if (errorLinks) {
                                                throw new Error('Failed setting executable links for ' + apiPort);
                                            } else {
                                                next();
                                            }
                                        });
                                    } catch (err) {
                                        callback(err);
                                    }
                                }).end(function () {
                                    callback(undefined, api);
                                });
                            }
                        } catch (err) {
                            callback(err);
                        }
                    });
                });
            } catch (err) {
                callback(err);
            }
        }
    }]);

    return ServicesConfig;
}();

var Services = exports.Services = function Services() {
    var _this2 = this;

    _classCallCheck(this, Services);

    if (global.gdsServices) {
        _lodash2.default.forEach(global.gdsServices, function (value, field) {
            _lodash2.default.set(_this2, field, value);
        });
    }
};