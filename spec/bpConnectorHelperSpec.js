'use strict';

var connectorHelper = require('..');
var sinon           = require('sinon');
var helper          = require('./helpers/specHelper');

var decorator       = require('../lib/decorator');

describe('ConnectorHelper', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sinon.sandbox.restore();
  });


  describe('respondTo', function() {
    var respondwith;
    var responder;
    var toJsend;

    beforeEach(function() {
      responder   = sinon.stub();
      respondwith = connectorHelper.respondTo(responder);

      toJsend = sandbox.stub(decorator, 'toJsend');
      toJsend.returns('success');
    });

    afterEach(function() {
      decorator.toJsend.restore();
    });

    it('wraps data correctly', function() {

      respondwith('response');
      expect(toJsend.calledWith('response')).       toBe(true);
      expect(responder.calledWith('success')).toBe(true);
    });
  });


  describe('http', function() {
    beforeEach(function() {
      helper
        .stubHttpReponseFor(sandbox, { url: 'http://test.tld', method: 'post' })
        .andRespondWith(200, { id: 1 });
    });

    it('applies request options', function(done) {
      connectorHelper.request({ uri: 'http://test.tld', method: 'post' }, function(err) {
        done(err);
      });
    });
  });


  describe('hooks', function() {
    var promiseHook;

    beforeEach(function() {
      promiseHook = sinon.spy(function(next) { next(); });
    });


    it('applies hook', function(done) {
      connectorHelper
        .promise(promiseHook)
        .then(function() {
          expect(promiseHook.lastCall).toBeDefined();
          done();
        });
    });
  });
});
