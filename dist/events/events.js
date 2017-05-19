'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventJobs = exports.EventJobInput = exports.ProcedureJob = exports.ScheduledJob = exports.ProcessJob = exports.EventJobService = exports.Events = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _addServiceAction = require('../services/control/add-service-action');

var _addServiceAction2 = _interopRequireDefault(_addServiceAction);

var _checkAndGetApi = require('../services/control/check-and-get-api');

var _checkAndGetApi2 = _interopRequireDefault(_checkAndGetApi);

var _setDefaultProtocol = require('../services/control/set-default-protocol');

var _setDefaultProtocol2 = _interopRequireDefault(_setDefaultProtocol);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENT_PORT = process.env.EVENT_SERVICE_PORT;
var DOMAIN = process.env.DOMAIN_NAME || 'default';

var Events = exports.Events = function Events(callback) {
  var _this = this;

  _classCallCheck(this, Events);

  new _setDefaultProtocol2.default(EVENT_PORT, function (err, port) {
    _this.port = port;
  });
  new _checkAndGetApi2.default(this.port, function (err, actions) {
    if (err) {
      console.error(err);
      callback({
        message: 'Failed getting event service'
      });
    } else {
      new _addServiceAction2.default(actions.links, function (errApi, result) {
        if (errApi) {
          callback(errApi);
        } else {
          global.gdsEventJob = new EventJobService(result);
          callback();
        }
      });
    }
  });
};

var EventJobService = exports.EventJobService = function () {
  function EventJobService(eventApi) {
    _classCallCheck(this, EventJobService);

    this.api = eventApi;
  }

  _createClass(EventJobService, [{
    key: 'createProcessJob',
    value: function createProcessJob(name, action, session) {
      var job = new ProcessJob(name, action, session, this.api.createJob);
      return job;
    }
  }, {
    key: 'createScheduledJob',
    value: function createScheduledJob(name, session) {
      var job = new ScheduledJob(name, session, this.api.createJob);
      return job;
    }
  }, {
    key: 'createProcedureJob',
    value: function createProcedureJob(name, session) {
      var job = new ProcedureJob(name, session, this.api.createJob);
      return job;
    }
  }]);

  return EventJobService;
}();

var EventJob = function () {
  function EventJob(name, session, type, createJob) {
    _classCallCheck(this, EventJob);

    this.context = {};
    this.context.data = {};
    this.context.data.eventName = name;
    this.context.data.eventType = type;
    this.context.session = session;
    this.createJob = createJob;
  }

  _createClass(EventJob, [{
    key: 'execute',
    value: function execute(callback) {
      this.createJob.execute({
        data: this.context,
        headers: {
          'Content-Type': 'application/json'
        }
      }, callback);
    }
  }, {
    key: 'addBody',
    value: function addBody(field, value) {
      this.addInput('body', field, value);
      return this;
    }
  }, {
    key: 'addHeader',
    value: function addHeader(field, value) {
      this.addInput('header', field, value);
      return this;
    }
  }, {
    key: 'addPath',
    value: function addPath(field, value) {
      this.addInput('path', field, value);
      return this;
    }
  }, {
    key: 'addQuery',
    value: function addQuery(field, value) {
      this.addInput('query', field, value);
      return this;
    }
  }, {
    key: 'addInput',
    value: function addInput(type, field, value) {
      if (!this.context.input) {
        this.context.input = {};
      } else if (!_lodash2.default.get(this.context.input, type)) {
        _lodash2.default.set(this.context.input, type, {});
      }
      var inputType = _lodash2.default.get(this.context.input, type);
      _lodash2.default.set(inputType, field, value);
    }
  }]);

  return EventJob;
}();

var ProcessJob = exports.ProcessJob = function (_EventJob) {
  _inherits(ProcessJob, _EventJob);

  function ProcessJob(eventName, action, session, createJob) {
    _classCallCheck(this, ProcessJob);

    var _this2 = _possibleConstructorReturn(this, (ProcessJob.__proto__ || Object.getPrototypeOf(ProcessJob)).call(this, eventName, session, 'PROCESS', createJob));

    _this2.context.data.action = action;
    return _this2;
  }

  return ProcessJob;
}(EventJob);

var ScheduledJob = exports.ScheduledJob = function (_EventJob2) {
  _inherits(ScheduledJob, _EventJob2);

  function ScheduledJob(eventName, session, createJob) {
    _classCallCheck(this, ScheduledJob);

    return _possibleConstructorReturn(this, (ScheduledJob.__proto__ || Object.getPrototypeOf(ScheduledJob)).call(this, eventName, session, 'SCHEDULED', createJob));
  }

  _createClass(ScheduledJob, [{
    key: 'setDateTime',
    value: function setDateTime(dateTime) {
      this.context.data.dateTime = dateTime;
      return this;
    }
  }, {
    key: 'setNextEvent',
    value: function setNextEvent(name, type, data) {
      if (!data) {
        data = {};
      }
      data.eventType = type;
      data.eventName = name;
      this.nextEvent = new EventJob(name, this.context.session, type, this.createJob);
      this.nextEvent.context.data = data;
      return this;
    }
  }, {
    key: 'addInput',
    value: function addInput(type, field, value) {
      var context = this.nextEvent.context;
      if (!context.input) {
        context.input = {};
      } else if (!_lodash2.default.get(context.input, type)) {
        _lodash2.default.set(context.input, type, {});
      }
      var inputType = _lodash2.default.get(context.input, type);
      _lodash2.default.set(inputType, field, value);
    }
  }, {
    key: 'execute',
    value: function execute(callback) {
      this.context.data.nextEvent = this.nextEvent.context.data;
      this.context.data.nextEvent.input = this.nextEvent.context.input;
      this.context.data.nextEvent.session = this.nextEvent.context.session;
      _get(ScheduledJob.prototype.__proto__ || Object.getPrototypeOf(ScheduledJob.prototype), 'execute', this).call(this, callback);
    }
  }]);

  return ScheduledJob;
}(EventJob);

var ProcedureJob = exports.ProcedureJob = function (_EventJob3) {
  _inherits(ProcedureJob, _EventJob3);

  function ProcedureJob(eventName, session, createJob) {
    _classCallCheck(this, ProcedureJob);

    var _this4 = _possibleConstructorReturn(this, (ProcedureJob.__proto__ || Object.getPrototypeOf(ProcedureJob)).call(this, eventName, session, 'PROCEDURE', createJob));

    _this4.context.data.eventSequence = [];
    return _this4;
  }

  _createClass(ProcedureJob, [{
    key: 'setNextEvent',
    value: function setNextEvent(name, action) {
      var data = {};
      var nextEvent = new EventJob(name, this.context.session, this.context.data.eventType, this.createJob);
      nextEvent.context.eventName = name;
      nextEvent.context.action = action;
      _lodash2.default.unset(nextEvent.context, 'data');
      _lodash2.default.unset(nextEvent.context, 'session');
      this.context.data.eventSequence.push(nextEvent.context);
      return this;
    }
  }, {
    key: 'addInput',
    value: function addInput(type, field, value) {
      var context = this.context.data.eventSequence[this.context.data.eventSequence.length - 1];
      if (!context.input) {
        context.input = {};
      }
      if (!_lodash2.default.get(context.input, type)) {
        _lodash2.default.set(context.input, type, {});
      }
      var inputType = _lodash2.default.get(context.input, type);
      _lodash2.default.set(inputType, field, value);
    }
  }]);

  return ProcedureJob;
}(EventJob);

var EventJobInput = exports.EventJobInput = function () {
  function EventJobInput() {
    _classCallCheck(this, EventJobInput);
  }

  _createClass(EventJobInput, [{
    key: 'setField',
    value: function setField(field, value) {
      _lodash2.default.set(this, field, value);
    }
  }]);

  return EventJobInput;
}();

var EventJobs = exports.EventJobs = function () {
  function EventJobs() {
    _classCallCheck(this, EventJobs);
  }

  _createClass(EventJobs, [{
    key: 'createProcessJob',
    value: function createProcessJob(name, action, session) {
      return global.gdsEventJob.createProcessJob(name, action, session);
    }
  }, {
    key: 'createScheduledJob',
    value: function createScheduledJob(name, session) {
      return global.gdsEventJob.createScheduledJob(name, session);
    }
  }, {
    key: 'createProcedureJob',
    value: function createProcedureJob(name, session) {
      return global.gdsEventJob.createProcedureJob(name, session);
    }
  }]);

  return EventJobs;
}();