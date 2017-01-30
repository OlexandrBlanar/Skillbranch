'use strict';

var _saveDataInDb = require('./saveDataInDb');

var _saveDataInDb2 = _interopRequireDefault(_saveDataInDb);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

mongoose.Promise = _bluebird2.default;
mongoose.connect('mongodb://localhost/notes');

var data = {
  user: {
    name: 'oblanar'
  },
  pets: [{
    name: 'Zildjian',
    type: 'cat'
  }, {
    name: 'Doge',
    type: 'dog'
  }]
};
(0, _saveDataInDb2.default)(data);