'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetDateRange = function () {
    function GetDateRange(dateFormat) {
        _classCallCheck(this, GetDateRange);

        //format should be yyyy-mm-dd
        var m = (0, _moment2.default)(dateFormat);
        console.log('m', m);
        this.date = m.toDate();
        this.startTime = getStartTime(this.date.getTime());
        this.endTime = getEndTime(this.date.getTime());
    }

    _createClass(GetDateRange, [{
        key: 'getStartTime',
        value: function getStartTime() {
            return this.startTime;
        }
    }, {
        key: 'getEndTime',
        value: function getEndTime() {
            return this.endTime;
        }
    }]);

    return GetDateRange;
}();

exports.default = GetDateRange;


function getStartTime(today) {
    var start = new Date(today);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}
function getEndTime(today) {
    var end = new Date(today);
    end.setHours(23, 59, 59, 999);
    return end.getTime();
}