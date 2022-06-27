import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { XMLHttpRequest } from 'xmlhttprequest';
import { Fetch } from './Fetch';

describe('Test Fetch', () => {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

  global.XMLHttpRequest = XMLHttpRequest;
  global.FormData = dom.window.FormData;

  const fetch = new Fetch({
    baseUrl: 'http://jsonplaceholder.typicode.com/posts',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  describe('.get', () => {
    it('request should return status 200', async () => {
      const res = await fetch.get('?_limit=1');

      expect(res.status).to.be.equal(200);
    });
  });

  describe('.post', () => {
    it('request should return status 201', async () => {
      const res = await fetch.post('/', {
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
      });

      expect(res.status).to.be.equal(201);
    });
  });

  describe('.put', () => {
    it('request should return status 200', async () => {
      const res = await fetch.put('/1', {
        data: {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
      });

      expect(res.status).to.be.equal(200);
    });
  });

  describe('.delete', () => {
    it('request should return status 200', async () => {
      const res = await fetch.delete('/1');

      expect(res.status).to.be.equal(200);
    });
  });
});
