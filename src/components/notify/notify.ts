import { Block } from '../../utils/Block';
import { store, NotifyItem } from '../../store';
import { cloneDeep, deepCompare } from '../../utils';
import styles from './notify.module.scss';
import tmpl from './notify.hbs';

export type NotifyProps = {
  styles?: Record<string, string>;
  messages?: NotifyItem[];
};

export class Notify extends Block<NotifyProps> {
  constructor(props: NotifyProps = {}) {
    let state = store.state.notify;
    const propsAndState = { ...props, messages: state };

    super({
      styles,
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = store.state.notify;

      if (!deepCompare(state, newState)) {
        this.setProps({ messages: newState });
      }

      state = newState;
    });
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }

    const btns = this._element.querySelectorAll(`.${styles['close-btn']}`);

    if (!btns.length) {
      return;
    }

    const onClick = (e: Event) => {
      const { index } = (e.target as HTMLDivElement).dataset;

      if (!index) {
        return;
      }

      const notify = cloneDeep(store.state.notify);

      notify.splice(+index, 1);

      store.state.notify = notify;
    };

    btns.forEach((btn) => {
      btn.addEventListener('click', onClick);
    });

    return () => {
      btns.forEach((btn) => {
        btn.removeEventListener('click', onClick);
      });
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
