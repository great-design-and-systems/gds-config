'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _domainDto = require('../services/domain-dto');

var _domainDto2 = _interopRequireDefault(_domainDto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = function Resource(app, api) {
    _classCallCheck(this, Resource);

    domainActions = [];
    if (!app) {
        throw new Error('Express app is required.');
    }
    if (!api) {
        throw new Error('Api name is required.');
    }
    this.getDTO = function (req) {
        return buildDomainDto(domainActions, protocol(req), req.headers.host, addApiName(api));
    };
    this.get = function (name, url, callback) {
        app.get('' + addApiName(api) + url, callback);
        domainActions.push(new DomainAction('Get', name, url));
    };
    this.put = function (name, url, callback) {
        app.put('' + addApiName(api) + url, callback);
        domainActions.push(new DomainAction('Put', name, url));
    };
    this.post = function (name, url, callback) {
        app.post('' + addApiName(api) + url, callback);
        domainActions.push(new DomainAction('Post', name, url));
    };
    this.delete = function (name, url, callback) {
        app.delete('' + addApiName(api) + url, callback);
        domainActions.push(new DomainAction('Delete', name, url));
    };
};

exports.default = Resource;


var protocol = function protocol(req) {
    return req.connection.encrypted ? 'https://' : 'http://';
};

var addApiName = function addApiName(api) {
    if (api.indexOf(0) !== '/') {
        api = '/' + api;
    }
    if (api.indexOf(api.length - 1) !== '/') {
        return api += '/';
    }
};
var buildDomainDto = function buildDomainDto(domainActions, protocol, host, api) {
    var dto = new _domainDto2.default();
    domainActions.forEach(function (domain) {
        switch (domain.method) {
            case 'Get':
                dto.addGet(domain.name, '' + protocol + host + api + domain.url);
                break;
            case 'Post':
                dto.addPost(domain.name, '' + protocol + host + api + domain.url);
                break;
            case 'Put':
                dto.addPut(domain.name, '' + protocol + host + api + domain.url);
                break;
            case 'Delete':
                dto.addDelete(domain.name, '' + protocol + host + api + domain.url);
                break;
        }
    });
    return dto;
};

var DomainAction = function DomainAction(method, name, url) {
    _classCallCheck(this, DomainAction);

    this.method = method;
    this.name = name;
    this.url = url;
};