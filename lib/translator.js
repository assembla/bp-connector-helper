'use strict';

var util = require('util');

function NonObjectError(item) {
  return new Error('Can not handle non object: ' + util.inspect(item));
}

function NonFunctionError(fn) {
  return new Error('Can not handle non function: ' + util.inspect(fn));
}


function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function isFunction(fn) {
  return typeof fn === 'function';
}


function toRule(func) {
  if(!isFunction(func)) {
    throw new NonFunctionError(func);
  }

  return function(item) {
    if(!isObject(item)) {
      throw new NonObjectError(item);
    }

    var translation = func(item);

    if(!isObject(translation)) {
      throw new NonObjectError(translation);
    }

    return translation;
  };
}


var translator = {
  /*
  * translator.ruleFor('goal', function(ticket) {
  *   return {
  *     title:        ticket.title,
  *     description:  ticket.body
  *   };
  * });
  */
  ruleFor: function ruleFor(name, ruleFunc) {
    this[name] = toRule(ruleFunc);
  },


  /*
  * translator.to('goal', ticket);
  *   //=> { title: <ticket.title>, description: <ticket.body> };
  */
  to: function to(name, item) {
    var rule = this[name];

    if(!isFunction(rule)) {
      throw new NonFunctionError(rule);
    }

    return this[name](item);
  }
};

module.exports = translator;
