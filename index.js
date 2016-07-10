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

      this[observers] = [];

    }

    registerObserver(observer) {

      if (!isFunction(observer.notify)) {

        throw new TypeError(
          `${observer.constructor.name}.notify is not a function`
        );

      }

      if (this[observers].indexOf(observer) !== -1) {

        throw new TypeError(
          `Duplicate observer: ${observer.constructor.name}`
        );

      }

      this[observers].push(observer);

    }

    unregisterObserver(observer) {

      let index = this[observers].indexOf(observer);

      if (index === -1) {

        return false;

      }

      this[observers].splice(index, 1);

      return true;

    }

    notifyObservers(...args) {

      this[observers].forEach(observer => observer.notify(...args));

    }

  };


})();
