[![Code Climate](https://codeclimate.com/github/Assembla/bp-connector-helper.png)](https://codeclimate.com/github/Assembla/bp-connector-helper)
[![Build Status](https://travis-ci.org/Assembla/bp-connector-helper.png?branch=master)](https://travis-ci.org/Assembla/bp-connector-helper)
[![Dependency Status](https://gemnasium.com/Assembla/bp-connector-helper.png)](https://gemnasium.com/Assembla/bp-connector-helper)

### Synopsis

Helper for the BigPlans Connector modules

### helper.q

kriskowal/q library
see more at [https://github.com/kriskowal/q]


### helper.request

Wrapper around the mikeal/request
see more at [ https://github.com/mikeal/request ]


### helper.promise

Used to create promises
```js
var hook1 = helper.promise(function(done) {
  // ...
  done();
});

var hook2 = helper.promise(function(done) {
  //...
  done();
});

hook1.then(hook2).done(function() {
  //...
});
```

### helper.applyParams

Used to apply query string params for the URI
usage:

```js
applyParams('http://host.tld/user/%{userId}/account', { userId: 1 });
//  => 'http://host.tld/user/1/account'
```

### helper.translator

translator object
methods: **ruleFor(name, ruleFunc)**, **to(name, object)**

```js
translator.ruleFor('goal', function(ticket) {
  return {
    title:        ticket.title,
    description:  ticket.body
  };
});

translator.to('goal', ticket);
  //=> { title: <ticket.title>, description: <ticket.body> };
```

### helper.decorator

JSEND decorator object
methods: **toJsend(obj || err)**, **toJsendError(err || String)**

```js
var result = { name: 'goalName' };
decorator.toJsend(result);
  //=> { status: 'success', data: { name: 'goalName' }, message: '' }

var err = 'No response provided';
decorator.toJsendError(err);
  //=> { status: 'error', data: {}, message: 'No response provided' }

decorator.toJsend(err);
  //=> { status: 'fail', data: {}, message: 'No response provided' }

var err = new Error('No response provided');
decorator.toJsend(err);
  //=> { status: 'error', data: {}, message: 'No response provided' }
```

### helper.respondTo

wrapper around the ```decorator.toJsend```
shortcut for:
  ```callback( decorator.toJsend( { id: 1 } ) )```

will capture responseData and transform it to JSEND
usage:

```js
var respondWith = respondTo(callback);
respondWith({ id: 1 });
  //=> callback(decorator.toJsend({ id: 1 ))
```
