import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Handlebars from 'handlebars';
import { Block } from './Block';

describe('Test Block', () => {
  const dom = new JSDOM('<div id="root"></div>');

  global.window = dom.window;
  global.document = dom.window.document;

  const testBlockInnerHTML = '<div>{{title}}</div>';

  type TestBlockProps = {
    title: string;
  };

  class TestBlock extends Block<TestBlockProps> {
    render() {
      return this.compile(Handlebars.compile(testBlockInnerHTML), { ...this.props });
    }
  }

  const title = 'test block title';

  const testBlock = new TestBlock({ title });

  it('block should have element', () => {
    const element = testBlock.getContent();

    expect(element).not.to.be.null;
  });

  it('element innerHTML should be equal title props', () => {
    const element = testBlock.getContent();

    expect(element.innerHTML).to.be.equal(title);
  });

  it('block should change props', (done) => {
    const newTitle = 'test block new title';

    testBlock.setProps({ title: newTitle });

    setTimeout(() => {
      const element = testBlock.getContent();

      expect(testBlock.props.title).to.be.equal(newTitle);

      expect(element.innerHTML).to.be.equal(newTitle);

      done();
    }, 200);
  });
});
