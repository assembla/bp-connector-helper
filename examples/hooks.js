'use strict';

var h = require('..');

// hooks:
var hook = h.promise(function(done) {
  console.log('hook called...');
  done();
});

var hook2 = h.promise(function(done) {
  console.log('hook2 called...');
  done();
});

hook
  .then(hook2)
  .done(function() {
    console.log('done!');
  });
