'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Pet = require('./models/Pet.js');

var _Pet2 = _interopRequireDefault(_Pet);

var _User = require('./models/User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(data) {
    var _this = this;

    var _ret;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
              var user, promises;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      user = new _User2.default(data.User);
                      _context.next = 3;
                      return user.save();

                    case 3:
                      promises = data.pets.map(function (pet) {
                        var petData = Object.assign({}, pet, {
                          owner: user._id
                        });
                        return new _Pet2.default(petData).save();
                      });

                      console.log('success');
                      _context.t0 = user;
                      _context.next = 8;
                      return Promise.all(promises);

                    case 8:
                      _context.t1 = _context.sent;
                      _context.t2 = {
                        user: _context.t0,
                        pets: _context.t1
                      };
                      return _context.abrupt('return', {
                        v: _context.t2
                      });

                    case 11:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })(), 't0', 2);

          case 2:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 5:
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t1 = _context2['catch'](0);

            console.log('error', _context2.t1);
            throw _context2.t1;

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  function saveDataInDb(_x) {
    return _ref.apply(this, arguments);
  }

  return saveDataInDb;
}();