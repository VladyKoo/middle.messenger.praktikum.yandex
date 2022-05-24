/* eslint class-methods-use-this: ["error", { "exceptMethods": ["spliteProps", "componentDidMount", "componentDidUpdate", "addEvents"] }] */

import { v4 as makeUUID } from 'uuid';

import { EventBus } from './EventBus';
import { deepClone, deepCompare } from './index';

export abstract class Block<Props = {}> {
  private _EVENTS = {
    INIT: '_init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected _id: string = makeUUID();

  private _eventBus = new EventBus();

  protected _element: HTMLElement | null;

  private _removeEvents: void | (() => void);

  private tagName: string;

  public props: Props;

  public children: Props = <Props>{};

  constructor(props: Props = <Props>{}, tagName = 'div') {
    this.tagName = tagName;

    this.props = this._makeProxy({ ...props, _id: this._id });

    this._registerEvents();

    this._eventBus.emit(this._EVENTS.INIT);
  }

  private _makeProxy(props: Props): Props {
    const proxyProps = new Proxy(props, {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      set: (target, name: string, value) => {
        const oldValue = target[name];

        const isChanged = !deepCompare(oldValue, value);

        const oldProps = isChanged ? { ...this.props, [name]: deepClone(oldValue) } : this.props;

        target[name] = value;

        this._eventBus.emit(this._EVENTS.FLOW_CDU, oldProps, this.props, isChanged);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });

    return proxyProps;
  }

  private _registerEvents(): void {
    this._eventBus.on(this._EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this._createResources();
    this._eventBus.emit(this._EVENTS.FLOW_CDM);
  }

  private _createResources(): void {
    this._element = document.createElement(this.tagName);
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element not created yet');
    }
    return this._element;
  }

  public setProps(props: Partial<Props>) {
    if (!props) {
      return;
    }

    Object.assign(this.props, props);
  }

  private _componentDidMount(): void {
    this._eventBus.emit(this._EVENTS.FLOW_RENDER);
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected dispatchComponentDidMount(): void {
    this._eventBus.emit(this._EVENTS.FLOW_CDM);
  }

  protected componentDidMount(): void {}

  private _componentDidUpdate(oldProps: Props, newProps: Props, isChanged: boolean): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response || isChanged) {
      this._eventBus.emit(this._EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps?: Props, newProps?: Props): boolean | void {}

  protected compile(template: (ctx: any) => string, props: Props = <Props>{}): DocumentFragment {
    const propsAndStubs = { ...props };

    const fragment = document.createElement('template');

    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const values = [];

        value.forEach((elem) => {
          if (elem instanceof Block) {
            values.push(`<div data-id="${elem._id}"></div>`);

            this.children[elem._id] = elem;
          } else {
            values.push(elem);
          }
        });

        propsAndStubs[key] = values;
      } else if (value instanceof Block) {
        this.children[key] = value;

        propsAndStubs[key] = `<div data-id="${value._id}"></div>`;
      } else {
        propsAndStubs[key] = value;
      }
    });

    fragment.innerHTML = template(propsAndStubs);

    const attrs = fragment.content.children[0].attributes;

    Object.values(attrs).forEach((attr) => {
      if (this._element) {
        this._element.setAttribute(attr.nodeName, attr.nodeValue);
      }
    });

    fragment.innerHTML = fragment.content.children[0].innerHTML;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  private _render(): void {
    if (this._element) {
      const fragment = this.render();
      if (this._removeEvents) {
        this._removeEvents();
      }
      this._element.innerHTML = '';
      this._element.appendChild(fragment);
      this._addEvents();
    }
  }

  abstract render(): DocumentFragment;

  private _addEvents(): void {
    this._removeEvents = this.addEvents();
  }

  protected addEvents(): void | (() => void) {}
}
