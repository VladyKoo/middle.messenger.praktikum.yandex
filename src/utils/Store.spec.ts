import { expect } from 'chai';
import { stub } from 'sinon';
import { Store } from './Store';

describe('Store', () => {
  const initState = {
    test: 'value',
  };

  const callback = stub();

  const store = new Store(initState);

  store.subscribe(callback);

  it('state should have test key', () => {
    expect(store.state).to.have.property('test');
  });

  it('store should call callback', (done) => {
    store.state.test = 'new value';

    setTimeout(() => {
      expect(callback.called).to.be.true;
      done();
    }, 200);
  });
});
