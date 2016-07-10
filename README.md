# Observer Design Pattern Subject

An implementation of the subject in an Observer Design Pattern.

## Example

```javascript
let Observable = require('observer-subject'),
  subject = new Observable(),
  observer1 = {
    notify(...args) {

      console.log(`#1`, ...args);

    }

  },
  observer2 = {

    notify(...args) {

      console.log(`#2`, ...args);

    }

  };

subject.registerObserver(observer1);
subject.registerObserver(observer2);
subject.notifyObservers(42);
// #1 42
// #2 42

subject.unregisterObserver(observer1);
subject.notifyObservers(32);
// #2 32
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
