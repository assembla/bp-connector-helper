'use strict';

var decorator = require('../lib/decorator');

describe('decorator', function() {
  var dataResponse;

  beforeEach(function() {
    dataResponse  = { item: { name: 'value'} };
  });

  describe('toJesend', function() {
    it('renders success message', function() {
      expect(decorator.toJsend(dataResponse)).toEqual({
        status: 'success',
        data: dataResponse,
        message: ''
      });
    });


    it('renders success message for array', function() {
      expect(decorator.toJsend([dataResponse])).toEqual({
        status: 'success',
        data: [dataResponse],
        message: ''
      });
    });


    it('renders error message', function() {
      var error = new Error('test error');
      expect(decorator.toJsend(error)).toEqual({
        status: 'error',
        data: {},
        message: 'test error'
      });
    });


    it('renders string error as FAIL', function() {
      expect(decorator.toJsend('string error')).toEqual({
        status: 'fail',
        data: {},
        message: 'string error'
      });
    });


    it('renders error on non-object', function() {
      expect(decorator.toJsend(123)).toEqual({
        status: 'fail',
        data: {},
        message: 123
      });
    });

    it('renders unknown error on null', function() {
      expect(decorator.toJsend(null)).toEqual({
        status: 'fail',
        data: {},
        message: 'unknown error'
      });
    });
  });


  describe('toJesendError', function() {
    it('renders string error as ERROR', function() {
      expect(decorator.toJsendError('string error')).toEqual({
        status: 'error',
        data: {},
        message: 'string error'
      });
    });
  });
});
