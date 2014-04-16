'use strict';


var applyParams = require('../lib/applyParams');

describe('ParamsHelper', function() {
  var path;
  var reqParams;

  beforeEach(function() {
    path      = 'http://test.tld/%{paramOne}/%{paramTwo}/%{paramThree}';
    reqParams = {
      paramOne: 'one',
      paramTwo: 2
    };
  });


  it('fetches params form the request', function() {
    var applied = applyParams(path, reqParams);
    expect(applied).toEqual('http://test.tld/one/2/null');
  });
});
