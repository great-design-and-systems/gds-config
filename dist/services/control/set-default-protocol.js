'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SetDefaultProtocol = function SetDefaultProtocol(servicePort, callback) {
    _classCallCheck(this, SetDefaultProtocol);

    if (servicePort.indexOf('tcp') > -1) {
        callback(undefined, servicePort.replace('tcp', 'http'));
    } else {
        callback(undefined, servicePort);
    }
};

exports.default = SetDefaultProtocol;