# Observer Design Pattern Subject

An implementation of the subject in an Observer Design Pattern.

## Example

```javascript
let Observable = require('observer-subject'),
  subject,
  observer1 = {
    notify(event, ...args) {

      console.log(`#1 - The event ${event} provided:`, ...args);

    }

  },
  observer2 = {

    notify(event, ...args) {

      console.log(`#2 - The event ${event} provided:`, ...args);

    }

  };

class Emitter extends Observable {

  changed(newValue) {

    this.notifyObservers('onChange', newValue);

  }

}

subject = new Emitter();
subject.registerObserver(observer1);
subject.registerObserver(observer2);
subject.changed(42);
// #1 - The event onChange provided: 42
// #2 - The event onChange provided: 42

subject.unregisterObserver(observer1);
subject.changed(32);
// #2 - The event onChange provided: 32
```
## Installation
```
$ npm install observer-subject
```
## API
```javascript
let Observer = require('observer-subject');
```

### .registerObserver(observer)

Will start notifying the observer.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | object | observer | The object to be notified. |
| throws | Type Exception | n/a | Will throw an error if observer does not have a function named `notify`. |

### .unregisterObserver(observer)

Will no longer notify the specified observer.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | object | observer | The object to be notified. |
| returns | boolean | n/a | true if the observer was found and removed, otherwise false |

### .notifyObservers(..args)

Calls each observers `notify` function with the arguments provided.

| type | data type | name | Description |
| --- | --- | --- | --- |
| returns | boolean | n/a | true if game has ended, otherwise false. |

### observer.notify(...args)

Callback that the observable object uses to notify the observer.

| type | data type | name | Description |
| --- | --- | --- | --- |
| parameter | ...* | args | Arguments from the observable object. |
