'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Delete = exports.Post = exports.Put = exports.Get = undefined;

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Get = exports.Get = function Get(target, key, descriptor) {
    checkIfResource(target);
    var url = descriptor.arguments[0];
    var callback = descriptor.arguments[1];
    validateCallback(callback);
    target.get(key, url, callback);
};
var Put = exports.Put = function Put(target, key, descriptor) {
    checkIfResource(target);
    var url = descriptor.arguments[0];
    var callback = descriptor.arguments[1];
    validateCallback(callback);
    target.put(key, url, callback);
};

var Post = exports.Post = function Post(target, key, descriptor) {
    checkIfResource(target);
    var url = descriptor.arguments[0];
    var callback = descriptor.arguments[1];
    validateCallback(callback);
    target.post(key, url, callback);
};

var Delete = exports.Delete = function Delete(target, key, descriptor) {
    checkIfResource(target);
    var url = descriptor.arguments[0];
    var callback = descriptor.arguments[1];
    validateCallback(callback);
    target.delete(key, url, callback);
};

var checkIfResource = function checkIfResource(target) {
    if (!(target instanceof _Resource2.default)) {
        throw new Error('Target must an instance of GdsResource.');
    }
};

var validateCallback = function validateCallback(callback) {
    if (!callback) {
        throw new Error('Second argument should be defined.');
    }
    if (!(callback instanceof Function)) {
        throw new Error('Second should be a function.');
    }
};