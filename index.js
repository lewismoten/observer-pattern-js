(() => {

  'use strict';

  let observers = Symbol('observers');

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

      if (typeof observer.notify !== 'function') {

        throw new TypeError(
          `${observer.constructor.name}.notify is not a function`
        );

      }

      this[observers].push(observer);

    }

    unregisterObserver(observer) {

      let index = this[observers].indexOf(observer);

      if (index === -1) {

        return false;

      }

      this[observers] = this[observers].splice(index, 1);

      return true;

    }

    notifyObservers(...args) {

      this[observers].forEach(observer => observer.notify(...args));

    }

  };


})();
