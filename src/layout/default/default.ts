import { Block } from '../../utils/Block';
import styles from './default.module.scss';
import tmpl from './default.hbs';

export type DefaultProps = {
  styles?: Record<string, string>;
  outlet: new (...args: any[]) => any;
  outletProp?: any
};

export class Default extends Block<DefaultProps> {
  constructor(props: DefaultProps) {
    const outlet = new props.outlet(props.outletProp);
    super({ styles, ...props, outlet });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
