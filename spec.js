/* eslint-env jasmine */

(() => {

  'use strict';

  let Lib = require('.');

  describe('lib', () => {

    it('It can be constructed', () => {

      expect(() => new Lib()).not.toThrow();

    });

    it('Can register observer', () => {

      let lib = new Lib(),
        observer = {notify: () => {}};

      expect(() => lib.registerObserver(observer)).not.toThrow();

    });

    it('Can register the same observer twice', () => {

      let lib = new Lib(),
        observer = {notify: () => {}};

      expect(() => lib.registerObserver(observer)).not.toThrow();
      expect(() => lib.registerObserver(observer)).not.toThrow();

    });

    it('Can register multiple observers', () => {

      let lib = new Lib(),
        observer1 = {notify: () => {}},
        observer2 = {notify: () => {}};

      expect(() => lib.registerObserver(observer1)).not.toThrow();
      expect(() => lib.registerObserver(observer2)).not.toThrow();

    });

    it('Can not register observer without notify', () => {

      let lib = new Lib(),
        observer = {};

      expect(() => lib.registerObserver(observer))
        .toThrow('Object.notify is not a function');

    });

    it('Can not register observer with notify as a non-function', () => {

      let lib = new Lib(),
        observer = {notify: 3};

      expect(() => lib.registerObserver(observer))
        .toThrow('Object.notify is not a function');

    });

    it('Notifies observers', () => {

      let lib = new Lib(),
        observer1 = {notify: jasmine.createSpy('observer1.notify')},
        observer2 = {notify: jasmine.createSpy('observer2.notify')},
        args = [
          'This is the message',
          32,
          {name: 'value'}
        ];

      lib.registerObserver(observer1);
      lib.registerObserver(observer2);

      lib.notifyObservers(...args);

      expect(observer1.notify).toHaveBeenCalledWith(...args);
      expect(observer2.notify).toHaveBeenCalledWith(...args);

    });

    it('Unregisters observer', () => {

      let lib = new Lib(),
        observer = {notify: a => a},
        result;

      lib.registerObserver(observer);

      result = lib.unregisterObserver(observer);

      expect(result).toBe(true);

    });

    it('Unregister the same observer twice', () => {

      let lib = new Lib(),
        observer = {notify: a => a},
        result1,
        result2;

      lib.registerObserver(observer);

      result1 = lib.unregisterObserver(observer);
      result2 = lib.unregisterObserver(observer);

      expect(result1).toBe(true);
      expect(result2).toBe(false);

    });

    it('Can not unregister unknown observer', () => {

      let lib = new Lib(),
        observer = {notify: a => a},
        result;

      result = lib.unregisterObserver(observer);

      expect(result).toBe(false);

    });

    it('Notifies remaining observers', () => {

      let lib = new Lib(),
        observer1 = {notify: jasmine.createSpy('observer1.notify')},
        observer2 = {notify: jasmine.createSpy('observer2.notify')},
        args = [
          'This is the message',
          32,
          {name: 'value'}
        ];

      lib.registerObserver(observer1);
      lib.registerObserver(observer2);

      lib.unregisterObserver(observer1);

      lib.notifyObservers(...args);

      expect(observer1.notify).not.toHaveBeenCalled();
      expect(observer2.notify).toHaveBeenCalledWith(...args);

    });

  });

})();
