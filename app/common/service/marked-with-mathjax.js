'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * 渲染具体的 MathJax 表达式
 *
 * @param content
 * @returns {Promise.<*>}
 */
var _renderMathJax = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(content) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _mathjaxNode2.default.config({
              MathJax: {}
            });
            _mathjaxNode2.default.start();

            _context.next = 4;
            return new _promise2.default(function (resolve) {
              _mathjaxNode2.default.typeset({
                math: content,
                format: 'TeX',
                svg: true
              }, function (data) {
                resolve(data.svg);
              });
            });

          case 4:
            return _context.abrupt('return', _context.sent);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _renderMathJax(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 渲染行内数学表达式
 * @param text
 * @returns {Promise.<*>}
 */


var _mathSpanRender = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(text) {
    var reg, cap, strStart, strEnd, mathContent;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reg = /`\$(.*?)\$`/g;
            cap = void 0;


            reg.lastIndex = 0;

          case 3:
            if (!text) {
              _context2.next = 18;
              break;
            }

            cap = reg.exec(text);

            if (!cap) {
              _context2.next = 15;
              break;
            }

            strStart = cap.index;
            strEnd = cap.index + cap[0].length;
            _context2.next = 10;
            return _renderMathJax(cap[1]);

          case 10:
            mathContent = _context2.sent;


            text = text.substring(0, strStart) + mathContent + text.substring(strEnd);
            reg.lastIndex += mathContent.length;

            _context2.next = 16;
            break;

          case 15:
            return _context2.abrupt('break', 18);

          case 16:
            _context2.next = 3;
            break;

          case 18:
            return _context2.abrupt('return', text);

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function _mathSpanRender(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 渲染 Markdown 文本
 *
 * @param content
 * @returns {Promise.<void>}
 */


var _mathjaxNode = require('mathjax-node');

var _mathjaxNode2 = _interopRequireDefault(_mathjaxNode);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(content) {
    var mathLexer, tokens, i, item;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mathLexer = new _marked2.default.Lexer();
            tokens = mathLexer.lex(content);
            i = 0;

          case 3:
            if (!(i < tokens.length)) {
              _context3.next = 17;
              break;
            }

            item = tokens[i];

            // 处理块级表达式

            if (!(item.type === 'code' && item.lang === 'math')) {
              _context3.next = 10;
              break;
            }

            _context3.next = 8;
            return _renderMathJax(item.text);

          case 8:
            _context3.t0 = _context3.sent;
            tokens[i] = {
              type: 'paragraph',
              text: _context3.t0
            };

          case 10:
            if (!item.text) {
              _context3.next = 14;
              break;
            }

            _context3.next = 13;
            return _mathSpanRender(item.text);

          case 13:
            item.text = _context3.sent;

          case 14:
            i++;
            _context3.next = 3;
            break;

          case 17:
            return _context3.abrupt('return', _marked2.default.Parser.parse(tokens));

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function render(_x3) {
    return _ref3.apply(this, arguments);
  }

  return render;
}();