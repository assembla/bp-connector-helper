'use strict';

var h = require('..');

// JSEND formatter:
var decorator = h.decorator;

console.log('decorator.toJsend item:', decorator.toJsend({ goal: goal }));
console.log('decorator.toJsendError item:', decorator.toJsendError('some error') );
