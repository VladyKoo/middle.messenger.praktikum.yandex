import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Handlebars from 'handlebars';
import { Router } from './Router';
import { Block } from './Block';

describe('Test Router', () => {
  const dom = new JSDOM('<div id="root"></div>', {
    url: 'http://localhost:5000',
  });

  global.window = dom.window;
  global.document = dom.window.document;

  const homePageInnerHTML = '<div>home page</div>';

  class HomePage extends Block {
    render() {
      return this.compile(Handlebars.compile(homePageInnerHTML), { ...this.props });
    }
  }

  const testPageInnerHTML = '<div>test page</div>';

  class TestPage extends Block {
    render() {
      return this.compile(Handlebars.compile(testPageInnerHTML), { ...this.props });
    }
  }

  const routes = [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/test',
      component: TestPage,
    },
  ];

  const router = new Router(routes, '#root');

  describe('.go', () => {
    it('root innerHTML should be equal homePageInnerHTML', () => {
      router.go('/');
      const rootDiv = document.querySelector('#root');

      expect(rootDiv?.innerHTML).to.be.equal(homePageInnerHTML);
    });

    it('root innerHTML should be equal testPageInnerHTML', () => {
      router.go('/test');
      const rootDiv = document.querySelector('#root');

      expect(rootDiv?.innerHTML).to.be.equal(testPageInnerHTML);
    });
  });

  describe('.back', () => {
    router.go('/');
    router.go('/test');

    it('root innerHTML should be equal homePageInnerHTML', (done) => {
      router.back();

      setTimeout(() => {
        const rootDiv = document.querySelector('#root');
        expect(rootDiv?.innerHTML).to.be.equal(homePageInnerHTML);
        done();
      }, 10);
    });
  });

  describe('.forward', () => {
    router.go('/');
    router.go('/test');
    router.back();

    it('root innerHTML should be equal testPageInnerHTML', (done) => {
      router.forward();

      setTimeout(() => {
        const rootDiv = document.querySelector('#root');
        expect(rootDiv?.innerHTML).to.be.equal(testPageInnerHTML);
        done();
      }, 10);
    });
  });
});
