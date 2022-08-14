import { Block } from '@/utils/Block';
import { RouterLink } from '@/components/router-link';
import styles from './error.module.scss';
import tmpl from './error.hbs';

export type ErrorProps = {
  styles?: Record<string, string>;
  title: string;
  link?: RouterLink;
};

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({
      styles,
      link: new RouterLink({
        href: '/',
        class: styles.link,
        content: 'Back to chat',
      }),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}
