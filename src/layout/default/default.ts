import { Block } from '@/utils/Block';
import { Notify } from '@/components/notify';
import styles from './default.module.scss';
import tmpl from './default.hbs';

export type DefaultProps = {
  styles?: Record<string, string>;
  outlet: () => Promise<any>;
  content?: Block;
  outletProp?: Record<string, unknown>;
  notify?: Notify;
};

export class Default extends Block<DefaultProps> {
  constructor(props: DefaultProps) {
    super({ styles, notify: new Notify(), ...props });
  }

  componentDidMount() {
    this.props.outlet().then((module) => {
      if (module.default) {
        const content = new module.default(this.props.outletProp);
        this.setProps({ content });
      }
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
