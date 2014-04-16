'use strict';

function isError(result) {
  return result instanceof Error;
}

function isObjectOrArray(res) {
  return res && !isError(res) && typeof res === 'object';
}


/**
* used to convert response data to JSEND-formatted message
*
* usage:
* var result = { name: 'goalName' };
* decorator.toJsend(result);
*   //=> { status: 'success', data: { name: 'goalName' }, message: '' }
*
* decorator.toJsend(err);
*   //=> { status: 'fail', data: {}, message: 'No response provided' }
*
* var err = new Error('No response provided');
* decorator.toJsend(err);
*   //=> { status: 'error', data: {}, message: 'No response provided' }
**/
function toJsend(result) {
  var jsendData = {};
  var status = 'fail';
  var message = '';

  if(isError(result)) {
    status  = 'error';
    message = result.message;
  } else if(isObjectOrArray(result)) {
    status    = 'success';
    jsendData = result;
  } else {
    message = result || 'unknown error';
  }

  return {
    status: status,
    data: jsendData,
    message: message
  };
}


/**
* shortcut for the formatted errors
* accepts Error or String objects
*
* usage:
* var err = 'No response provided';
* decorator.toJsendError(err);
*   //=> { status: 'error', data: {}, message: 'No response provided' }
**/
function toJsendError(err) {
  if(!isError(err)) {
    err = new Error(err);
  }

  return toJsend(err);
}

var decorator = {
  toJsend:      toJsend,
  toJsendError: toJsendError
};

module.exports = decorator;
