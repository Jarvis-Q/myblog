'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'indexAction',

    /**
     * index action logic
     * @return {} []
     */
    value: function indexAction() {}
    /**
     * 添加或者修改用户
     * @return {} []
     */

  }, {
    key: 'saveAction',
    value: function saveAction() {
      this.allowMethods = 'post';
      this.rules = {};
    }
    /**
     * login
     * @return {} []
     */

  }, {
    key: 'loginAction',
    value: function loginAction() {
      this.allowMethods = 'get,post';
      if (this.isGet()) {
        return;
      }
      this.rules = {
        username: {
          required: true,
          minLength: 4
        },
        password: {
          required: true,
          length: [32, 32]
        },
        factor: {
          regexp: /^\d{6}$/
        }
      };
    }
  }]);
  return _class;
}(think.logic.base);

exports.default = _class;