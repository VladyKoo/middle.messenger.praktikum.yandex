import { cloneDeep, deepCompare, debounce } from '.';
import { EventBus } from './EventBus';

export class Store<State = {}> extends EventBus {
  private _EVENTS = {
    FLOW_SDU: 'flow:state-did-update',
  };

  public state: State;

  constructor(initState: State = <State>{}) {
    super();
    this.state = this._makeProxy(initState);
  }

  public subscribe(callback: () => void) {
    this.on(this._EVENTS.FLOW_SDU, callback);
  }

  private _makeProxy(obj: State): State {
    const proxyState = {};

    const keys = Object.getOwnPropertyNames(obj);

    keys.forEach((key) => {
      const value = obj[key];

      if (value && value.constructor === Object) {
        proxyState[key] = this._makeProxy(value);
      } else if (Array.isArray(value)) {
        proxyState[key] = this._createProxy(value);
      } else {
        proxyState[key] = value;
      }
    });

    return this._createProxy(proxyState);
  }

  private _createProxy(obj: State): State {
    const debouncedEmit = debounce(() => {
      this.emit(this._EVENTS.FLOW_SDU);
    }, 150);

    return new Proxy(obj as any, {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      set: (target, name: string, value) => {
        const oldValue = cloneDeep(target[name]);

        const isChanged = !deepCompare(oldValue, value);

        target[name] = value;

        if (isChanged) {
          debouncedEmit();
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Access denied');
      },
    });
  }
}
