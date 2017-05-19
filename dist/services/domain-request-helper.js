'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomainPaginateHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainPaginateHelper = exports.DomainPaginateHelper = function () {
  function DomainPaginateHelper(req) {
    var _this = this;

    _classCallCheck(this, DomainPaginateHelper);

    var sort = req.query.page_sort;
    if (sort) {
      this.sort = {};
      if (sort instanceof Array) {
        sort.forEach(function (field) {
          addSortField(_this.sort, field);
        });
      } else {
        addSortField(this.sort, sort);
      }
    }
    this.page = req.query.page_current ? parseInt(req.query.page_current) : undefined;
    this.offset = req.query.page_offset ? parseInt(req.query.page_offset) : 0;
    this.limit = req.query.page_limit ? parseInt(req.query.page_limit) : 25;
    this.populate = req.query.page_populate;
    this.select = req.query.page_select;
  }

  _createClass(DomainPaginateHelper, [{
    key: 'setLimit',
    value: function setLimit(limit) {
      this.limit = limit;
    }
  }, {
    key: 'setOffset',
    value: function setOffset(offset) {
      this.offset = offset;
    }
  }, {
    key: 'setPopulate',
    value: function setPopulate(populate) {
      this.populate = populate;
    }
  }, {
    key: 'setSelect',
    value: function setSelect(select) {
      this.select = select;
    }
  }, {
    key: 'setSort',
    value: function setSort(sort) {
      this.sort = sort;
    }
  }, {
    key: 'setPage',
    value: function setPage(page) {
      this.page = page;
    }
  }]);

  return DomainPaginateHelper;
}();

function addSortField(sort, field) {
  if (field.charAt(0) === '-') {
    field = field.substring(1);
    _lodash2.default.set(sort, field, -1);
  } else {
    _lodash2.default.set(sort, field, 1);
  }
}