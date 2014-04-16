'use strict';

var translator = require('../lib/translator');

describe('Translator', function() {
  var itemData;
  var translateHook;

  beforeEach(function() {
    itemData      = { name: 'itemOne' };
    translateHook = jasmine.createSpy('translateHook').andReturn(itemData);
  });

  describe('ruleFor', function() {
    it('throws on non function', function() {
      expect(function() {
        translator.ruleFor('item', 'invalid hook');
      }).toThrow();

      expect(translator.item).not.toBeDefined();
    });


    it('assigns a rule', function() {
      translator.ruleFor('item', translateHook);
      expect(translator.item).toEqual(jasmine.any(Function));
    });
  });


  describe('to', function() {
    function ruleForItem(otherItem) {
      return {
        name: otherItem.key
      };
    }

    beforeEach(function() {
      translator.ruleFor('item', ruleForItem);
    });


    it('returns valid value for known name', function() {
      var converted = translator.to('item', { key: 'test'});
      expect(converted).toEqual({ name: 'test' });
    });


    describe('errors', function() {
      function validateData(data) {
        expect(function() {
          translator.translate('item', data);
        }).toThrow();
      }

      it('throws on invalid object data', function() {
        ['data', 123, [], null, undefined ].forEach(validateData);
      });


      it('throws on invalid hook return value', function() {
        translator.ruleFor('item', function() {});
        expect(function() {
          translator.translate('item', {});
        }).toThrow();
      });


      it('throws on nonexistent rule call', function() {
        expect(function() {
          translator.translate('nonexistent', {});
        }).toThrow();
      });
    });
  });
});
