'use strict';

var h = require('..');

// translations:
var tr = h.translator;

tr.ruleFor('goal', function(item) {
  return {
    name: item.value
  };
});

tr.ruleFor('item', function(goal) {
  return {
    value: goal.name
  };
});

var goal = { name: 'some item name' };
var item = { value: 'some item name' };

console.log('tr.to goal:', tr.to('goal', item));
console.log('tr.to item:', tr.to('item', goal));
