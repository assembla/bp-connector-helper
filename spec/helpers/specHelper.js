'use strict';

var request = require('request');

module.exports.stubHttpReponseFor = function stubHttpReponseFor(sandbox, xhrOptions) {
  return {
    andRespondWith: function(statusCode, json, err) { // jshint -W074
      var url     = xhrOptions.url;
      var method  = xhrOptions.method || 'get';

      var options = { uri : url };

      if(xhrOptions.headers) {
        options.headers = xhrOptions.headers;
      }

      if(xhrOptions.body) {
        options.body = xhrOptions.body;
      }

      var res = {
        statusCode : statusCode,
        request    : { href: url }
      };

      var alreadyStubbed = 'spyCall' in request[method];
      var stub = alreadyStubbed ? request[method] : sandbox.stub(request, method);

      stub.withArgs(options).yields(err, res, json);

      return res;
    }
  };
};
