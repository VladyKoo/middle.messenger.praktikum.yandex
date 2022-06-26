/* eslint class-methods-use-this: ["error", { "exceptMethods": ["spliteProps", "componentDidMount", "componentDidUpdate","componentWillDestroy",  "addEvents", "replaceStub"] }] */

import { v4 as makeUUID } from 'uuid';

import { EventBus } from './EventBus';
import { cloneDeep, debounce } from './index';

export abstract class Block<Props = object> {
  private _EVENTS = {
    INIT: '_init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWD: 'flow:component-will-destroy',
    FLOW_RENDER: 'flow:render',
  };

  protected _id: string = makeUUID();

  private _eventBus = new EventBus();

  protected _element: HTMLElement | null = null;

  private _removeEvents: void | (() => void);

  private tagName: string;

  public props: Props;

  public children: Props = <Props>{};

  private propsBeingUpdated: boolean = false;

  private oldProps: Props;

  constructor(props: Props = <Props>{}, tagName = 'div') {
    this.tagName = tagName;

    this.props = this._makeProxy({ ...props, _id: this._id });

    this._registerEvents();

    this._eventBus.emit(this._EVENTS.INIT);
  }

  private _makeProxy(props: Props): Props {
    const debounceEmit = debounce((...args) => {
      this.propsBeingUpdated = false;
      this._eventBus.emit(this._EVENTS.FLOW_CDU, ...args);
    }, 150);

    const proxyProps = new Proxy<Props>(props, {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      set: (target, name: string, value) => {
        const oldValue = target[name];

        if (Array.isArray(oldValue)) {
          oldValue.forEach((oldValueItem) => {
            if (oldValueItem instanceof Block) {
              oldValueItem.dispatchComponentWillDestroy();
            }
          });
        }

        if (oldValue instanceof Block) {
          oldValue.dispatchComponentWillDestroy();
        }

        if (!this.propsBeingUpdated) {
          this.oldProps = cloneDeep(this.props);
        }

        target[name] = value;

        this.propsBeingUpdated = true;

        debounceEmit(this.oldProps, this.props);

        return true;
      },
      deleteProperty() {
        throw new Error('Access denied');
      },
    });

    return proxyProps;
  }

  private _registerEvents(): void {
    this._eventBus.on(this._EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(this._EVENTS.FLOW_CWD, this._componentWillDestroy.bind(this));
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
  }

  protected componentDidMount(): void {}

  protected dispatchComponentDidMount(): void {
    this._eventBus.emit(this._EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response !== false) {
      this._eventBus.emit(this._EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps?: Props, newProps?: Props): boolean | void {}

  private _componentWillDestroy(): void {
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => {
          nestedChild.dispatchComponentWillDestroy();
        });
      } else {
        child.dispatchComponentWillDestroy();
      }
    });

    this.componentWillDestroy();

    if (this._removeEvents) {
      this._removeEvents();
    }

    this._element?.remove();
  }

  protected componentWillDestroy(): void {}

  public dispatchComponentWillDestroy(): void {
    this._eventBus.emit(this._EVENTS.FLOW_CWD);
  }

  protected compile(template: (ctx: any) => string, props: Props = <Props>{}): DocumentFragment {
    const propsAndStubs = { ...props };

    const fragment = document.createElement('template');

    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const values: unknown[] = [];
        this.children[key] = [];

        value.forEach((elem) => {
          if (elem instanceof Block) {
            values.push(`<div data-id="${elem._id}"></div>`);

            this.children[key].push(elem);
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

    const attrs = fragment.content?.children[0]?.attributes || [];

    Object.values(attrs).forEach((attr) => {
      if (this._element) {
        this._element.setAttribute(attr.nodeName, attr.nodeValue || '');
      }
    });

    fragment.innerHTML = fragment.content.children[0].innerHTML;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => {
          this.replaceStub(nestedChild, fragment);
        });
      } else {
        this.replaceStub(child, fragment);
      }
    });

    return fragment.content;
  }

  private replaceStub(child: Block, fragment: HTMLTemplateElement) {
    const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

    if (!stub) {
      return;
    }

    stub.replaceWith(child.getContent());
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

  protected addEvents(): (() => void) | void {}
}
