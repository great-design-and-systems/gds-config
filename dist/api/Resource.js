'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domainApi = require('../services/domain-api');

var _domainApi2 = _interopRequireDefault(_domainApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = function () {
    function Resource(app) {
        _classCallCheck(this, Resource);

        this.api = new _domainApi2.default();
        this.app = app;
    }

    _createClass(Resource, [{
        key: 'addPost',
        value: function addPost(name, url) {}
    }, {
        key: 'addPut',
        value: function addPut(name, url) {}
    }, {
        key: 'addGet',
        value: function addGet(name, url) {}
    }, {
        key: 'addDelete',
        value: function addDelete(name, url) {}
    }, {
        key: 'addHead',
        value: function addHead(name, url) {}
    }, {
        key: 'addPath',
        value: function addPath(name, url) {}
    }, {
        key: 'getLinks',
        value: function getLinks() {
            return this.api.links;
        }
    }]);

    return Resource;
}();

exports.default = Resource;