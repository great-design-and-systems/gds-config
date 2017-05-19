'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setDefaultProtocol = require('../services/control/set-default-protocol');

var _setDefaultProtocol2 = _interopRequireDefault(_setDefaultProtocol);

var _checkAndGetApi = require('../services/control/check-and-get-api');

var _checkAndGetApi2 = _interopRequireDefault(_checkAndGetApi);

var _addServiceAction = require('../services/control/add-service-action');

var _addServiceAction2 = _interopRequireDefault(_addServiceAction);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOGGER_PORT = process.env.LOGGER_SERVICE_PORT;
var DOMAIN = process.env.DOMAIN_NAME || 'default';

var Logger = function Logger(callback) {
  var _this = this;

  _classCallCheck(this, Logger);

  new _setDefaultProtocol2.default(LOGGER_PORT, function (err, port) {
    _this.port = port;
  });
  new _checkAndGetApi2.default(this.port, function (err, actions) {
    if (err) {
      console.error(err);
      callback({
        message: 'Failed getting logger service'
      });
    } else {
      new _addServiceAction2.default(actions.links, function (errApi, result) {
        global.gdsLogger = {
          logInfo: function logInfo(message) {
            result.createInfo.execute({
              params: {
                serviceName: DOMAIN
              },
              data: {
                message: getMessage(message)
              }
            }, function () {
              console.log(message);
            });
          },
          logError: function logError(message) {
            result.createError.execute({
              params: {
                serviceName: DOMAIN
              },
              data: {
                message: getMessage(message)
              }
            }, function () {
              console.error(message);
            });
          },
          logDebug: function logDebug(message) {
            result.createDebug.execute({
              params: {
                serviceName: DOMAIN
              },
              data: {
                message: getMessage(message)
              }
            }, function () {
              console.debug(message);
            });
          },
          logWarn: function logWarn(message) {
            result.createWarn.execute({
              params: {
                serviceName: DOMAIN
              },
              data: {
                message: getMessage(message)
              }
            }, function () {
              console.warn(message);
            });
          }
        };
        callback();
      });
    }
  });
};

exports.default = Logger;


function getMessage(message) {
  if (message instanceof Error) {
    return message.stack;
  } else {
    return message;
  }
}