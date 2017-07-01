'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'indexAction',

    /**
     * 首页如果设置了自定义首页则渲染对应页面
     * @return {[type]} [description]
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _ref2, frontPage;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.model('options').getOptions();

              case 2:
                _ref2 = _context.sent;
                frontPage = _ref2.frontPage;

                if (!frontPage) {
                  _context.next = 7;
                  break;
                }

                this.get('pathname', frontPage);
                return _context.abrupt('return', this.action('post', 'page'));

              case 7:
                return _context.abrupt('return', this.action('post', 'list'));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function indexAction() {
        return _ref.apply(this, arguments);
      }

      return indexAction;
    }()

    /**
     * 输出opensearch
     */

  }, {
    key: 'opensearchAction',
    value: function opensearchAction() {
      this.http.type('text/xml');

      return this.end('<?xml version="1.0" encoding="UTF-8"?>\n<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">\n    <ShortName>' + this.options.title + '</ShortName>\n    <Description>' + this.options.description + '</Description>\n    <Url type="text/html" template="' + this.options.site_url + '/search.html?s={searchTerms}" />\n</OpenSearchDescription>');
    }

    /**
     * rss
     * @return {[type]} [description]
     */

  }, {
    key: 'rssAction',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var model, list;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this.model('post');
                _context2.next = 3;
                return model.getPostRssList();

              case 3:
                list = _context2.sent;

                this.assign('list', list);
                this.assign('currentTime', new Date().toString());

                this.type('text/xml');
                return _context2.abrupt('return', (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'display', this).call(this, this.HOME_VIEW_PATH + 'rss.xml'));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function rssAction() {
        return _ref3.apply(this, arguments);
      }

      return rssAction;
    }()

    /**
     * sitemap action
     * @return {[type]} [description]
     */

  }, {
    key: 'sitemapAction',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var postModel, postList;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                postModel = this.model('post');
                postList = postModel.getPostSitemapList();

                this.assign('postList', postList);

                this.type('text/xml');
                return _context3.abrupt('return', this.display(this.HOME_VIEW_PATH + 'sitemap.xml'));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sitemapAction() {
        return _ref4.apply(this, arguments);
      }

      return sitemapAction;
    }()
    /**
     * install
     * @return {[type]} [description]
     */

  }, {
    key: 'installAction',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var step, InstallService, instance, message, dbConfig, isDBConfig, errors, data, siteInfo, dbInfo;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                step = this.param('step');
                InstallService = this.service('install');
                instance = new InstallService(this.ip());
                message = void 0;


                this.assign({ step: step });

                if (!this.isGet()) {
                  _context4.next = 23;
                  break;
                }

                if (!firekylin.isInstalled) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', this.redirect('/'));

              case 8:

                /** check db config exist */
                dbConfig = this.config('db');
                isDBConfig = think.isObject(dbConfig.adapter) && !think.isEmpty(dbConfig.adapter[dbConfig.type]);
                _context4.t0 = step;
                _context4.next = _context4.t0 === 1 ? 13 : _context4.t0 === 2 ? 15 : 21;
                break;

              case 13:
                if (isDBConfig) {
                  this.redirect('/index/install?step=2');
                }
                return _context4.abrupt('break', 21);

              case 15:
                if (!isDBConfig) {
                  this.redirect('/index/install');
                }
                _context4.next = 18;
                return InstallService.checkInstalled();

              case 18:
                if (!_context4.sent) {
                  _context4.next = 20;
                  break;
                }

                message = 'success';

              case 20:
                return _context4.abrupt('break', 21);

              case 21:

                this.assign({ message: message });
                return _context4.abrupt('return', this.display());

              case 23:
                if (!firekylin.isInstalled) {
                  _context4.next = 25;
                  break;
                }

                return _context4.abrupt('return', this.fail('SYSTERM_INSTALLED'));

              case 25:
                errors = this.assign('errors');

                if (think.isEmpty(errors)) {
                  _context4.next = 29;
                  break;
                }

                this.assign('message', errors[(0, _keys2.default)(errors)[0]]);
                return _context4.abrupt('return', this.display());

              case 29:
                data = this.post();
                _context4.t1 = data.step;
                _context4.next = _context4.t1 === 2 ? 33 : 44;
                break;

              case 33:
                siteInfo = {
                  title: data.title,
                  site_url: data.site_url,
                  username: data.username,
                  password: data.password
                };
                _context4.prev = 34;
                _context4.next = 37;
                return instance.saveSiteInfo(siteInfo);

              case 37:
                message = 'success';
                _context4.next = 43;
                break;

              case 40:
                _context4.prev = 40;
                _context4.t2 = _context4['catch'](34);

                message = _context4.t2;

              case 43:
                return _context4.abrupt('break', 55);

              case 44:
                dbInfo = {
                  host: data.db_host,
                  port: data.db_port,
                  database: data.db_name,
                  user: data.db_account,
                  password: data.db_password,
                  prefix: data.db_table_prefix
                };
                _context4.prev = 45;
                _context4.next = 48;
                return instance.saveDbInfo(dbInfo);

              case 48:
                message = 'success';
                _context4.next = 54;
                break;

              case 51:
                _context4.prev = 51;
                _context4.t3 = _context4['catch'](45);

                message = _context4.t3;

              case 54:
                return _context4.abrupt('break', 55);

              case 55:

                this.assign('message', message);
                this.assign('data', data);
                this.display();

              case 58:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[34, 40], [45, 51]]);
      }));

      function installAction() {
        return _ref5.apply(this, arguments);
      }

      return installAction;
    }()
    /**
     * 申请成为投稿者
     * @return {[type]} [description]
     */

  }, {
    key: 'contributorAction',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var user;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.options.hasOwnProperty('push') || +this.options.push === 0)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', this.fail('PUSH_CLOSED'));

              case 2:
                if (!this.isGet()) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt('return', this.display());

              case 4:
                user = this.post();

                user.type = firekylin.USER_CONTRIBUTOR;
                user.status = firekylin.USER_DISABLED;
                user.create_time = think.datetime();
                user.last_login_time = user.create_time;
                user.create_ip = this.ip();
                user.last_login_ip = this.ip();

                _context5.next = 13;
                return this.model('user').where({ name: user.name, email: user.email, _logic: 'OR' }).thenAdd(user);

              case 13:
                this.assign('message', 'success');
                this.display();

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function contributorAction() {
        return _ref6.apply(this, arguments);
      }

      return contributorAction;
    }()
  }]);
  return _class;
}(_base2.default);

exports.default = _class;