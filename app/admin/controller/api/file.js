'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_request2.default.defaults({
  strictSSL: false,
  rejectUnauthorized: false
});

var getFileContent = think.promisify(_request2.default.get, _request2.default);
var writeFileAsync = think.promisify(_fs2.default.writeFile, _fs2.default);

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(args))), _this), _this.uploadConfig = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(_class, [{
    key: '__before',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUploadConfig();

              case 2:
                this.uploadConfig = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function __before() {
        return _ref2.apply(this, arguments);
      }

      return __before;
    }()
  }, {
    key: 'postAction',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var config, _config, type, file;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = this.uploadConfig;
                _config = config, type = _config.type;
                file = void 0;

                /** 处理远程抓取 **/

                if (!this.post('fileUrl')) {
                  _context2.next = 15;
                  break;
                }

                _context2.prev = 4;
                _context2.next = 7;
                return this.getUrlFile(this.post('fileUrl'));

              case 7:
                file = _context2.sent;
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](4);
                return _context2.abrupt('return', this.fail(_context2.t0.message));

              case 13:
                _context2.next = 16;
                break;

              case 15:
                file = this.file('file');

              case 16:
                if (file) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt('return', this.fail('FILE_UPLOAD_ERROR'));

              case 18:
                if (!this.post('importor')) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt('return', this.serviceImport(this.post('importor'), file));

              case 20:
                if (type) {
                  _context2.next = 22;
                  break;
                }

                return _context2.abrupt('return', this.fail());

              case 22:
                if (type === 'local') {
                  config = { name: this.post('name') };
                }

                return _context2.abrupt('return', this.serviceUpload(type, file.path, config));

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
      }));

      function postAction() {
        return _ref3.apply(this, arguments);
      }

      return postAction;
    }()

    // 导出 Markdown 文件

  }, {
    key: 'getAction',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _this2 = this;

        var PATH, num, data, zip, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                PATH = _path2.default.join(think.RUNTIME_PATH, 'exportedMarkdownFiles');

                if (!(this.get('type') === 'markdown')) {
                  _context3.next = 38;
                  break;
                }

                _context3.next = 4;
                return this.model('post').getCount();

              case 4:
                num = _context3.sent;
                _context3.next = 7;
                return this.model('post').getLatest(0, num);

              case 7:
                data = _context3.sent;
                _context3.prev = 8;

                (0, _child_process.execSync)('rm -rf ' + PATH + '; mkdir ' + PATH + ';');
                zip = new _jszip2.default();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 14;

                for (_iterator = (0, _getIterator3.default)(data); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  item = _step.value;

                  zip.file('' + think.datetime(item['create_time'], 'YYYY-MM-DD-') + item['title'] + '.md', item['markdown_content']);
                }

                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3['catch'](14);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 22:
                _context3.prev = 22;
                _context3.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 25:
                _context3.prev = 25;

                if (!_didIteratorError) {
                  _context3.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context3.finish(25);

              case 29:
                return _context3.finish(22);

              case 30:
                zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(_fs2.default.createWriteStream(_path2.default.join(PATH, 'export.zip'))).on('finish', function () {
                  return _this2.download(_path2.default.join(PATH, 'export.zip'));
                });
                _context3.next = 36;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t1 = _context3['catch'](8);
                throw new Error(_context3.t1);

              case 36:
                _context3.next = 39;
                break;

              case 38:
                this.success();

              case 39:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 33], [14, 18, 22, 30], [23,, 25, 29]]);
      }));

      function getAction() {
        return _ref4.apply(this, arguments);
      }

      return getAction;
    }()

    // 获取上传设置

  }, {
    key: 'getUploadConfig',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var options;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.model('options').getOptions();

              case 2:
                options = _context4.sent;
                return _context4.abrupt('return', options.upload);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUploadConfig() {
        return _ref5.apply(this, arguments);
      }

      return getUploadConfig;
    }()

    /**
     * 上传文件
     */

  }, {
    key: 'serviceUpload',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(service, file, config) {
        var uploader, result;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                uploader = think.service('upload/' + service, 'admin');
                _context5.next = 4;
                return new uploader().run(file, config);

              case 4:
                result = _context5.sent;
                return _context5.abrupt('return', this.success(result));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](0);
                return _context5.abrupt('return', this.fail(_context5.t0 || 'FILE_UPLOAD_ERROR'));

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function serviceUpload(_x, _x2, _x3) {
        return _ref6.apply(this, arguments);
      }

      return serviceUpload;
    }()

    /**
     * 从其他平台导入数据
     */

  }, {
    key: 'serviceImport',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(service, file) {
        var importor, _ref8, post, page, category, tag;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                importor = think.service('import/' + service, 'admin');
                _context6.next = 4;
                return new importor(this).run(file);

              case 4:
                _ref8 = _context6.sent;
                post = _ref8.post;
                page = _ref8.page;
                category = _ref8.category;
                tag = _ref8.tag;
                return _context6.abrupt('return', this.success('\u5171\u5BFC\u5165\u6587\u7AE0 ' + post + ' \u7BC7\uFF0C\u9875\u9762 ' + page + ' \u9875\uFF0C\u5206\u7C7B ' + category + ' \u4E2A\uFF0C\u6807\u7B7E ' + tag + ' \u4E2A'));

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](0);
                return _context6.abrupt('return', this.fail(_context6.t0));

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 12]]);
      }));

      function serviceImport(_x4, _x5) {
        return _ref7.apply(this, arguments);
      }

      return serviceImport;
    }()
  }, {
    key: 'getUrlFile',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(url) {
        var resp, uploadDir, uploadName, uploadPath;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return getFileContent({
                  url: url,
                  headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36'
                  },
                  strictSSL: false,
                  timeout: 1000,
                  encoding: 'binary'
                }).catch(function () {
                  throw new Error('UPLOAD_URL_ERROR');
                });

              case 2:
                resp = _context7.sent;

                if (!(resp.headers['content-type'].indexOf('image') === -1)) {
                  _context7.next = 5;
                  break;
                }

                throw new Error('UPLOAD_TYPE_ERROR');

              case 5:
                uploadDir = this.config('post').file_upload_path;

                if (!uploadDir) {
                  uploadDir = _path2.default.join(_os2.default.tmpdir(), 'thinkjs/upload');
                }
                if (!think.isDir(uploadDir)) {
                  think.mkdir(uploadDir);
                }

                uploadName = think.uuid(20) + _path2.default.extname(url);
                uploadPath = _path2.default.join(uploadDir, uploadName);
                _context7.next = 12;
                return writeFileAsync(uploadPath, resp.body, 'binary');

              case 12:
                return _context7.abrupt('return', {
                  fieldName: 'file',
                  originalFilename: _path2.default.basename(url),
                  path: uploadPath,
                  size: resp.headers['content-length']
                });

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getUrlFile(_x6) {
        return _ref9.apply(this, arguments);
      }

      return getUrlFile;
    }()
  }]);
  return _class;
}(_base2.default);

exports.default = _class;