import { Block } from '../../utils/Block';
import styles from './link.module.scss';
import tmpl from './link.hbs';

export type LinkProps = {
  styles?: Record<string, string>;
  style?: string;
  target?: string;
  href: string;
  name: string;
};

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({ styles, target: '_self', ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
