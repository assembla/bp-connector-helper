'use strict';

/* parse path and create url Functionality */

/**
* Parse PATH data-params
*
* pathParams('/user/%{userId}/account');
*   => { userId: '%{userId}' }
*/
function pathParams(path) {
  var re = /%\{([a-z]+)\}/gi;
  var matches = {};
  var match;

  // jshint -W084
  while(match = re.exec(path)) {
    // matches[<NAME>] = '%{<NAME>}', used to replace PATH params
    matches[ match[1] ] = match[0];
  }

  return matches;
}


/**
* Build URL params from pattern path string and req object
* NOTE: assuming that request object <req> has already sanitized params
*
* prepareUri('/user/%{userId}/account', { userId: '%{userId}' }, { userId: 1 });
*   => '/user/1/account'
**/
function applyPathParams(path, params, reqParams) {
  for(var name in params) {
    var param = reqParams[name] || null;
    path = path.replace(params[name], param);
  }

  return path;
}


/*
* Used to apply query string params for the URI
*
* usage:
* applyParams('http://host.tld/user/%{userId}/account', { userId: 1 });
*   => 'http://host.tld/user/1/account'
*/
module.exports = function applyParams(path, reqParams) {
  var pathParamsPairs = pathParams(path);
  var uri = applyPathParams(path, pathParamsPairs, reqParams);
  return uri;
};
