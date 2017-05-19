'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chain = function () {
    function Chain(name, action, next, error) {
        _classCallCheck(this, Chain);

        if (!action) {
            throw new Error('Action is required.');
        }
        this.next = next;
        this.context = new ChainContext();
        if (error) {
            this.context.set('$error', error);
        }
        this.name = name;
        this.action = action;
        if (!global.$$ch_io) {
            global.$$ch_io = [];
        }
        global.$$ch_io[this.name] = this;
    }

    _createClass(Chain, [{
        key: 'execute',
        value: function execute(done, param) {
            var _this = this;

            if (param && param.$error && !this.context.$error) {
                this.context.set('$error', param.$error());
            }
            if (this.context.$isTerminated && this.context.$isTerminated()) {
                done(this.context);
            } else {
                setTimeout(function () {
                    try {
                        _this.action(_this.context, param, function () {
                            if (_this.next) {
                                global.$$ch_io[_this.next].execute(done, _this.context);
                            } else {
                                done(_this.context);
                            }
                        });
                    } catch (err) {
                        if (_this.context.$error) {
                            _this.context.set('$errorMessage', err);
                            _this.context.set('$name', _this.name);
                            global.$$ch_io[_this.context.$error()].execute(done, _this.context);
                        } else {
                            throw err;
                        }
                    }
                });
            }
        }
    }, {
        key: 'terminate',
        value: function terminate() {
            this.context.set('$isTerminated', true);
        }
    }]);

    return Chain;
}();

exports.default = Chain;

var ChainContext = function () {
    function ChainContext() {
        _classCallCheck(this, ChainContext);
    }

    _createClass(ChainContext, [{
        key: 'set',
        value: function set(name, value) {
            _lodash2.default.set(this, name, function () {
                return value;
            });
        }
    }]);

    return ChainContext;
}();