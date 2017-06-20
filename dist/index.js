'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GDSEventJobs = exports.GDSServiceAPI = exports.GDSUtil = exports.GDSDomainPaginateHelper = exports.GDSDomainDTO = exports.GDSDatabaseTest = exports.GDSDomainAPI = exports.GDSServices = exports.GDSServer = exports.GDSDatabase = exports.GDSAppLogger = exports.GDSResource = exports.Delete = exports.Put = exports.Post = exports.Get = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Express = require('./api/Express');

Object.defineProperty(exports, 'Get', {
  enumerable: true,
  get: function get() {
    return _Express.Get;
  }
});
Object.defineProperty(exports, 'Post', {
  enumerable: true,
  get: function get() {
    return _Express.Post;
  }
});
Object.defineProperty(exports, 'Put', {
  enumerable: true,
  get: function get() {
    return _Express.Put;
  }
});
Object.defineProperty(exports, 'Delete', {
  enumerable: true,
  get: function get() {
    return _Express.Delete;
  }
});

var _events = require('./events/events');

var _services = require('./services/services');

var _AppLogger2 = require('./logger/AppLogger');

var _AppLogger3 = _interopRequireDefault(_AppLogger2);

var _databaseConfig = require('./database/database-config');

var _databaseConfig2 = _interopRequireDefault(_databaseConfig);

var _databaseTestConfig = require('./database/database-test-config');

var _databaseTestConfig2 = _interopRequireDefault(_databaseTestConfig);

var _domainApi = require('./services/domain-api');

var _domainApi2 = _interopRequireDefault(_domainApi);

var _domainDto = require('./services/domain-dto');

var _domainDto2 = _interopRequireDefault(_domainDto);

var _domainRequestHelper = require('./services/domain-request-helper');

var _getDateRange = require('./util/get-date-range');

var _getDateRange2 = _interopRequireDefault(_getDateRange);

var _getJsonFieldValue = require('./util/get-json-field-value');

var _getJsonFieldValue2 = _interopRequireDefault(_getJsonFieldValue);

var _logger = require('./logger/logger');

var _logger2 = _interopRequireDefault(_logger);

var _Resource = require('./api/Resource');

var _Resource2 = _interopRequireDefault(_Resource);

var _server = require('./server/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GDSResource = exports.GDSResource = _Resource2.default;

var GDSAppLogger = exports.GDSAppLogger = function (_AppLogger) {
  _inherits(GDSAppLogger, _AppLogger);

  function GDSAppLogger(message) {
    _classCallCheck(this, GDSAppLogger);

    return _possibleConstructorReturn(this, (GDSAppLogger.__proto__ || Object.getPrototypeOf(GDSAppLogger)).call(this, message));
  }

  return GDSAppLogger;
}(_AppLogger3.default);

var GDSDatabase = exports.GDSDatabase = function (_DatabaseConfig) {
  _inherits(GDSDatabase, _DatabaseConfig);

  function GDSDatabase() {
    _classCallCheck(this, GDSDatabase);

    return _possibleConstructorReturn(this, (GDSDatabase.__proto__ || Object.getPrototypeOf(GDSDatabase)).apply(this, arguments));
  }

  return GDSDatabase;
}(_databaseConfig2.default);

var GDSServer = exports.GDSServer = function (_ServerConfig) {
  _inherits(GDSServer, _ServerConfig);

  function GDSServer() {
    _classCallCheck(this, GDSServer);

    return _possibleConstructorReturn(this, (GDSServer.__proto__ || Object.getPrototypeOf(GDSServer)).apply(this, arguments));
  }

  return GDSServer;
}(_server2.default);

var GDSServices = exports.GDSServices = function (_ServicesConfig) {
  _inherits(GDSServices, _ServicesConfig);

  function GDSServices() {
    _classCallCheck(this, GDSServices);

    return _possibleConstructorReturn(this, (GDSServices.__proto__ || Object.getPrototypeOf(GDSServices)).apply(this, arguments));
  }

  return GDSServices;
}(_services.ServicesConfig);

var GDSDomainAPI = exports.GDSDomainAPI = function (_DomainAPIModel) {
  _inherits(GDSDomainAPI, _DomainAPIModel);

  function GDSDomainAPI() {
    _classCallCheck(this, GDSDomainAPI);

    var _this5 = _possibleConstructorReturn(this, (GDSDomainAPI.__proto__ || Object.getPrototypeOf(GDSDomainAPI)).call(this));

    _this5.setDomainName(process.env.DOMAIN_NAME);
    return _this5;
  }

  return GDSDomainAPI;
}(_domainApi2.default);

var GDSDatabaseTest = exports.GDSDatabaseTest = function (_DatabaseTestConfig) {
  _inherits(GDSDatabaseTest, _DatabaseTestConfig);

  function GDSDatabaseTest() {
    _classCallCheck(this, GDSDatabaseTest);

    return _possibleConstructorReturn(this, (GDSDatabaseTest.__proto__ || Object.getPrototypeOf(GDSDatabaseTest)).apply(this, arguments));
  }

  return GDSDatabaseTest;
}(_databaseTestConfig2.default);

var GDSDomainDTO = exports.GDSDomainDTO = function (_DomainDtoModel) {
  _inherits(GDSDomainDTO, _DomainDtoModel);

  function GDSDomainDTO() {
    _classCallCheck(this, GDSDomainDTO);

    return _possibleConstructorReturn(this, (GDSDomainDTO.__proto__ || Object.getPrototypeOf(GDSDomainDTO)).apply(this, arguments));
  }

  return GDSDomainDTO;
}(_domainDto2.default);

var GDSDomainPaginateHelper = exports.GDSDomainPaginateHelper = function (_DomainPaginateHelper) {
  _inherits(GDSDomainPaginateHelper, _DomainPaginateHelper);

  function GDSDomainPaginateHelper() {
    _classCallCheck(this, GDSDomainPaginateHelper);

    return _possibleConstructorReturn(this, (GDSDomainPaginateHelper.__proto__ || Object.getPrototypeOf(GDSDomainPaginateHelper)).apply(this, arguments));
  }

  return GDSDomainPaginateHelper;
}(_domainRequestHelper.DomainPaginateHelper);

var GDSUtil = exports.GDSUtil = function () {
  function GDSUtil() {
    _classCallCheck(this, GDSUtil);
  }

  _createClass(GDSUtil, [{
    key: 'getDateRange',
    value: function getDateRange(dateFormat) {
      return new _getDateRange2.default(dateFormat);
    }
  }, {
    key: 'getLogger',
    value: function getLogger(callback) {
      return new _logger2.default(callback);
    }
  }, {
    key: 'initEvents',
    value: function initEvents(callback) {
      return new _events.Events(callback);
    }
  }, {
    key: 'getJsonValue',
    value: function getJsonValue(jsonOject, exp, callback) {
      new _getJsonFieldValue2.default(jsonOject, exp, callback);
    }
  }, {
    key: 'isJson',
    value: function isJson(json) {
      var isjson = true;
      try {
        JSON.parse(json);
      } catch (err) {
        isjson = false;
      }
      return isjson;
    }
  }]);

  return GDSUtil;
}();

var GDSServiceAPI = exports.GDSServiceAPI = function (_Services) {
  _inherits(GDSServiceAPI, _Services);

  function GDSServiceAPI() {
    _classCallCheck(this, GDSServiceAPI);

    return _possibleConstructorReturn(this, (GDSServiceAPI.__proto__ || Object.getPrototypeOf(GDSServiceAPI)).apply(this, arguments));
  }

  return GDSServiceAPI;
}(_services.Services);

var GDSEventJobs = exports.GDSEventJobs = function (_EventJobs) {
  _inherits(GDSEventJobs, _EventJobs);

  function GDSEventJobs() {
    _classCallCheck(this, GDSEventJobs);

    return _possibleConstructorReturn(this, (GDSEventJobs.__proto__ || Object.getPrototypeOf(GDSEventJobs)).apply(this, arguments));
  }

  return GDSEventJobs;
}(_events.EventJobs);