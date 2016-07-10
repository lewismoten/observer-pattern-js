/* eslint-env jasmine */

(() => {

  'use strict';

  let Lib = require('.');

  class Emitter extends Lib {}

  describe('lib', () => {

    it('It can not be constructed directly', () => {

      expect(() => new Lib())
        .toThrow('Cannot instantiate abstract class: Observable');

    });

    it('Can be constructed via inheritance', () => {

      let emitter = new Emitter();

      expect(emitter instanceof Lib).toBe(true);
      expect(emitter instanceof Emitter).toBe(true);

    });

    it('Can register observer', () => {

      let emitter = new Emitter(),
        observer = {notify: () => {}};

      expect(() => emitter.registerObserver(observer)).not.toThrow();

    });

    it('Can register the same observer twice', () => {

      let emitter = new Emitter(),
        observer = {notify: () => {}};

      expect(() => emitter.registerObserver(observer)).not.toThrow();
      expect(() => emitter.registerObserver(observer)).not.toThrow();

    });

    it('Can register multiple observers', () => {

      let emitter = new Emitter(),
        observer1 = {notify: () => {}},
        observer2 = {notify: () => {}};

      expect(() => emitter.registerObserver(observer1)).not.toThrow();
      expect(() => emitter.registerObserver(observer2)).not.toThrow();

    });

    it('Can not register observer without notify', () => {

      let emitter = new Emitter(),
        observer = {};

      expect(() => emitter.registerObserver(observer))
        .toThrow('Object.notify is not a function');

    });

    it('Can not register observer with notify as a non-function', () => {

      let emitter = new Emitter(),
        observer = {notify: 3};

      expect(() => emitter.registerObserver(observer))
        .toThrow('Object.notify is not a function');

    });

    it('Notifies observers', () => {

      let emitter = new Emitter(),
        observer1 = {notify: jasmine.createSpy('observer1.notify')},
        observer2 = {notify: jasmine.createSpy('observer2.notify')},
        args = [
          'This is the message',
          32,
          {name: 'value'}
        ];

      emitter.registerObserver(observer1);
      emitter.registerObserver(observer2);

      emitter.notifyObservers(...args);

      expect(observer1.notify).toHaveBeenCalledWith(...args);
      expect(observer2.notify).toHaveBeenCalledWith(...args);

    });

    it('Unregisters observer', () => {

      let emitter = new Emitter(),
        observer = {notify: a => a},
        result;

      emitter.registerObserver(observer);

      result = emitter.unregisterObserver(observer);

      expect(result).toBe(true);

    });

    it('Unregister the same observer twice', () => {

      let emitter = new Emitter(),
        observer = {notify: a => a},
        result1,
        result2;

      emitter.registerObserver(observer);

      result1 = emitter.unregisterObserver(observer);
      result2 = emitter.unregisterObserver(observer);

      expect(result1).toBe(true);
      expect(result2).toBe(false);

    });

    it('Can not unregister unknown observer', () => {

      let emitter = new Emitter(),
        observer = {notify: a => a},
        result;

      result = emitter.unregisterObserver(observer);

      expect(result).toBe(false);

    });

    it('Notifies remaining observers', () => {

      let emitter = new Emitter(),
        observer1 = {notify: jasmine.createSpy('observer1.notify')},
        observer2 = {notify: jasmine.createSpy('observer2.notify')},
        args = [
          'This is the message',
          32,
          {name: 'value'}
        ];

      emitter.registerObserver(observer1);
      emitter.registerObserver(observer2);

      emitter.unregisterObserver(observer1);

      emitter.notifyObservers(...args);

      expect(observer1.notify).not.toHaveBeenCalled();
      expect(observer2.notify).toHaveBeenCalledWith(...args);

    });

  });

})();
