# light-event

  lightweight pubSub pattern event for javascript.

## Installation
```bash
  $ npm install light-event
```
### on(event, fn)
```js
var LE = require('light-event');

var e = new LE;

e.on('sayHi', function (data) {
    console.log('hi, ' + data);
})

e.trigger('sayHi', 'light-event'); // hi, light-event
```

### once(event, cb)

  Register a one-time event which will be removed immediately after been invoked.

### trigger(event)
   Trigger Events!

### off(event, [fn1, fn2..])

  Cancel events or some specific callbacks inside one event