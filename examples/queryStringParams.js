'use strict';

var h = require('..');

// params helper:
var params = { userId: 123, userName: 'qwerty' };
var url = h.applyParams('http://test.tld/?userId=%{userId}&userName=%{userName}', params);

console.log(url);
