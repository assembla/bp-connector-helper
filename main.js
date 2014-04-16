'use strict';

var Q     = require('q');
var http  = require('request');

/*
* kriskowal/q library
* see more at [ https://github.com/kriskowal/q ]
*/
module.exports.q = Q;

/*
* wrapper around the mikeal/request
* see more at [ https://github.com/mikeal/request ]
*/
module.exports.request = function request(options, done) {
  var method = options.method || 'get';
  delete options.method;

  return http[method](options, done);
};

/*
* Used to create promises
*
* usage:
* var hook1 = helper.promise(function(done) { ...; done(); });
* var hook2 = helper.promise(function(done) { ...; done(); });
* hook1.then(hook2).done(function() { ... });
*/
module.exports.promise = function promise(func) {
  var promiseFn = Q.denodeify(func);
  return promiseFn();
};


/*
* Used to apply query string params for the URI
*
* usage:
* applyParams('http://host.tld/user/%{userId}/account', { userId: 1 });
*   => 'http://host.tld/user/1/account'
*/
module.exports.applyParams = require('./lib/applyParams');

/*
* translator object
*
* methods: ruleFor(name, ruleFunc), to(name, object)
* see more at [ ./lib/translator.js ]
*/
module.exports.translator = require('./lib/translator');


/*
* decorator object
*
* methods: toJsend(object || err), toJsendError(err || String)
* see more at [ ./lib/translator.js ]
*/
module.exports.decorator = require('./lib/decorator');

/*
* wrapper around the decorator.toJsend
* shortcut for:
*   callback( decorator.toJsend( { id: 1 } ) )
*
* will capture responseData and transform it to JSEND
*
* usage:
* var respondWith = respondTo(callback);
* respondWith({ id: 1 });
*   //=> callback(decorator.toJsend({ id: 1 ))
*/
module.exports.respondTo = function respondTo(callback) {
  var decorator = module.exports.decorator;
  return function(data) {
    var result = decorator.toJsend(data);
    callback(result);
  };
};
