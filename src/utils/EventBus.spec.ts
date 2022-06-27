import { expect } from 'chai';
import { stub } from 'sinon';
import { EventBus } from './EventBus';

describe('EventBus', () => {
  const event = 'test';
  const callback = stub();

  describe('.on', () => {
    const eventBus = new EventBus();
    eventBus.on(event, callback);

    it('should exist event in listeners', () => {
      expect(eventBus.listeners).to.have.property(event);
    });
    it('should exist callback in listeners', () => {
      expect(eventBus.listeners[event].find((el) => el === callback)).to.be.equal(callback);
    });
  });

  describe('.emit', () => {
    const eventBus = new EventBus();

    eventBus.on(event, callback);
    eventBus.emit(event, 1, 2);

    it('should call callback with args', () => {
      expect(callback.calledWith(1, 2)).to.be.true;
    });
  });

  describe('.off', () => {
    const eventBus = new EventBus();

    eventBus.on(event, callback);
    eventBus.off(event, callback);

    it('eventBus should contain event', () => {
      expect(eventBus.listeners).to.have.property(event);
    });

    it('eventBus should contain callback', () => {
      expect(eventBus.listeners[event].find((el) => el === callback)).to.be.undefined;
    });
  });
});
