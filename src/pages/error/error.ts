import { Block } from '../../utils/Block';
import styles from './error.module.scss';
import tmpl from './error.hbs';

import { Link } from '../../components/link';

export type ErrorProps = {
  styles?: Record<string, string>;
  code: number;
  title?: string;
  link?: Link;
};

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    const code = props.code ?? 500;
    super({
      styles,
      title: code === 404 ? `${code} Page Not Found` : `${code} Internal Server Error`,
      link: new Link({
        name: 'Back to chat',
        href: '/',
      }),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
