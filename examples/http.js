'use strict';

var h = require('..');

// http requests:
h.request({ url: 'http://localhost', format: 'json' }, function(err, res, body) {
  console.log('request done:', res.statusCode, err, body);
});
