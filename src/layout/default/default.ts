import { Block } from '../../utils/Block';
import { Notify } from '../../components/notify';
import styles from './default.module.scss';
import tmpl from './default.hbs';

export type DefaultProps = {
  styles?: Record<string, string>;
  outlet: new (props?: Record<string, unknown>) => any;
  content?: Block;
  outletProp?: Record<string, unknown>;
  notify?: Notify;
};

export class Default extends Block<DefaultProps> {
  constructor(props: DefaultProps) {
    super({ styles, content: new props.outlet(props.outletProp), notify: new Notify(), ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
