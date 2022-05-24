import { Block } from '../../utils/Block';
import styles from './default.module.scss';
import tmpl from './default.hbs';

export type DefaultProps = {
  styles?: Record<string, string>;
  outlet: Block;
};

export class Default extends Block<DefaultProps> {
  constructor(props: DefaultProps) {
    super({ styles, ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
