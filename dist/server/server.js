'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PORT = process.env.PORT || 5000;
var ENV = process.env.APP_ENV || 'dev';

var ServerConfig = function ServerConfig(app, domainApi) {
    _classCallCheck(this, ServerConfig);

    app.use((0, _morgan2.default)(ENV));
    app.use(_bodyParser2.default.urlencoded({
        extended: true
    }));
    app.use((0, _cookieParser2.default)());
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.json({
        type: 'application/vnd.api+json'
    }));
    app.use((0, _connectMultiparty2.default)({
        uploadDir: process.env.TEMP_DIR || 'files'
    }));
    if (domainApi) {
        console.log('domainApi', domainApi);
        app.get('/', function (req, res) {
            res.status(200).send(domainApi);
        });
    }
};

exports.default = ServerConfig;