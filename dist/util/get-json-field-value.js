'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetJsonFieldValue = function GetJsonFieldValue(jsonObject, exp, callback) {
    _classCallCheck(this, GetJsonFieldValue);

    try {
        callback(undefined, _lodash2.default.get(jsonObject, exp));
    } catch (err) {
        callback(err);
    }
};

exports.default = GetJsonFieldValue;