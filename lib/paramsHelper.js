'use strict';

/* parse path and create url Functionality*/

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
function applyQsParams(path, params, reqParams) {
  for(var name in params) {
    var param = reqParams[name];
    path = path.replace(params[name], param);
  }

  return path;
}


module.exports = function paramsHelper(path, reqParams) {
  path = path
    .replace(/\/+$/, '')
    .replace(/^\/+/, '');

  var queryStringParams = pathParams(path);
  var uri = applyQsParams(path, queryStringParams, reqParams);

  return uri;
};
