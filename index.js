(() => {

  'use strict';

  let isFunction = require('is-function'),
    observers = Symbol('observers');

  module.exports = class Observable {

    constructor() {

      if (new.target === Observable) {

        throw new TypeError(
          `Cannot instantiate abstract class: ${this.constructor.name}`
        );

      }

      this[observers] = new Map();

    }

    registerObserver(observer) {

      if (!isFunction(observer.notify)) {

        throw new TypeError(
          `${observer.constructor.name}.notify is not a function`
        );

      }

      if (this[observers].has(observer)) {

        throw new TypeError(
          `Duplicate observer: ${observer.constructor.name}`
        );

      }

      this[observers].set(observer, observer);

    }

    unregisterObserver(observer) {

      return this[observers].delete(observer);

    }

    notifyObservers(...args) {

      this[observers].forEach(observer => observer.notify(...args));

    }

  };

})();
